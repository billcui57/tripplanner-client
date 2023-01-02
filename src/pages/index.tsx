import {
  Button,
  Container,
  Slider,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IPlanTripRequest } from "../service/plantrip";
import { SiteListCreatorV2 } from "../components/SiteList/SiteListCreator/SiteListCreator";
import { ISite } from "../types";
import { FAQ } from "../components/FAQ/FAQ";
import { Stack } from "@mui/system";

export default function Home() {
  let planTripRequest: IPlanTripRequest | undefined = undefined;
  const [sites, setSites] = useState<ISite[]>([]);
  const [maxDrivingHours, setMaxDrivingHours] = useState<number>(2);
  const [hotelFindingRadius, setHotelFindingRadius] = useState<number>(20);
  const [urlLoaded, setUrlLoaded] = useState<boolean>(false);

  const router = useRouter();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    if (router.isReady) {
      syncRequestWithURL();
    }
  }, [router.isReady]);

  useEffect(() => {
    if (urlLoaded) {
      syncURLWithRequest();
    }
  }, [sites, maxDrivingHours, hotelFindingRadius]);

  const syncURLWithRequest = () => {
    planTripRequest = {
      sites: sites,
      max_driving_hours: maxDrivingHours,
      hotel_finding_radius: hotelFindingRadius,
    };
    router.replace({
      query: { data: JSON.stringify(planTripRequest) },
    });
  };

  const syncRequestWithURL = () => {
    const queryData = router.query.data as string;

    if (!queryData) {
      setUrlLoaded(true);
      return;
    }
    const planTripRequest: IPlanTripRequest = JSON.parse(queryData);
    setSites(planTripRequest.sites);
    setMaxDrivingHours(planTripRequest.max_driving_hours);
    setHotelFindingRadius(planTripRequest.hotel_finding_radius);
    setUrlLoaded(true);
  };

  const handleSiteListChange = (newSiteList: ISite[]) => {
    setSites(newSiteList);
  };

  const handleSubmitButtonClick = () => {
    planTripRequest = {
      sites: sites,
      max_driving_hours: maxDrivingHours,
      hotel_finding_radius: hotelFindingRadius,
    };

    router.push({
      pathname: "/result",
      query: { data: JSON.stringify(planTripRequest) },
    });
  };

  const handleMaxDrivingHoursChange = (
    event: React.SyntheticEvent | Event,
    value: number | Array<number>
  ) => {
    setMaxDrivingHours(value as number);
  };

  const handleHotelFindingRadiusChange = (
    event: React.SyntheticEvent | Event,
    value: number | Array<number>
  ) => {
    setHotelFindingRadius(value as number);
  };

  const canSubmit = () => {
    return sites.length >= 2;
  };

  const renderDesktop = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Container maxWidth="sm">
            <Typography
              variant="h4"
              textAlign={"center"}
              marginTop={8}
              sx={{ color: "#264653" }}
            >
              Plan Your Trip
            </Typography>
            <Typography
              variant="body1"
              textAlign={"center"}
              marginTop={2}
              marginBottom={16}
              sx={{ color: "#264653" }}
            >
              Click on the map to start adding sites
            </Typography>

            <Box>
              <Typography
                variant="body1"
                textAlign={"center"}
                sx={{ color: "#264653" }}
              >
                Max hours of driving per day
              </Typography>
              <Slider
                defaultValue={maxDrivingHours}
                key={maxDrivingHours}
                step={1}
                min={2}
                max={8}
                marks
                color="primary"
                valueLabelDisplay="on"
                onChangeCommitted={handleMaxDrivingHoursChange}
              />
            </Box>
            <Box marginBottom={8}>
              <Typography
                variant="body1"
                textAlign={"center"}
                sx={{ color: "#264653" }}
              >
                Hotel finding radius
              </Typography>
              <Slider
                defaultValue={hotelFindingRadius}
                key={hotelFindingRadius}
                step={1}
                min={10}
                max={100}
                color="primary"
                valueLabelDisplay="on"
                onChangeCommitted={handleHotelFindingRadiusChange}
              />
            </Box>
            <Box textAlign="center" marginBottom={8}>
              <Button
                onClick={handleSubmitButtonClick}
                disabled={!canSubmit()}
                color="primary"
              >
                Submit
              </Button>
            </Box>
            <FAQ />
          </Container>
        </Grid>
        <Grid item xs={6}>
          <SiteListCreatorV2
            onChange={handleSiteListChange}
            sites={sites}
          ></SiteListCreatorV2>
        </Grid>
      </Grid>
    );
  };

  const renderMobile = () => {
    return (
      <Stack spacing={4} marginTop={8}>
        <Container maxWidth="sm">
          <Typography
            variant="h4"
            textAlign={"center"}
            sx={{ color: "#264653" }}
            marginBottom={2}
          >
            Plan Your Trip
          </Typography>
          <Typography
            variant="body1"
            textAlign={"center"}
            marginBottom={4}
            sx={{ color: "#264653" }}
          >
            Click on the map to start adding sites
          </Typography>

          <Typography
            variant="body1"
            textAlign={"center"}
            sx={{ color: "#264653" }}
          >
            Max hours of driving per day
          </Typography>
          <Slider
            defaultValue={maxDrivingHours}
            key={maxDrivingHours}
            step={1}
            min={2}
            max={8}
            marks
            color="primary"
            valueLabelDisplay="on"
            onChangeCommitted={handleMaxDrivingHoursChange}
          />

          <Typography
            variant="body1"
            textAlign={"center"}
            sx={{ color: "#264653" }}
          >
            Hotel finding radius
          </Typography>
          <Slider
            defaultValue={hotelFindingRadius}
            key={hotelFindingRadius}
            step={1}
            min={10}
            max={100}
            color="primary"
            valueLabelDisplay="on"
            onChangeCommitted={handleHotelFindingRadiusChange}
          />
        </Container>
        <SiteListCreatorV2
          onChange={handleSiteListChange}
          sites={sites}
        ></SiteListCreatorV2>
        <Box textAlign="center">
          <Container maxWidth="sm">
            <Box marginBottom={2}>
              <Button
                onClick={handleSubmitButtonClick}
                disabled={!canSubmit()}
                color="primary"
              >
                Submit
              </Button>
            </Box>
            <FAQ />
          </Container>
        </Box>
      </Stack>
    );
  };

  return isDesktop ? renderDesktop() : renderMobile();
}

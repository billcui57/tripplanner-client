import { Button, Container, Slider, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IPlanTripRequest } from "../api/plantrip";
import { SiteListCreatorV2 } from "../components/SiteList/SiteListCreator/SiteListCreator";
import { ISite } from "../types";

export default function Home() {
  let planTripRequest: IPlanTripRequest | undefined = undefined;
  const [sites, setSites] = useState<ISite[]>([]);
  const [maxDrivingHours, setMaxDrivingHours] = useState<number>(2);
  const [hotelFindingRadius, setHotelFindingRadius] = useState<number>(20);
  const [urlLoaded, setUrlLoaded] = useState<boolean>(false);

  const router = useRouter();

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

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Container maxWidth="sm">
          <Typography
            variant="h4"
            textAlign={"center"}
            marginBottom={24}
            marginTop={8}
            sx={{ color: "#264653" }}
          >
            Plan Your Trip
          </Typography>

          <Box>
            <Typography variant="body1" textAlign={"center"}>
              Max hours of driving per day
            </Typography>
            <Slider
              defaultValue={maxDrivingHours}
              key={maxDrivingHours}
              step={1}
              min={2}
              max={8}
              marks
              sx={{ color: "#2A9D8F" }}
              valueLabelDisplay="on"
              onChangeCommitted={handleMaxDrivingHoursChange}
            />
          </Box>
          <Box marginBottom={16}>
            <Typography variant="body1" textAlign={"center"}>
              Hotel finding radius
            </Typography>
            <Slider
              defaultValue={hotelFindingRadius}
              key={hotelFindingRadius}
              step={1}
              min={10}
              max={100}
              sx={{ color: "#2A9D8F" }}
              valueLabelDisplay="on"
              onChangeCommitted={handleHotelFindingRadiusChange}
            />
          </Box>
          <Box textAlign="center">
            <Button
              onClick={handleSubmitButtonClick}
              disabled={!canSubmit()}
              sx={{ color: "#2A9D8F" }}
            >
              Submit
            </Button>
          </Box>
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
}

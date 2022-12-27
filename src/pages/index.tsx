import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import {
  Alert,
  Button,
  Container,
  Slider,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { SiteListCreator } from "../components/SiteList/SiteListCreator/SiteListCreator";
import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import LoadingButton from "@mui/lab/LoadingButton";
import { useRouter } from "next/router";
import planTrip, { IPlanTripRequest, IPlanTripResponse } from "../api/plantrip";
import { ISite } from "../types";
import { SiteListCreatorV2 } from "../components/SiteList/SiteListCreator/SiteListCreatorv2";

export default function Home() {
  let planTripRequest: IPlanTripRequest | undefined = undefined;
  const [sites, setSites] = useState<ISite[]>([]);
  const [maxDrivingHours, setMaxDrivingHours] = useState<number>(2);
  const [hotelFindingRadius, setHotelFindingRadius] = useState<number>(20);
  const [urlLoaded, setUrlLoaded] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    console.log("a");
    if (router.isReady) {
      syncRequestWithURL();
    }
  }, [router.isReady]);

  useEffect(() => {
    if (urlLoaded) {
      console.log("b");
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
          >
            Plan your trip
          </Typography>

          <Box>
            <Typography variant="body1" textAlign={"center"}>
              Max hours of driving per day
            </Typography>
            <Slider
              defaultValue={maxDrivingHours}
              key={maxDrivingHours}
              step={1}
              min={1}
              max={8}
              marks
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
              min={1}
              max={100}
              valueLabelDisplay="on"
              onChangeCommitted={handleHotelFindingRadiusChange}
            />
          </Box>
          <Box textAlign="center">
            <Button onClick={handleSubmitButtonClick} disabled={!canSubmit()}>
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

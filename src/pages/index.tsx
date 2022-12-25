import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { Alert, Button, Slider, Typography } from "@mui/material";
import { SiteListCreator } from "../components/SiteList/SiteListCreator/SiteListCreator";
import { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import LoadingButton from "@mui/lab/LoadingButton";
import { useRouter } from "next/router";
import planTrip, { IPlanTripRequest, IPlanTripResponse } from "../api/plantrip";
import { ISite } from "../api/types";
import { SiteListCreatorV2 } from "../components/SiteList/SiteListCreator/SiteListCreatorv2";

export default function Home() {
  let planTripRequest: IPlanTripRequest | undefined = undefined;
  const [sites, setSites] = useState<ISite[]>([]);
  const [maxDrivingHours, setMaxDrivingHours] = useState<number>(2);
  const [hotelFindingRadius, setHotelFindingRadius] = useState<number>(20);

  const router = useRouter();

  const handleSiteListChange = (newSiteList: ISite[]) => {
    setSites(newSiteList);
  };

  const fetchData = async () => {
    if (planTripRequest) {
      return planTrip(planTripRequest);
    }
  };

  const { isLoading, data, error, refetch } = useQuery("plan-trip", fetchData, {
    enabled: false,
    retry: false,
    onSuccess: () => {
      router.push("/result");
    },
  });

  const handleSubmitButtonClick = () => {
    planTripRequest = {
      sites: sites,
      max_driving_hours: maxDrivingHours,
      hotel_finding_radius: hotelFindingRadius,
    };
    refetch();
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

  console.log(error);
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Stack paddingX={24}>
          <Typography
            variant="h4"
            textAlign={"center"}
            marginBottom={24}
            marginTop={8}
          >
            Your Trip
          </Typography>
          {error ? (
            <Alert severity="error">{error.response.data.error}</Alert>
          ) : null}

          <Box>
            <Typography variant="body1" textAlign={"center"}>
              Max hours of driving per day
            </Typography>
            <Slider
              defaultValue={maxDrivingHours}
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
              step={1}
              min={1}
              max={50}
              valueLabelDisplay="on"
              onChangeCommitted={handleHotelFindingRadiusChange}
            />
          </Box>
          <Box textAlign="center">
            <LoadingButton
              loading={isLoading}
              onClick={handleSubmitButtonClick}
              disabled={!canSubmit()}
            >
              Submit
            </LoadingButton>
          </Box>
        </Stack>
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

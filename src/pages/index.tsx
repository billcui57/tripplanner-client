import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { Button, Typography } from "@mui/material";
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
    onSuccess: () => {
      router.push("/result");
    },
  });

  const handleSubmitButtonClick = () => {
    planTripRequest = {
      sites: sites,
      max_driving_hours: 6,
      hotel_finding_radius: 40,
    };
    refetch();
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Stack spacing={2} alignItems="center">
          <Typography variant="h4">Constraints</Typography>
          <LoadingButton loading={isLoading} onClick={handleSubmitButtonClick}>
            Submit
          </LoadingButton>
        </Stack>
      </Grid>
      <Grid item xs={6}>
        <Stack spacing={2} alignItems="center">
          <SiteListCreatorV2
            onChange={handleSiteListChange}
            sites={sites}
          ></SiteListCreatorV2>
        </Stack>
      </Grid>
    </Grid>
  );
}

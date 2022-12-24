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
import { IPlanTripResponse } from "../api/plantrip";

export default function Home() {
  const [sites, setSites] = useState<string[]>([]);
  const router = useRouter();

  const handleSiteListChange = (newSiteList: string[]) => {
    setSites(newSiteList);
  };

  const fetchData = async () => {
    return axios
      .post<IPlanTripResponse>("/api/plan-trip", {
        sites: sites,
        max_driving_hours: 2,
        hotel_finding_radius: 40,
      })
      .then((res) => {
        return res.data;
      });
  };

  const { isLoading, isSuccess, data, error, refetch } = useQuery(
    "plan-trip",
    fetchData,
    {
      enabled: false,
    }
  );

  if (isSuccess) {
    router.push("/result");
  }

  const handleSubmitButtonClick = () => {
    refetch();
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Stack spacing={2} alignItems="center">
          <SiteListCreator onChange={handleSiteListChange} sites={sites} />
        </Stack>
      </Grid>
      <Grid item xs={6}>
        <Stack spacing={2} alignItems="center">
          <Typography variant="h4">Constraints</Typography>
        </Stack>
      </Grid>
      <Grid item xs={12} style={{ textAlign: "center" }}>
        <LoadingButton loading={isLoading} onClick={handleSubmitButtonClick}>
          Submit
        </LoadingButton>
      </Grid>
    </Grid>
  );
}

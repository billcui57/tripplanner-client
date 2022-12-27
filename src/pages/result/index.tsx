import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import {
  Alert,
  AlertTitle,
  Button,
  CircularProgress,
  Container,
  Skeleton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useQueryClient } from "react-query";
import GoogleMapReact from "google-map-react";
import { useQuery } from "react-query";
import planTrip, {
  IPlanTripRequest,
  IPlanTripResponse,
} from "../../api/plantrip";
import { Circle } from "@mui/icons-material";
import { Pin } from "../../components/Pin/Pin";
import HotelIcon from "@mui/icons-material/Hotel";
import { useRouter } from "next/router";
import { ResultMap } from "../../components/ResultMap/ResultMap";
import { planTripResponseMock } from "../../api/mock";
import { ResultList } from "../../components/ResultList/ResultList";

export default function ResultPage() {
  const router = useRouter();

  if (!router.query.data) {
    return null;
  }

  const queryData = router.query.data as string;
  const planTripRequest: IPlanTripRequest = JSON.parse(queryData);

  const fetchData = async () => {
    if (planTripRequest) {
      return planTrip(planTripRequest);
    }
  };

  const goToMainPage = () => {
    router.push({
      pathname: "/",
      query: { data: JSON.stringify(planTripRequest) },
    });
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isLoading, data, error, refetch } = useQuery("plan-trip", fetchData, {
    retry: false,
    cacheTime: 0,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <React.Fragment>
        <CircularProgress
          sx={{
            position: "fixed",
            top: "47%",
            left: "49%",
          }}
        />
      </React.Fragment>
    );
  }

  if (error) {
    return (
      <Alert
        severity="error"
        action={
          <Button color="inherit" size="small" onClick={goToMainPage}>
            Go Back
          </Button>
        }
      >
        {error.response.data.error}
      </Alert>
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Button color="inherit" size="small" onClick={goToMainPage}>
          Go Back
        </Button>
        <ResultList tripData={data} />
      </Grid>
      <Grid item xs={6}>
        <ResultMap tripData={data} />
      </Grid>
    </Grid>
  );
}

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { Button, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useQueryClient } from "react-query";
import GoogleMapReact from "google-map-react";
import { IPlanTripResponse } from "../../api/plantrip";
import { Circle } from "@mui/icons-material";
import { Pin } from "../../components/Pin/Pin";
import HotelIcon from "@mui/icons-material/Hotel";
import { useRouter } from "next/router";
import { ResultMap } from "../../components/ResultMap/ResultMap";
import { planTripResponseMock } from "../../api/mock";
import { ResultList } from "../../components/ResultList/ResultList";

export default function ResultPage() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const tripData = queryClient.getQueryData<IPlanTripResponse>("plan-trip");
  // const tripData = planTripResponseMock;

  if (!tripData) {
    typeof window !== "undefined" && router.push("/");
    return null;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <ResultList tripData={tripData} />
      </Grid>
      <Grid item xs={6}>
        <ResultMap tripData={tripData} />
      </Grid>
    </Grid>
  );
}

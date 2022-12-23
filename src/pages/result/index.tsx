import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { Button, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useQueryClient } from "react-query";

export default function ResultPage() {
  const queryClient = useQueryClient();
  const getPlannedTrip = () => {
    return queryClient.getQueryData("plan-trip");
  };

  console.log({ cached: getPlannedTrip() });

  return <div>hi</div>;
}

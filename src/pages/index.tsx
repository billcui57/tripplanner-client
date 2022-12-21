import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { Button, Typography } from "@mui/material";
import {
  ISite,
  SiteListCreator,
} from "../components/SiteList/SiteListCreator/SiteListCreator";
import { useState } from "react";

export default function Home() {
  const [sites, setSites] = useState<ISite[]>([]);

  const handleSiteListChange = (newSiteList: ISite[]) => {
    setSites(newSiteList);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Stack spacing={2} alignItems="center">
          <SiteListCreator onChange={handleSiteListChange} />
        </Stack>
      </Grid>
      <Grid item xs={6}>
        <Stack spacing={2} alignItems="center">
          <Typography variant="h4">Constraints</Typography>
        </Stack>
      </Grid>
      <Grid item xs={12} style={{ textAlign: "center" }}>
        <Button>Submit</Button>
      </Grid>
    </Grid>
  );
}

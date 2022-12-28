import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CardContent,
  Container,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useQueryClient } from "react-query";
import GoogleMapReact from "google-map-react";
import { IPlanTripResponse } from "../../api/plantrip";
import { Circle } from "@mui/icons-material";
import { Pin } from "../../components/Pin/Pin";
import HotelIcon from "@mui/icons-material/Hotel";
import { useRouter } from "next/router";
import { formatDecimalTime } from "../../pages/result/utils";

interface IProps {
  tripData: IPlanTripResponse | undefined;
}

export const ResultList: React.FC<IProps> = ({ tripData }: IProps) => {
  if (!tripData) {
    return null;
  }

  const renderDayTrips = () => {
    return (
      <List
        sx={{
          width: "100%",
          maxHeight: "600px",

          overflow: "auto",
          height: "100%",
          "& ul": { padding: 0 },
        }}
      >
        {tripData.day_drive_with_hotels.map((dayDrive, i) => {
          return (
            <ListItem key={`day-${i}`}>
              <Card variant="outlined" sx={{ width: "100%" }}>
                <CardContent>
                  <Typography variant="h6">{`Day ${i + 1}`}</Typography>
                  <Typography variant="body1">{`Drive ${formatDecimalTime(
                    dayDrive.day_drive.duration_in_hours
                  )}`}</Typography>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="subtitle1">Hotels</Typography>
                    </AccordionSummary>
                    {dayDrive.hotels.map((hotel, j) => {
                      return (
                        <AccordionDetails key={`day-${i}-hotel-${j}`}>
                          <Typography variant="body1">{hotel.name}</Typography>
                        </AccordionDetails>
                      );
                    })}
                  </Accordion>
                </CardContent>
              </Card>
            </ListItem>
          );
        })}
      </List>
    );
  };
  return (
    <Container maxWidth="sm">
      <Typography
        variant="h4"
        textAlign={"center"}
        marginBottom={2}
        marginTop={8}
      >
        Your trip, planned
      </Typography>
      {renderDayTrips()}
    </Container>
  );
};

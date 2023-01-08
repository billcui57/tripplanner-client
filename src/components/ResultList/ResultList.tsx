import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import React from "react";
import { IPlanTripResponse } from "../../service/plantrip";
import { formatSecondTime } from "../../utils";

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
          overflow: "auto",
          height: "100%",
          maxHeight: "500px",
          width: "100%",
          "& ul": { padding: 0 },
        }}
      >
        {tripData.day_drive_with_hotels.map((dayDrive, i) => {
          return (
            <ListItem key={`day-${i}`} sx={{ padding: 0 }}>
              <Card variant="outlined" sx={{ width: "100%" }}>
                <CardContent>
                  <Typography variant="h6" sx={{ color: "#2A9D8F" }}>{`Day ${
                    i + 1
                  }`}</Typography>
                  <Typography variant="body1">{`Drive ${formatSecondTime(
                    dayDrive.day_drive.duration_in_seconds
                  )}`}</Typography>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="subtitle1" sx={{ color: "#2A9D8F" }}>
                        Hotels
                      </Typography>
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
  return renderDayTrips();
};

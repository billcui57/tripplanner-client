import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
  Container,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { IPlanTripResponse } from "../../api/plantrip";
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
                  <Typography variant="h6" sx={{ color: "#2A9D8F" }}>{`Day ${
                    i + 1
                  }`}</Typography>
                  <Typography variant="body1">{`Drive ${formatDecimalTime(
                    dayDrive.day_drive.duration_in_hours
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
  return (
    <Container maxWidth="sm">
      <Typography
        variant="h4"
        textAlign={"center"}
        marginBottom={2}
        marginTop={8}
        sx={{ color: "#264653" }}
      >
        Your trip, planned
      </Typography>
      {renderDayTrips()}
    </Container>
  );
};

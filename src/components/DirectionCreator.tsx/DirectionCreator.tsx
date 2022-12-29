import EastIcon from "@mui/icons-material/East";
import HotelIcon from "@mui/icons-material/Hotel";
import PlaceIcon from "@mui/icons-material/Place";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { Avatar, Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import React from "react";
import { IPin } from "../../components/Pin/Pin";
import { getPinColour } from "../../pages/result/utils";

interface IProps {
  source: IPin | undefined;
  destination: IPin | undefined;
}

export const DirectionCreator: React.FC<IProps> = (props: IProps) => {
  const renderPoint = (point: IPin | undefined) => {
    if (point === undefined) {
      return (
        <Avatar>
          <QuestionMarkIcon />
        </Avatar>
      );
    } else if (point.type === "hotel") {
      return (
        <Avatar sx={{ bgcolor: getPinColour(point.type) }}>
          <HotelIcon />
        </Avatar>
      );
    } else if (point.type === "site") {
      return (
        <Avatar sx={{ bgcolor: getPinColour(point.type) }}>
          <PlaceIcon />
        </Avatar>
      );
    }
  };

  const handleGenerateRoute = () => {
    if (!props.source || !props.destination) {
      return;
    }

    window.open(
      `https://www.google.com/maps/dir/?api=1&origin=${props.source.geocode.latitude},${props.source.geocode.longitude}&destination=${props.destination.geocode.latitude},${props.destination.geocode.longitude}&travelmode=driving`
    );
  };

  return (
    <Paper sx={{ padding: 2 }}>
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent={"center"}
        spacing={1}
        paddingBottom={1}
      >
        {renderPoint(props.source)}
        <EastIcon />
        {renderPoint(props.destination)}
      </Stack>
      <Button
        onClick={handleGenerateRoute}
        disabled={!props.source || !props.destination}
        sx={{ color: "#2A9D8F" }}
      >
        Generate Route
      </Button>
    </Paper>
  );
};

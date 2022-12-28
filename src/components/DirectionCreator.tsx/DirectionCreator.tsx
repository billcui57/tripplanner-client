import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Button,
  Card,
  CardContent,
  Container,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useQueryClient } from "react-query";
import GoogleMapReact from "google-map-react";
import { IPlanTripResponse } from "../../api/plantrip";
import { Circle } from "@mui/icons-material";
import { IPin, Pin } from "../../components/Pin/Pin";
import HotelIcon from "@mui/icons-material/Hotel";
import { useRouter } from "next/router";
import { IGeoCode } from "../../types";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import PlaceIcon from "@mui/icons-material/Place";
import { getPinColour } from "../../pages/result/utils";
import EastIcon from "@mui/icons-material/East";

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

    // const serialize = (obj: any): string => {
    //   var str = [],
    //     p;
    //   for (p in obj) {
    //     if (obj.hasOwnProperty(p)) {
    //       var k = p,
    //         v = obj[p];
    //       str.push(
    //         v !== null && typeof v === "object"
    //           ? serialize(v)
    //           : encodeURIComponent(k) + "=" + encodeURIComponent(v)
    //       );
    //     }
    //   }
    //   return str.join("&");
    // };

    // const origin = serialize(props.source.geocode);
    // const dest = serialize(props.destination.geocode);
    // console.log(origin);
    window.open(
      `https://www.google.com/maps/dir/?api=1&origin=${props.source.geocode.latitude},${props.source.geocode.longitude}&destination=${props.destination.geocode.latitude},${props.destination.geocode.longitude}&travelmode=driving`
    );
  };

  return (
    <React.Fragment>
      <Stack direction="row" alignItems={"center"}>
        {renderPoint(props.source)}
        <EastIcon />
        {renderPoint(props.destination)}
      </Stack>
      <Button onClick={handleGenerateRoute}>Generate Route</Button>
    </React.Fragment>
  );
};

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
  ButtonGroup,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogTitle,
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
import { IGeoCode } from "../../types";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import PlaceIcon from "@mui/icons-material/Place";

export type IDirectionType = "source" | "destination";

interface IProps {
  open: boolean;
  onClose: (value: IDirectionType) => void;
}

export const DirectionTypeSelectModal: React.FC<IProps> = (props: IProps) => {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Set this as source or destination</DialogTitle>

      <Box textAlign={"center"} paddingBottom={4}>
        <ButtonGroup variant="contained">
          <Button
            onClick={() => {
              props.onClose("source");
            }}
          >
            Source
          </Button>
          <Button
            onClick={() => {
              props.onClose("destination");
            }}
          >
            Destination
          </Button>
        </ButtonGroup>
      </Box>
    </Dialog>
  );
};

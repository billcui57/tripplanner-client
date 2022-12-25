import PlaceIcon from "@mui/icons-material/Place";
import { Avatar, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Stack } from "@mui/system";
import * as React from "react";
import { green, pink } from "@mui/material/colors";

interface IProps {
  lat: number;
  lng: number;
  color?: "pink" | "green";
  onClick?: () => void;
  children?: any;
}

export const Pin: React.FC<IProps> = (props: IProps) => {
  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    } else {
      return;
    }
  };

  const getColour = () => {
    if (props.color === "pink") {
      return pink[500];
    } else if (props.color === "green") {
      return green[500];
    } else {
      return pink[500];
    }
  };

  return (
    <Box
      sx={{ transform: "translateX(-10px) translateY(-50%)" }}
      lat={props.latitude}
      lng={props.longitude}
      onClick={handleClick}
    >
      <Avatar sx={{ bgcolor: getColour(), width: 36, height: 36 }}>
        {props.children}
      </Avatar>
    </Box>
  );
};

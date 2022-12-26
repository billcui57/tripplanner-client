import PlaceIcon from "@mui/icons-material/Place";
import { Avatar, Popover, Tooltip, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Stack } from "@mui/system";
import * as React from "react";
import { blue, green, pink } from "@mui/material/colors";

interface IProps {
  lat: number;
  lng: number;
  color?: "pink" | "green" | "blue";
  onClick?: () => void; //cannot be set if popOverText is set
  hoverText?: string;
  children?: any;
}

export const Pin: React.FC<IProps> = (props: IProps) => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (props.onClick) {
      props.onClick();
    }
  };

  const getColour = () => {
    if (props.color === "pink") {
      return pink[500];
    } else if (props.color === "green") {
      return green[500];
    } else if (props.color === "blue") {
      return blue[500];
    } else {
      return pink[500];
    }
  };

  return (
    <Box
      sx={{ transform: "translateX(-24px) translateY(-50%)" }}
      // lat={props.latitude}
      // lng={props.longitude}
    >
      <Tooltip title={props.hoverText}>
        <Avatar
          sx={{ bgcolor: getColour(), width: 52, height: 52 }}
          onClick={handleClick}
        >
          {props.children}
        </Avatar>
      </Tooltip>
    </Box>
  );
};

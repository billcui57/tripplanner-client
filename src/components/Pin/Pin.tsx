import PlaceIcon from "@mui/icons-material/Place";
import { Avatar, Popover, Tooltip, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Stack } from "@mui/system";
import * as React from "react";
import { blue, green, pink } from "@mui/material/colors";
import { IGeoCode } from "../../types";
import { getPinColour } from "../../pages/result/utils";

export interface IPin {
  geocode: IGeoCode;
  type: "hotel" | "site" | "cluster" | "end-of-day" | "cur-site";
}

interface IProps extends IPin {
  onClick?: () => void; //cannot be set if popOverText is set
  hoverText?: string;
  children?: any;
  lat: number;
  lng: number;
}

export const Pin: React.FC<IProps> = (props: IProps) => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <Box sx={{ transform: "translateX(-24px) translateY(-50%)" }}>
      <Tooltip title={props.hoverText}>
        <Avatar
          sx={{ bgcolor: getPinColour(props.type), width: 52, height: 52 }}
          onClick={handleClick}
        >
          {props.children}
        </Avatar>
      </Tooltip>
    </Box>
  );
};

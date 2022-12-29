import { Avatar, Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import * as React from "react";
import { getPinColour } from "../../utils";
import { IGeoCode } from "../../types";

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

import { Circle } from "@mui/icons-material";
import Box from "@mui/material/Box";
import * as React from "react";

interface IProps {
  lat: number;
  lng: number;
  color:
    | "disabled"
    | "action"
    | "inherit"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
    | undefined;
  onClick?: () => void;
}

export const Pin: React.FC<IProps> = (props: IProps) => {
  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    } else {
      return;
    }
  };

  return (
    <Box
      sx={{ transform: "translateX(-10px) translateY(-50%)" }}
      lat={props.latitude}
      lng={props.longitude}
      onClick={handleClick}
    >
      <Circle color={props.color}></Circle>
    </Box>
  );
};

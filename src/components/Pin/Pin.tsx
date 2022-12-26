import PlaceIcon from "@mui/icons-material/Place";
import { Avatar, Popover, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Stack } from "@mui/system";
import * as React from "react";
import { green, pink } from "@mui/material/colors";

interface IProps {
  lat: number;
  lng: number;
  color?: "pink" | "green";
  onClick?: () => void; //cannot be set if popOverText is set
  popOverText?: string;
  children?: any;
}

export const Pin: React.FC<IProps> = (props: IProps) => {
  const [anchorEl, setAnchorEl] =
    React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (props.onClick) {
      props.onClick();
    } else if (props.popOverText) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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
      // lat={props.latitude}
      // lng={props.longitude}
    >
      <Avatar
        sx={{ bgcolor: getColour(), width: 36, height: 36 }}
        aria-describedby={id}
        onClick={handleClick}
      >
        {props.children}
      </Avatar>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2 }}>{props.popOverText}</Typography>
      </Popover>
    </Box>
  );
};

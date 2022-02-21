import { Box, useTheme } from "@mui/material";
import clsx from "clsx";
import React, { PropsWithChildren } from "react";
import "./letter-flip.css";

type FlippableProps = {
  startFlip?: boolean;
} & PropsWithChildren<any>;

export function Flippable({ children, startFlip }: FlippableProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{ width: "60px", height: "60px", margin: theme.spacing(0.5) }}
      className={clsx("flip-container", startFlip && "flip-this")}
    >
      <Box className="flipper">{children}</Box>
    </Box>
  );
}

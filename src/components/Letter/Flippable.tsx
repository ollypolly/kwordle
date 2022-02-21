import { Box } from "@mui/material";
import React, { PropsWithChildren } from "react";
import "./letter-flip.css";

export function Flippable({ children }: PropsWithChildren<any>) {
  return (
    <Box className="flip-container">
      <Box className="flipper">{children}</Box>
    </Box>
  );
}

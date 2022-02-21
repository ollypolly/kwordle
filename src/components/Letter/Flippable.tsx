import { Box } from "@mui/material";
import clsx from "clsx";
import React, { PropsWithChildren } from "react";
import "./letter-flip.css";

type FlippableProps = {
  startFlip?: boolean;
} & PropsWithChildren<any>;

export function Flippable({ children, startFlip }: FlippableProps) {
  return (
    <Box className={clsx("flip-container", startFlip && "flip-this")}>
      <Box className="flipper">{children}</Box>
    </Box>
  );
}

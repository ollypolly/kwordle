import { Box } from "@mui/material";
import clsx from "clsx";
import React, { PropsWithChildren } from "react";
import "./letter-flip.css";

type FlippableProps = {
  startFlip?: boolean;
};

export function Flippable({ children, startFlip }: PropsWithChildren<any>) {
  return (
    <Box className={clsx("flip-container", startFlip && "flip-this")}>
      <Box className="flipper">{children}</Box>
    </Box>
  );
}

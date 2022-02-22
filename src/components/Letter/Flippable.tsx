import { Box, useTheme } from "@mui/material";
import clsx from "clsx";
import React, { PropsWithChildren } from "react";
import "./letter-flip.css";

type FlippableProps = {
  startFlip?: boolean;
  isLogo?: boolean;
} & PropsWithChildren<any>;

export function Flippable({ children, startFlip, isLogo }: FlippableProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "60px",
        height: "60px",
        margin: theme.spacing(0.5),
        ...(isLogo && {
          width: "35px",
          height: "35px",
          margin: theme.spacing(0.3),
        }),
        [theme.breakpoints.down("sm")]: {
          ...(isLogo && {
            width: "25px",
            height: "25px",
            margin: theme.spacing(0.2),
          }),
        },
      }}
      className={clsx("flip-container", startFlip && "flip-this")}
    >
      <Box
        className="flipper"
        sx={{
          transformOrigin: "100% 30px",
          ...(isLogo && {
            transformOrigin: "100% 19px",
          }),
          [theme.breakpoints.down("sm")]: {
            ...(isLogo && {
              transformOrigin: "100% 13px",
            }),
          },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

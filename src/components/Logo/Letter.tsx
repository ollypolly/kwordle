import { Box, Typography, useTheme } from "@mui/material";
import React, { PropsWithChildren } from "react";

type LetterProps = {
  color: string;
} & PropsWithChildren<any>;

export function Letter({ color, children }: LetterProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        flexGrow: 0,
        margin: theme.spacing(0.5),
        width: "50px",
        height: "50px",
        backgroundColor: color,
        padding: theme.spacing(0.5),
        [theme.breakpoints.down("sm")]: {
          width: "40px",
          height: "40px",
        },
      }}
    >
      <Typography
        sx={{
          alignSelf: "center",
          fontWeight: 800,
          fontSize: "1.5rem",
          [theme.breakpoints.down("sm")]: {
            fontSize: "1.2rem",
          },
        }}
        variant="body1"
      >
        {children}
      </Typography>
    </Box>
  );
}

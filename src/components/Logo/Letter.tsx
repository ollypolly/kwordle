import { Box, Tooltip, Typography, useTheme } from "@mui/material";
import React, { PropsWithChildren } from "react";

type LetterProps = {
  backgroundColor?: string;
  borderColor?: string;
  tooltipTitle?: string;
} & PropsWithChildren<any>;

export function Letter({
  backgroundColor,
  borderColor,
  children,
  tooltipTitle = "",
}: LetterProps) {
  const theme = useTheme();

  return (
    <Tooltip title={tooltipTitle}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          flexGrow: 0,
          margin: theme.spacing(0.5),
          width: "50px",
          height: "50px",
          backgroundColor: backgroundColor,
          border: `2px ${borderColor} solid`,
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
    </Tooltip>
  );
}

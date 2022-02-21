import { Box, Tooltip, Typography, useTheme } from "@mui/material";
import React, { PropsWithChildren } from "react";

type LetterProps = {
  backgroundColor?: string;
  borderColor?: string;
  tooltipTitle?: string;
  isLogo?: boolean;
  color?: string;
  isText?: boolean;
} & PropsWithChildren<any>;

export function Letter({
  backgroundColor,
  borderColor,
  children,
  tooltipTitle = "",
  isLogo,
  color,
  isText,
}: LetterProps) {
  const theme = useTheme();

  return (
    <Tooltip title={tooltipTitle}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexGrow: 0,

          width: "60px",
          height: "60px",
          backgroundColor: backgroundColor,
          border: `2px ${borderColor} solid`,
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
      >
        {isText ? (
          <Typography
            sx={{
              alignSelf: "center",
              fontWeight: 800,
              color,
              ...(isLogo && {
                fontSize: "1rem",
              }),
            }}
            variant="body1"
          >
            {children}
          </Typography>
        ) : (
          <Box sx={{ borderRadius: "6px" }}>{children}</Box>
        )}
      </Box>
    </Tooltip>
  );
}

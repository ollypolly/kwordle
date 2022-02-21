import { Box, useTheme } from "@mui/material";
import React from "react";
import { Letter } from "./Letter";

export function Logo() {
  const theme = useTheme();
  const logoLetters = "KWORDLE".split("");

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      {logoLetters.map((letter, index) => (
        <Letter
          isLogo={true}
          key={index}
          backgroundColor={theme.palette.primary.main}
          color="#000"
        >
          {letter}
        </Letter>
      ))}
    </Box>
  );
}

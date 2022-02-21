import { Box, useTheme } from "@mui/material";
import React from "react";
import { Letter } from "../Letter/Letter";

export function Logo() {
  const theme = useTheme();
  const logoLetters = "KWORDLE".split("");

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      {logoLetters.map((letter, index) => (
        <Letter
          key={index}
          className="back"
          isLogo={true}
          backgroundColor={theme.palette.primary.main}
          color="#000"
          isText
        >
          {letter}
        </Letter>
      ))}
    </Box>
  );
}

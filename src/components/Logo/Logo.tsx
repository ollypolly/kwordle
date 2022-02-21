import { Box, useTheme } from "@mui/material";
import React from "react";
import { Flippable } from "../Letter/Flippable";
import { Letter } from "../Letter/Letter";

export function Logo() {
  const theme = useTheme();
  const logoLetters = "KWORDLE".split("");

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      {logoLetters.map((letter, index) => (
        <Flippable key={index}>
          <Letter
            className="back"
            isLogo={true}
            backgroundColor={theme.palette.primary.main}
            color="#000"
          >
            {letter}
          </Letter>
        </Flippable>
      ))}
    </Box>
  );
}

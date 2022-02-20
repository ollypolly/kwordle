import { Box } from "@mui/material";
import React from "react";
import { Letter } from "./Letter";

export function Logo() {
  const logoLetters = "KWORDLE".split("");

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      {logoLetters.map((letter, index) => (
        <Letter isLogo={true} key={index} backgroundColor="#e2aa1c">
          {letter}
        </Letter>
      ))}
    </Box>
  );
}

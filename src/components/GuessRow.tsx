import { Box } from "@mui/material";
import React from "react";
import { GuessMetrics } from "../model/games";
import { Guess } from "../model/guess";
import { Letter } from "./Logo/Letter";

export type GuessRowProps = {
  guess?: Guess;
};

export function GuessRow({ guess }: GuessRowProps) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      {Object.entries(GuessMetrics).map(([key, value], index) => (
        <Letter
          tooltipTitle={value}
          key={index}
          backgroundColor={guess && "#424242"}
          borderColor={guess ? "#424242" : "#a5a5a5"}
        >
          {}
        </Letter>
      ))}
    </Box>
  );
}

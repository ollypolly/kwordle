import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import gameData from "../data/kwalee-data";
import { GameAttributes, GuessMetrics } from "../model/games";
import { Guess, NumberGuess } from "../model/guess";
import { Letter } from "./Logo/Letter";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export type GuessRowProps = {
  index: number;
  guess?: Guess;
};

export function GuessRow({ guess, index }: GuessRowProps) {
  const theme = useTheme();

  return (
    <>
      {index === 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <Typography
            variant="subtitle1"
            sx={{ width: "140px", textAlign: "center", fontSize: "0.7rem" }}
          >
            Name
          </Typography> */}

          {Object.entries(GuessMetrics).map(([key, value], index) => (
            <Box
              key={key}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                flexGrow: 0,
                margin: theme.spacing(0.5),
                width: "60px",
                height: "60px",
                padding: theme.spacing(0.5),
              }}
            >
              <Typography
                sx={{
                  width: "140px",
                  textAlign: "center",
                  fontSize: "0.7rem",
                }}
                variant="subtitle1"
              >
                {value}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        {/* <Typography
          variant="body1"
          sx={{ width: "140px", textAlign: "center", fontSize: "0.9rem" }}
        >
          {guess?.name}
        </Typography> */}

        {Object.entries(GuessMetrics).map(([key, value], index) => {
          const guessKey = key as keyof GameAttributes;
          let guessValue =
            guess && gameData[guess.name] && gameData[guess.name][guessKey];

          if (guessValue === true) {
            guessValue = "Both your guess, and the correct answer align";
          } else if (guessValue === false) {
            guessValue = "The correct answer does not align with your answer";
          }

          const guessCorrectness = guess && guess[guessKey];

          let color = "#424242";
          let Icon;

          if (
            guessCorrectness === true ||
            guessCorrectness === NumberGuess.EQUAL
          ) {
            color = "#418154";
          } else if (guessCorrectness === false) {
            color = "#883434";
          }

          if (guessCorrectness === NumberGuess.HIGHER) {
            Icon = KeyboardArrowUpIcon;
          } else if (guessCorrectness === NumberGuess.LOWER) {
            Icon = KeyboardArrowDownIcon;
          }

          if (Icon) {
            color = "#3859a0";
          }

          return (
            <Letter
              tooltipTitle={guessValue}
              key={index}
              backgroundColor={guess && color}
              borderColor={!guess && "#a5a5a5"}
            >
              {Icon && (
                <Icon
                  sx={{ fontSize: "2.5rem", marginTop: theme.spacing(1) }}
                />
              )}
            </Letter>
          );
        })}
      </Box>
    </>
  );
}

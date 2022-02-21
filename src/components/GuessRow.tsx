import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import gameData from "../data/kwalee-data";
import { GuessMetrics } from "../model/games";
import { Differences, Guess, NumberGuess } from "../model/guess";
import { Letter } from "./Letter/Letter";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Flippable } from "./Letter/Flippable";
import moment from "moment";

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
          {Object.entries(GuessMetrics).map(([key, value], index) => (
            <Box
              key={key}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
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
        {Object.entries(GuessMetrics).map(([key, value], index) => {
          const guessKey = key as keyof Differences;
          let guessValue =
            guess && gameData[guess.name] && gameData[guess.name][guessKey];

          let tooltipVal = guessValue;
          const guessCorrectness = guess && guess[guessKey];

          if (guessCorrectness === true) {
            tooltipVal = "Your guess aligns with the correct answer";
          } else if (guessCorrectness === false) {
            tooltipVal = "The correct answer does not align with your answer";
          }

          if (key === "release_date") {
            if (tooltipVal) {
              tooltipVal = moment(tooltipVal?.toString()).format("MMM Do YYYY");
            }
          } else if (key === "file_size") {
            tooltipVal = `${tooltipVal} MB`;
          }

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
          } else if (key === "name") {
            Icon = () => (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  transform: "rotateX(180deg)",
                }}
              >
                <img
                  src={
                    guess && gameData[guess.name] && gameData[guess.name].icon
                  }
                  alt="App Icon"
                  width="100%"
                  height="100%"
                />
              </Box>
            );
          }

          if (Icon) {
            color = "#3859a0";
          }

          return (
            <Flippable key={index} startFlip={!!guess}>
              <Box sx={{ width: "60px", height: "60px" }} className="back">
                <Letter
                  tooltipTitle={tooltipVal}
                  backgroundColor={guess && color}
                  borderColor={!guess && "#a5a5a5"}
                  isText={key !== "name"}
                >
                  {Icon && (
                    <Icon
                      sx={{
                        transform: "rotateX(180deg)",
                        fontSize: "2.5rem",
                      }}
                    />
                  )}
                </Letter>
              </Box>
              <Box sx={{ width: "60px", height: "60px" }} className="front">
                <Letter tooltipTitle={tooltipVal} borderColor={"#a5a5a5"} />
              </Box>
            </Flippable>
          );
        })}
      </Box>
    </>
  );
}

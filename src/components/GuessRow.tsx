import { Box, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import gameData from "../data/play-store-data";
import { GameAttributes, GuessMetrics } from "../model/games";
import { Guess, NumberGuess } from "../model/guess";
import { Letter } from "./Letter/Letter";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Flippable } from "./Letter/Flippable";
import kwaleeHandIcon from "../img/Kwalee-Hand-White-Logo.png";

export type GuessRowProps = {
  index: number;
  guess?: Guess;
  gameToGuess?: GameAttributes;
};

export function GuessRow({ guess, index, gameToGuess }: GuessRowProps) {
  const theme = useTheme();

  const [flipIndex, setFlipIndex] = useState<number | undefined>();

  useEffect(() => {
    const flipGuess = async () => {
      for (const i of Array.from(Array(6).keys())) {
        await setTimeout(() => setFlipIndex(i), i * 200);
      }
    };

    if (guess) {
      flipGuess();
    }
  }, [guess]);

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
        {Object.entries(GuessMetrics).map(([key, value], guessIndex) => {
          const guessKey = key as keyof GameAttributes;
          let guessValue =
            guess && gameData[guess.name] && gameData[guess.name][guessKey];

          let tooltipVal = guessValue;
          //@ts-ignore
          const guessCorrectness = guess && guess[guessKey];

          if (guessCorrectness === true) {
            if (guess?.name.includes("3D")) {
              tooltipVal = "Answer and guess include 3D in the name";
            } else {
              tooltipVal = "Answer and guess don't include 3D in the name";
            }
          } else if (guessCorrectness === false) {
            if (gameToGuess?.name.includes("3D")) {
              tooltipVal = "Answer includes 3D in the name";
            } else {
              tooltipVal = "Answer doesn't include 3D in the name";
            }
          }
          if (tooltipVal) {
            if (key === "downloads" || key === "review_score") {
              let prefix =
                guessCorrectness === NumberGuess.EQUAL
                  ? "Equal to"
                  : guessCorrectness === NumberGuess.HIGHER
                  ? "More than"
                  : "Less than";
              tooltipVal = `${prefix} ${tooltipVal
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
            }

            if (key === "release_date") {
              let prefix =
                guessCorrectness === NumberGuess.EQUAL
                  ? "Released on"
                  : guessCorrectness === NumberGuess.HIGHER
                  ? "Released after"
                  : "Released before";

              tooltipVal = `${prefix} ${tooltipVal}`;
            }
          }

          if (key === "alphabetical") {
            let prefix =
              guessCorrectness === NumberGuess.EQUAL
                ? "Equal in the alphabet to"
                : guessCorrectness === NumberGuess.HIGHER
                ? "Higher in the alphabet than"
                : "Lower in the alphabet than";

            tooltipVal = `${prefix} ${guess?.name.charAt(0)}`;
          }

          let color = "#424242";
          let Icon;

          if (
            guessCorrectness === true ||
            guessCorrectness === NumberGuess.EQUAL
          ) {
            color = "#41a05e";
          } else if (guessCorrectness === false) {
            color = "#9e3232";
          }

          if (guessCorrectness === NumberGuess.HIGHER) {
            Icon = KeyboardArrowUpIcon;
          } else if (guessCorrectness === NumberGuess.LOWER) {
            Icon = KeyboardArrowDownIcon;
          } else if (key === "name") {
            const iconUrl =
              guess && gameData[guess.name] && gameData[guess.name].icon;

            Icon = () => (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  transform: "rotateX(180deg)",
                }}
              >
                {iconUrl ? (
                  <img
                    src={iconUrl}
                    alt="App Icon"
                    width="100%"
                    height="100%"
                  />
                ) : (
                  <img
                    src={kwaleeHandIcon}
                    height={60}
                    alt="Kwalee Hand Logo"
                  />
                )}
              </Box>
            );
          }

          if (Icon) {
            color = "#2d55ac";
          }

          if (key === "name") {
            color = "#4b4b4b73";
          }

          return (
            <Flippable
              key={guessIndex}
              startFlip={flipIndex !== undefined && flipIndex >= guessIndex}
            >
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
                <Letter tooltipTitle={tooltipVal} borderColor={"#a5a5a55e"} />
              </Box>
            </Flippable>
          );
        })}
      </Box>
    </>
  );
}

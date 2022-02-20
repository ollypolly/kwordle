import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import gameData from "../data/kwalee-data";
import { GuessMetrics } from "../model/games";
import { Guess } from "../model/guess";
import { Letter } from "./Logo/Letter";

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
          <Typography
            variant="body1"
            sx={{ width: "140px", textAlign: "center" }}
          >
            Name
          </Typography>

          {Object.entries(GuessMetrics).map(([key, value], index) => (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                flexGrow: 0,
                margin: theme.spacing(0.5),
                width: "50px",
                height: "50px",
                padding: theme.spacing(0.5),
                [theme.breakpoints.down("sm")]: {
                  width: "40px",
                  height: "40px",
                },
              }}
            >
              <Typography>{value}</Typography>
            </Box>
          ))}
        </Box>
      )}
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Typography
          variant="body1"
          sx={{ width: "140px", textAlign: "center" }}
        >
          {guess?.name}
        </Typography>

        {Object.entries(GuessMetrics).map(([key, value], index) => (
          <Letter
            //@ts-ignore
            tooltipTitle={
              //@ts-ignore
              guess && gameData[guess.name] && gameData[guess.name][key]
            }
            key={index}
            backgroundColor={guess && "#424242"}
            borderColor={guess ? "#424242" : "#a5a5a5"}
          >
            {guess && guess[key as keyof Guess].toString()}
          </Letter>
        ))}
      </Box>
    </>
  );
}

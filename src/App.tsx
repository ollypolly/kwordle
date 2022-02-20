import React, { useState } from "react";
import "./App.css";
import { Autocomplete, Box, Button, TextField, useTheme } from "@mui/material";
import { DarkModeSwitch } from "./components/DarkModeSwitch";
import { Logo } from "./components/Logo/Logo";
import gameData from "./data/kwalee-data";
import { Guess } from "./model/guess";
import { GameID } from "./model/games";
import { useImmer } from "use-immer";
import { GuessRow } from "./components/GuessRow";

const GUESS_LIMIT = 8;

function App() {
  const theme = useTheme();

  const [guesses, setGuesses] = useImmer<Guess[]>([]);
  const [selectedGame, setSelectedGame] = useState<GameID | null>(null);

  // Select game of the day to guess
  const gameToGuess = gameData["Draw it"];

  const selectOptions = Object.keys(gameData);

  console.log(guesses);

  const addGuess = () => {
    if (guesses.length >= GUESS_LIMIT) {
      return;
    }

    if (selectedGame !== null) {
      setGuesses((draft) => {
        draft.push({ name: selectedGame, created_on: Date.now() });
      });
    }

    setSelectedGame(null);
  };

  return (
    <Box sx={{ maxWidth: "1100px", margin: "auto" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: theme.spacing(2),
          marginBottom: theme.spacing(2),
          borderBottom: `2px ${theme.palette.background.paper} solid`,
        }}
      >
        <Logo />
        <DarkModeSwitch />
      </Box>

      {Array.from(Array(GUESS_LIMIT).keys()).map((index) => (
        <GuessRow guess={guesses[index]} key={index} />
      ))}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: theme.spacing(1),
          margin: theme.spacing(1),
        }}
      >
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          value={selectedGame}
          options={selectOptions}
          onChange={(event, newValue) => setSelectedGame(newValue)}
          sx={{ width: 300, marginRight: theme.spacing(1) }}
          renderInput={(params) => <TextField {...params} label="Game" />}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              addGuess();
            }
          }}
        />
        <Button variant="contained" onClick={() => addGuess()}>
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default App;

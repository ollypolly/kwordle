import React, { useState } from "react";
import "./App.css";
import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { DarkModeSwitch } from "./components/DarkModeSwitch";
import { Logo } from "./components/Logo/Logo";
import gameData from "./data/kwalee-data";
import { Differences, Guess, NumberGuess } from "./model/guess";
import { GameID, GuessMetrics } from "./model/games";
import { useImmer } from "use-immer";
import { GuessRow } from "./components/GuessRow";
import IosShareIcon from "@mui/icons-material/IosShare";

const GUESS_LIMIT = 8;

function App() {
  const theme = useTheme();

  const [guesses, setGuesses] = useImmer<Guess[]>([]);
  const [selectedGame, setSelectedGame] = useState<GameID | null>(null);

  // Select game of the day to guess
  const gameNameToGuess = "Draw it";
  const gameToGuess = gameData[gameNameToGuess];

  const selectOptions = Object.keys(gameData);

  console.log(guesses);

  const addGuess = () => {
    if (guesses.length >= GUESS_LIMIT) {
      return;
    }

    if (selectedGame !== null) {
      const {
        file_size,
        is_publishing,
        contains_3d_in_name,
        release_date,
        review_score,
      } = gameData[selectedGame];

      const {
        file_size: guessFileSize,
        is_publishing: guessIsPub,
        contains_3d_in_name: guessIs3D,
        release_date: guessReleaseDate,
        review_score: guessReview,
      } = gameToGuess;

      const numberGuess = (guess: string | number, target: string | number) => {
        if (guess > target) {
          return NumberGuess.HIGHER;
        } else if (guess < target) {
          return NumberGuess.LOWER;
        }
        return NumberGuess.EQUAL;
      };

      // Calculate differences
      const differences: Differences = {
        file_size: numberGuess(file_size, guessFileSize),
        is_publishing: is_publishing === guessIsPub,
        contains_3d_in_name: contains_3d_in_name === guessIs3D,
        release_date: numberGuess(release_date, guessReleaseDate),
        review_score: numberGuess(review_score, guessReview),
      };

      setGuesses((draft) => {
        draft.push({
          name: selectedGame,
          created_on: Date.now(),
          ...differences,
        });
      });
    }

    setSelectedGame(null);
  };

  return (
    <Box component="main" sx={{ maxWidth: "1100px", margin: "auto" }}>
      <Box
        component="header"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: theme.spacing(2),
          marginBottom: theme.spacing(2),
          borderBottom: `2px ${theme.palette.background.paper} solid`,
        }}
      >
        <DarkModeSwitch />
        <Logo />
        <Tooltip title="Share your answer">
          <IconButton>
            <IosShareIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Box component="section">
        {Array.from(Array(GUESS_LIMIT).keys()).map((index) => (
          <GuessRow index={index} guess={guesses[index]} key={index} />
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
    </Box>
  );
}

export default App;

import React, { useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  Link,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { DarkModeSwitch } from "./components/DarkModeSwitch";
import { Logo } from "./components/Logo/Logo";
import gameData from "./data/play-store-data";
import { Differences, Guess, NumberGuess } from "./model/guess";
import { GameID } from "./model/games";
import { useImmer } from "use-immer";
import { GuessRow } from "./components/GuessRow";
import IosShareIcon from "@mui/icons-material/IosShare";

const GUESS_LIMIT = 6;

function App() {
  const theme = useTheme();

  const [guesses, setGuesses] = useImmer<Guess[]>([]);
  const [selectedGame, setSelectedGame] = useState<GameID | null>(null);

  // Select game of the day to guess
  const gameNameToGuess = "Jetpack Jump";
  const gameToGuess = gameData[gameNameToGuess];

  const selectOptions = Object.keys(gameData).sort((a, b) =>
    a.localeCompare(b)
  );

  const addGuess = () => {
    if (guesses.length >= GUESS_LIMIT) {
      return;
    }

    if (selectedGame !== null) {
      const { downloads, contains_3d_in_name, release_date, review_score } =
        gameData[selectedGame];

      const {
        downloads: guessDownloadsSize,
        contains_3d_in_name: guessIs3D,
        release_date: guessReleaseDate,
        review_score: guessReview,
      } = gameToGuess;

      const numberGuess = (guess: string | number, target: string | number) => {
        if (typeof guess === "string" && typeof target === "string") {
          if (guess.localeCompare(target) < 0) {
            return NumberGuess.HIGHER;
          } else if (guess.localeCompare(target) > 0) {
            return NumberGuess.LOWER;
          }
        } else {
          if (guess < target) {
            return NumberGuess.HIGHER;
          } else if (guess > target) {
            return NumberGuess.LOWER;
          }
        }

        return NumberGuess.EQUAL;
      };

      // Calculate differences
      const differences: Differences = {
        downloads: numberGuess(downloads, guessDownloadsSize),
        alphabetical: numberGuess(
          gameNameToGuess.charAt(0),
          selectedGame.charAt(0)
        ),
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
    <Box component="main">
      <Box
        component="header"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: theme.spacing(1),
          marginBottom: theme.spacing(2),
          borderBottom: `2px ${theme.palette.background.paper} solid`,
        }}
      >
        <Box sx={{ width: "100px", display: "flex", justifyContent: "center" }}>
          <DarkModeSwitch />
        </Box>
        <Logo />
        <Box sx={{ width: "100px", display: "flex", justifyContent: "center" }}>
          <Tooltip title="Share your answer">
            <IconButton sx={{ alignSelf: "center" }}>
              <IosShareIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Box
        component="section"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          height: "calc(100vh - 100px)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
            justifyContent: "center",
          }}
        >
          <Box>
            {Array.from(Array(GUESS_LIMIT).keys()).map((index) => (
              <GuessRow
                gameToGuess={gameToGuess}
                index={index}
                guess={guesses[index]}
                key={index}
              />
            ))}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                margin: theme.spacing(2),
              }}
            >
              <Typography variant="subtitle2">
                Need a hint? Check out{" "}
                <Link
                  target="_blank"
                  href="https://play.google.com/store/apps/collection/cluster?clp=igM4ChkKEzUwOTU0OTAzODk2ODY1MjkyMTkQCBgDEhkKEzUwOTU0OTAzODk2ODY1MjkyMTkQCBgDGAA%3D:S:ANO1ljIziXY&gsr=CjuKAzgKGQoTNTA5NTQ5MDM4OTY4NjUyOTIxORAIGAMSGQoTNTA5NTQ5MDM4OTY4NjUyOTIxORAIGAMYAA%3D%3D:S:ANO1ljJbroU&hl=en_GB&gl=US"
                >
                  Kwalee
                </Link>{" "}
                on the Google Play Store
              </Typography>
            </Box>
          </Box>
        </Box>

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

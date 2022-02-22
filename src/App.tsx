import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  Link,
  Stack,
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
import moment from "moment";
import { useSnackbar } from "notistack";
import { Confetti } from "./components/Confetti";

const GUESS_LIMIT = 6;

function App() {
  const theme = useTheme();

  const { enqueueSnackbar } = useSnackbar();

  const [guesses, setGuesses] = useImmer<Guess[]>([]);
  const [selectedGame, setSelectedGame] = useState<GameID | null>(null);

  const selectOptions = Object.keys(gameData).sort((a, b) =>
    a.localeCompare(b)
  );

  const dayOfYear = (date: Date) =>
    Math.floor(
      (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) /
        1000 /
        60 /
        60 /
        24
    );

  // Select game of the day
  var output = [];
  for (var day = 1; day < 365; day++) {
    output.push(selectOptions[day % selectOptions.length]);
  }
  const dayNumber = dayOfYear(new Date());

  // Select game of the day to guess
  const dailyGame = output[dayNumber];
  const [gameNameToGuess, setGameNameToGuess] = useState(dailyGame);

  console.log(`Answer: ${gameNameToGuess}`);
  const gameToGuess = gameData[gameNameToGuess];

  const tryAgain = () => {
    // Clear guesses
    setGuesses([]);

    enqueueSnackbar("You'll get it this time!");
  };

  const pickRandom = () => {
    const random = Math.floor(Math.random() * selectOptions.length);

    // Set random game
    setGameNameToGuess(selectOptions[random]);

    // Clear guesses
    setGuesses([]);

    enqueueSnackbar("Can you guess the Kwalee game?");
  };

  // End conditions
  const gameWon = guesses.map((guess) => guess.name).includes(gameNameToGuess);

  const gameLost = guesses.length >= GUESS_LIMIT;

  const gameFinished = gameWon || gameLost;

  useEffect(() => {
    if (gameFinished) {
      if (gameWon) {
        enqueueSnackbar("Congratulations, you know Kwalee!");
      } else if (gameLost) {
        enqueueSnackbar("Out of guesses, guess you havn't played our games...");
      }
    }
  }, [enqueueSnackbar, gameFinished, gameLost, gameWon]);

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
        release_date: numberGuess(
          moment(release_date, "MMM DD, YYYY").unix(),
          moment(guessReleaseDate, "MMM DD, YYYY").unix()
        ),
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
      <Confetti showConfetti={gameWon} />
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
            <Box sx={{ margin: theme.spacing(2), textAlign: "center" }}>
              <Typography variant="subtitle2">
                Game Mode: {gameNameToGuess === dailyGame ? "Daily" : "Random"}
              </Typography>
            </Box>
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
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
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
            disabled={gameFinished}
            onChange={(event, newValue) => setSelectedGame(newValue)}
            sx={{ width: 300, marginRight: theme.spacing(1) }}
            renderInput={(params) => <TextField {...params} label="Game" />}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                addGuess();
              }
            }}
          />
          <Button
            disabled={gameFinished}
            variant="contained"
            onClick={() => addGuess()}
          >
            Submit
          </Button>
        </Box>
        <Stack
          direction="row"
          spacing={2}
          sx={{ margin: theme.spacing(2), alignSelf: "center" }}
        >
          {gameLost && (
            <Button
              onClick={() => tryAgain()}
              color="primary"
              size="small"
              variant="outlined"
            >
              Try Again
            </Button>
          )}
          <Button
            onClick={() => pickRandom()}
            color="secondary"
            size="small"
            variant="outlined"
          >
            New Game
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

export default App;

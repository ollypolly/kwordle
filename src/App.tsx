import React from "react";
import "./App.css";
import { Autocomplete, Box, Button, TextField, useTheme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { selectColorMode, setColorMode } from "./features/general/generalSlice";
import { ColorMode } from "./model/colorMode";
import { DarkModeSwitch } from "./components/DarkModeSwitch";
import { Logo } from "./components/Logo/Logo";
import gameData from "./data/kwalee-data.json";

function App() {
  const dispatch = useAppDispatch();
  const colorMode = useAppSelector(selectColorMode);
  const theme = useTheme();

  const isDark = colorMode === ColorMode.DARK;

  const themeToSet = isDark ? ColorMode.LIGHT : ColorMode.DARK;

  return (
    <Box sx={{ maxWidth: "1100px", margin: "auto" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          padding: theme.spacing(1),
          margin: theme.spacing(1),
        }}
      >
        <DarkModeSwitch
          checked={isDark}
          onChange={() => dispatch(setColorMode(themeToSet))}
        />
      </Box>

      <Logo />

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
          options={Object.keys(gameData)}
          sx={{ width: 300, marginRight: theme.spacing(1) }}
          renderInput={(params) => <TextField {...params} label="Game" />}
        />
        <Button variant="contained">Submit</Button>
      </Box>
    </Box>
  );
}

export default App;

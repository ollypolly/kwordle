import React from "react";
import "./App.css";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { selectColorMode, setColorMode } from "./features/general/generalSlice";
import { ColorMode } from "./model/colorMode";
import { DarkModeSwitch } from "./components/DarkModeSwitch";
import { Logo } from "./components/Logo/Logo";

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
        <Button variant="contained">Submit</Button>
      </Box>
    </Box>
  );
}

export default App;

import React from "react";
import "./App.css";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { selectColorMode, setColorMode } from "./features/general/generalSlice";
import { ColorMode } from "./model/colorMode";
import { DarkModeSwitch } from "./components/DarkModeSwitch";

function App() {
  const dispatch = useAppDispatch();
  const colorMode = useAppSelector(selectColorMode);

  const isDark = colorMode === ColorMode.DARK;

  const themeToSet = isDark ? ColorMode.LIGHT : ColorMode.DARK;

  return (
    <Box className="App">
      <DarkModeSwitch
        checked={isDark}
        onChange={() => dispatch(setColorMode(themeToSet))}
      />
    </Box>
  );
}

export default App;

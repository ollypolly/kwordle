import React from "react";
import "./App.css";
import { Box, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { selectColorMode, setColorMode } from "./features/general/generalSlice";
import { ColorMode } from "./model/colorMode";

function App() {
  const dispatch = useAppDispatch();
  const colorMode = useAppSelector(selectColorMode);

  const themeToSet =
    colorMode === ColorMode.DARK ? ColorMode.LIGHT : ColorMode.DARK;

  return (
    <Box className="App">
      <Button onClick={() => dispatch(setColorMode(themeToSet))}>Dark</Button>
    </Box>
  );
}

export default App;

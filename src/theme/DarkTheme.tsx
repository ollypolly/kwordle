import { CssBaseline, ThemeProvider } from "@mui/material";
import React, { PropsWithChildren } from "react";
import { useAppSelector } from "../app/hooks";
import { selectColorMode } from "../features/general/generalSlice";
import { ColorMode } from "../model/colorMode";
import { darkTheme, lightTheme } from "./theme";

export function DarkTheme({ children }: PropsWithChildren<any>) {
  const colorMode = useAppSelector(selectColorMode);

  const theme = colorMode === ColorMode.DARK ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#1c2035",
      paper: "#2d3956",
    },
    text: {
      primary: "rgba(255,255,255,0.87)",
      secondary: "rgba(220,220,220,0.54)",
      disabled: "rgba(133,133,133,0.38)",
    },
  },
  typography: {
    h1: {
      fontSize: "1rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: "0.9rem",
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: "0.8rem",
      fontWeight: 300,
    },
  },
});

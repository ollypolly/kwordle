import { createTheme } from "@mui/material/styles";

const typography = {
  h1: {
    fontSize: "1.5rem",
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
};

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#fff",
      paper: "#fff",
    },
    text: {
      primary: "rgba(0,0,0,0.87)",
    },
  },
  typography,
});

export const darkTheme = createTheme({
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
    },
  },
  typography,
});

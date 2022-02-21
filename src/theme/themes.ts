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
      main: "#ffcb05",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#fff",
      paper: "#cacaca",
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
      main: "#ffcb05",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#131313",
      paper: "#433f2f",
    },
    text: {
      primary: "rgba(255,255,255,0.87)",
    },
  },
  typography,
});

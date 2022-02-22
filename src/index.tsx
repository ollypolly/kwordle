import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { Theme } from "./theme/Theme";
import { SnackbarProvider } from "notistack";
import { Box } from "@mui/material";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Box
        sx={{
          ".SnackbarContainer-top": { marginTop: "4rem" },
          ".SnackbarContent-root": { justifyContent: "center" },
        }}
      >
        <SnackbarProvider
          anchorOrigin={{ horizontal: "center", vertical: "top" }}
          maxSnack={3}
        >
          <Theme>
            <App />
          </Theme>
        </SnackbarProvider>
      </Box>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

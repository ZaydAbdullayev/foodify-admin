import React, { Fragment } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./router";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { SnackbarProvider } from "notistack";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Fragment>
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </SnackbarProvider>
    </Provider>
  </Fragment>
);

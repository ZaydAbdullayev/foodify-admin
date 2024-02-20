import React, { Fragment } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./router";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { SnackbarProvider } from "notistack";
import { ConfigProvider } from "antd";
import { themeConfig } from "./ant.theme-config";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Fragment>
    <Provider store={store}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        autoHideDuration={2000}
      >
        <ConfigProvider theme={themeConfig}>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </ConfigProvider>
      </SnackbarProvider>
    </Provider>
  </Fragment>
);

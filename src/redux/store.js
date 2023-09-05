import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reAuth } from "./auth";
import { reModal } from "./modal";
import { reShrink } from "./shrink";
import { reUpload } from "./upload";

export const store = configureStore({
  reducer: combineReducers({
    shrink: reShrink,
    auth: reAuth,
    modal: reModal,
    upload: reUpload,
  }),
  devTools: process.env.NODE_ENV !== "production",
});

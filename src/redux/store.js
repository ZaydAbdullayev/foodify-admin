import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { reAuth } from "./auth";
import { reModal } from "./modal";
import { reShrink } from "./shrink";
import { reUpload } from "./upload";
import { universalAPi } from "../service/product.service";

export const store = configureStore({
  reducer: combineReducers({
    shrink: reShrink,
    auth: reAuth,
    modal: reModal,
    upload: reUpload,
    [universalAPi.reducerPath]: universalAPi.reducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(universalAPi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

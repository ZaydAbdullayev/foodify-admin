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
import { userApi } from "../service/user.service";

export const store = configureStore({
  reducer: combineReducers({
    shrink: reShrink,
    auth: reAuth,
    modal: reModal,
    upload: reUpload,
    [universalAPi.reducerPath]: universalAPi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(universalAPi.middleware, userApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

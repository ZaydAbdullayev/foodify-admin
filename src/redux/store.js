import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { reAuth } from "./auth";
import { reModal } from "./modal";
import { reShrink } from "./shrink";
import { reUpload } from "./upload";
import { reSearch } from "./search";
import { universalAPi } from "../service/product.service";
import { userApi } from "../service/user.service";
import { workerService } from "../service/workers.service";

export const store = configureStore({
  reducer: combineReducers({
    shrink: reShrink,
    auth: reAuth,
    modal: reModal,
    upload: reUpload,
    search: reSearch,
    [universalAPi.reducerPath]: universalAPi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [workerService.reducerPath]: workerService.reducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      universalAPi.middleware,
      userApi.middleware,
      workerService.middleware
    ),
  devTools: process.env.NODE_ENV !== "production",
});

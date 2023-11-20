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
import { rePermission } from "./permission";
import { reUModal } from "./u-modal";
import { reActive } from "./active";
import { storeApi } from "../service/store.service";

export const store = configureStore({
  reducer: combineReducers({
    shrink: reShrink,
    auth: reAuth,
    modal: reModal,
    upload: reUpload,
    search: reSearch,
    permission: rePermission,
    uModal: reUModal,
    active: reActive,
    [universalAPi.reducerPath]: universalAPi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [workerService.reducerPath]: workerService.reducer,
    [storeApi.reducerPath]: storeApi.reducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      universalAPi.middleware,
      userApi.middleware,
      workerService.middleware,
      storeApi.middleware
    ),
  devTools: process.env.NODE_ENV !== "production",
});

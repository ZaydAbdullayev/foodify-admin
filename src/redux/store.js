import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { reAuth } from "./auth";
import { reModal } from "./modal";
import { reShrink } from "./shrink";
import { reUpload } from "./upload";
import { reGetNewData, reSearch } from "./search";
import { rePermission } from "./permission";
import { reUModal, reUModalU } from "./u-modal";
import { reActive } from "./active";
import { reCalc } from "./calc";
import { reModalType } from "./u-modal";
import { apiSlice } from "../service/frame.service";
import { reActiveThing } from "./active";
import { reNavStatus } from "./navbar.status";

export const store = configureStore({
  reducer: combineReducers({
    shrink: reShrink,
    auth: reAuth,
    modal: reModal,
    upload: reUpload,
    search: reSearch,
    permission: rePermission,
    uModal: reUModal,
    uModalU: reUModalU,
    active: reActive,
    calc: reCalc,
    modalType: reModalType,
    activeThing: reActiveThing,
    uSearch: reGetNewData,
    status: reNavStatus,
    [apiSlice.reducerPath]: apiSlice.reducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

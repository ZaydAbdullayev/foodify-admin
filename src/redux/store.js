import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reAuth } from "./auth";
import { reModal } from "./modal";
import { reShrink } from "./shrink";
import { reUpload } from "./upload";
import { reGetNewData, reSearch } from "./search";
import { rePermission, resId } from "./permission";
import { reGetUrl, reUModal } from "./u-modal";
import { reActive, reStorageId } from "./active";
import { reCalc } from "./calc";
import { reModalType } from "./u-modal";
import { reActiveThing } from "./active";
import { reNavStatus } from "./navbar.status";
import { reDeviceWidth, reMedia } from "./media";
import { reNothification } from "./nothification";
import { resolve } from "./resolve";
import { rootDocuments } from "./deleteFoods";
import api from "../service/fetch.service";

export const store = configureStore({
  reducer: combineReducers({
    shrink: reShrink,
    auth: reAuth,
    modal: reModal,
    upload: reUpload,
    search: reSearch,
    permission: rePermission,
    uModal: reUModal,
    side: reActive,
    calc: reCalc,
    modalType: reModalType,
    activeThing: reActiveThing,
    uSearch: reGetNewData,
    status: reNavStatus,
    media: reMedia,
    image: reGetUrl,
    dWidth: reDeviceWidth,
    res_id: resId,
    nothificate: reNothification,
    resolve: resolve,
    storageId: reStorageId,
    delRouter: rootDocuments,
    [api.reducerPath]: api.reducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

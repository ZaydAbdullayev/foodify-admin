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
import { reUModal, reUModalU } from "./u-modal";
import { reActive } from "./active";
import { storeApi } from "../service/store.service";
import { departmentApi } from "../service/dep.service";
import { categoryApi } from "../service/category.service";
import { groupsApi } from "../service/groups.service";
import { ingredientApi } from "../service/ingredient.service";

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
    [universalAPi.reducerPath]: universalAPi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [workerService.reducerPath]: workerService.reducer,
    [storeApi.reducerPath]: storeApi.reducer,
    [departmentApi.reducerPath]: departmentApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [groupsApi.reducerPath]: groupsApi.reducer,
    [ingredientApi.reducerPath]: ingredientApi.reducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      universalAPi.middleware,
      userApi.middleware,
      workerService.middleware,
      storeApi.middleware,
      departmentApi.middleware,
      categoryApi.middleware,
      groupsApi.middleware,
      ingredientApi.middleware
    ),
  devTools: process.env.NODE_ENV !== "production",
});

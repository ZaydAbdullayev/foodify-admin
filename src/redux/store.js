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
import { s_productApi } from "../service/s-products.service";
import { reCalc } from "./calc";
import { invoices_Api } from "../service/invoices.service";
import { suplierApi } from "../service/suplier.service";

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
    [universalAPi.reducerPath]: universalAPi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [workerService.reducerPath]: workerService.reducer,
    [storeApi.reducerPath]: storeApi.reducer,
    [departmentApi.reducerPath]: departmentApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [groupsApi.reducerPath]: groupsApi.reducer,
    [ingredientApi.reducerPath]: ingredientApi.reducer,
    [s_productApi.reducerPath]: s_productApi.reducer,
    [invoices_Api.reducerPath]: invoices_Api.reducer,
    [suplierApi.reducerPath]: suplierApi.reducer,
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
      ingredientApi.middleware,
      s_productApi.middleware,
      invoices_Api.middleware,
      suplierApi.middleware
    ),
  devTools: process.env.NODE_ENV !== "production",
});

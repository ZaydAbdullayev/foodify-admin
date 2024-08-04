import React, { useEffect } from "react";
import "./assets/global.css";
import "./assets/root.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./page/home/home";
import { Layout } from "./layout/layout";
import { Restaurant } from "./page/restaurants/restaurant";
import { CheackDepartment, Login } from "./auth/login";
import { Auth } from "./auth/auth";
import { Addproduct, ShowProduct } from "./components/Addproduct/addproduct";
import { Products } from "./page/products/products";
import { Statistics } from "./components/statistics/layout.statis";
import { StatisticsIncome, StatisticDetails, StatisticsExpenses, BillReportById, BillsReport } from "./components/statistics/bill.jsx";
import { Document } from "./page/document/document";
import { Payment } from "./page/payment/payment";
import AddPayment from "./page/payment/addPayment/addPayment.jsx";
import { Workers } from "./page/workers/workers";
import { AddWorker } from "./page/workers/addWorker/addWorker";
import { PaymentCheck } from "./components/payment-check/check";
import { useSelector, useDispatch } from "react-redux";
import { Storage, Blog } from "./page/storage/storage";
import { StorageDep } from "./page/storage/store-department/department";
import { StorageCatgegories } from "./page/storage/store-category/categories";
import { StorageGroups } from "./page/storage/store-groups/groups";
import { StorageIngredients } from "./page/storage/store-ingredients/ingredients";
import { StorageProducts } from "./page/storage/store-products/products";
import { useLocation } from "react-router-dom";
import { acCloseUModal } from "./redux/u-modal";
import { StorageInvoices } from "./page/invoices/store-invoices/invoices";
import { StorageExpenditures } from "./page/invoices/store-expenditures/expenditures";
import { StorageSupplier } from "./page/invoices/store-supplier/supplier";
import { StorageCutting } from "./page/invoices/store-cutting/cutting";
import { StorageDamaged } from "./page/invoices/store-damaged/damaged";
import { StorageCarryUp } from "./page/invoices/store-carry-item/carry-item";
import { ReportOrders } from "./page/reports/report-orders/report-orders";
import { ReportItems } from "./page/reports/report-items/report-items";
import { ReportRejects } from "./page/reports/report-rejects/report-rejects";
import { ReportIngredients } from "./page/reports/report-ingredients/report-ingredients";
import { ReportSuppliers } from "./page/reports/report-supplier/report-supplier";
import { Cashboxes } from "./page/cashbox/cashboxes/cashboxes";
import { TransactionGroups } from "./page/cashbox/cash-transaction-group/cash-transaction-group";
import { InvoicesMakingFood } from "./page/invoices/store-making-food/making-food";
import { InvoicesGroups } from "./page/invoices/invoice-group/invoice-group";
import { CashboxTransaction } from "./page/cashbox/cash-transaction/cash-transaction";
import { InvoicePreOrders } from "./page/invoices/invoice-pre-order/pre-order";
import { TransactionRapor } from "./page/cashbox/cashbox-report/cashbox-report";
import { NavigationPanel } from "./page/navigation/navigation";
import { TableBox } from "./page/table-box/table-box";
import { Orders } from "./page/orders/orders";
import { OrderById } from "./page/order-by-id/order-by-id";
import { acDeviceWidth } from "./redux/media";
import { acNothification } from "./redux/nothification";
import { NothificationPage } from "./page/nothification/nothification.jsx";
import { Inventory } from "./page/inventory/inventory.jsx";
import { MyOrder } from "./page/my-orders/my-order.jsx";
import { ReportOneItems } from "./page/reports/report-items/report-one-items.jsx";
import { ReportOneIngredient } from "./page/reports/report-one-ingredient/report-one-ingredient.jsx";
import { FullReportById } from "./page/reports/full-report-by-id/full-report.jsx";
import { Result, Button } from "antd";
import { setRelease } from "./redux/deleteFoods.js";
import { acFormValues } from "./redux/active.js";
import { useSearchAppParams } from "./hooks/useSearchParam.js";
import { Howl } from "howler";
import audio from "./assets/images/nothification.mp3";

const routes = {
  creator: {
    path: "/", element: <Auth />, children: [
      {
        path: "/", element: <Layout />, children: [
          { path: "/", element: <Home /> },
          { path: "product/add", element: <Addproduct /> },
          { path: "restaurant/add", element: <Restaurant /> },
        ]
      }
    ]
  },
  user: {
    path: "/", element: <Auth />, children: [
      { path: "check", element: <CheackDepartment /> },
      {
        path: "/", element: <Layout />, children: [
          { path: "", element: <Statistics /> },
          { path: "statistics", element: <Statistics /> },
          { path: "my-receive-orders", element: <MyOrder /> },
          { path: "nothifications", element: <NothificationPage /> },
          {
            path: "managment", element: <Blog />, children: [
              { path: "", element: <Products /> },
              { path: "workers", element: <Workers /> },
              { path: "inventory", element: <Inventory /> }
            ]
          },
          {
            path: "orders", element: <Blog />, children: [
              { path: "", element: <Home /> },
              { path: "pre-orders", element: <InvoicePreOrders /> },
              { path: "tables", element: <TableBox /> },
              { path: "tables/:type/:number/:id", element: <OrderById /> },
              { path: "items-report", element: <ReportItems /> },
              { path: "rejects", element: <ReportRejects /> }
            ]
          },
          {
            path: "financial", element: <Blog />, children: [
              { path: "", element: <Payment /> },
              { path: "cashbox", element: <Cashboxes /> },
              { path: "order-reports", element: <ReportOrders /> },
              { path: "payment", element: <AddPayment /> },
              { path: "cashbox/transactions", element: <CashboxTransaction /> },
              { path: "cashbox/transaction-report", element: <TransactionRapor /> },
              { path: "get/check/:id", element: <PaymentCheck /> }
            ]
          },
          {
            path: "sections", element: <Blog />, children: [
              { path: "storage", element: <Storage /> },
              { path: "departments", element: <StorageDep /> },
              { path: "categories", element: <StorageCatgegories /> },
              { path: "ingredients", element: <StorageIngredients /> },
              { path: "groups", element: <StorageGroups /> },
              { path: "s-products", element: <StorageProducts /> },
              { path: "", element: <StorageSupplier /> },
              { path: "invoice-group", element: <InvoicesGroups /> },
              { path: "cashbox/transaction-group", element: <TransactionGroups /> }
            ]
          },
          {
            path: "storage", element: <Blog />, children: [
              { path: "", element: <StorageInvoices /> },
              { path: "expenses", element: <StorageExpenditures /> },
              { path: "cutting", element: <StorageCutting /> },
              { path: "damaged-items", element: <StorageDamaged /> },
              { path: "carry-up", element: <StorageCarryUp /> },
              { path: "making-food", element: <InvoicesMakingFood /> }
            ]
          },
          {
            path: "other-pages", element: <Blog />, children: [
              { path: "supplier-reports", element: <ReportSuppliers /> },
              { path: "documents", element: <Document /> },
              { path: "navigation", element: <NavigationPanel /> },
              { path: "report-according-by-one-ingredient", element: <ReportOneIngredient /> },
              { path: "ingredient-reports", element: <ReportIngredients /> }
            ]
          },
          { path: "more/info/:id", element: <ShowProduct /> },
          { path: "get-full-report/:st_id/:item_id/:start/:end", element: <FullReportById /> },
          { path: "view/food-report/:id", element: <ReportOneItems /> },
          { path: "statistic/:name", element: <StatisticsExpenses /> },
          { path: "statistic/incomes", element: <StatisticsIncome /> },
          { path: "statistic-details", element: <StatisticDetails /> },
          { path: "bills-report", element: <BillsReport /> },
          { path: "one-bill-report/:id", element: <BillReportById /> },
          { path: "report-ingredients/:id", element: <FullReportById /> },
          { path: "category/:type/:number/:id", element: <Orders /> },
          { path: "update-order/:type/:number/:id/:ProductId/:queue", element: <Orders /> },
          { path: "add/product", element: <Addproduct /> },
          { path: "workers/add", element: <AddWorker /> },
        ]
      }
    ]
  }
};

const NotFound = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sahifa topilmadi!"
      extra={
        <Button onClick={() => (window.location.href = "/")}>
          Bosh sahifaga qaytish
        </Button>
      }
    />
  );
};

export const Router = () => {
  const dep = useSelector((state) => state.permission);
  const nothificate = useSelector((state) => state.nothificate);
  const { getParams, removeParamsByKeys } = useSearchAppParams()
  const lc = useLocation();
  const page_code = getParams("pagecode")
  const route = dep === "creator" ? "creator" : "user";

  const dispatch = useDispatch();

  useEffect(() => {
    if (nothificate) {
      let sound = new Howl({ src: [audio], html5: true, });
      sound.play();
      setTimeout(() => {
        sound.stop();
        dispatch(acNothification(false));
      }, 1000);
    }
  }, [dispatch, nothificate]);

  useEffect(() => {
    dispatch(acCloseUModal());
    dispatch(setRelease(page_code));
    if (getParams("id")) {
      removeParamsByKeys(["id", "st1_id"])
    }
  }, [dispatch, page_code, removeParamsByKeys, getParams]);

  useEffect(() => {
    dispatch(acFormValues("R_V", {}));
  }, [dispatch, lc?.pathname]);

  useEffect(() => {
    if (window.innerWidth < 600) {
      dispatch(acDeviceWidth(true));
    } else {
      dispatch(acDeviceWidth(false));
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {routes[route].children.map((route, index) => (
        <Route key={index} path={route.path} element={route.element}>
          {route.children?.map((child, index) => (
            <Route key={index} path={child.path} element={child.element}>
              {child.children?.map((subChild, index) => (
                <Route key={index} path={subChild.path} element={subChild.element} />
              ))}
            </Route>
          ))}
        </Route>
      ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};



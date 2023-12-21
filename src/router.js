import React, { useEffect } from "react";
import "./assets/global.css";
import "./assets/root.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./page/home/home";
import { Layout } from "./layout/layout";
import { Sidebar } from "./components/sideBar/sidebar";
import { Restaurant } from "./page/restaurants/restaurant";
import { CheackDepartment, Login } from "./auth/login";
import { Auth } from "./auth/auth";
import { Addproduct } from "./components/Addproduct/addproduct";
import { Products } from "./page/products/products";
import { MakingFoods } from "./page/makingFoods/makingFoods";
import { MakedFoods } from "./page/makedFoods/maked";
import { Statistics } from "./components/statistics/layout.statis";
import { Document } from "./page/document/document";
import { Payment } from "./page/payment/payment";
import { Workers } from "./page/workers/workers";
import { AddWorker } from "./page/workers/addWorker/addWorker";
import { PaymentCheck } from "./components/payment-check/check";
import { useSelector, useDispatch } from "react-redux";
import { Storage, StorageBlog } from "./page/storage/storage";
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
import { InvoicePreOrders } from "./page/invoices/invoice-envanter/pre-order";
import { TransactionRapor } from "./page/cashbox/cashbox-report/cashbox-report";
import { NavigationPanel } from "./page/navigation/navigation";

export const Router = () => {
  const login = JSON.parse(localStorage.getItem("user")) || [];
  const department = useSelector((state) => state.permission);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(acCloseUModal());
  }, [dispatch, location]); // Move the closing parenthesis to the correct position

  const span = document.createElement("span");
  span.classList.add("stm-animate");
  document.body.appendChild(span);
  document.addEventListener("click", function (event) {
    const x = event.clientX;
    const y = event.clientY;
    span.style.top = `${y - 30}px`;
    span.style.left = `${x - 30}px`;
    span.classList.add("active");
  });
  span.addEventListener("animationend", function () {
    span.classList.remove("active");
  });
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {login?.user?.role === "owner" ? (
        <Route path="/" element={<Auth />}>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="sidebar" element={<Sidebar />} />
            <Route path="product/add" element={<Addproduct />} />
            <Route path="restaurant/add" element={<Restaurant />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      ) : (
        <Route path="/" element={<Auth />}>
          <Route path="check" element={<CheackDepartment />} />
          <Route path="/" element={<Layout />}>
            <Route
              path={department === "owner" ? "orders" : "/"}
              element={<Home />}
            />
            {department === "owner" || department === "kassir" ? (
              <>
                <Route
                  path={department === "owner" ? "/" : "historical"}
                  element={<Document />}
                />
                <Route path="statistics" element={<Statistics />} />
                <Route path="navigation-all" element={<NavigationPanel />} />
                <Route path="storage" element={<StorageBlog />}>
                  <Route index element={<Storage />} />
                  <Route path="departments" element={<StorageDep />} />
                  <Route path="categories" element={<StorageCatgegories />} />
                  <Route path="groups" element={<StorageGroups />} />
                  <Route path="ingredients" element={<StorageIngredients />} />
                  <Route path="s-products" element={<StorageProducts />} />
                  <Route path="suppliers" element={<StorageSupplier />} />
                  <Route path="invoices" element={<StorageInvoices />} />
                  <Route path="expenses" element={<StorageExpenditures />} />
                  <Route path="cutting" element={<StorageCutting />} />
                  <Route path="damaget-items" element={<StorageDamaged />} />
                  <Route path="carry-up" element={<StorageCarryUp />} />
                  <Route path="report/orders" element={<ReportOrders />} />
                  <Route path="report/items" element={<ReportItems />} />
                  <Route path="report/rejects" element={<ReportRejects />} />
                  <Route path="cashbox" element={<Cashboxes />} />
                  <Route path="pre-orders" element={<InvoicePreOrders />} />
                  <Route
                    path="cashbox/transactions"
                    element={<CashboxTransaction />}
                  />
                  <Route path="making-food" element={<InvoicesMakingFood />} />
                  <Route path="invoice-group" element={<InvoicesGroups />} />
                  <Route
                    path="cashbox/transaction-group"
                    element={<TransactionGroups />}
                  />
                  <Route
                    path="cashbox/transaction-report"
                    element={<TransactionRapor />}
                  />
                  <Route
                    path="report/suppliers"
                    element={<ReportSuppliers />}
                  />
                  <Route
                    path="report/ingredients"
                    element={<ReportIngredients />}
                  />
                </Route>
                <Route path="product/add" element={<Addproduct />} />
                <Route path="get/check/:id" element={<PaymentCheck />} />
              </>
            ) : (
              <></>
            )}
            <Route path="payment" element={<Payment />} />
            <Route path="sidebar" element={<Sidebar />} />
            <Route path="product" element={<Products />} />
            {department === "owner" && (
              <>
                <Route path="workers" element={<Workers />} />
                <Route path="workers/add" element={<AddWorker />} />
              </>
            )}
            <Route path="cooking/food" element={<MakingFoods />} />
            <Route path="prepared/food" element={<MakedFoods />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      )}
    </Routes>
  );
};

const NotFound = () => {
  return (
    <>
      <h1 style={{ color: "#fff" }}>Sahifa Topilmadi</h1>
    </>
  );
};

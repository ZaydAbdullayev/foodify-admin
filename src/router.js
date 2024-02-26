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
import { Addproduct, ShowProduct } from "./components/Addproduct/addproduct";
import { Products } from "./page/products/products";
import { MakingFoods } from "./page/makingFoods/makingFoods";
import { MakedFoods } from "./page/makedFoods/maked";
import { Statistics } from "./components/statistics/layout.statis";
import { Document } from "./page/document/document";
import { Payment } from "./page/payment/payment";
import { AddPayment } from "./page/payment/addPayment/addPayment.jsx";
import { Workers } from "./page/workers/workers";
import { AddWorker } from "./page/workers/addWorker/addWorker";
import { PaymentCheck, Test } from "./components/payment-check/check";
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
// import { InvoiceInvantar } from "./page/invoices/invoice-envanter/envanter";
import { Howl } from "howler";
import audio from "./assets/images/nothification.mp3";
import { acDeviceWidth } from "./redux/media";
import { acNothification } from "./redux/nothification";
import { NothificationPage } from "./page/nothification/nothification.jsx";
import { Inventory } from "./page/inventory/inventory.jsx";
import { MyOrder } from "./page/my-orders/my-order.jsx";
import { ReportOneItems } from "./page/reports/report-items/report-one-items.jsx";
import { ReportOneIngredient } from "./page/reports/report-one-ingredient/report-one-ingredient.jsx";
import { FullReportById } from "./page/reports/full-report-by-id/full-report.jsx";
import { Result, Button } from "antd";

export const Router = () => {
  const department = useSelector((state) => state.permission);
  const nothificate = useSelector((state) => state.nothificate);
  const location = useLocation();
  const dispatch = useDispatch();
  let sound;

  document.addEventListener(
    "DOMContentLoaded", // "load" yerine "DOMContentLoaded" kullanın
    () => {
      var audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      if (audioContext) {
        sound = new Howl({
          src: [audio],
          html5: true,
        });
      }
    },
    { once: true }
  );

  if (nothificate && sound) {
    sound.play();
    setTimeout(() => {
      dispatch(acNothification(false));
      if (sound) sound.stop();
    }, 1000);
  }

  useEffect(() => {
    dispatch(acCloseUModal());
  }, [dispatch, location]);

  if (window.innerWidth < 600) {
    dispatch(acDeviceWidth(true));
  } else {
    dispatch(acDeviceWidth(false));
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {department === "creator" ? (
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
            {/* ============== pages of the navbar ================= */}
            <Route path="" element={<Statistics />} />
            <Route path="statistics" element={<Statistics />} />
            <Route path="my-receive-orders" element={<MyOrder />} />
            <Route path="nothifications" element={<NothificationPage />} />

            {/* ============== pages of the sidebar ================= */}
            <Route path="managment" element={<Blog />}>
              <Route path="" element={<Products />} />
              <Route path="workers" element={<Workers />} />
              <Route path="inventory" element={<Inventory />} />
            </Route>

            <Route path="orders" element={<Blog />}>
              <Route path="" element={<Home />} />
              <Route path="cooking/food" element={<MakingFoods />} />
              <Route path="prepared/food" element={<MakedFoods />} />
              <Route path="pre-orders" element={<InvoicePreOrders />} />
              <Route path="tables" element={<TableBox />} />
              <Route path="tables/:type/:number/:id" element={<OrderById />} />
              <Route path="items-report" element={<ReportItems />} />
              <Route path="rejects" element={<ReportRejects />} />
            </Route>
            <Route path="financial" element={<Blog />}>
              <Route path="" element={<Payment />} />
              <Route path="cashbox" element={<Cashboxes />} />
              <Route path="order-reports" element={<ReportOrders />} />
              <Route path="payment" element={<AddPayment />} />
              <Route
                path="cashbox/transactions"
                element={<CashboxTransaction />}
              />
              <Route
                path="cashbox/transaction-report"
                element={<TransactionRapor />}
              />
              <Route path="get/check/:id" element={<PaymentCheck />} />
            </Route>
            <Route path="sections" element={<Blog />}>
              <Route path="storage" element={<Storage />} />
              <Route path="departments" element={<StorageDep />} />
              <Route path="categories" element={<StorageCatgegories />} />
              <Route path="ingredients" element={<StorageIngredients />} />
              <Route path="groups" element={<StorageGroups />} />
              <Route path="s-products" element={<StorageProducts />} />
              <Route path="" element={<StorageSupplier />} />
              <Route path="invoice-group" element={<InvoicesGroups />} />
              <Route
                path="cashbox/transaction-group"
                element={<TransactionGroups />}
              />
            </Route>
            <Route path="storage" element={<Blog />}>
              <Route path="" element={<StorageInvoices />} />
              <Route path="expenses" element={<StorageExpenditures />} />
              <Route path="cutting" element={<StorageCutting />} />
              <Route path="damaged-items" element={<StorageDamaged />} />
              <Route path="carry-up" element={<StorageCarryUp />} />
              <Route path="making-food" element={<InvoicesMakingFood />} />
            </Route>
            <Route path="other-pages" element={<Blog />}>
              <Route path="supplier-reports" element={<ReportSuppliers />} />
              <Route path="documents" element={<Document />} />
              <Route path="navigation" element={<NavigationPanel />} />
              <Route
                path="report-according-by-one-ingredient"
                element={<ReportOneIngredient />}
              />
              <Route
                path="ingredient-reports"
                element={<ReportIngredients />}
              />
            </Route>

            {/* ============== pages of the single ================= */}
            <Route path="more/info/:id" element={<ShowProduct />} />
            <Route
              path="get-full-report/:res_id/:storage_id/:storage/:id/:item/:type"
              element={<FullReportById />}
            />
            <Route path="view/fullreport/:id" element={<FullReportById />} />
            <Route path="view/food-report/:id" element={<ReportOneItems />} />
            <Route path="category/:type/:number/:id" element={<Orders />} />
            <Route
              path="update-order/:type/:number/:id/:ProductId/:queue"
              element={<Orders />}
            />

            {/* ============== pages of the modal ================= */}
            <Route path="add/product" element={<Addproduct />} />
            <Route path="workers/add" element={<AddWorker />} />
            <Route path="test" element={<Test />} />

            {/* ============== pages of the other ================= */}
            <Route path="sidebar" element={<Sidebar />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      )}
    </Routes>
  );
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

import React, { lazy, Suspense } from "react";
import { useFetchDataQuery } from "../../../service/fetch.service";
import { useSelector } from "react-redux";

const UniversalModal = lazy(() => import("../../../components/modal/modal"));
const InvoicesPaymentModal = () => {
  const user = JSON.parse(localStorage.getItem("user"))?.user || [];
  const pay = useSelector((state) => state.pay);
  const { data: cashs = [] } = useFetchDataQuery({
    url: `get/cashbox/${user?.id}`,
    tags: ["cashbox"],
  });
  const today = new Date().toISOString().split("T")[0];
  return (
    <Suspense>
      <UniversalModal
        title="To'lov"
        type="payment"
        status={true}
        payment={true}
        color={true}>
        <input type="date" name="date" defaultValue={today} />
        <select name="activity_kind">
          <option value="default">Faoliyat turi tanlang*</option>
          <option value="repare">Invitsitsiya</option>
          <option value="income">To'lov</option>
          <option value="purchase">Xarid</option>
        </select>
        <select name="cashbox">
          <option value="default">Kassa tanlang*</option>
          {cashs?.data?.map((i) => (
            <option key={i.id} value={i.id}>
              {i.name}
            </option>
          ))}
        </select>
        <select name="transaction_type">
          <option value="default">To'lov turi tanlang*</option>
          <option value="cash">Naqd</option>
          <option value="plastic">Plastik</option>
          <option value="transfer">Pul o'tkazma</option>
        </select>
        <input
          type="text"
          name="supplier"
          value={pay?.supplier || ""}
          disabled
        />
        <input
          type="text"
          value={`${pay?.order} - ${new Date(
            pay?.date
          ).toLocaleDateString()} to'lov miqdori: ${new Intl.NumberFormat(
            "en-US"
          ).format(pay?.cost)}`}
          disabled
        />
        <select>
          <option value={0}>Yetkazuvchidagi puldan olmaslik</option>
          <option value={pay?.moneyOnSup}>
            Yetkazuvchidagi pul <b>{pay?.moneyOnSup}</b>
          </option>
        </select>
        <input
          type="number"
          name="paid"
          placeholder={`To'lanishi kerak bo'lgan to'lov miqdori`}
          defaultValue={pay?.leftover || 0}
        />
        <input type="text" name="description" placeholder="Tavsif" />
        <input type="hidden" name="invoice_id" value={pay?.id || null} />
        <input
          type="hidden"
          name="transaction_group"
          value={"invoice_payment"}
        />
      </UniversalModal>
    </Suspense>
  );
};

export default InvoicesPaymentModal;

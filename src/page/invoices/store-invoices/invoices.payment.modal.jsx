import React, { lazy, Suspense } from "react";

const UniversalModal = lazy(() => import("../../../components/modal/modal"));
const InvoicesPaymentModal = () => {
  const today = new Date().toISOString().split("T")[0];
  return (
    <Suspense>
      <UniversalModal
        title="To'lov"
        type="payment"
        payment={true}
        darkMode={true}>
        <select name="transaction_type">
          <option value="default">To'lov turi tanlang*</option>
          <option value="cash">Naqd</option>
          <option value="plastic">Plastik</option>
          <option value="transfer">Pul o'tkazma</option>
        </select>
        <select name="activity_kind">
          <option value="default">Faoliyat turi tanlang*</option>
          <option value="investment">Invitsitsiya</option>
          <option value="pay">To'lov</option>
          <option value="buy">Xarid</option>
        </select>
        <input type="date" name="date" defaultValue={today} />
        <input
          type="number"
          name="paid"
          placeholder={`To'lanishi kerak bo'lgan to'lov miqdori`}
        />
        <input type="text" name="description" placeholder="Tavsif" />
      </UniversalModal>
    </Suspense>
  );
};

export default InvoicesPaymentModal;

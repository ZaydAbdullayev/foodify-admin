import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { acActive } from "../../../redux/active";
import { LoadingBtn } from "../../../components/loading/loading";
import { useGetStInvoiceQuery } from "../../../service/invoices.service";
import { UniversalModal } from "../../../components/modal/modal";
import { useGetCashboxQuery } from "../../../service/cashbox.service";
import { useGetCashboxGrQuery } from "../../../service/cashbox-group.service";
import { useGetCashTransactionQuery } from "../../../service/cash-transaction.service";

import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

export const CashboxTransaction = () => {
  const user = JSON?.parse(localStorage.getItem("user"))?.user || [];
  const [sort, setSort] = useState({ id: null, state: false });
  const [checked, setChecked] = useState(false);
  const [modalType, setModalType] = useState("default");
  //   const [checkedData, setCheckedData] = useState([]);
  const today = new Date().toISOString().split("T")[0];
  const acItem = useSelector((state) => state.active);
  const dispatch = useDispatch();
  const { data: invoiceData = [] } = useGetStInvoiceQuery();
  const { data: cashboxData = [], isLoading } = useGetCashboxQuery();
  const { data: cashboxGrData = [] } = useGetCashboxGrQuery();
  const { data: cashTrData = [] } = useGetCashTransactionQuery();

  //   const getProduct = (item, status) => {
  //     const isChecked = checkedData?.some((i) => i.id === item?.id);
  //     if (status === 0) {
  //       setCheckedData((prevData) => prevData?.filter((i) => i.id !== item?.id));
  //       return;
  //     }
  //     if (isChecked) {
  //       setCheckedData((prevData) =>
  //         prevData?.map((i) => (i.id === item?.id ? item : i))
  //       );
  //     } else {
  //       setCheckedData((prevData) => [...prevData, item]);
  //     }
  //   };

  const sortData =
    invoiceData &&
    [...invoiceData].sort((a, b) => {
      if (sort.state) {
        return a?.name?.localeCompare(b.name);
      } else {
        return b?.name?.localeCompare(a.name);
      }
    });

  const headerData = [
    { name: "Kun", size: "10%" },
    { name: "Terminal", size: "10%" },
    { name: "Turi", size: "10%" },
    { name: "Yuborgan kassir", size: "10%" },
    { name: "Olgan kassir", size: "10%" },
    { name: "Guruh", size: "10%" },
    { name: "O'tkazma turi", size: "10%" },
    { name: "To'lov turi", size: "9%", position: "center" },
    { name: "Miqdor", size: "9%", position: "center" },
    { name: "Tafsilot", size: "8%", position: "center" },
  ];

  const displayKeys = [
    { name: "storage", size: "10%" },
    { name: "storage", size: "10%" },
    { name: "storage", size: "10%" },
    { name: "storage", size: "10%" },
    { name: "storage", size: "10%" },
    { name: "storage", size: "10%" },
    { name: "description", size: "8%" },
    { name: "cost", size: "10%", position: "center" },
    { name: "description", size: "9%" },
  ];

  return (
    <div className="storage_container">
      <div className="storage_header"></div>
      <div className="storage_body">
        <p>Tranzaksiyalar</p>
        <div className="storage_body_item">
          <label>
            <input
              type="checkbox"
              name="id"
              onClick={() => setChecked(!checked)}
            />
          </label>
          <p>№</p>
          {headerData?.map((item, index) => {
            return (
              <p
                key={index}
                style={{
                  "--data-line-size": item?.size,
                  justifyContent: item?.position || "flex-start",
                }}
                onClick={() => {
                  setSort({ id: index, state: !sort.state });
                }}
              >
                {item?.name}{" "}
                {sort.id === index ? (
                  sort.state ? (
                    <RiArrowUpSLine />
                  ) : (
                    <RiArrowDownSLine />
                  )
                ) : null}
              </p>
            );
          })}
        </div>
        <div className="storage_body_box">
          {isLoading ? (
            <span className="loader_box relative">
              <LoadingBtn />
            </span>
          ) : (
            sortData?.map((item) => {
              const date = new Date(item?.date).toLocaleDateString("uz-UZ", {
                day: "numeric",
                month: "numeric",
                year: "numeric",
              });
              return (
                <div className={"storage_body__box"}>
                  <div
                    className={
                      acItem === item?.id
                        ? "storage_body_item active"
                        : "storage_body_item"
                    }
                    key={item?.id}
                    onDoubleClick={() =>
                      dispatch(
                        acActive({
                          id: !acItem?.id ? item?.id : null,
                        })
                      )
                    }
                  >
                    <label
                      onClick={() =>
                        dispatch(
                          acActive({
                            id: !acItem?.id ? item?.id : null,
                          })
                        )
                      }
                    >
                      {checked ? (
                        <input type="checkbox" name="id" checked />
                      ) : (
                        <input type="checkbox" name="id" />
                      )}
                    </label>
                    <p>{item?.order}</p>
                    <p style={{ "--data-line-size": "10%" }}>{date}</p>
                    {displayKeys?.map((key, index) => {
                      return (
                        <p
                          key={index}
                          style={{
                            "--data-line-size": key?.size,
                            justifyContent: key?.position || "flex-start",
                          }}
                        >
                          {item[key?.name]}
                        </p>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      <UniversalModal type="trsn">
        <input type="date" name="date" defaultValue={today} required />
        <select onChange={(e) => setModalType(e.target.value)}>
          <option value="default">Tranzaksiya turi</option>
          <option value="inv">Kirim qilish</option>
          <option value="exp">Chiqim qilish</option>
          <option value="tra">Transformatsiya</option>
        </select>
        {modalType !== "default" && (
          <>
            <label>
              <select name="transaction_category">
                {modalType === "inv" && (
                  <>
                    <option value="send">Kirim</option>
                    <option value="delivery_send">Dastavka kirim</option>
                    <option value="food_send">Oziq-ovqat kirim</option>
                    <option value="expense">Chiqim</option>
                    <option value="delivery_payment">Dastavka to'lovi</option>
                    <option value="food_payment">Oziq-ovqat to'lovi</option>
                    <option value="cash_withdrawal">Kassaga o'tkazish</option>
                    <option value="deposit">Depozit</option>
                  </>
                )}
                {modalType === "exp" && (
                  <>
                    <option value="expense">Chiqim</option>
                    <option value="send">Kirim</option>
                    <option value="delivery_send">Dastavka kirim</option>
                    <option value="food_send">Oziq-ovqat kirim</option>
                    <option value="delivery_payment">Dastavka to'lovi</option>
                    <option value="food_payment">Oziq-ovqat to'lovi</option>
                    <option value="cash_withdrawal">Kassaga o'tkazish</option>
                    <option value="deposit">Depozit</option>
                  </>
                )}
                {modalType === "tra" && (
                  <>
                    <option value="cash_withdrawal">Kassaga o'tkazish</option>
                    <option value="send">Kirim</option>
                    <option value="delivery_send">Dastavka kirim</option>
                    <option value="food_send">Oziq-ovqat kirim</option>
                    <option value="expense">Chiqim</option>
                    <option value="delivery_payment">Dastavka to'lovi</option>
                    <option value="food_payment">Oziq-ovqat to'lovi</option>
                    <option value="deposit">Depozit</option>
                  </>
                )}
              </select>
              <select name="transaction_group">
                <option value="default">Guruh tanlang*</option>
                {cashboxGrData?.data?.map((item) => {
                  return (
                    <option value={item?.name} key={item.id}>
                      {item?.name}
                    </option>
                  );
                })}
              </select>
            </label>
            {modalType === "exp" || modalType === "inv" ? (
              <select name="cashier_receiver">
                <option value="cashier">Kassir tanlang*</option>
                {cashboxData?.data?.map((item) => {
                  return (
                    <option value={item?.name} key={item.id}>
                      {item?.name}
                    </option>
                  );
                })}
              </select>
            ) : (
              <>
                <label>
                  <select name="cashier_sender">
                    <option value="cashier">Beruvchi kassir*</option>
                    {cashboxData?.data?.map((item) => {
                      return (
                        <option value={item?.name} key={item.id}>
                          {item?.name}
                        </option>
                      );
                    })}
                  </select>
                  <select name="cashier_receiver">
                    <option value="cashier">Oluvchi kassir*</option>
                    {cashboxData?.data?.map((item) => {
                      return (
                        <option value={item?.name} key={item.id}>
                          {item?.name}
                        </option>
                      );
                    })}
                  </select>
                </label>
              </>
            )}
            <label>
              <select name="payment_type">
                <option value="Prixod">To'lov turini tanlang*</option>
                <option value="cash">Naxt</option>
                <option value="credit">Plastik karta</option>
                <option value="click">Click</option>
              </select>
              <select name="activity_kind">
                <option value="Prixod">Faoliyat turi tanlang*</option>
                <option value="Prixod">Prixod</option>
                <option value="Prixod">Rasxod</option>
              </select>
            </label>
            <input
              type="text"
              name="amount"
              placeholder="Miqdor kiriting*"
              required
              autoComplete="off"
            />
            <input
              type="text"
              name="description"
              placeholder="Tavsif"
              required
              autoComplete="off"
            />
          </>
        )}
        <input type="hidden" name="res_id" value={user?.id} />
      </UniversalModal>
    </div>
  );
};

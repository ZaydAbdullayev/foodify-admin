import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { acActiveThing, acPassiveThing } from "../../../redux/active";
import { LoadingBtn } from "../../../components/loading/loading";
import { UniversalModal } from "../../../components/modal/modal";
import { useFetchDataQuery } from "../../../service/fetch.service";
import { UniversalFilterBox } from "../../../components/filter/filter";
import { useNavigate } from "react-router-dom";

import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { acNavStatus } from "../../../redux/navbar.status";
import { setDocuments, setRelease } from "../../../redux/deleteFoods";
import { setAllDocuments } from "../../../redux/deleteFoods";

export const CashboxTransaction = () => {
  const user = JSON?.parse(localStorage.getItem("user"))?.user || [];
  const [sort, setSort] = useState({ id: null, state: false });
  const [checked, setChecked] = useState(false);
  const [modalType, setModalType] = useState("default");
  const today = new Date().toISOString().split("T")[0];
  const acItem = useSelector((state) => state.activeThing);
  const ckddt = useSelector((state) => state.delTouter);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: cashboxData = [], isLoading } = useFetchDataQuery({
    url: `get/cashbox/${user?.id}`,
    tags: ["cashbox"],
  });
  const { data: cashboxGrData = [] } = useFetchDataQuery({
    url: `get/${user?.id}/transactionGroups`,
    tags: ["tr-group"],
  });
  const { data: cashTrData = [] } = useFetchDataQuery({
    url: `get/transactions/${user?.id}`,
    tags: ["cashbox-transaction"],
  });
  React.useEffect(() => {
    dispatch(acNavStatus([0, 1, 2, 3]));
  }, [dispatch]);
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
    cashTrData?.data &&
    [...cashTrData?.data].sort((a, b) => {
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
    { name: "cashier_receiver", size: "10%" },
    { name: "payment_type", size: "10%" },
    { name: "cashier_sender", size: "10%" },
    { name: "cashier_receiver", size: "10%" },
    { name: "transaction_group", size: "10%" },
    { name: "activity_kind", size: "10%" },
    { name: "transaction_type", size: "9%" },
    { name: "amount", size: "9%", position: "center" },
    { name: "description", size: "8%" },
  ];

  return (
    <div className="storage_container">
      <UniversalFilterBox />
      <div className="storage_body">
        <p>
          <span>Tranzaksiyalar</span>
        </p>
        <div className="storage_body_item _item-header">
          <label aria-label="checked this elements">
            <input
              type="checkbox"
              name="id"
              onClick={() => {
                setChecked(checked ? false : true);
                dispatch(
                  checked
                    ? setRelease("trsn")
                    : setAllDocuments("trsn", cashTrData?.data)
                );
              }}
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
            sortData?.map((item, ind) => {
              const date = new Date(item?.date).toLocaleDateString("uz-UZ", {
                day: "numeric",
                month: "numeric",
                year: "numeric",
              });
              const isChecked = ckddt?.trsn?.some((i) => i.id === item?.id);
              return (
                <div className={"storage_body__box"} key={item?.id}>
                  <div
                    className={
                      acItem === item?.id
                        ? "storage_body_item active"
                        : "storage_body_item"
                    }
                    onDoubleClick={() => {
                      dispatch(
                        !acItem?.id ? acActiveThing(item) : acPassiveThing()
                      );
                      dispatch(setDocuments("trsn", item));
                      navigate(`?page-code=trsn`);
                    }}
                  >
                    <label
                      onClick={() => {
                        dispatch(
                          !acItem?.id ? acActiveThing(item) : acPassiveThing()
                        );
                        dispatch(setDocuments("trsn", item));
                        navigate(`?page-code=trsn`);
                      }}
                      aria-label="checked this elements"
                    >
                      <input
                        type="checkbox"
                        name="id"
                        defaultChecked={isChecked}
                      />
                    </label>
                    <p>{ind + 1}</p>
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
        <select
          name="transaction_type"
          onChange={(e) => setModalType(e.target.value)}
        >
          <option value="default">Tranzaksiya turi</option>
          <option value="income">Kirim qilish</option>
          <option value="expenses">Chiqim qilish</option>
          <option value="transaction">Transformatsiya</option>
        </select>
        {modalType !== "default" && (
          <>
            <label>
              <select name="transaction_category">
                {modalType === "income" && (
                  <>
                    <option value="income">Kirim</option>
                    <option value="delivery_income">Dastavka kirim</option>
                    <option value="food_income">Oziq-ovqat kirim</option>
                    <option value="invoice">Chiqim</option>
                    <option value="delivery_invoice">Dastavka to'lovi</option>
                    <option value="food_invoice">Oziq-ovqat to'lovi</option>
                    <option value="cash_withdrawal">Kassaga o'tkazish</option>
                    <option value="deposit">Depozit</option>
                  </>
                )}
                {modalType === "expenses" && (
                  <>
                    <option value="invoice">Chiqim</option>
                    <option value="income">Kirim</option>
                    <option value="delivery_income">Dastavka kirim</option>
                    <option value="food_income">Oziq-ovqat kirim</option>
                    <option value="delivery_invoice">Dastavka to'lovi</option>
                    <option value="food_invoice">Oziq-ovqat to'lovi</option>
                    <option value="cash_withdrawal">Kassaga o'tkazish</option>
                    <option value="deposit">Depozit</option>
                  </>
                )}
                {modalType === "transaction" && (
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
            {modalType === "expenses" || modalType === "income" ? (
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

import React, { useState, lazy, Suspense, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { acActiveThing, acPassiveThing } from "../../../redux/active";
import { LoadingBtn } from "../../../components/loading/loading";
import { useFetchDataQuery } from "../../../service/fetch.service";
import { UniversalFilterBox } from "../../../components/filter/filter";
import { useNavigate } from "react-router-dom";

import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { acNavStatus } from "../../../redux/navbar.status";
import { setDocuments, setRelease, setAllDocuments } from "../../../redux/deleteFoods";
const UniversalModal = lazy(() => import("../../../components/modal/modal"));

export const CashboxTransaction = () => {
  const user = JSON?.parse(localStorage.getItem("user"))?.user || [];
  const [sort, setSort] = useState({ id: null, state: false });
  const [checked, setChecked] = useState(false);
  const [modalType, setModalType] = useState("default");
  const [cashId, setCashId] = useState("none");
  const today = new Date().toISOString().split("T")[0];
  const [acItem, setAcItem] = useState();
  const open = useSelector((state) => state.uModal);
  const ckddt = useSelector((state) => state.delTouter);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: cashboxData = [], isLoading } = useFetchDataQuery({ url: `get/cashbox/${user?.id}`, tags: ["cashbox"], });
  const { data: cashboxGrData = [] } = useFetchDataQuery({ url: `get/${user?.id}/transactionGroups`, tags: ["tr-group"], });
  const { data: cashTrData = [] } = useFetchDataQuery({ url: `get/transactions/${user?.id}`, tags: ["cashbox-transaction"], });
  useEffect(() => { dispatch(acNavStatus([0, 1, 2, 3])); }, [dispatch]);

  const sortData = cashTrData?.data && [...cashTrData?.data].sort((a, b) => {
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
    { name: "cashbox", size: "10%" },
    { name: "payment_type", size: "10%" },
    { name: "cashbox_sender", size: "10%" },
    { name: "cashbox_receiver", size: "10%" },
    { name: "transaction_group", size: "10%" },
    { name: "transaction_category", size: "10%" },
    { name: "transaction_type", size: "9%" },
    { name: "amount", size: "9%", position: "center" },
    { name: "description", size: "8%" },
  ];

  const TCD = {
    income: "Kirim",
    expense: "Chiqim",
    paymentToSupplier: "Yetkazuvchiga to'lov",
    paymentFromSupplier: "Yetkazuvchidan to'lov",
    invoicePaymentFromSupplier: "Yetkazuvchidagi puldan to'lov",
    invoicePayment: "Mahsulot uchun to'lov",
    transfer: "Kassalar aro o'tkazma ",
    depozit: "Depozit",
  };

  const actionItem = (item) => {
    dispatch(!acItem?.id ? acActiveThing(item) : acPassiveThing());
    dispatch(setDocuments("trsn", item));
    navigate(`?page-code=trsn`);
    setAcItem(item);
  }

  const options = [
    { value: "income", label: "Kirim" },
    { value: "expense", label: "Chiqim" },
    { value: "invoicePayment", label: "Mahsulot uchun to'lov" },
    { value: "paymnetToSupplier", label: "Yetkazuvchiga to'lov" },
    { value: "transfer", label: "Kassalar aro o'tkazma" },
    { value: "deposit", label: "Depozit" },
  ];

  const getOptionsByType = (type) => {
    const typeOrder = { income: 1, expense: 2, transfer: 3, };
    return options.sort((a, b) => {
      if (a.value === type) return -1;
      if (b.value === type) return 1;
      return (typeOrder[a.value] || 4) - (typeOrder[b.value] || 4);
    });
  };

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
              onChange={() => {
                setChecked(checked ? false : true);
                dispatch(checked ? setRelease("trsn") : setAllDocuments("trsn", cashTrData?.data));
              }}
            />
          </label>
          <p style={{ inlineSize: "var(--univslH)" }}>№</p>
          {headerData?.map((item, index) => {
            return (
              <p
                key={index}
                style={{ "--data-line-size": item?.size, justifyContent: item?.position || "flex-start", }}
                onClick={() => setSort({ id: index, state: !sort.state })}
              >
                {item?.name}{" "}
                {sort.id === index ? (sort.state ? (<RiArrowUpSLine />) : (<RiArrowDownSLine />)) : null}
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
              const date = new Date(item?.date).toLocaleDateString("uz-UZ", { day: "numeric", month: "numeric", year: "numeric", });
              const isChecked = ckddt?.trsn?.some((i) => i.id === item?.id);
              return (
                <div className={"storage_body__box"} key={item?.id}>
                  <div
                    className={acItem === item?.id ? "storage_body_item active" : "storage_body_item"}
                    onDoubleClick={() => actionItem(item)}>
                    <label aria-label="checked this elements">
                      <input
                        type="checkbox"
                        name="id"
                        checked={isChecked}
                        onChange={() => actionItem(item)}
                      />
                    </label>
                    <p>{ind + 1}</p>
                    <p style={{ "--data-line-size": "10%" }}>{date}</p>
                    {displayKeys?.map((key, index) => {
                      return (
                        <p
                          key={index}
                          style={{ "--data-line-size": key?.size, justifyContent: key?.position || "flex-start", }}>
                          {key?.name === "transaction_category" ? TCD?.[item[key?.name]] : item[key?.name]}
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
      {open && (
        <Suspense>
          <UniversalModal
            title={"Tranzaksiya qo'shish"}
            status={acItem?.id ? false : true}
            type="trsn"
            color={true}>
            <input type="date" name="date" defaultValue={today} required />
            <select
              name="transaction_type"
              onChange={(e) => setModalType(e.target.value)}>
              <option value="default">Tranzaksiya turi</option>
              <option value="income">Kirim qilish</option>
              <option value="expense">Chiqim qilish</option>
              <option value="transfer">Kassalar aro o'tkazma</option>
            </select>
            {modalType !== "default" && (
              <>
                <label>
                  <select name="transaction_category">
                    {getOptionsByType(modalType).map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
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
                  <>
                    <select name="cashbox">
                      <option value="default">Kassir tanlang*</option>
                      {cashboxData?.data?.map((item) => {
                        return (
                          <option
                            value={item?.name}
                            key={item.id}
                            onClick={() => setCashId(item?.id)}>
                            {item?.name}
                          </option>
                        );
                      })}
                    </select>
                    <input type="hidden" name="cashbox_id" value={cashId} />
                  </>
                ) : (
                  <>
                    <label>
                      <select name="cashbox_sender">
                        <option value="default">Beruvchi kassir*</option>
                        {cashboxData?.data?.map((item) => {
                          return (
                            <option value={item?.name} key={item.id}>
                              {item?.name}
                            </option>
                          );
                        })}
                      </select>
                      <select name="cashbox_receiver">
                        <option value="default">Oluvchi kassir*</option>
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
                </label>
                <input type="text" name="amount" placeholder="Miqdor kiriting*" requiredautoComplete="off" />
                <input type="text" name="description" placeholder="Tavsif" requiredautoComplete="off" />
              </>
            )}
            <input type="hidden" name="res_id" value={user?.id} />
            <input type="hidden" name="worker" value={user?.worker_name || "owner"} />
            <input type="hidden" name="worker_id" value={user?.user_id || user?.id} />
          </UniversalModal>
        </Suspense>
      )}
    </div>
  );
};

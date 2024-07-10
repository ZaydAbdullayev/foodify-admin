import React, { useState, lazy, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LoadingBtn } from "../../../components/loading/loading";
// import { CalculateTotalP } from "../../../service/calc.service";
import { useNavigate } from "react-router-dom";

import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { acNavStatus } from "../../../redux/navbar.status";
import { UniversalFilterBox } from "../../../components/filter/filter";
import { setDocuments, setRelease } from "../../../redux/deleteFoods";
import { setAllDocuments } from "../../../redux/deleteFoods";
import { useFetchDataQuery } from "../../../service/fetch.service";
import { acOpenPayModal } from "../../../redux/modal";

const InvoicesModal = lazy(() => import("./invoices.modal"));
const InvoicesPaymentModal = lazy(() => import("./invoices.payment.modal"));

export const StorageInvoices = () => {
  const [sort, setSort] = useState({ id: null, state: false });
  const [checked, setChecked] = useState(false);
  const [pay, setPay] = useState(false);
  const [checkedData, setCheckedData] = useState([]);
  const [showMore, setShowMore] = useState([]);
  // const [payment, setPayment] = useState(null);
  const [acItem, setAcItem] = useState({ id: null, ingredients: [] });
  const ckddt = useSelector((state) => state.delRouter);
  const formV = useSelector((state) => state.values);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("formV", formV);

  const ds = [
    {
      id: "2d7a97f46e9dada2",
      action_type: "received_goods",
      order: 9,
      time: "2022-01-07",
      st1_id: "0c510d",
      st1_name: "Oshxona ombori",
      st2_id: "def809",
      st2_name: "Bar ombori",
      item_id: "4a81eb32",
      item_name: "kartoshka",
      item_type: "Ingredient",
      group: "Sabzavotlar",
      unit: "kg",
      price: 6000,
      worker: "Zayd",
      worker_id: "0a709d",
      responsible: "Muzaffar",
      amount: 300,
      invoice_group: "income",
      description: "Sabzi sotib olindi",
      is_undone: 0,
    },
  ];

  const { data: invoiceData = [], isLoading } = useFetchDataQuery({
    url: `get/actions/received_goods`,
    tags: ["action", "invoices"],
  });
  React.useEffect(() => {
    dispatch(acNavStatus([0, 1, 2, 3, 6, 7, 9, 15]));
  }, [dispatch]);

  const getProduct = (item, status) => {
    const isChecked = checkedData.some((i) => i.id === item?.id);
    if (status === 0) {
      setCheckedData((prevData) => prevData?.filter((i) => i.id !== item?.id));
      return;
    }
    if (isChecked) {
      setCheckedData((prevData) =>
        prevData.map((i) => (i.id === item?.id ? item : i))
      );
    } else {
      setCheckedData((prevData) => [
        ...prevData,
        {
          ...item,
          ...formV?.vl,
          action_type: "received_goods",
          invoice_group: "income",
        },
      ]);
    }
  };

  const actionItem = (item) => {
    dispatch(setDocuments("invoice", item));
    navigate(`?page-code=invoice`);
    setCheckedData(acItem?.id ? [] : item?.ingredients);
    setAcItem(
      acItem?.id && ckddt?.invoice?.length > 0
        ? { id: null, ingredients: [] }
        : item
    );
  };
  const headerKeys = [
    { name: "Kun", size: "13%" },
    { name: "Ombor", size: "12%" },
    { name: "Yetkazuvchi", size: "12%" },
    { name: "Summa", size: "12%" },
    { name: "To'langan", size: "12%" },
    { name: "Qarzdorlik", size: "12%" },
    { name: "Javobgar", size: "12%" },
    { name: "Tavsif", size: "10%" },
  ];

  const displayKeys = [
    { name: "st1_name", size: "12%" },
    { name: "supplier", size: "12%" },
    { name: "total_amount", size: "12%", position: "flex-end" },
    { name: "paid", size: "12%", position: "flex-end" },
    { name: "leftover", size: "12%", position: "flex-end" },
    { name: "responsible", size: "12%" },
  ];

  const innerHeaderKeys = [
    { name: "Nomi", size: "24%", border: "1px solid #ccc5" },
    { name: "O'lchov b/i", size: "15%", border: "1px solid #ccc5" },
    { name: "Narxi", size: "19%", border: "1px solid #ccc5" },
    { name: "Miqdor", size: "19%", border: "1px solid #ccc5" },
    { name: "Jami", size: "19%" },
  ];

  const innerDisplayKeys = [
    { name: "item_name", size: "24%" },
    { name: "unit", size: "15%", position: "center" },
    { name: "price", size: "19%", position: "flex-end" },
    { name: "amount", size: "19%", position: "flex-end" },
  ];

  const sortData =
    invoiceData?.data &&
    [...invoiceData?.data].sort((a, b) => {
      if (sort.state) {
        return a?.name?.localeCompare(b.name);
      } else {
        return b?.name?.localeCompare(a.name);
      }
    });

  const openPaymentModal = (price) => {
    setPay(true);
    dispatch(acOpenPayModal(price));
  };

  return (
    <div className="storage_container">
      <UniversalFilterBox />
      <div className="storage_body">
        <p>
          <span>To'lovlar</span>
        </p>
        <div className="storage_body_item _item-header">
          <label>
            <input
              type="checkbox"
              name="id"
              onClick={() => {
                setChecked(checked ? false : true);
                dispatch(
                  checked
                    ? setRelease("invoice")
                    : setAllDocuments("invoice", invoiceData?.data)
                );
              }}
              aria-label="checked this elements"
            />
          </label>
          <p style={{ inlineSize: "var(--univslH)" }}>№</p>
          {headerKeys?.map((item, ind) => {
            return (
              <p
                key={ind}
                style={{
                  "--data-line-size": item?.size,
                }}>
                {item?.name}
                {sort.id === item?.name ? (
                  sort.state ? (
                    <RiArrowUpSLine
                      onClick={() => setSort({ id: item?.name, state: false })}
                    />
                  ) : (
                    <RiArrowDownSLine
                      onClick={() => setSort({ id: item?.name, state: true })}
                    />
                  )
                ) : (
                  <RiArrowDownSLine
                    onClick={() => setSort({ id: item?.name, state: true })}
                  />
                )}
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
              const date = new Date(item?.time).toLocaleDateString("uz-UZ", {
                day: "numeric",
                month: "numeric",
                year: "numeric",
              });
              const check = ckddt?.invoice?.some((i) => i.id === item?.id);
              return (
                <div
                  className={
                    showMore?.includes(item?.id)
                      ? "storage_body__box active"
                      : "storage_body__box"
                  }
                  style={{
                    background: item?.leftover < 0 ? "#a0aed950" : "",
                  }}
                  key={item?.id}>
                  <div
                    className={
                      acItem === item?.id
                        ? "storage_body_item active"
                        : "storage_body_item"
                    }
                    key={item?.id}
                    onDoubleClick={() => actionItem(item)}>
                    <label aria-label="checked this elements">
                      <input
                        type="checkbox"
                        name="id"
                        checked={check}
                        onChange={() => actionItem(item)}
                      />
                    </label>
                    <p style={{ inlineSize: "var(--univslH)" }}>
                      {item?.order}
                    </p>
                    <p style={{ "--data-line-size": "13%" }}>{date}</p>
                    {displayKeys?.map((key, ind) => {
                      return (
                        <p
                          key={ind}
                          style={{
                            "--data-line-size": key?.size,
                            justifyContent: key?.position || "flex-start",
                          }}>
                          {item[key?.name]}
                        </p>
                      );
                    })}
                    <p
                      style={{
                        "--data-line-size": "10%",
                        justifyContent: "center",
                      }}>
                      <span>
                        <u
                          style={
                            showMore?.includes(item?.id)
                              ? { color: "var(--cl26)" }
                              : {}
                          }
                          onClick={() =>
                            setShowMore((prev) =>
                              prev?.includes(item?.id)
                                ? prev?.filter((i) => i !== item?.id)
                                : [...prev, item?.id]
                            )
                          }>
                          hisoblash
                        </u>
                        <br />
                        {!(item?.leftover <= 0) && (
                          <u onClick={() => openPaymentModal(item)}>to'lov</u>
                        )}
                      </span>
                    </p>
                  </div>
                  {showMore?.includes(item?.id) && (
                    <div className=" storage-body_inner_item">
                      <div className="storage_body_item _item-header">
                        <p
                          style={{
                            borderRight: "1px solid #ccc5",
                          }}>
                          №
                        </p>
                        {innerHeaderKeys?.map((item, ind) => {
                          return (
                            <p
                              key={ind}
                              style={{
                                "--data-line-size": item?.size,
                                borderRight: item.border,
                              }}>
                              {item?.name}
                            </p>
                          );
                        })}
                      </div>
                      {item?.ingredients?.map((product, ind) => {
                        return (
                          <div
                            className="storage_body_item inner_item"
                            key={ind}>
                            <p
                              style={{
                                borderRight: "1px solid #ccc5",
                              }}>
                              {ind + 1}
                            </p>
                            {innerDisplayKeys?.map((key, ind) => {
                              return (
                                <p
                                  key={ind}
                                  style={{
                                    "--data-line-size": key?.size,
                                    justifyContent:
                                      key?.position || "flex-start",
                                  }}>
                                  {product[key?.name]}
                                </p>
                              );
                            })}
                            <p
                              style={{
                                "--data-line-size": "19%",
                                justifyContent: "flex-end",
                              }}>
                              {product?.total_amount}
                            </p>
                          </div>
                        );
                      })}
                      <div
                        className="storage_body_item inner_item"
                        style={{ background: "var(--cl11)" }}>
                        <p></p>
                        <p style={{ "--data-line-size": "66%" }}>
                          Jami mablag'
                        </p>
                        <p
                          style={{
                            "--data-line-size": "30%",
                            justifyContent: "flex-end",
                          }}>
                          {item?.total_amount}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
      <Suspense>
        <InvoicesModal
          checkedData={checkedData}
          setCheckedData={setCheckedData}
          getProduct={getProduct}
          NUM={
            !isLoading && {
              num: 1,
            }
          }
          acItem={acItem}
        />
        {pay && <InvoicesPaymentModal setS={setPay} s={pay} />}
      </Suspense>
    </div>
  );
};

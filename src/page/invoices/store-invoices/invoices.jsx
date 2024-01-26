import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { acActiveThing } from "../../../redux/active";
import { LoadingBtn } from "../../../components/loading/loading";
import { InvoicesModal } from "./invoices.modal";
import { useGetStIngredientsQuery } from "../../../service/ingredient.service";
import { useGetStInvoiceQuery } from "../../../service/invoices.service";
import { CalculateTotalP } from "../../../service/calc.service";

import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { acNavStatus } from "../../../redux/navbar.status";
import { UniversalFilterBox } from "../../../components/filter/filter";

export const StorageInvoices = () => {
  const [sort, setSort] = useState({ id: null, state: false });
  const [checked, setChecked] = useState(false);
  const [checkedData, setCheckedData] = useState([]);
  const [showMore, setShowMore] = useState(null);
  const acItem = useSelector((state) => state.activeThing);
  const dispatch = useDispatch();
  const { data: ingredientData = [] } = useGetStIngredientsQuery();
  const { data: invoiceData = [], isLoading } = useGetStInvoiceQuery();
  React.useEffect(() => {
    dispatch(acNavStatus([0, 1, 2, 3, 6, 7, 9, 15]));
  }, [dispatch]);

  const getProduct = (item, status) => {
    const isChecked = checkedData?.some((i) => i.id === item?.id);
    if (status === 0) {
      setCheckedData((prevData) => prevData?.filter((i) => i.id !== item?.id));
      return;
    }
    if (isChecked) {
      setCheckedData((prevData) =>
        prevData?.map((i) => (i.id === item?.id ? item : i))
      );
    } else {
      setCheckedData((prevData) => [...prevData, item]);
    }
  };

  const headerKeys = [
    { name: "Kun", size: "13%" },
    { name: "Ombor", size: "12%" },
    { name: "Yetkazuvchi", size: "11%" },
    { name: "Summa", size: "10%" },
    { name: "To'langan", size: "10%" },
    { name: "Qarzdorlik", size: "12%" },
    { name: "Javobgar", size: "12%" },
    { name: "Tavsif", size: "10%" },
    { name: "Tafsilot", size: "8%" },
  ];

  const displayKeys = [
    { name: "storage", size: "12%" },
    { name: "supplier", size: "11%" },
    { name: "cost", size: "10%", position: "flex-end" },
    { name: "paid", size: "10%", position: "flex-end" },
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
    { name: "name", size: "24%" },
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

  return (
    <div className="storage_container">
      <UniversalFilterBox />
      <div className="storage_body">
        <p>
          <span>To'lovlar</span>
        </p>
        <div className="storage_body_item">
          <label>
            <input
              type="checkbox"
              name="id"
              onClick={() => setChecked(!checked)}
            />
          </label>
          <p>№</p>
          {headerKeys?.map((item) => {
            return (
              <p
                style={{
                  "--data-line-size": item?.size,
                }}
              >
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
              const date = new Date(item?.date).toLocaleDateString("uz-UZ", {
                day: "numeric",
                month: "numeric",
                year: "numeric",
              });
              const ingredient = JSON.parse(item?.ingredients);
              return (
                <div
                  className={
                    showMore === item?.id
                      ? "storage_body__box active"
                      : "storage_body__box"
                  }
                >
                  <div
                    className={
                      acItem === item?.id
                        ? "storage_body_item active"
                        : "storage_body_item"
                    }
                    key={item?.id}
                    onDoubleClick={() =>
                      dispatch(acActiveThing(!acItem?.id ? item : {}))
                    }
                  >
                    <label
                      onClick={() =>
                        dispatch(acActiveThing(!acItem?.id ? item : {}))
                      }
                    >
                      {checked ? (
                        <input type="checkbox" name="id" checked />
                      ) : acItem?.id === item.id ? (
                        <input type="checkbox" name="id" checked />
                      ) : (
                        <input type="checkbox" name="id" />
                      )}
                    </label>
                    <p>{item?.order}</p>
                    <p style={{ "--data-line-size": "13%" }}>{date}</p>
                    {displayKeys?.map((key) => {
                      return (
                        <p
                          style={{
                            "--data-line-size": key?.size,
                            justifyContent: key?.position || "flex-start",
                          }}
                        >
                          {item[key?.name]}
                        </p>
                      );
                    })}
                    <p
                      style={{
                        "--data-line-size": "10%",
                        justifyContent: "center",
                      }}
                      onClick={() =>
                        setShowMore(showMore === item?.id ? null : item?.id)
                      }
                    >
                      <u
                        style={
                          showMore === item?.id ? { color: "#787aff" } : {}
                        }
                      >
                        hisoblash
                      </u>
                    </p>
                    <p
                      style={{
                        "--data-line-size": "8%",
                        justifyContent: "center",
                      }}
                      onClick={() =>
                        setShowMore(showMore === item?.id ? null : item?.id)
                      }
                    >
                      <u
                        style={
                          showMore === item?.id ? { color: "#787aff" } : {}
                        }
                      >
                        tarix
                      </u>
                    </p>
                  </div>
                  <div className=" storage-body_inner_item">
                    <div className="storage_body_item">
                      <p
                        style={{
                          borderRight: "1px solid #ccc5",
                        }}
                      >
                        №
                      </p>
                      {innerHeaderKeys?.map((item) => {
                        return (
                          <p
                            style={{
                              "--data-line-size": item?.size,
                              borderRight: item.border,
                            }}
                          >
                            {item?.name}
                          </p>
                        );
                      })}
                    </div>
                    {ingredient?.map((product, ind) => {
                      return (
                        <div className="storage_body_item inner_item" key={ind}>
                          <p
                            style={{
                              borderRight: "1px solid #ccc5",
                            }}
                          >
                            {ind + 1}
                          </p>
                          {innerDisplayKeys?.map((key) => {
                            return (
                              <p
                                style={{
                                  "--data-line-size": key?.size,
                                  justifyContent: key?.position || "flex-start",
                                }}
                              >
                                {product[key?.name]}
                              </p>
                            );
                          })}
                          <p
                            style={{
                              "--data-line-size": "19%",
                              justifyContent: "flex-end",
                            }}
                          >
                            {product?.price * product?.amount}
                          </p>
                        </div>
                      );
                    })}
                    <div
                      className="storage_body_item inner_item"
                      style={{ background: "#3339" }}
                    >
                      <p></p>
                      <p style={{ "--data-line-size": "66%" }}>Jami mablag'</p>
                      <p
                        style={{
                          "--data-line-size": "30%",
                          justifyContent: "flex-end",
                        }}
                      >
                        {CalculateTotalP(ingredient, "price", "amount")}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      <InvoicesModal
        data={ingredientData?.data}
        checkedData={checkedData}
        setCheckedData={setCheckedData}
        getProduct={getProduct}
        NUM={
          !isLoading && {
            num:
              JSON.parse(invoiceData?.data ? invoiceData?.data[0]?.order : 0) +
              1,
          }
        }
      />
    </div>
  );
};

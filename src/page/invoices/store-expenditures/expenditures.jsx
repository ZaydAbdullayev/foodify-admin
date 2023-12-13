import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { acActive } from "../../../redux/active";
import { LoadingBtn } from "../../../components/loading/loading";
import { InvoicesModal } from "./expenditures.modal";
import { useGetStorageItemsQuery } from "../../../service/invoices.service";
import { useGetStExpenditureQuery } from "../../../service/expenditures.service";

import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

export const StorageExpenditures = () => {
  const [sort, setSort] = useState({ id: null, state: false });
  const [checked, setChecked] = useState(false);
  const [checkedData, setCheckedData] = useState([]);
  const [showMore, setShowMore] = useState(null);
  const [id, setId] = useState(0);
  const acItem = useSelector((state) => state.active);
  const dispatch = useDispatch();
  const { data: ingredientData = [] } = useGetStorageItemsQuery(id);
  const { data: invoiceData = [], isLoading } = useGetStExpenditureQuery();

  const getProduct = (item, status) => {
    const isChecked = checkedData.some((i) => i.id === item?.id);
    if (status === 0) {
      setCheckedData((prevData) => prevData.filter((i) => i.id !== item?.id));
      return;
    }
    if (isChecked) {
      setCheckedData((prevData) =>
        prevData.map((i) => (i.id === item?.id ? item : i))
      );
    } else {
      setCheckedData((prevData) => [...prevData, item]);
    }
  };

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
    { name: "Kun", size: "15.6%" },
    { name: "Ombor", size: "15.6%" },
    { name: "Miqdor", size: "15.6%" },
    { name: "Guruh", size: "15.6%" },
    { name: "Tavsif", size: "15.6%" },
    { name: "Tafsilot", size: "15.6%" },
  ];

  const displayKeys = [
    { name: "storage", size: "15.6%" },
    { name: "cost", size: "15.6%" },
    { name: "group", size: "15.6%" },
    { name: "description", size: "15.6%" },
  ];

  return (
    <div className="storage_container">
      <div className="storage_header"></div>
      <div className="storage_body">
        <p>Chiqimlar</p>
        <div className="storage_body_item">
          <label>
            <input
              type="checkbox"
              name="id"
              onClick={() => setChecked(!checked)}
            />
          </label>
          <p>№</p>
          {headerData.map((item, index) => {
            return (
              <p
                style={{
                  "--data-line-size": item.size,
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                onClick={() =>
                  setSort({
                    id: index,
                    state: !sort.state,
                  })
                }
              >
                {item.name}
                {sort.id === index && sort.state ? (
                  <RiArrowUpSLine className="sort_icon" />
                ) : (
                  <RiArrowDownSLine className="sort_icon" />
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
                    <p style={{ "--data-line-size": "15.6%" }}>{date}</p>
                    {displayKeys.map((key) => {
                      return (
                        <p style={{ "--data-line-size": key.size }}>
                          {item[key.name]}
                        </p>
                      );
                    })}
                    <p
                      style={{
                        "--data-line-size": "15.6%",
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
                      <p
                        style={{
                          "--data-line-size": "35%",
                          borderRight: "1px solid #ccc5",
                        }}
                      >
                        Nomi
                      </p>
                      <p
                        style={{
                          "--data-line-size": "20%",
                          borderRight: "1px solid #ccc5",
                        }}
                      >
                        Narxi
                      </p>
                      <p
                        style={{
                          "--data-line-size": "25%",
                          borderRight: "1px solid #ccc5",
                        }}
                      >
                        Tan Narxi
                      </p>
                      <p style={{ "--data-line-size": "15%" }}>Foyda</p>
                    </div>
                    {item?.data?.map((product, ind) => {
                      return (
                        <div className="storage_body_item inner_item" key={ind}>
                          <p
                            style={{
                              borderRight: "1px solid #ccc5",
                            }}
                          >
                            {ind + 1}
                          </p>
                          <p style={{ "--data-line-size": "35%" }}>
                            {product.name}
                          </p>
                          <p style={{ "--data-line-size": "20%" }}>
                            {product.password}
                          </p>
                          <p style={{ "--data-line-size": "25%" }}>
                            {item?.remain}
                          </p>
                          <p style={{ "--data-line-size": "15%" }}>
                            {item?.total}
                          </p>
                        </div>
                      );
                    })}
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
        setCheckedData={setChecked}
        getProduct={getProduct}
        NUM={!isLoading && { num: JSON.parse(invoiceData[0]?.order) + 1 }}
        setId={setId}
        id={id}
      />
    </div>
  );
};

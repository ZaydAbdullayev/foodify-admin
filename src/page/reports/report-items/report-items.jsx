import React, { useState } from "react";
import "../../storage/storage.css";
import "../universal.css";
import { useSelector, useDispatch } from "react-redux";
import { storageD } from "../../storage/store-data";
import { CalculateTotalQuantity } from "../../../service/calc.service";

import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { LoadingBtn } from "../../../components/loading/loading";
import { acNavStatus } from "../../../redux/navbar.status";
import { UniversalFilterBox } from "../../../components/filter/filter";

export const ReportItems = () => {
  const [sort, setSort] = useState({ id: null, state: false });
  const [showMore, setShowMore] = useState(null);
  const acItem = useSelector((state) => state.activeThing);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(acNavStatus([0, 3, 6, 7, 15]));
  }, [dispatch]);
  const isLoading = false;
  const sortData = storageD.sort((a, b) => {
    if (sort.state) {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  //   const sortData =
  //     storeData?.data &&
  //     [...storeData?.data]?.sort((a, b) => {
  //       if (sort.state) {
  //         return a.name.localeCompare(b.name);
  //       } else {
  //         return b.name.localeCompare(a.name);
  //       }
  //     });

  const headerData = [
    { name: "№", size: "4%" },
    { name: "Nomi", size: "14%" },
    { name: "Soni", size: "6%", position: 1 },
    {
      name: "Narxi",
      size: "19%",
      position: 1,
      items: { a_price: "O'rtalamasi", qty: "Narxi" },
    },
    {
      name: "Tan narxi",
      size: "19%",
      position: 1,
      items: { a_price: "O'rtalamasi", qty: "Narxi" },
    },
    {
      name: "Foyda",
      size: "19%",
      position: 1,
      items: { a_price: "O'rtalamasi", qty: "Narxi" },
    },
    { name: "O'rtalama narx o'sishi", size: "12%", position: 2 },
    { name: "Tafsilot", size: "7%" },
  ];

  const displayKeys = [
    { name: "dep", size: "14%", position: 1 },
    { name: "remain", size: "6%", position: 1 },
    { name: "items", size: "19%", position: 1 },
    { name: "items", size: "19%", position: 1 },
    { name: "items", size: "19%", position: 1 },
    { name: "profit", size: "12%", position: 2, tick: "%" },
  ];

  const displayTotalKeys = [
    { name: "name", size: "14%", position: 1, tittle: "Jami" },
    { name: "remain", size: "6%", position: 1, flex: 1 },
    { name: "items", size: "19%", position: 1 },
    { name: "items", size: "19%", position: 1, flex: 1 },
    { name: "items", size: "19%", position: 1 },
    { name: "profit", size: "12%", position: 2, tick: "%", flex: 1 },
  ];

  return (
    <div className="storage_container">
      <UniversalFilterBox />
      <div className="storage_body">
        <p>
          <span>Taomlar uchun hisobot</span>
        </p>
        <div className="storage_body_item reports_item">
          {headerData?.map((item, index) => {
            return (
              <label
                onClick={() => setSort({ id: 1, state: !sort.state })}
                style={{
                  "--data-line-size": item.size,
                  justifyContent: item?.position
                    ? item?.position === 1
                      ? "center"
                      : "flex-end"
                    : "flex-start",
                }}
                key={index}
              >
                <p>{item.name}</p>
                {item?.items && (
                  <>
                    <span>
                      {item?.items?.a_price}
                      {sort.id === 1 && sort.state ? (
                        <RiArrowUpSLine />
                      ) : (
                        <RiArrowDownSLine />
                      )}
                    </span>
                    <span>
                      {item?.items?.qty}
                      {sort.id === 1 && sort.state ? (
                        <RiArrowUpSLine />
                      ) : (
                        <RiArrowDownSLine />
                      )}
                    </span>
                  </>
                )}
              </label>
            );
          })}
        </div>
        <div className="storage_body_box">
          {isLoading ? (
            <span className="loader_box relative">
              <LoadingBtn />
            </span>
          ) : (
            sortData?.map((item, index) => {
              return (
                <div
                  className={
                    showMore === item.id
                      ? "storage_body__box active"
                      : "storage_body__box"
                  }
                  key={item.id}
                  style={{ color: item.profit < 0 ? "#f07167" : "" }}
                >
                  <div
                    className={
                      acItem === item.id
                        ? "storage_body_item active"
                        : "storage_body_item"
                    }
                  >
                    <p style={{ "--data-line-size": "4%" }}>{index + 1}</p>
                    {displayKeys?.map((displayKey, index) => (
                      <p
                        key={index}
                        style={{
                          "--data-line-size": displayKey.size,
                          justifyContent: displayKey.position
                            ? displayKey.position === 1
                              ? "center"
                              : "flex-end"
                            : "flex-start",
                        }}
                      >
                        {displayKey?.name === "items" ? (
                          <>
                            <span className="reports_span">
                              {item?.items?.a_price}
                            </span>
                            <span className="reports_span">
                              {item?.items?.qty}
                            </span>
                          </>
                        ) : (
                          <>
                            {item[displayKey?.name]}
                            {displayKey?.tick}
                          </>
                        )}
                      </p>
                    ))}
                    <p
                      style={{
                        "--data-line-size": "7%",
                        justifyContent: "center",
                      }}
                      onClick={() =>
                        setShowMore(showMore === item.id ? null : item.id)
                      }
                    >
                      <u
                        style={showMore === item.id ? { color: "#787aff" } : {}}
                      >
                        ovqatlar
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
                        <div className="storage_body_item inner_item">
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
                            {item.remain}
                          </p>
                          <p style={{ "--data-line-size": "15%" }}>
                            {item.total}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
          <div className={"storage_body_item"} style={{ background: "#3339" }}>
            <p style={{ "--data-line-size": "4%" }}></p>
            {displayTotalKeys?.map((displayKey, index) => (
              <p
                key={index}
                style={{
                  "--data-line-size": displayKey.size,
                  justifyContent: displayKey.position
                    ? displayKey.position === 1
                      ? "center"
                      : "flex-end"
                    : "flex-start",
                }}
              >
                {displayKey?.tittle}
                {displayKey?.name === "items" ? (
                  <>
                    <span className="reports_span"></span>
                    <span className="reports_span">{0}</span>
                  </>
                ) : (
                  displayKey.flex &&
                  CalculateTotalQuantity(storageD, displayKey?.name)
                )}
                {displayKey?.tick}
              </p>
            ))}
            <p
              style={{
                "--data-line-size": "7%",
                justifyContent: "center",
              }}
            ></p>
          </div>
        </div>
      </div>
    </div>
  );
};

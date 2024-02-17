import React, { useState } from "react";
import "../../storage/storage.css";
import "../universal.css";
import { useSelector, useDispatch } from "react-redux";
import { CalculateTotalQuantity } from "../../../service/calc.service";
// import { useGetAllFoodReportQuery } from "../../../service/s-products.service";
import { useGetFoodReportQuery } from "../../../service/s-products.service";
import { CalculateTotalCH } from "../../../service/calc.service";
import { useLocation } from "react-router-dom";
import { useFetchDataQuery } from "../../../service/api.service";

import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { LoadingBtn } from "../../../components/loading/loading";
import { acNavStatus } from "../../../redux/navbar.status";
import { UniversalFilterBox } from "../../../components/filter/filter";

export const ReportOneItems = () => {
  const user = JSON.parse(localStorage.getItem("user"))?.user || {};
  const [sort, setSort] = useState({ id: null, state: false });
  const [showMore, setShowMore] = useState(null);
  const acItem = useSelector((state) => state.activeThing);
  const search = useSelector((state) => state.uSearch);
  const id = useLocation().pathname.split("/").pop();
  // const { data: fetch1 } = useFetchDataQuery({
  //   url: `get/foodReport/${user?.user?.id}/${search.date?.start}/${search.date?.end}/${id}`,
  //   tags: ["report"],
  // });
  // const { data: fetch2 } = useFetchDataQuery({
  //   url: `get/generatedReport/${user?.user?.id}/${search.date?.start}/${search.date?.end}`,
  //   tags: ["all-report"],
  // });
  const { data = [], isLoading } = useGetFoodReportQuery({
    ...search.date,
    id: id,
  });
  console.log(data);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(acNavStatus([0, 6, 7, 10, 11, 12, 15]));
  }, [dispatch]);

  // const ds = [
  //   {
  //     id: "344418b2",
  //     payment_status: 1,
  //     receivedAt: "2024-02-15T10:54:05.000Z",
  //     closed_at: "2024-02-14T19:00:00.000Z",
  //     worker_name: "owner",
  //     table_name: "1",
  //     quantity: 2,
  //     sale_price: {
  //       average_price: "22000",
  //       total: 44000,
  //     },
  //     prime_cost: {
  //       average_price: "1700",
  //       total: 3400,
  //     },
  //     profit: {
  //       average_price: "20300",
  //       total: 40600,
  //     },
  //     percentage: "1194.12",
  //   },
  // ];

  const headerData = [
    { name: "№", size: "4%" },
    { name: "Turi", size: "5.8%" },
    { name: "Ochildi", size: "5.8%", position: 1 },
    { name: "Yopildi", size: "5.8%", position: 1 },
    { name: "Offitsant", size: "5.8%", position: 1 },
    { name: "Xona/Stoll", size: "5.8%", position: 1 },
    { name: "Soni", size: "5.8%", position: 1 },
    {
      name: "Narxi",
      size: "17%",
      position: 1,
      items: { a_price: "O'rtalamasi", qty: "Narxi" },
    },
    {
      name: "Tan narxi",
      size: "17%",
      position: 1,
      items: { a_price: "O'rtalamasi", qty: "Narxi" },
    },
    {
      name: "Foyda",
      size: "17%",
      position: 1,
      items: { a_price: "O'rtalamasi", qty: "Narxi" },
    },
    { name: "O'rtalama narx o'sishi", size: "10%", position: 2 },
  ];

  const displayKeys = [
    { name: "payment_status", size: "5.8%", position: 1 },
    { name: "receivedAt", size: "5.8%", position: 1 },
    { name: "closed_at", size: "5.8%", position: 1 },
    { name: "worker_name", size: "5.8%", position: 1 },
    { name: "table_name", size: "5.8%", position: 1 },
    { name: "quantity", size: "17%", position: 1 },
    { name: "sale_price", size: "17%", position: 1, child: true },
    { name: "prime_cost", size: "17%", position: 1, child: true },
    { name: "profit", size: "17%", position: 1, child: true },
    { name: "percentage", size: "10%", position: 2, tick: "%" },
  ];

  const displayTotalKeys = [
    { name: "payment_status", size: "5.8%", position: 1, tittle: "Jami" },
    { name: "receivedAt", size: "5.8%", position: 1 },
    { name: "closed_at", size: "5.8%", position: 1 },
    { name: "worker_name", size: "5.8%", position: 1 },
    { name: "table_name", size: "5.8%", position: 1 },
    { name: "quantity", size: "5.8%", position: 1, flex: 1 },
    { name: "sale_price", size: "17%", position: 1, child: true },
    { name: "prime_cost", size: "17%", position: 1, flex: 1, child: true },
    { name: "profit", size: "17%", position: 1, child: true },
    { name: "percentage", size: "10%", position: 2, tick: "%", flex: 1 },
  ];

  return (
    <div className="storage_container">
      <UniversalFilterBox />
      <div className="storage_body">
        <p>
          <span>Taomlar uchun hisobot</span>
        </p>
        <div className="storage_body_item reports_item _item-header">
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
            data?.data?.map((item, index) => {
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
                    {displayKeys?.map(
                      ({ size, position, name, tick, child }, index) => (
                        <p
                          key={index}
                          style={{
                            "--data-line-size": size,
                            justifyContent: position
                              ? position === 1
                                ? "center"
                                : "flex-end"
                              : "flex-start",
                          }}
                        >
                          {child ? (
                            <>
                              <span className="reports_span">
                                {item?.[name]?.average_price}
                              </span>
                              <span className="reports_span">
                                {item?.[name]?.total}
                              </span>
                            </>
                          ) : (
                            <>
                              {item[name]}
                              {tick}
                            </>
                          )}
                        </p>
                      )
                    )}
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
            {displayTotalKeys?.map(
              ({ size, position, tittle, name, flex, tick, child }, index) => (
                <p
                  key={index}
                  style={{
                    "--data-line-size": size,
                    justifyContent: position
                      ? position === 1
                        ? "center"
                        : "flex-end"
                      : "flex-start",
                  }}
                >
                  {tittle}
                  {child ? (
                    <>
                      <span className="reports_span">{}</span>
                      <span className="reports_span">
                        {CalculateTotalCH(data?.data, name, "total")}
                      </span>
                    </>
                  ) : (
                    flex && CalculateTotalQuantity(data?.data, name)
                  )}
                  {tick}
                </p>
              )
            )}
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

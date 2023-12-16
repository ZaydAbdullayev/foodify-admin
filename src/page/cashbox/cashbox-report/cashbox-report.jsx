import React, { useState } from "react";
import "../cash-universal.css";
import { useSelector, useDispatch } from "react-redux";
import { acActive } from "../../../redux/active";
import { LoadingBtn } from "../../../components/loading/loading";
import { useGetStInvoiceQuery } from "../../../service/invoices.service";
import { NumericFormat } from "react-number-format";

import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

export const TransactionRapor = () => {
  const [sort, setSort] = useState({ id: null, state: false });
  const [checked, setChecked] = useState(false);
  const acItem = useSelector((state) => state.active);
  const dispatch = useDispatch();
  const { data: invoiceData = [], isLoading } = useGetStInvoiceQuery();

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
    { name: "Turi", size: "10.7%" },
    { name: "Naqd pul", size: "10.7%" },
    { name: "Hisob raqami", size: "10.7%" },
    { name: "Plastik karta", size: "10.7%" },
    { name: "Qarz", size: "10.7%" },
    { name: "Depozit", size: "10.7%" },
    { name: "To'lanmagan", size: "10.7%" },
    { name: "Online to'lov", size: "10.7%" },
    { name: "Jami", size: "10.7%" },
  ];

  const displayKeys = [
    { name: "storage", size: "10.7%" },
    { name: "cost", size: "10.7%", position: "flex-end" },
    { name: "cost", size: "10.7%", position: "flex-end" },
    { name: "cost", size: "10.7%", position: "flex-end" },
    { name: "cost", size: "10.7%", position: "flex-end" },
    { name: "cost", size: "10.7%", position: "flex-end" },
    { name: "cost", size: "10.7%", position: "flex-end" },
    { name: "cost", size: "10.7%", position: "flex-end" },
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
                  justifyContent: "center",
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
            sortData?.map((item, index) => {
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
                    <p>{index + 1}</p>
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
                    <p style={{ "--data-line-size": "10.7%" }}></p>
                  </div>
                  <div className="storage_body_item">
                    <p></p>
                    <p>Oxirgi yangilanish - 11:44 da</p>
                  </div>
                  <div className="storage_body_report">
                    <div className="report_item">
                      <pre className="_header">
                        <p>Hello</p>
                        <NumericFormat
                          value={9262923}
                          displayType="text"
                          thousandSeparator=" "
                        />
                      </pre>
                      {sortData?.map((inner, index) => {
                        return (
                          <div className="_body__item">
                            <p style={{ "--data-line-size": "30%" }}>
                              {index + 1}
                            </p>
                            <p style={{ "--data-line-size": "30%" }}>
                              {inner?.storage}
                            </p>
                            <NumericFormat
                              style={{
                                "--data-line-size": "25%",
                                justifyContent: "flex-end",
                              }}
                              value={item.cost}
                              displayType="text"
                              thousandSeparator=" "
                            />
                            <p
                              style={{
                                "--data-line-size": "15%",
                                justifyContent: "center",
                              }}
                            >
                              <u>tafsilot</u>
                            </p>
                          </div>
                        );
                      })}
                    </div>
                    <div className="report_item">
                      <pre className="_header">
                        <p>Hello</p>
                        <NumericFormat
                          value={9262923}
                          displayType="text"
                          thousandSeparator=" "
                        />
                      </pre>
                      {sortData?.map((inner, index) => {
                        return (
                          <div className="_body__item">
                            <p style={{ "--data-line-size": "30%" }}>
                              {index + 1}
                            </p>
                            <p style={{ "--data-line-size": "30%" }}>
                              {inner?.storage}
                            </p>
                            <NumericFormat
                              style={{
                                "--data-line-size": "25%",
                                justifyContent: "flex-end",
                              }}
                              value={item.cost}
                              displayType="text"
                              thousandSeparator=" "
                            />
                            <p
                              style={{
                                "--data-line-size": "15%",
                                justifyContent: "center",
                              }}
                            >
                              <u>tafsilot</u>
                            </p>
                          </div>
                        );
                      })}
                    </div>
                    <div className="report_daily"></div>
                    <div className="report_dep"></div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

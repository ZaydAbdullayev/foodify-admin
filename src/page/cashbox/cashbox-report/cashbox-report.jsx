import React, { useState } from "react";
import "../cash-universal.css";
import { useSelector, useDispatch } from "react-redux";
import { acActive } from "../../../redux/active";
import { LoadingBtn } from "../../../components/loading/loading";
import { NumericFormat } from "react-number-format";
import AnimatedNumber from "animated-number-react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { useGetTransactionQuery } from "../../../service/transaction-rapor.service";
import { useGetTransactionExpenseQuery } from "../../../service/transaction-rapor.service";
import { useGetTransactionIncomeQuery } from "../../../service/transaction-rapor.service";
import {
  CalculateTotal,
  CalculateTotalQuantity,
} from "../../../service/calc.service";
import { CalculateTotalByLine } from "../../../service/calc.service";
import { data } from "../../../components/modal-calc/components";
import { acNavStatus } from "../../../redux/navbar.status";

export const TransactionRapor = () => {
  const [sort, setSort] = useState({ id: null, state: false });
  const acItem = useSelector((state) => state.active);
  const search = useSelector((state) => state.uSearch);
  const dispatch = useDispatch();
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState({
    start: today,
    end: today,
  });
  const { data: trData = [], isLoading } = useGetTransactionQuery(date);
  const { data: trExpenseData = [] } = useGetTransactionExpenseQuery(date);
  const { data: trIncomeData = [] } = useGetTransactionIncomeQuery(date);
  dispatch(acNavStatus([0, 6, 7, 15]));
  let total = 0;
  const startOfDay = 2142322;

  const headerData = [
    { name: "Turi", size: "11.3%" },
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
    { name: "type", size: "11.3%" },
    { name: "cash", size: "10.7%", position: "flex-end" },
    { name: "credit", size: "10.7%", position: "flex-end" },
    { name: "click", size: "10.7%", position: "flex-end" },
    { name: "dept", size: "10.7%", position: "flex-end" },
    { name: "depozit", size: "10.7%", position: "flex-end" },
    { name: "not_paid", size: "10.7%", position: "flex-end" },
    { name: "online_income", size: "10.7%", position: "flex-end" },
  ];

  const displayTotalKeys = [
    { name: "type", tick: "Jami balans", size: "11.3%" },
    { name: "cash", size: "10.7%", position: "flex-end", flex: true },
    { name: "credit", size: "10.7%", position: "flex-end", flex: true },
    { name: "click", size: "10.7%", position: "flex-end", flex: true },
    { name: "dept", size: "10.7%", position: "flex-end", flex: true },
    { name: "depozit", size: "10.7%", position: "flex-end", flex: true },
    { name: "not_paid", size: "10.7%", position: "flex-end", flex: true },
    { name: "online_income", size: "10.7%", position: "flex-end", flex: true },
  ];

  const report = {
    startOfDay: startOfDay,
    income: CalculateTotal(data, "transaction"),
    expense: CalculateTotal(data, "transaction"),
    balance:
      2142322 +
      CalculateTotal(data, "transaction") -
      CalculateTotal(data, "transaction"),
    endOfDay:
      2142322 +
      CalculateTotal(data, "transaction") -
      CalculateTotal(data, "transaction") +
      startOfDay,
  };

  return (
    <div className="storage_container">
      <div className="storage_header"></div>
      <div className="storage_body">
        <p>Tranzaksiyalar hisoboti</p>
        <div className="storage_body_item">
          <p>№</p>
          {headerData?.map((item, index) => {
            return (
              <p
                key={index + 1}
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
            trData?.data?.map((item, index) => {
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
                      dispatch(acActive(!acItem?.id ? item : null))
                    }
                  >
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
                          {item[key?.name] || 0}
                        </p>
                      );
                    })}
                    <p
                      style={{
                        "--data-line-size": "10.7%",
                        justifyContent: "flex-end",
                      }}
                    >
                      {CalculateTotalByLine(trData?.data, "type")}
                    </p>
                  </div>
                </div>
              );
            })
          )}
          <div className={"storage_body_item"} style={{ background: "#3339" }}>
            <p></p>
            {displayTotalKeys?.map((displayKey, index) => (
              <p
                key={index}
                style={{
                  "--data-line-size": displayKey.size,
                  justifyContent: displayKey.position || "flex-start",
                }}
              >
                {displayKey.tick}
                {displayKey.flex &&
                  CalculateTotalQuantity(trData?.data, displayKey?.name)}
              </p>
            ))}
            <p
              style={{
                "--data-line-size": "10.7%",
                justifyContent: "flex-end",
              }}
            >
              {(total += CalculateTotalByLine(trData?.data, "type"))}
            </p>
          </div>
          <div className="storage_body_item" style={{ background: "#3339" }}>
            <p style={{ border: "none" }}></p>
            <p
              style={{
                "--data-line-size": "90%",
                justifyContent: "flex-start",
              }}
            >
              Oxirgi yangilanish - {trData?.time}
            </p>
          </div>
        </div>
        <div className="storage_body_report">
          <div className="report_item">
            <pre className="_header">
              <p>Kirim</p>
              <AnimatedNumber
                value={CalculateTotal(data, "transaction")}
                formatValue={(value) =>
                  value.toFixed(0).replace(/\d(?=(\d{3})+$)/g, "$&,")
                }
              />
            </pre>
            {data?.map((inner, index) => {
              return (
                <div className="_body__item" key={index}>
                  <p>{inner?.name}</p>
                  <div className="_body__item_details">
                    {inner?.transaction?.map((tr) => {
                      return (
                        <div className="_details__item" key={tr?.id}>
                          <p>{tr.name}</p>
                          <NumericFormat
                            value={CalculateTotalQuantity(tr?.details, "price")}
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
                </div>
              );
            })}
          </div>
          <div className="report_item">
            <pre className="_header">
              <p>Chiqim</p>
              <AnimatedNumber
                value={CalculateTotal(data, "transaction")}
                formatValue={(value) =>
                  value.toFixed(0).replace(/\d(?=(\d{3})+$)/g, "$&,")
                }
              />
            </pre>
            {data?.map((inner, index) => {
              return (
                <div className="_body__item" key={index}>
                  <p>{inner?.name}</p>
                  <div className="_body__item_details">
                    {inner?.transaction?.map((tr) => {
                      return (
                        <div className="_details__item" key={tr?.id}>
                          <p>{tr.name}</p>
                          <NumericFormat
                            value={CalculateTotalQuantity(tr?.details, "price")}
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
                </div>
              );
            })}
          </div>
          <div className="report_item big_fs">
            <div className="report_daily">
              <p>Kunning boshida</p>
              <i></i>
              <AnimatedNumber
                value={report?.startOfDay}
                formatValue={(value) =>
                  value.toFixed(0).replace(/\d(?=(\d{3})+$)/g, "$&,")
                }
              />
            </div>
            <div className="report_daily">
              <p>Kirim</p>
              <i></i>
              <AnimatedNumber
                value={report?.income}
                formatValue={(value) =>
                  value.toFixed(0).replace(/\d(?=(\d{3})+$)/g, "$&,")
                }
              />
            </div>
            <div className="report_daily">
              <p>Chiqim</p>
              <i></i>
              <AnimatedNumber
                value={report?.expense}
                formatValue={(value) =>
                  value.toFixed(0).replace(/\d(?=(\d{3})+$)/g, "$&,")
                }
              />
            </div>
            <div className="report_daily">
              <p>Kunning balansi</p>
              <i></i>
              <AnimatedNumber
                value={report?.balance}
                formatValue={(value) =>
                  value.toFixed(0).replace(/\d(?=(\d{3})+$)/g, "$&,")
                }
              />
            </div>
            <div className="report_daily">
              <p>Kunning oxirida</p>
              <i></i>
              <AnimatedNumber
                value={report?.endOfDay}
                formatValue={(value) =>
                  value.toFixed(0).replace(/\d(?=(\d{3})+$)/g, "$&,")
                }
              />
            </div>
            <div className="report_daily pdt">
              <p>Qarz</p>
              <i></i>
              <AnimatedNumber
                value={report?.debt || 0}
                formatValue={(value) =>
                  value.toFixed(0).replace(/\d(?=(\d{3})+$)/g, "$&,")
                }
              />
            </div>
            <div className="report_daily pdt">
              <p>To'langan qarzlar</p>
              <i></i>
              <AnimatedNumber
                value={report?.paid_debt || 0}
                formatValue={(value) =>
                  value.toFixed(0).replace(/\d(?=(\d{3})+$)/g, "$&,")
                }
              />
            </div>
          </div>
          <div className="report_item">
            <h3>Bo'limlar</h3>
            <div className="report_daily">
              <p>Oshxona</p>
              <i></i>
              <NumericFormat
                value={324234}
                displayType="text"
                thousandSeparator=","
              />
            </div>
            <div className="report_daily">
              <p>Bar</p>
              <i></i>
              <NumericFormat
                value={324234}
                displayType="text"
                thousandSeparator=","
              />
            </div>
            <div className="report_daily">
              <p>Ombor</p>
              <i></i>
              <NumericFormat
                value={324234}
                displayType="text"
                thousandSeparator=","
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

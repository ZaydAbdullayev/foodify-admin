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
import { useGetBalanceQuery } from "../../../service/transaction-rapor.service";
import { CalculateTotalQuantity } from "../../../service/calc.service";
import { CalculateTotal } from "../../../service/calc.service";
import { CalculateTotalByLine } from "../../../service/calc.service";
import { acNavStatus } from "../../../redux/navbar.status";
import { UniversalFilterBox } from "../../../components/filter/filter";

export const TransactionRapor = () => {
  const [sort, setSort] = useState({ id: null, state: false });
  const acItem = useSelector((state) => state.active);
  const search = useSelector((state) => state.uSearch);
  const dispatch = useDispatch();
  const { data: trData = [], isLoading } = useGetTransactionQuery(search?.date);
  const { data: trExpData = [] } = useGetTransactionExpenseQuery(search?.date);
  const { data: trIncData = [] } = useGetTransactionIncomeQuery(search?.date);
  const { data: balance = [] } = useGetBalanceQuery(search?.date);
  React.useEffect(() => {
    dispatch(acNavStatus([0, 6, 7, 15]));
  }, [dispatch]);
  let total = 0;

  console.log(trData?.data);
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
    startOfDay: balance?.data,
    income: CalculateTotal(trIncData?.data, "transactions"),
    expense: CalculateTotal(trExpData?.data, "transactions"),
    balance:
      CalculateTotal(trIncData?.data, "transactions") -
      CalculateTotal(trExpData?.data, "transactions"),
    endOfDay:
      CalculateTotal(trIncData?.data, "transactions") -
      CalculateTotal(trExpData?.data, "transactions") +
      balance?.data,
  };

  return (
    <div className="storage_container">
      <UniversalFilterBox />
      <div className="storage_body">
        <p>
          <span>Tranzaksiyalar hisoboti</span>
        </p>
        <div className="storage_body_item">
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
            trData?.data?.map((item, index) => {
              console.log(CalculateTotalByLine(trData.data, "type"));
              return (
                <div className={"storage_body__box"} key={index}>
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
                value={CalculateTotal(trIncData?.data, "transactions")}
                formatValue={(value) =>
                  value.toFixed(0).replace(/\d(?=(\d{3})+$)/g, "$&,")
                }
              />
            </pre>
            {trIncData?.data?.map((inner, index) => {
              return (
                <div className="_body__item" key={index}>
                  <p>{inner?.transaction_group}</p>
                  <div className="_body__item_details">
                    {inner?.transactions?.map((tr, ind) => {
                      return (
                        <div className="_details__item" key={tr?.id}>
                          <p>{tr?.payment_type}</p>
                          <NumericFormat
                            value={CalculateTotalQuantity(
                              tr?.details,
                              "amount"
                            )}
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
                value={CalculateTotal(trExpData?.data, "transactions")}
                formatValue={(value) =>
                  value.toFixed(0).replace(/\d(?=(\d{3})+$)/g, "$&,")
                }
              />
            </pre>
            {trExpData?.data?.map((inner, index) => {
              return (
                <div className="_body__item" key={index + 543}>
                  <p>{inner?.transaction_group}</p>
                  <div className="_body__item_details">
                    {inner?.transactions?.map((tr, ind) => {
                      return (
                        <div className="_details__item" key={tr?.id}>
                          <p>{tr?.payment_type}</p>
                          <NumericFormat
                            value={CalculateTotalQuantity(
                              tr?.details,
                              "amount"
                            )}
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

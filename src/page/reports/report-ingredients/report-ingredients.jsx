import React, { useState, useEffect } from "react";
import "../../storage/storage.css";
import "../universal.css";
import { useDispatch } from "react-redux";
import { CalculateTotalQuantity } from "../../../service/calc.service";
import { acNavStatus } from "../../../redux/navbar.status";
import { useNavigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import { Tooltip } from "antd";

import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { LoadingBtn } from "../../../components/loading/loading";
import { UniversalFilterBox } from "../../../components/filter/filter";
import { useFetchDataQuery } from "../../../service/fetch.service";
import { useSearchAppParams } from "../../../hooks/useSearchParam";

export const ReportIngredients = () => {
  const today = new Date().toISOString().split("T")[0];
  const [sort, setSort] = useState({ id: null, state: false });
  const [showMore, setShowMore] = useState([]);
  const { pair } = useSearchAppParams().getAllParams()
  const { data: ing = [], isLoading } = useFetchDataQuery({ url: `ingredientsReport/${pair?.storage}/${pair?.start || today}/${pair?.end || today}`, tags: ["category"], });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => { dispatch(acNavStatus([0, 6, 7, 15, 9, 13])); }, [dispatch]);

  const sortData = ing?.data && [...ing?.data]?.sort((a, b) => {
    if (sort.state) {
      return a.name?.localeCompare(b.name);
    } else {
      return b.name?.localeCompare(a.name);
    }
  });

  const headerData = [
    { name: "Nomi", size: "11%" },
    { name: "O'lchov birligi", size: "6%" },
    { name: "Oxirgi envantarizatsiya", size: "10%" },
    { name: "Ilk narx", size: "8%" },
    { name: "Ilk miqdor", size: "7%" },
    { name: "Kirimlar", size: "7%" },
    { name: "Chiqimlar", size: "7%" },
    { name: "Oxirgi miqdor", size: "7%" },
    { name: "Narxi", size: "8%" },
    { name: "Miqdor", size: "10%" },
    { name: "Tafsilot", size: "8%" },
    { name: "Taomlar", size: "8%" },
  ];

  const displayKeys = [
    { name: "item_name", size: "11%", border: "none" },
    { name: "unit", size: "6%", position: "center" },
    { name: "last_sync", size: "10%", position: "center", short: true },
    { name: "price_begin_period", size: "8%", position: "flex-end", n: true },
    { name: "start_quantity", size: "7%", position: "flex-end", n: true },
    { name: "total_income", size: "7%", position: "flex-end", n: true, t: 'income_details' },
    { name: "total_expense", size: "7%", position: "flex-end", n: true, t: 'expense_details' },
    { name: "end_quantity", size: "7%", position: "flex-end", n: true },
    { name: "price_end_period", size: "8%", position: "flex-end", n: true },
    { name: "total_price", size: "10%", position: "flex-end", n: true },
  ];

  const displayTotalKeys = [
    { name: "Umumiy", size: "11%", position: "center", tick: "Umumiy" },
    { name: "remain", size: "6%", position: "center", tick: ing?.data?.length },
    { name: "remain", size: "10%", },
    { name: "remain", size: "8%", },
    { name: "remain", size: "7%", },
    { name: "remain", size: "7%", },
    { name: "remain", size: "7%", },
    { name: "remain", size: "7%", },
    { name: "remain", size: "8%", },
    { name: "total_price", size: "10%", position: "flex-end", flex: 1 },
    { name: "remain", size: "8%", },
    { name: "remain", size: "8%", },
  ];

  const renderTooltipText = (data) => {
    const keys = Object.keys(data)
    return (<p style={{ fontSize: "12px" }}>
      {keys.map((key, index) => {
        return <span className="w100 df aic jcsb" key={index}>{key}: {data[key]}</span>
      })}
    </p>)
  }

  return (
    <div className="storage_container">
      <UniversalFilterBox />
      <div className="storage_body">
        <p>
          <span>Mahsulotlar uchun hisobot</span>
        </p>
        <div className="storage_body_item _item-header">
          <p style={{ inlineSize: "var(--univslH)" }}>№</p>
          {headerData?.map((item, index) => {
            return (
              <label
                onClick={() => setSort({ id: 1, state: !sort.state })}
                style={{ "--data-line-size": item.size, border: "none" }}
                key={index}
                aria-label="sort data for down of otp or top of down">
                <p>{item.name}</p>
                {sort.id === 1 && sort.state ? (
                  <RiArrowUpSLine />
                ) : (
                  <RiArrowDownSLine />
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
                  className={showMore?.includes(item?.item_id) ? "storage_body__box active" : "storage_body__box"}
                  key={item?.item_id}
                  style={{ color: item.profit < 0 ? "#f07167" : "" }}>
                  <div className={"storage_body_item"}>
                    <p style={{ inlineSize: "var(--univslH)" }}>{index + 1}</p>
                    {displayKeys?.map(({ name, size, position, short, n, t }, ind) => {
                      return t ?
                        <Tooltip title={renderTooltipText(item?.[t])} color={"#353535"} key={ind} placement="bottom">
                          <p style={{
                            "--data-line-size": size,
                            justifyContent: position || "flex-start",
                          }}>
                            {item[name]}
                          </p>
                        </Tooltip> : <p
                          key={ind}
                          style={{
                            "--data-line-size": size,
                            justifyContent: position || "flex-start",
                          }}>
                          {short ? item[name]?.split(" ")?.[0] : n ?
                            <NumericFormat value={item[name]} displayType="text" thousandSeparator="," /> : item[name]}
                        </p>
                    })}
                    <p
                      style={{ "--data-line-size": "8%", justifyContent: "center", }}
                      onClick={() =>
                        navigate(`/get-full-report/${pair?.storage}/${item.item_id}/${pair?.start || today}/${pair?.end || today}?storage=${item?.st1_name}&item=${item?.item_name}&income=${item.total_income}&expense=${item.total_expense}&start=${item.start_quantity}&end=${item.end_quantity}&last=${item.last_sync}`)
                      }>
                      <u style={{ color: "#787aff" }}>tafsilot</u>
                    </p>
                    <p
                      style={{ "--data-line-size": "8%", justifyContent: "center", }}
                      onClick={() =>
                        setShowMore((prev) => prev?.includes(item?.item_id) ? prev?.filter((el) => el !== item?.item_id) : [...prev, item?.item_id])
                      }>
                      <u
                        style={showMore?.includes(item?.item_id) ? { color: "#787aff" } : {}}>
                        taomlar
                      </u>
                    </p>
                  </div>
                  {showMore?.includes(item?.item_id) && (
                    <div className=" storage-body_inner_item">
                      <div className="storage_body_item">
                        <p
                          style={{
                            borderRight: "1px solid #ccc5",
                          }}>
                          №
                        </p>
                        <p
                          style={{
                            "--data-line-size": "35%",
                            borderRight: "1px solid #ccc5",
                          }}>
                          Nomi
                        </p>
                        <p
                          style={{
                            "--data-line-size": "20%",
                            borderRight: "1px solid #ccc5",
                          }}>
                          Narxi
                        </p>
                        <p
                          style={{
                            "--data-line-size": "25%",
                            borderRight: "1px solid #ccc5",
                          }}>
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
                              }}>
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
                  )}
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
                }}>
                {displayKey.tick}
                {displayKey.flex && CalculateTotalQuantity(sortData, displayKey?.name)}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

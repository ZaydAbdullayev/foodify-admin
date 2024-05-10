import React, { useState } from "react";
import "../../storage/storage.css";
import "../universal.css";
import { useSelector, useDispatch } from "react-redux";
import { storageD } from "../../storage/store-data";
import { CalculateTotalQuantity } from "../../../service/calc.service";
import { acNavStatus } from "../../../redux/navbar.status";

import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { LoadingBtn } from "../../../components/loading/loading";
import { UniversalFilterBox } from "../../../components/filter/filter";
import { useFetchDataQuery } from "../../../service/fetch.service";

export const ReportRejects = () => {
  const [sort, setSort] = useState({ id: null, state: false });
  const [showMore, setShowMore] = useState([]);
  const acItem = useSelector((state) => state.activeThing);
  const res_id = useSelector((state) => state.res_id);
  const { start, end } = useSelector((state) => state.uSearch)?.date;
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(acNavStatus([0, 3, 6, 7, 15]));
  }, [dispatch]);
  const { data: rejectFood = [], isLoading } = useFetchDataQuery({
    url: `/get/rejectedFoodsFull/${res_id}/${start}/${end}`,
    tags: ["report"],
  });

  const sortData =
    rejectFood?.data &&
    [...rejectFood?.data]?.sort((a, b) => {
      if (sort.state) {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

  const headerData = [
    { name: "Nomi", size: "18%" },
    { name: "Miqdor", size: "10.2%" },
    { name: "Narx", size: "10.2%" },
    { name: "Tan Narx", size: "10.2%" },
    { name: "Foyda", size: "10.2%" },
    { name: "Jami narxi", size: "10.2%" },
    { name: "Jami tan narxi", size: "10.2%" },
    { name: "Jami foyda", size: "10.2%" },
    { name: "Tafsilot", size: "8%" },
  ];

  const displayKeys = [
    { name: "name", size: "18%", border: "none" },
    { name: "quantity", size: "10.2%", position: 2 },
    { name: "price", size: "10.2%", position: 2 },
    { name: "cost", size: "10.2%", position: 2 },
    { name: "profit", size: "10.2%", position: 2 },
    { name: "totalPrice", size: "10.2%", position: 2, tick: "%" },
    { name: "totalCost", size: "10.2%", position: 2 },
    { name: "totalProfit", size: "10.2%", position: 2 },
  ];

  const displayTotalKeys = [
    { name: "Umumiy", size: "18%", position: 0, tick: "Umumiy" },
    { name: "quantity", size: "10.2%", position: 2, flex: 1 },
    { name: "remain", size: "10.2%", position: 2 },
    { name: "remain", size: "10.2%", position: 2 },
    { name: "remain", size: "10.2%", position: 2 },
    { name: "totalPrice", size: "10.2%", position: 2, flex: 1 },
    { name: "totalCost", size: "10.2%", position: 2, flex: 1 },
    { name: "totalProfit", size: "10.2%", position: 2, flex: 1 },
  ];

  return (
    <div className="storage_container">
      <UniversalFilterBox />
      <div className="storage_body">
        <p>
          <span>Bekor qilingan taomlar</span>
        </p>
        <div className="storage_body_item _item-header">
          <p style={{ inlineSize: "var(--univslH)" }}>№</p>
          {headerData?.map((item, index) => {
            return (
              <label
                onClick={() => setSort({ id: 1, state: !sort.state })}
                style={{ "--data-line-size": item.size, border: "none" }}
                key={index}
                aria-label="sort data down of top or top of down">
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
                  className={
                    showMore?.includes(item?.id)
                      ? "storage_body__box active"
                      : "storage_body__box"
                  }
                  key={item.id}>
                  <div
                    className={
                      acItem === item.id
                        ? "storage_body_item active"
                        : "storage_body_item"
                    }>
                    <p style={{ inlineSize: "var(--univslH)" }}>{index + 1}</p>
                    {displayKeys?.map(({ name, size, position }, ind) => (
                      <p
                        key={ind}
                        style={{
                          "--data-line-size": size,
                          justifyContent: position
                            ? position === 1
                              ? "center"
                              : "flex-end"
                            : "flex-start",
                        }}>
                        {item[name]} {item.tick}
                      </p>
                    ))}
                    <p
                      style={{
                        "--data-line-size": "8%",
                        justifyContent: "center",
                      }}
                      onClick={() =>
                        setShowMore((prev) =>
                          prev?.includes(item?.id)
                            ? prev?.filter((id) => id !== item?.id)
                            : [...prev, item?.id]
                        )
                      }>
                      <u
                        style={
                          showMore?.includes(item?.id)
                            ? { color: "#787aff" }
                            : {}
                        }>
                        tafsilot
                      </u>
                    </p>
                  </div>
                </div>
              );
            })
          )}
          {sortData?.length > 0 && (
            <div className="storage_body_item" style={{ background: "#3339" }}>
              <p style={{ border: "none" }}></p>
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
                  }}>
                  {displayKey.tick}
                  {displayKey.flex &&
                    CalculateTotalQuantity(sortData, displayKey?.name)}
                </p>
              ))}
              <p
                style={{
                  "--data-line-size": "8%",
                  justifyContent: "center",
                }}></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

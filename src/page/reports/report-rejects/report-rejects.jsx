import React, { useState } from "react";
import "../../storage/storage.css";
import "../universal.css";
import { useSelector } from "react-redux";
import { storageD } from "../../storage/store-data";
import { useGetStCategoryQuery } from "../../../service/category.service";
import { CalculateTotalQuantity } from "../../../service/calc.service";

import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { LoadingBtn } from "../../../components/loading/loading";

export const ReportRejects = () => {
  const [sort, setSort] = useState({ id: null, state: false });
  const [showMore, setShowMore] = useState(null);
  const acItem = useSelector((state) => state.active);
  const { data: storeData = [] } = useGetStCategoryQuery();
  console.log(storeData);
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
    { name: "dep", size: "18%", border: "none" },
    { name: "remain", size: "10.2%", position: 2 },
    { name: "remain", size: "10.2%", position: 2 },
    { name: "remain", size: "10.2%", position: 2 },
    { name: "remain", size: "10.2%", position: 2 },
    { name: "remain", size: "10.2%", position: 1, tick: "%" },
    { name: "remain", size: "10.2%", position: 2 },
    { name: "remain", size: "10.2%", position: 2 },
  ];

  const displayTotalKeys = [
    { name: "Umumiy", size: "18%", position: 1, tick: "Umumiy" },
    { name: "remain", size: "10.2%", position: 2, flex: 1 },
    { name: "remain", size: "10.2%", position: 2 },
    { name: "remain", size: "10.2%", position: 2 },
    { name: "remain", size: "10.2%", position: 2 },
    { name: "remain", size: "10.2%", position: 2, flex: 1 },
    { name: "remain", size: "10.2%", position: 2, flex: 1 },
    { name: "profit", size: "10.2%", position: 2, flex: 1 },
  ];

  return (
    <div className="storage_container">
      <div className="storage_header"></div>
      <div className="storage_body">
        <p>Bekor qilingan buyurtmalar</p>
        <div className="storage_body_item">
          <p>№</p>
          {headerData?.map((item, index) => {
            return (
              <label
                onClick={() => setSort({ id: 1, state: !sort.state })}
                style={{ "--data-line-size": item.size, border: "none" }}
                key={index}
              >
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
                    showMore === item.id
                      ? "storage_body__box active"
                      : "storage_body__box"
                  }
                  key={item.id}
                >
                  <div
                    className={
                      acItem === item.id
                        ? "storage_body_item active"
                        : "storage_body_item"
                    }
                  >
                    <p>{index + 1}</p>
                    {displayKeys?.map(({ name, size, position }) => (
                      <p
                        key={name}
                        style={{
                          "--data-line-size": size,
                          justifyContent: position
                            ? position === 1
                              ? "center"
                              : "flex-end"
                            : "flex-start",
                        }}
                      >
                        {item[name]} {item.tick}
                      </p>
                    ))}
                    <p
                      style={{
                        "--data-line-size": "8%",
                        justifyContent: "center",
                      }}
                      onClick={() =>
                        setShowMore(showMore === item.id ? null : item.id)
                      }
                    >
                      <u
                        style={showMore === item.id ? { color: "#787aff" } : {}}
                      >
                        tafsilot
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
            <p></p>
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
                {displayKey.tick}
                {displayKey.flex &&
                  CalculateTotalQuantity(storageD, displayKey?.name)}
              </p>
            ))}
            <p
              style={{
                "--data-line-size": "8%",
                justifyContent: "center",
              }}
            ></p>
          </div>
        </div>
      </div>
    </div>
  );
};

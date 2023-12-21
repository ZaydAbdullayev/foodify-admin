import React, { useState } from "react";
import "../../storage/storage.css";
import "../universal.css";
import { useSelector, useDispatch } from "react-redux";
import { acActive } from "../../../redux/active";
import { storageD } from "../../storage/store-data";
import { useGetStCategoryQuery } from "../../../service/category.service";

import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { LoadingBtn } from "../../../components/loading/loading";
import { acNavStatus } from "../../../redux/navbar.status";

export const ReportOrders = () => {
  const [sort, setSort] = useState({ id: null, state: false });
  const [checked, setChecked] = useState(false);
  const [showMore, setShowMore] = useState(null);
  const acItem = useSelector((state) => state.active);
  const dispatch = useDispatch();
  dispatch(acNavStatus([0, 3, 6, 7, 15]));
  const { data: storeData = [], isLoading } = useGetStCategoryQuery();
  console.log(storeData);

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
    { name: "Turi", size: "3.7%" },
    { name: "Olindi", size: "9.3%" },
    { name: "Yopildi", size: "9.3%" },
    { name: "Offitsant", size: "9.3%" },
    { name: "Stoll", size: "3.8%" },
    { name: "Buyurtma narxi", size: "9.3%" },
    { name: "Tan narx", size: "9.3%" },
    { name: "Foyda", size: "9.3%" },
    { name: "Xizmat", size: "5.1%" },
    { name: "Chegirma", size: "9.3%" },
    { name: "Jami narx", size: "9.3%" },
    { name: "Olindi", size: "9.3%" },
    { name: "Tafsilot", size: "8%" },
  ];

  const displayKeys = [
    { name: "remain", size: "3.7%" },
    { name: "remain", size: "9.3%" },
    { name: "remain", size: "9.3%" },
    { name: "remain", size: "9.3%" },
    { name: "remain", size: "3.8%" },
    { name: "remain", size: "9.3%", position: 2 },
    { name: "remain", size: "9.3%", position: 2 },
    { name: "remain", size: "9.3%", position: 2 },
    { name: "remain", size: "5.1%", position: 1, tick: "%" },
    { name: "remain", size: "9.3%", position: 2 },
    { name: "remain", size: "9.3%", position: 2 },
    { name: "dep", size: "9.3%", position: 2 },
  ];

  return (
    <div className="storage_container">
      <div className="storage_header"></div>
      <div className="storage_body">
        <p>Buyurtmalar uchun hisobot</p>
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
              <label
                onClick={() => setSort({ id: 1, state: !sort.state })}
                style={{ "--data-line-size": item.size }}
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
                    onDoubleClick={() =>
                      dispatch(
                        acActive({
                          id: !acItem.id ? item.id : null,
                          name: !acItem.name ? item.name : "",
                          category: !acItem.category ? item.category : "",
                        })
                      )
                    }
                  >
                    <label
                      onClick={() =>
                        dispatch(
                          acActive({
                            id: !acItem.id ? item.id : null,
                            name: !acItem.name ? item.name : "",
                            category: !acItem.category ? item.category : "",
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
        </div>
      </div>
    </div>
  );
};

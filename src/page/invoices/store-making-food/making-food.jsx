import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { acActive } from "../../../redux/active";
import { LoadingBtn } from "../../../components/loading/loading";
import { InvoicesModal } from "./making-food.modal";
import { useGetStIngredientsQuery } from "../../../service/ingredient.service";
import { useGetStInvoiceQuery } from "../../../service/invoices.service";
import { useGetMakedFoodQuery } from "../../../service/making-food.service";

import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

export const InvoicesMakingFood = () => {
  const [sort, setSort] = useState({ id: null, state: false });
  const [checked, setChecked] = useState(false);
  const [checkedData, setCheckedData] = useState([]);
  const [showMore, setShowMore] = useState(null);
  const acItem = useSelector((state) => state.active);
  const dispatch = useDispatch();
  const { data: ingredientData = [] } = useGetStIngredientsQuery();
  const { data: makedFood = [], isLoading } = useGetMakedFoodQuery();

  const getProduct = (item, status) => {
    const isChecked = checkedData?.some((i) => i.id === item?.id);
    if (status === 0) {
      setCheckedData((prevData) => prevData?.filter((i) => i.id !== item?.id));
      return;
    }
    if (isChecked) {
      setCheckedData((prevData) =>
        prevData?.map((i) => (i.id === item?.id ? item : i))
      );
    } else {
      setCheckedData((prevData) => [...prevData, item]);
    }
  };

  const sortData =
    makedFood?.message &&
    [...makedFood?.message].sort((a, b) => {
      if (sort?.state) {
        return a?.name?.localeCompare(b?.name);
      } else {
        return b?.name?.localeCompare(a?.name);
      }
    });

  const headerData = [
    { name: "Kun", size: "12%" },
    { name: "Mahsulot", size: "12%" },
    { name: "Bekor q/n ombor", size: "12%" },
    { name: "Qabul q/n ombor", size: "12%" },
    { name: "Soni", size: "10%" },
    { name: "Narxi", size: "10%" },
    { name: "Jami", size: "10%" },
    { name: "Tavsif", size: "9%", position: "center" },
    { name: "Tafsilot", size: "8%", position: "center" },
  ];

  const displayKeys = [
    { name: "food_id", size: "12%" },
    { name: "storage_sender", size: "12%" },
    { name: "storage_receiver", size: "12%" },
    { name: "amount", size: "10%", position: "flex-end" },
    { name: "total_price", size: "10%", position: "flex-end" },
    { name: "total_price", size: "10%", position: "flex-end" },
    { name: "description", size: "9%" },
  ];

  return (
    <div className="storage_container">
      <div className="storage_header"></div>
      <div className="storage_body">
        <p>Mahsulot tayyorlash</p>
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
                  justifyContent: item?.position || "flex-start",
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
                    <p style={{ "--data-line-size": "12%" }}>{date}</p>
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
                    <p
                      style={{
                        "--data-line-size": "8%",
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
        NUM={
          !isLoading && {
            num:
              JSON.parse(
                makedFood?.message ? makedFood?.message[0]?.order : 0
              ) + 1,
          }
        }
      />
    </div>
  );
};

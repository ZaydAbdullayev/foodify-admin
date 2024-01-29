import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { acActive } from "../../../redux/active";
import { LoadingBtn } from "../../../components/loading/loading";
import { InvoicesModal } from "./pre-order.modal";
import { useGetStProductQuery } from "../../../service/s-products.service";
import { useGetPreOrderQuery } from "../../../service/pre-order.service";
import { CalculateTotalQuantity } from "../../../service/calc.service";

import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { acNavStatus } from "../../../redux/navbar.status";
import { UniversalFilterBox } from "../../../components/filter/filter";

export const InvoicePreOrders = () => {
  const [sort, setSort] = useState({ id: null, state: false });
  const [checked, setChecked] = useState(false);
  const [checkedData, setCheckedData] = useState([]);
  const [showMore, setShowMore] = useState(null);
  const acItem = useSelector((state) => state.active);
  const dispatch = useDispatch();
  const { data: ingredientData = [] } = useGetStProductQuery();
  const { data: preOrder = [], isLoading } = useGetPreOrderQuery();
  React.useEffect(() => {
    dispatch(acNavStatus([0, 1, 2, 3, 6, 7, 9, 15]));
  }, [dispatch]);

  const getProduct = (item, status) => {
    const isChecked = checkedData.some((i) => i.id === item?.id);
    if (status === 0) {
      setCheckedData((prevData) => prevData.filter((i) => i.id !== item?.id));
      return;
    }
    if (isChecked) {
      setCheckedData((prevData) =>
        prevData.map((i) => (i.id === item?.id ? item : i))
      );
    } else {
      setCheckedData((prevData) => [...prevData, item]);
    }
  };

  const sortData =
    preOrder?.data &&
    [...preOrder?.data]?.sort((a, b) => {
      if (sort.state) {
        return a?.name?.localeCompare(b.name);
      } else {
        return b?.name?.localeCompare(a.name);
      }
    });

  const headerData = [
    { name: "Sana", size: "14%" },
    { name: "Narx", size: "20%" },
    { name: "Javobgar", size: "22%" },
    { name: "Tavsif", size: "28%" },
    { name: "Tafsilot", size: "10%" },
  ];

  const displayKeys = [
    { name: "cost", size: "20%", position: "flex-end" },
    { name: "responsible", size: "22%" },
    { name: "description", size: "28%" },
  ];

  const innerHeaderData = [
    { name: "№", border: "1px solid #ccc5" },
    { name: "Nomi", size: "30%", border: "1px solid #ccc5" },
    { name: "Narxi", size: "25%", border: "1px solid #ccc5" },
    { name: "Tan narx", size: "20%", border: "1px solid #ccc5" },
    { name: "Foyda", size: "21%" },
  ];

  const innerDisplayKeys = [
    { name: "name", size: "30%", border: "1px solid #ccc5" },
    {
      name: "price",
      size: "25%",
      position: "flex-end",
      border: "1px solid #ccc5",
      amount: true,
    },
    {
      name: "prime_cost",
      size: "20%",
      position: "flex-end",
      border: "1px solid #ccc5",
      amount: true,
    },
    {
      name: "profit",
      size: "21%",
      position: "flex-end",
      amount: true,
    },
  ];

  return (
    <div className="storage_container">
      <UniversalFilterBox />
      <div className="storage_body">
        <p>
          <span>Oldindan buyurtmalar</span>
        </p>
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
                  justifyContent: item?.position,
                }}
                onClick={() => {
                  setSort({ id: index, state: !sort.state });
                }}
              >
                {item?.name}
                {sort.id === index &&
                  (sort.state ? <RiArrowUpSLine /> : <RiArrowDownSLine />)}
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
              const innerData = JSON.parse(item?.ingredients);
              return (
                <div
                  key={item?.id}
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
                    <p
                      style={{
                        "--data-line-size": "14%",
                        justifyContent: "center",
                      }}
                    >
                      {date}
                    </p>
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
                        "--data-line-size": "10%",
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
                    <div
                      className="storage_body_item"
                      style={{ background: "#3339" }}
                    >
                      {innerHeaderData?.map((item, index) => {
                        return (
                          <p
                            key={index}
                            style={{
                              "--data-line-size": item?.size,
                              borderRight: item?.border,
                            }}
                          >
                            {item?.name}
                          </p>
                        );
                      })}
                    </div>
                    {innerData?.map((product, ind) => {
                      return (
                        <div className="storage_body_item inner_item" key={ind}>
                          <p
                            style={{
                              borderRight: "1px solid #ccc5",
                            }}
                          >
                            {ind + 1}
                          </p>
                          {innerDisplayKeys?.map((key, index) => {
                            return (
                              <p
                                key={index}
                                style={{
                                  "--data-line-size": key?.size,
                                  justifyContent: key?.position || "flex-start",
                                  borderRight: key?.border,
                                }}
                              >
                                {key.amount && `${product.amount} x`}{" "}
                                {product[key?.name]}
                              </p>
                            );
                          })}
                        </div>
                      );
                    })}
                    <div
                      className="storage_body_item inner_item"
                      style={{ background: "#3339" }}
                    >
                      <p></p>
                      <p
                        style={{
                          "--data-line-size": "30%",
                          borderRight: "1px solid #ccc5",
                        }}
                      >
                        Jami:
                      </p>
                      <p
                        style={{
                          "--data-line-size": "25%",
                          justifyContent: "flex-end",
                          borderRight: "1px solid #ccc5",
                        }}
                      >
                        {CalculateTotalQuantity(innerData, "price", "amount")}
                      </p>
                      <p
                        style={{
                          "--data-line-size": "20%",
                          justifyContent: "flex-end",
                          borderRight: "1px solid #ccc5",
                        }}
                      >
                        {CalculateTotalQuantity(
                          innerData,
                          "prime_cost",
                          "amount"
                        )}
                      </p>
                      <p
                        style={{
                          "--data-line-size": "21%",
                          justifyContent: "flex-end",
                        }}
                      >
                        {CalculateTotalQuantity(innerData, "profit", "amount")}
                      </p>
                    </div>
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
            num: JSON.parse(preOrder?.data ? preOrder?.data[0]?.order : 0) + 1,
          }
        }
      />
    </div>
  );
};

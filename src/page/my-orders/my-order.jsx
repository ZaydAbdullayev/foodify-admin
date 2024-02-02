import React, { useState } from "react";
import "./my-order.css";
import { useGetOrderByStatusQuery } from "../../service/order.service";
import { NumericFormat } from "react-number-format";
import { useSwipeable } from "react-swipeable";

import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";

export const MyOrder = () => {
  const { data: order = [] } = useGetOrderByStatusQuery();
  const [dr, setDr] = useState("center");
  console.log(order);

  const handlers = useSwipeable({
    onSwipedLeft: () => setDr(dr === "left" ? "center" : "right"),
    onSwipedRight: () => setDr(dr === "right" ? "center" : "left"),
    trackMouse: true,
  });

  return (
    <div className="my-order-main">
      <p>Mening buyurtmalarim</p>
      <div className="my-order-display-box" {...handlers}>
        <MyOrderDisplay
          header={"Tayyorlanayotgan Buyurtmalar"}
          data={order?.innerData?.[1] || []}
        />
        <MyOrderDisplay
          header={"Tayyor Buyurtmalar"}
          data={order?.innerData?.[2] || []}
        />
        <MyOrderDisplay
          header={"Yopilgan Buyurtmalar"}
          data={order?.innerData?.[3] || []}
        />
      </div>
    </div>
  );
};

export const MyOrderDisplay = ({ header, data }) => {
  const [sort, setSort] = useState({ id: null, state: false });

  return (
    <div className="my-order-display">
      <p>{header}</p>
      {data?.map((item) => {
        const pds = JSON.parse(item?.product_data);
        const products = Object.values(pds)[0].pd;
        const p_i_c = products.length;
        return (
          <div
            className={
              sort === item.id
                ? "my-order-display-item active"
                : "my-order-display-item"
            }
            onClick={() => setSort(sort === item.id ? null : item.id)}
            key={item.id}
          >
            <div className="_item-frame">
              <p style={{ "--my-order-w": "20%" }}>
                {item?.address?.split("&")[1]}
              </p>
              <p style={{ "--my-order-w": "30%" }}>
                {item?.received_at || "2024-01-02"}
              </p>
              <NumericFormat
                value={item?.total}
                style={{
                  "--my-order-w": "25%",
                  textAlign: "center",
                }}
                thousandSeparator=","
                displayType="text"
              />
              <NumericFormat
                value={item?.service}
                style={{ "--my-order-w": "20%", textAlign: "center" }}
                thousandSeparator=","
                displayType="text"
              />
              <span>
                {sort === item.id ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
              </span>
            </div>
            <div
              className="_item-tool"
              style={{ "--item-tool-c": sort === item.id ? p_i_c : 0 }}
            >
              {products?.map((p) => {
                return (
                  <div key={p?.id}>
                    <p>
                      {p?.quantity}x {p?.name}
                    </p>
                    <NumericFormat
                      value={p?.price * p?.quantity}
                      thousandSeparator=","
                      displayType="text"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

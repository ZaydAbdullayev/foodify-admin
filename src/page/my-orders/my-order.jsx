import React from "react";
import "./my-order.css";

import { GiHotMeal } from "react-icons/gi";
import { IoMdDoneAll } from "react-icons/io";

export const MyOrder = () => {
  return (
    <div className="my-order-main">
      <h1>Mening buyurtmalarim</h1>
      <div className="my-order-display-box"></div>
    </div>
  );
};

export const MyOrderDisplay = ({ header, data }) => {
  return (
    <div className="my-order-display">
      <p>{header}</p>
      {data?.map((item) => (
        <div className="my-order-display-item">
          <p>&? stoll</p>
          <p>Buyurtma raqami</p>
          <p>Buyurtma sanasi</p>
          <p>Buyurtma summasi</p>
          <p>Usluga</p>
          <p>
            <i
              style={{
                background: item?.status === 3 ? "#6a994a" : "#fc0",
              }}
            >
              {item?.status === 3 ? <IoMdDoneAll /> : <GiHotMeal />}
            </i>
          </p>
        </div>
      ))}
    </div>
  );
};

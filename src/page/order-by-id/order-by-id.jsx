import React from "react";
import "./order-by-id.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetOrderQuery } from "../../service/order.service";
import io from "socket.io-client";
import { NumericFormat } from "react-number-format";

import { GiHotMeal } from "react-icons/gi";
import { BiSolidTimer } from "react-icons/bi";
import { IoMdDoneAll } from "react-icons/io";
import { LoadingBtn } from "../../components/loading/loading";

// const socket = io("https://backup.foodify.uz");
// const socket = io("http://localhost:80");
const socket = io("https://bvtrj1n0-80.euw.devtunnels.ms");

export const OrderById = () => {
  const location = useLocation().pathname;
  const id = location.split("/").pop();
  const navigate = useNavigate();
  const newLocation = location.split("/orders/tables").join("");
  const { data = [], isLoading } = useGetOrderQuery(id);
  let queue;
  let firstID;

  const finish = () => {
    const uData = {
      id: id,
      status: 0,
    };
    socket.emit("/update/table", uData);
    navigate("/orders/tables");
  };

  console.log(data);

  return (
    <div className="order_box">
      {isLoading ? (
        <span className="loader_box">
          <LoadingBtn />
        </span>
      ) : (
        data?.innerData?.map((item) => {
          const p_data = JSON.parse(item?.product_data || "[]");
          const product_data = Object.values(p_data)[0]?.pd;
          queue = Object.keys(p_data)[0];

          return product_data?.map((item) => {
            return (
              <div className="order_box__item" key={item.id}>
                <p>{item.name}</p>
                <p>{item?.quantity}x</p>
                <NumericFormat
                  value={item?.price * item?.quantity}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={" so'm"}
                />
                <i className="item_status">
                  {item.status === 1 ? (
                    <span>
                      <BiSolidTimer
                        style={{ fontSize: "var(--fs3)", marginTop: "20px" }}
                      />
                      <GiHotMeal />
                    </span>
                  ) : (
                    <span>
                      <IoMdDoneAll />
                    </span>
                  )}
                </i>
              </div>
            );
          });
        })
      )}
      <div className="order-footer">
        <button onClick={() => navigate(`/payment/check/${id}`)}>
          Check chiqarish
        </button>
        <button
          onClick={() =>
            navigate(
              `/update-order${newLocation}/${data?.innerData[0]?.id}/${queue}`
            )
          }
        >
          Buyutma qo'shish
        </button>
        <button onClick={() => finish()}>Hisobni yakunlash</button>
      </div>
    </div>
  );
};

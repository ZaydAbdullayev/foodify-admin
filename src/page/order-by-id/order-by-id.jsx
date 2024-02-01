import React from "react";
import "./order-by-id.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetpOrderQuery } from "../../service/user.service";
import { NumericFormat } from "react-number-format";
import socket from "../../socket.config";

import { GiHotMeal } from "react-icons/gi";
import { BiSolidTimer } from "react-icons/bi";
import { IoMdDoneAll } from "react-icons/io";
import { LoadingBtn } from "../../components/loading/loading";

export const OrderById = () => {
  const user = JSON.parse(localStorage.getItem("user"))?.user || null;
  const location = useLocation().pathname;
  const lc = location.split("/");
  const t_id = lc[4].split("-").pop();
  const navigate = useNavigate();
  const newLocation = location.split("/orders/tables").join("");
  const { data = [], isLoading } = useGetpOrderQuery(lc[5]);
  let queue;

  const finish = () => {
    const uData = {
      id: t_id,
      status: 0,
      location: lc[3],
      res_id: user?.id,
      worker_id: "",
    };
    socket.emit("/update/table", uData);
    navigate("/orders/tables");
  };

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
        <button onClick={() => finish()}>Hisobni yakunlash</button>
        <button
          onClick={() =>
            navigate(
              `/update-order${newLocation}/${data?.innerData[0]?.id}/${queue}`
            )
          }
        >
          Buyutma qo'shish
        </button>
        <button>Buyurtmani o'tkazish</button>
      </div>
    </div>
  );
};

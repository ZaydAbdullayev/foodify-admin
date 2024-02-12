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
import { useGetWaitersQuery } from "../../service/workers.service";

export const OrderById = () => {
  const user = JSON.parse(localStorage.getItem("user"))?.user || null;
  const location = useLocation().pathname;
  const [open, setOpen] = React.useState(false);
  const lc = location.split("/");
  const t_id = lc[4].split("-").pop();
  const navigate = useNavigate();
  const newLocation = location.split("/orders/tables").join("");
  const { data = [], isLoading } = useGetpOrderQuery(lc[5]);
  let queue;
  let order_id;

  const finish = () => {
    const uData = {
      id: t_id,
      status: 0,
      location: lc[3],
      res_id: user?.id,
      worker_id: "",
    };
    socket.emit("/update/table", uData);
    socket.emit("/close/order", { id: order_id });
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
          order_id = item?.id;

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
        <button onClick={() => setOpen(true)}>Buyurtmani o'tkazish</button>
      </div>
      <TransactionWaiter
        data={[]}
        open={open}
        setOpen={setOpen}
        t_id={t_id}
        res_id={user?.id}
        lc={lc[3]}
      />
    </div>
  );
};

export const TransactionWaiter = ({ open, setOpen, t_id, res_id, lc }) => {
  const { data = [] } = useGetWaitersQuery();
  const [option, setOption] = React.useState(data?.innerData?.[0]?.id);

  const updateOrder = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const value = Object.fromEntries(formData.entries());
    const uData = {
      id: t_id,
      location: lc,
      status: 2,
      res_id: res_id,
      worker_id: value?.worker,
    };
    socket.emit("/update/table", uData);
    console.log(uData);
  };
  return (
    <div className={open ? "u_modal_container open" : "u_modal_container"}>
      <div className="u_modal_box">
        <form className="resolve_item" onSubmit={updateOrder}>
          <p>Buyurtmani o'tkazish</p>
          <div className="resolve_options">
            {data?.innerData?.map((item) => {
              return (
                <label
                  onClick={() => setOption(item?.id)}
                  className={
                    option === item?.id
                      ? "resolve_option active"
                      : "resolve_option"
                  }
                  key={item.id}
                >
                  <input type="radio" name="worker" value={item?.id} />
                  <span style={{ textTransform: "capitalize" }}>
                    {item?.name}
                  </span>
                </label>
              );
            })}
          </div>
          <div className="resolve_options resolve_btn_box">
            <button type="button" onClick={() => setOpen(false)}>
              Bekor qilish
            </button>
            <button>OK</button>
          </div>
        </form>
      </div>
    </div>
  );
};

import React from "react";
import "./addPayment.css";
import { NumericFormat } from "react-number-format";
import { useGetpOrderQuery } from "../../../service/user.service";
import { useLocation } from "react-router-dom";
import { LoadingBtn } from "../../../components/loading/loading";

import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { BsFillCreditCard2BackFill } from "react-icons/bs";
import { GiCardExchange } from "react-icons/gi";

export const AddPayment = ({ open, setOpen }) => {
  const id = useLocation().search.split("?dt=").pop();
  const { data: order = [], isLoading } = useGetpOrderQuery(id);

  const orderData = order?.innerData;
  const payment_data = orderData && JSON?.parse(orderData?.product_data);

  return (
    <div
      className={
        open ? "add_payment__container open_details" : "add_payment__container"
      }
    >
      <div className="add_payment__box">
        <div className="add_payment__header">
          <pre>
            <p>Payment</p>
            <p>
              <span className="p_name">
                {orderData?.order_type === "Restoran" ? (
                  <span>Table {orderData?.table_name}</span>
                ) : (
                  <span>ID {orderData?.id}</span>
                )}
              </span>
            </p>
          </pre>
          <button>Change</button>
        </div>
        <div className="add_payment__body relative">
          {isLoading ? (
            <LoadingBtn />
          ) : (
            payment_data?.map((item) => {
              return (
                <div className="add_payment__item" key={item?.id}>
                  <p>
                    <span>{item?.quantity} ta</span>
                    <span className="p_name">{item?.name}</span>
                    <NumericFormat
                      value={item?.price}
                      displayType={"text"}
                      thousandSeparator=","
                      suffix={" so'm"}
                    />
                  </p>
                  <div className="change_payment">
                    <button>
                      <FiEdit />
                    </button>
                    <button>
                      <MdDelete />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div className="add_payment__footer">
          <p>
            <span className="p_name">Service (5%)</span>
            <NumericFormat
              value={0}
              displayType={"text"}
              thousandSeparator=","
              suffix={" so'm"}
            />
          </p>
          <p>
            <span className="p_name">Jami</span>
            <NumericFormat
              value={0}
              displayType={"text"}
              thousandSeparator=","
              suffix={" so'm"}
            />
          </p>
          <div className="payment_type">
            <GiCardExchange />
            <span>Pul O'tkazma</span>
          </div>
          <div className="payment_type">
            <BsFillCreditCard2BackFill />
            <span>Pul O'tkazma</span>
          </div>
          <div className="payment_type">
            <GiCardExchange />
            <span>Pul O'tkazma</span>
          </div>
        </div>
      </div>
      <i onClick={() => setOpen(false)}></i>
    </div>
  );
};

const data = {
  id: 654351,
  type: "ofline",
  table: "03",
  status: true,
  payment_data: [
    {
      id: 123456,
      name: "Pizza pishloqli",
      quantity: 2,
      price: 100000,
    },
    {
      id: 153446,
      name: "Do'ner",
      quantity: 2,
      price: 204000,
    },
    {
      id: 765432,
      name: "Lavash",
      quantity: 1,
      price: 34000,
    },
    {
      id: 645352,
      name: "Kokteyl malinali",
      quantity: 1,
      price: 14000,
    },
  ],
};

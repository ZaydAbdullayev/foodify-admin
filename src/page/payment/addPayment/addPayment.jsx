import React, { useState, memo } from "react";
import "./addPayment.css";
import { NumericFormat } from "react-number-format";
import { useGetpOrderQuery } from "../../../service/user.service";
import { useLocation, useNavigate } from "react-router-dom";
import { LoadingBtn } from "../../../components/loading/loading";
import { usePaymentOrderMutation } from "../../../service/user.service";
import { enqueueSnackbar as es } from "notistack";

import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { BsFillCreditCard2BackFill, BsCheckLg } from "react-icons/bs";
import { BsJournalCheck } from "react-icons/bs";
import { GiCardExchange } from "react-icons/gi";
import { FaMoneyBillAlt } from "react-icons/fa";

export const AddPayment = memo(({ open, setOpen }) => {
  const user = JSON.parse(localStorage.getItem("user"))?.user || "";
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState({ id: 1, comment: "Naqd to'lov" }); // ["ofline", "online"]
  const id = useLocation().search.split("?dt=").pop();
  const { data: order = [], isLoading } = useGetpOrderQuery(id);
  const [paymentOrder] = usePaymentOrderMutation();
  const [price, setPrice] = useState(null); // ["ofline", "online"]
  const navigate = useNavigate();

  const addPayment = async (data) => {
    setLoading(true);
    try {
      const res = await paymentOrder(data);
      if (res === 200) {
        es("To'lov qilindi!", { variant: "success" });
      }
      navigate(window.location.pathname + window.location.search, {
        replace: true,
      });

      setOpen(false);
    } catch (error) {
      es(error.response.message, { variant: "warning" });
    } finally {
      setLoading(false);
    }
  };

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
            <span className="p_name">Service (10%)</span>
            <NumericFormat
              value={orderData?.price * 0.1}
              displayType={"text"}
              thousandSeparator=","
              suffix={" so'm"}
            />
          </p>
          <p>
            <span className="p_name">Jami</span>
            <NumericFormat
              value={orderData?.price}
              displayType={"text"}
              thousandSeparator=","
              suffix={" so'm"}
            />
          </p>
          {orderData?.payment_status === 0 ? (
            <>
              <div
                className={
                  type.id === 3 ? "payment_type active" : "payment_type"
                }
                onClick={() => setType({ id: 3, comment: "Click/Payme" })}
              >
                <GiCardExchange />
                <span>Click/Payme</span>
              </div>
              <div
                className={
                  type.id === 2 ? "payment_type active" : "payment_type"
                }
                onClick={() => setType({ id: 2, comment: "Pul o'tkazma" })}
              >
                <BsFillCreditCard2BackFill />
                <span>Karta orqali</span>
              </div>
              <div
                className={
                  type.id === 1 ? "payment_type active" : "payment_type"
                }
                onClick={() => setType({ id: 1, comment: "Naqd to'lov" })}
              >
                <FaMoneyBillAlt />
                <span>Naqd to'lov</span>
              </div>
              <div className="add_payment__button">
                <p>Olindi:</p>
                <input
                  type="number"
                  defaultValue={orderData?.price}
                  onChange={(e) => setPrice(e.target.value)}
                  name="price"
                />
                <span
                  className="relative"
                  onClick={() =>
                    addPayment({
                      id: orderData.id,
                      status: 1,
                      payment_type: type.comment,
                      payment: price ? price : orderData?.price,
                      role: user.department,
                      cashier: user.name,
                    })
                  }
                >
                  {loading ? <LoadingBtn /> : <BsCheckLg />}
                </span>
              </div>
            </>
          ) : (
            <div
              className="payment_type"
              onClick={() => navigate(`/get/check/${orderData?.id}`)}
            >
              <BsJournalCheck />
              <span>Check olish</span>
            </div>
          )}
        </div>
      </div>
      <i onClick={() => setOpen(false)}></i>
    </div>
  );
});

// const data = {
//   id: 654351,
//   type: "ofline",
//   table: "03",
//   status: true,
//   payment_data: [
//     {
//       id: 123456,
//       name: "Pizza pishloqli",
//       quantity: 2,
//       price: 100000,
//     },
//     {
//       id: 153446,
//       name: "Do'ner",
//       quantity: 2,
//       price: 204000,
//     },
//     {
//       id: 765432,
//       name: "Lavash",
//       quantity: 1,
//       price: 34000,
//     },
//     {
//       id: 645352,
//       name: "Kokteyl malinali",
//       quantity: 1,
//       price: 14000,
//     },
//   ],
// };

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

export const AddPayment = memo(({ active, actives }) => {
  const user = JSON.parse(localStorage.getItem("user"))?.user || "";
  const dep = JSON.parse(localStorage.getItem("department")) || "";
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
      console.log("data", data);
      const res = await paymentOrder(data);
      if (res === 200) {
        es("To'lov qilindi!", { variant: "success" });
      }
      if (res.error) {
        es(res.error.data.data, { variant: "warning" });
        console.log(1);
      }
      // navigate(window.location.pathname + window.location.search, {
      //   replace: true,
      // });
      active(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const orderData = order?.innerData ? order?.innerData[0] : [];
  const productdata =
    orderData.product_data && JSON.parse(orderData.product_data);
  const payment_data = productdata
    ? Object.values(productdata)[0]?.pd || []
    : [];

  return (
    <div
      className={
        actives
          ? "add_payment__container open_details"
          : "add_payment__container"
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
              value={orderData?.service}
              displayType={"text"}
              thousandSeparator=","
              suffix={" so'm"}
            />
          </p>
          <p>
            <span className="p_name">Jami</span>
            <NumericFormat
              value={orderData?.total}
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
                  defaultValue={orderData?.total}
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
                      payment: price ? price : orderData?.total,
                      role: dep || "not awaible",
                      cashier: user.username || "not awaible",
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
      <i
        onClick={() => {
          navigate("/financial");
          active(false);
        }}
      ></i>
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

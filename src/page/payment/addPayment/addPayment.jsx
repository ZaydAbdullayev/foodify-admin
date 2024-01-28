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
      // navigate(window.location.pathname + window.location.search, {
      //   replace: true,
      // });

      active(false);
    } catch (error) {
      es(error.response.message, { variant: "warning" });
    } finally {
      setLoading(false);
    }
  };

  // address: "&2-stoll";
  // cashier: "";
  // description: "";
  // food_total: 162000;
  // id: "afaf57e7";
  // latitude: "";
  // longitude: "";
  // online_paymentToken: "token";
  // order_type: "offline";
  // padyezd: "";
  // paid: 0;
  // payment_status: 0;
  // payment_type: "";
  // prime_cost: 24700;
  // product_data: '{"1":{"pd":[{"id":"161efe","name":"sandvich","category":"fast food","storage":"oshxona sklad","price":"22000","res_id":"2899b5","prime_cost":"1700","profit":"20300","markup":"12.94","ingredients":"[{\\"id\\":\\"225081\\",\\"name\\":\\"hamir\\",\\"unit\\":\\"kg\\",\\"group\\":\\"hamir\\",\\"res_id\\":\\"2899b5\\",\\"price\\":0,\\"type\\":\\"Ingredient\\",\\"storage_id\\":null,\\"amount\\":\\"1\\"},{\\"id\\":\\"338b7d\\",\\"name\\":\\"oshko\'k\\",\\"unit\\":\\"ta\\",\\"group\\":\\"ko\'katlar\\",\\"res_id\\":\\"2899b5\\",\\"price\\":500,\\"type\\":\\"Ingredient\\",\\"storage_id\\":\\"1f1a3e\\",\\"amount\\":\\"0.5\\"},{\\"id\\":\\"49c458\\",\\"name\\":\\"salat bargi\\",\\"unit\\":\\"ta\\",\\"group\\":\\"ko\'katlar\\",\\"res_id\\":\\"2899b5\\",\\"price\\":2500,\\"type\\":\\"Ingredient\\",\\"storage_id\\":null,\\"amount\\":\\"0.5\\"},{\\"id\\":\\"d2a4d1\\",\\"name\\":\\"sabzi\\",\\"unit\\":\\"kg\\",\\"group\\":\\"sabzavotlar\\",\\"res_id\\":\\"2899b5\\",\\"price\\":2000,\\"type\\":\\"Ingredient\\",\\"storage_id\\":null,\\"amount\\":\\"0.1\\"}]","date":"2024-01-07T19:00:00.000Z","type":"taom","department":"somsalar","img":"","status":5,"quantity":1},{"id":"5237d6","name":"second test","category":"fast food","storage":"oshxona sklad","price":"20000","res_id":"2899b5","prime_cost":"18000","profit":"2000","markup":"1.11","ingredients":"[{\\"id\\":\\"225081\\",\\"name\\":\\"hamir\\",\\"unit\\":\\"kg\\",\\"group\\":\\"hamir\\",\\"res_id\\":\\"2899b5\\",\\"price\\":1500,\\"type\\":\\"Ingredient\\",\\"storage_id\\":null,\\"amount\\":\\"12\\"}]","date":"2024-01-23T19:00:00.000Z","type":"taom","department":"somsalar","img":"","status":5,"quantity":1},{"id":"672a14","name":"liboyi","category":"fast food","storage":"oshxona sklad","price":"120000","res_id":"2899b5","prime_cost":"5000","profit":"115000","markup":"24.00","ingredients":"[{\\"id\\":\\"1c4a67\\",\\"name\\":\\"piyoz\\",\\"unit\\":\\"kg\\",\\"group\\":\\"sabzavotlar\\",\\"res_id\\":\\"2899b5\\",\\"price\\":1000,\\"type\\":\\"Ingredient\\",\\"storage_id\\":\\"1f1a3e\\",\\"amount\\":\\"2\\"},{\\"id\\":\\"894c2d\\",\\"name\\":\\"kartoshka\\",\\"unit\\":\\"kg\\",\\"group\\":\\"sabzavotlar\\",\\"res_id\\":\\"2899b5\\",\\"price\\":3000,\\"type\\":\\"Ingredient\\",\\"storage_id\\":\\"1f1a3e\\",\\"amount\\":\\"1\\"}]","date":"2024-01-22T19:00:00.000Z","type":"taom","department":"somsalar","img":"","status":5,"quantity":1}]}}';
  // qavat: "";
  // receivedAt: "2024-01-25T13:03:48.000Z";
  // restaurant_id: "2899b5";
  // service: 16200;
  // status: 0;
  // t_location: "ichkari";
  // table_id: "bc6192";
  // table_name: "2";
  // total: 2147483647;
  // user_id: "bc6192";
  // worker_id: "2899b5";
  // worker_name: "owner";

  const orderData = order?.innerData ? order?.innerData[0] : [];
  const productdata = orderData.length
    ? JSON.parse(orderData.product_data)
    : [];
  const payment_data = Object.values(productdata)[0]?.pd;

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
      <i onClick={() => navigate("/financial")}></i>
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

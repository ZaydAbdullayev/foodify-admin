import React, { useState } from "react";
import "./payment.css";
import { useNavigate } from "react-router-dom";
import { AddPayment } from "./addPayment/addPayment";
import { LuArrowLeftRight } from "react-icons/lu";
import { useGetPaymentOrderQuery } from "../../service/user.service";
import { useSelector } from "react-redux";

import noResult from "../../assets/images/20231109_144621.png";

export const Payment = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const search = useSelector((state) => state.search);
  const [date, setDate] = useState({
    start: new Date().toISOString().split("T")[0],
    end: new Date().toISOString().split("T")[0],
  });
  const { data: ordersData = [] } = useGetPaymentOrderQuery(date);

  const getDetails = (id) => {
    navigate(`/payment?dt=${id}`);
    setOpen(true);
  };

  // address: "&3-stoll";
  // description: "";
  // id: "2bf78772";
  // latitude: "";
  // longitude: "";
  // order_type: "Restoran";
  // padyezd: "";
  // payment: "token";
  // price: 54000;
  // product_data: '[{"id":"32a55b6d","name":"Test Bar","price":12000,"img":"https://localhost:8081/add/product/img_f01245ee.jpg","description":"test suv","restaurant":"2899b5","category":"ichimlik","status":2,"department":"bar","quantity":2},{"id":"04a421e6","name":"test bar 1","price":15000,"img":"https://localhost:8081/add/product/img_3be92846.jpg","description":"test suv 1","restaurant":"2899b5","category":"ichimlik","status":2,"department":"bar","quantity":2}]';
  // qavat: "";
  // receivedAt: "2023-11-08T15:03:23.000Z";
  // restaurant_id: "2899b5";
  // status: 3;
  // t_location: "ichkari";
  // table_name: "3";
  // user_id: "c3b530";
  // worker_id: "55cb67";
  // worker_name: "barmen";

  const filteredData = ordersData?.innerData?.filter((item) => {
    return (
      item?.id?.toLowerCase().includes(search?.toLowerCase()) ||
      item?.address
        ?.split("&")
        ?.pop()
        .toLowerCase()
        .includes(search?.toLowerCase())
    );
  });

  return (
    <div className="payment_container">
      <div className="document_header">
        <h1>
          To'lov kiritish {/*<span>({ordersData?.innerData?.length})</span> */}
        </h1>
        <form className="filter_date">
          <label>
            <input
              type="date"
              name="start"
              onChange={(e) => setDate({ ...date, start: e.target.value })}
            />
            <span>{date.start}</span>
          </label>
          <LuArrowLeftRight />
          <label>
            <span>{date.end}</span>
            <input
              type="date"
              name="end"
              onChange={(e) => setDate({ ...date, end: e.target.value })}
            />
          </label>
        </form>
      </div>
      {filteredData !== "No Orders Found" ? (
        filteredData !== "No Orders Found" &&
        filteredData?.map((item, index) => {
          const reverseIndex = filteredData?.length - index;
          const payment_data = JSON?.parse(item?.product_data);
          return (
            <div className="payment_item" key={item.id}>
              <span>{item.order_type}</span>
              <p>
                <span>{item.order_type === "online" ? "ID" : "Stoll"}</span>
                <span className="p_name">
                  {item.order_type === "ofline" ? (
                    <span>{item.table_name}</span>
                  ) : (
                    <span>{item.id}</span>
                  )}
                </span>
                <span>{`#${reverseIndex}`}</span>
              </p>
              <p>
                <span
                  className="p_name"
                  style={{ color: "#eee9", lineHeight: "2.3" }}
                >
                  Status
                </span>
                {item.status === 5 ? (
                  <span style={{ background: "#11b911" }}>To'landi</span>
                ) : (
                  <span style={{ background: "#fe0" }}>To'lanmadi</span>
                )}
              </p>
              <ul className="p_data_box">
                <p>
                  <span>QT</span> <span className="p_name">Menu</span>{" "}
                  <span>price</span>
                </p>
                {payment_data?.map((product) => {
                  return (
                    <li key={product.id}>
                      <span>{product.quantity}</span>
                      <span className="p_name">{product.name}</span>
                      <span>{product.price} so'm</span>
                    </li>
                  );
                })}
              </ul>
              <p style={{ lineHeight: "2" }}>
                <span className="p_name">To'lov narxi</span>
                <span>{item.price || "142455"} so'm</span>
              </p>
              <div className="p_btn__box">
                <button onClick={() => getDetails(item.id)}>Edit</button>
                <button onClick={() => getDetails(item.id)}>Payment</button>
              </div>
            </div>
          );
        })
      ) : (
        <figure className="no_result">
          <img src={noResult} alt="foto" />
        </figure>
      )}
      <AddPayment setOpen={setOpen} open={open} />
    </div>
  );
};

const orderData = [
  {
    id: 654321,
    type: "online",
    status: false,
    payment_data: [
      {
        id: 123456,
        name: "Do'ner",
        quantity: 2,
        price: 200000,
      },
      {
        id: 765432,
        name: "Lavash",
        quantity: 1,
        price: 340000,
      },
      {
        id: 645352,
        name: "Lavash",
        quantity: 1,
        price: 140000,
      },
    ],
  },
  {
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
  },
  {
    id: 908851,
    type: "ofline",
    table: "01",
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
        price: 24000,
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
  },
  {
    id: 554351,
    type: "ofline",
    status: true,
    table: "02",
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
        price: 24000,
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
  },
  {
    id: 123451,
    type: "ofline",
    table: "04",
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
        price: 24000,
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
  },
];

import React, { useState } from "react";
import "./payment.css";
import { useNavigate } from "react-router-dom";
import { AddPayment } from "./addPayment/addPayment";

export const Payment = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const getDetails = (id) => {
    // navigate(`/payment/dt?=${id}`);
    setOpen(true);
  };

  return (
    <div className="payment_container">
      <div className="payment_header">
        <p>To'lov kiritish</p>
        <select name="status">
          <option value="all">Hammasi</option>
          <option value="purchsed">To'langan</option>
          <option value="purchse">To'lanmagan</option>
        </select>
      </div>
      {orderData.map((item) => {
        return (
          <div className="payment_item" key={item.id}>
            <span>{item.type}</span>
            <p>
              <span>{item.type === "online" ? "ID" : "Stoll"}</span>
              <span className="p_name">
                {item.type === "ofline" ? (
                  <span>{item.table}</span>
                ) : (
                  <span>{item.id}</span>
                )}
              </span>
              <span>{item.number || "#6"}</span>
            </p>
            <p>
              <span
                className="p_name"
                style={{ color: "#eee9", lineHeight: "2.3" }}
              >
                Status
              </span>
              {item.status ? (
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
              {item.payment_data.map((product) => {
                return (
                  <li key={product.id}>
                    <span>{product.quantity} ta</span>
                    <span className="p_name">{product.name}</span>
                    <span>{product.price} so'm</span>
                  </li>
                );
              })}
            </ul>
            <p style={{ lineHeight: "2" }}>
              <span className="p_name">To'lov narxi</span>
              <span>{item.total_price || "142455"} so'm</span>
            </p>
            <div className="p_btn__box">
              <button onClick={() => getDetails(item.id)}>Edit</button>
              <button onClick={() => getDetails(item.id)}>Payment</button>
            </div>
          </div>
        );
      })}
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

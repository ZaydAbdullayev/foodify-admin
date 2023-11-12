import React, { memo } from "react";
import "./check.css";
import { NumericFormat } from "react-number-format";
import { CalculateTotalPrice } from "../../service/calc.service";
import { useGetpOrderQuery } from "../../service/user.service";
import { useLocation } from "react-router-dom";

// address: "&1-stoll";
// description: "";
// id: "11993d60";
// latitude: "";
// longitude: "";
// order_type: "Restoran";
// padyezd: "";
// payment: "token";
// payment_status: 0;
// payment_taken: 0;
// payment_type: "";
// price: 71000;
// product_data: '[{"id":"04a421e6","name":"test bar 1","price":15000,"img":"https://localhost:8081/add/product/img_3be92846.jpg","description":"test suv 1","restaurant":"2899b5","category":"ichimlik","status":2,"department":"bar","quantity":1},{"id":"ba2564cc","name":"kfc","price":28000,"img":"https://localhost:8081/add/product/img_cdd37c5d.png","description":"achchiq 1 pors","restaurant":"2899b5","category":"kfc","status":2,"department":"somsa","quantity":2}]';
// qavat: "";
// receivedAt: "2023-11-09T14:44:15.000Z";
// restaurant_id: "2899b5";
// status: 3;
// t_location: "tashqari";
// table_name: "1";
// user_id: "9b8603";
// worker_id: "c8bc10";
// worker_name: "Bro";

export const PaymentCheck = memo(() => {
  const user = JSON.parse(localStorage.getItem("user")).user || [];
  const id = useLocation().pathname.split("/").pop();
  const { data: order = [], isLoading } = useGetpOrderQuery(id);

  const orderData = order?.innerData || [];
  const products =
    orderData?.product_data && JSON?.parse(orderData?.product_data);
  const time = new Date(orderData?.receivedAt)?.toLocaleString("uz-UZ", {
    year: "numeric",
    day: "numeric",
    month: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });

  return (
    <div className="check_main_box">
      <div className="check_body">
        <div className="check_body_header">
          <p>{user?.res_name}</p>
          <p>Namangan shahar A. Navoiy ko'chasi</p>
        </div>
        <div className="check_body_box">
          <div>
            <p>Check № 98765456789</p>
            <b>
              <u>Buyurtma № {orderData.id}</u>
            </b>
          </div>
          <p>
            Kassir: <span>{orderData.cashier}</span>
          </p>
          <p>
            Affitsant: <span>{orderData.worker_name}</span>
          </p>
          <p>
            Buyurtma ID:{" "}
            <span>
              <u>
                <b>#{orderData.id}</b>
              </u>
            </span>
          </p>
          <p className="line">
            Buyurtma vaqti: <span>{time}</span>
          </p>
          <span className="lines"></span>
          <div className="check_body_data">
            {products?.map((item) => {
              return (
                <p className="check_product" key={item.id}>
                  <pre>
                    <p>
                      {item.quantity}x {item.name}:
                    </p>
                    <p>{item.description}</p>
                  </pre>
                  <NumericFormat
                    displayType="text"
                    value={item.price * item.quantity}
                    thousandSeparator=" "
                    suffix=" so'm"
                  />
                </p>
              );
            })}
          </div>
          <span className="lines"></span>
          <p>
            Service:(10%){" "}
            <NumericFormat
              displayType="text"
              value={orderData.price * 0.1}
              thousandSeparator=" "
              suffix=" so'm"
            />
          </p>
          <p>
            Jami:{" "}
            <NumericFormat
              displayType="text"
              value={orderData.price}
              thousandSeparator=" "
              suffix=" so'm"
            />
          </p>
          <span className="lines"></span>
          {/* <span>
            Siz bu xaridingiz orqali 1% lik keshbek olish imkoniyatiga ego
            bo'ldingiz. Kod javobi 000
          </span>
          <span>• • • • • • • • • • • • • • • • • • • • • • • • •</span> */}
          <p>Chop etilgan sana: {time}</p>
          <span className="lined"></span>
          <span>
            Savollar uchun mijozlarga yordam xizmat ko'rsatish sifatini
            ayxshilash uchun tel: +998 99 999 99 99
          </span>
        </div>
      </div>
    </div>
  );
});

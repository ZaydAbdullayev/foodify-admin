import React, { memo } from "react";
import "./check.css";
import { NumericFormat } from "react-number-format";
// import { CalculateTotalPrice } from "../../service/calc.service";
import { useGetpOrderQuery } from "../../service/user.service";
import { useLocation } from "react-router-dom";
// import { useFetchDataQuery } from "../../service/api.service";
// import { usePostDataMutation } from "../../service/api.service";

export const PaymentCheck = memo(() => {
  const user = JSON.parse(localStorage.getItem("user")).user || [];
  const id = useLocation().pathname.split("/").pop();
  const { data: order = [] } = useGetpOrderQuery(id);

  const orderData = order?.innerData || [];
  const pds = JSON?.parse(orderData?.product_data);
  const products = Object.values(pds)[0]?.pd;
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

export const Test = () => {
  // const fd = {
  //   res_id: "5678",
  //   order: "Burger",
  //   responsible: "John Doe",
  //   ingredients:
  //     "Beef, lettuce, tomato, onion, cheese, ketchup, mustard, mayonnaise",
  //   cost: "$9.99",
  // };
  // const { data = [] } = useFetchDataQuery(`get/preOrders/2899b5`, {
  //   tags: ["test"],
  // });
  // const [postMutation1] = usePostDataMutation();

  // console.log("get", data);

  // const fetch = async () => {
  //   const { data = null } = await postMutation1(
  //     { url: "add/preOrders", data: fd },
  //     { tags: ["test"] }
  //   );
  //   console.log(data);
  // };

  return (
    <div className="test">
      <button >test</button>
    </div>
  );
};
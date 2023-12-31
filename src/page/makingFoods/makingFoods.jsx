import React, { useEffect, useState } from "react";
import "./makingFoods.css";
import { useSelector, useDispatch } from "react-redux";
import { ApiGetService } from "../../service/api.service";
import { acUpload } from "../../redux/upload";
import { io } from "socket.io-client";

// const socket = io("https://backup.foodify.uz");
// const socket = io("http://localhost:80");
const socket = io("https://lncxlmks-80.inc1.devtunnels.ms");

export const MakingFoods = () => {
  const user = JSON.parse(localStorage.getItem("user")) || [];
  const newOrder = useSelector((state) => state.upload);
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [stution, setStution] = useState(null);
  const id = user?.user?.id;

  useEffect(() => {
    setTimeout(() => {
      ApiGetService.fetching(`get/orders/${id}/2`)
        .then((res) => {
          console.log(res?.data?.innerData);
          setOrders(res?.data?.innerData);
        })
        .catch((err) => console.log(err));
    }, 1000);
  }, [id, newOrder]);

  const orderAccept = (order) => {
    socket.emit("/accept/order", {
      status: true,
      variant: 3,
      user_id: order?.user_id,
    });
    socket.emit("/update/order/status", order);
    setStution(order?.id);
    dispatch(acUpload());
  };

  const newOrders = orders?.sort((a, b) => {
    const dateA = new Date(a.receivedAt);
    const dateB = new Date(b.receivedAt);
    return dateB - dateA;
  });

  return (
    <div className="making_foods_box container_box">
      <h1>Tayyorlanayotgan taomlar</h1>
      <div className="orders_body">
        {newOrders?.map((order) => {
          const products =
            order?.product_data && JSON.parse(order?.product_data);
          const time = new Date(order?.receivedAt)?.toLocaleString("uz-UZ", {
            year: "numeric",
            day: "numeric",
            month: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: false,
          });

          return (
            <div
              key={order?.id}
              className={stution === order?.id ? "accepted" : ""}
            >
              <figure className="cooking_food">
                <div>
                  <span>buyurtmachi : {order?.id}</span>{" "}
                  <button
                    onClick={() =>
                      orderAccept({
                        id: order.id,
                        status: 3,
                        user_id: order?.user_id,
                      })
                    }
                  >
                    Buyurtma tayyor
                  </button>
                </div>
                {products.length &&
                  products?.map((product) => {
                    return (
                      <figcaption key={product?.id} className="order_product">
                        <img src={product.img} alt="foto" />
                        <pre>
                          <p style={{ textTransform: "capitalize" }}>
                            {product?.name}
                          </p>
                          <p>{product?.description}</p>
                        </pre>
                        <p>{product?.quantity} ta</p>
                      </figcaption>
                    );
                  })}
                <p className="time">{time}</p>
              </figure>
            </div>
          );
        })}
      </div>
    </div>
  );
};

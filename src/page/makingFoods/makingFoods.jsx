import React, { useEffect, useState } from "react";
import "./makingFoods.css";
import { useSelector, useDispatch } from "react-redux";
import { ApiGetService, ApiUpdateService } from "../../service/api.service";
import { acUpload } from "../../redux/upload";
import { io } from "socket.io-client";

const socket = io("https://backup1.foodify.uz");

export const MakingFoods = () => {
  const user = JSON.parse(localStorage.getItem("user")) || [];
  const newOrder = useSelector((state) => state.upload);
  const [orders, setOrders] = useState([]);
  const [stution, setStution] = useState(null);
  const id = user?.user?.id;
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      ApiGetService.fetching(`get/orders/${id}`)
        .then((res) => {
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
    ApiUpdateService.fetching(`update/status/${order.order_id}`, {
      status: order.status,
    })
      .then((res) => {
        setStution(order.order_id);
        dispatch(acUpload());
      })
      .catch((err) => console.log(err));
  };

  const currentOrder = orders?.filter((item) => item.status === 1);
  const newOrders = currentOrder?.sort((a, b) => {
    const dateA = new Date(a.receivedAt);
    const dateB = new Date(b.receivedAt);
    return dateB - dateA;
  });

  return (
    <div className="making_foods_box">
      <h1>Tayyorlanayotgan taomlar</h1>
      <div className="orders_body">
        {newOrders?.map((order) => {
          const products =
            order?.product_data && JSON.parse(order?.product_data);
          const time = order.receivedAt.substring(0, 19).split("T").join(" | ");
          return (
            <div
              key={order?.id}
              className={stution === order.id ? "accepted" : ""}
            >
              <figure className="cooking_food">
                <div>
                  <span>buyurtma idsi : {order?.id}</span>{" "}
                  <button
                    onClick={() =>
                      orderAccept({ order_id: order.id, status: 3 })
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

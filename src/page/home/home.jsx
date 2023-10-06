import React, { useState, useEffect } from "react";
import "./home.css";
import { ApiGetService, ApiUpdateService } from "../../service/api.service";
import { useDispatch, useSelector } from "react-redux";
import { acUpload } from "../../redux/upload";
import { io } from "socket.io-client";

import { BsCheck2All } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";

const socket = io("https://backup.foodify.uz");
// const socket = io("http://localhost:80");

export const Home = () => {
  const user = JSON.parse(localStorage.getItem("user")) || [];
  const department = JSON.parse(localStorage.getItem("department")) || null;
  const newOrder = useSelector((state) => state.upload);
  const [stution, setStution] = useState(false);
  const [orders, setOrders] = useState([]);
  const id = user?.user?.id;
  const dispatch = useDispatch();
  const point =
    department === "cashier"
      ? `get/orders/${id}/0`
      : `get/depOrders/${id}/${department}`;

  useEffect(() => {
    setTimeout(() => {
      ApiGetService.fetching(point)
        .then((res) => {
          setOrders(res?.data?.innerData);
        })
        .catch((err) => console.log(err));
    }, 800);
  }, [id, newOrder, point]);

  socket.on(`/get/newOrders/${id}`, (data) => {
    setOrders(data);
    socket.off(`/get/newOrders/${id}`);
  });

  // to accept order's product by id
  const orderAccept = (order) => {
    console.log(order);
    const uData = {
      id: order?.id,
      status: order?.status,
      user_id: order?.user_id,
    };
    socket.emit("/accept/order", {
      status: true,
      variant: order?.status,
      user_id: order?.user_id,
    });
    socket.emit("/update/order/status", uData);
    socket.emit("/divide/orders/depart", order);
    setStution(order?.id);
    dispatch(acUpload());
  };

  // to find oreder stution
  const orderStution = (order) => {
    ApiUpdateService.fetching(
      `update/order/${order?.order_id}/${order?.product_id}/${order?.status}`
    )
      .then((res) => {
        dispatch(acUpload());
      })
      .catch((err) => console.log("malumot yuklana olmadi"));
  };

  return (
    <div className="home_page container_box">
      <div className="oreders">
        <h1>Yangi Buyurtmalar</h1>
        <div className="orders_body">
          {orders?.map((order) => {
            const products =
              order?.product_data && JSON?.parse(order?.product_data);
            // const status = products?.find(({ status }) => status === "2");
            // const change = products?.find(({ status }) => status === "3");
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
                className={stution === order.id ? "accepted" : ""}
              >
                <figure className="order_item">
                  <div>
                    <span>
                      Buyurtmachi : {order?.address?.split("&")?.pop()}
                    </span>
                    <span>Buyurtma ID № : {order?.id}</span>{" "}
                    <div className="btn_box">
                      <button
                        onClick={() => orderAccept({ ...order, status: 6 })}
                      >
                        Hammasini bekor qilish
                      </button>
                      <button
                        onClick={() => orderAccept({ ...order, status: 1 })}
                      >
                        Hammasini qabul qilish
                      </button>
                    </div>
                  </div>
                  {products?.map((product) => {
                    return (
                      <figcaption key={product?.id}>
                        <img src={product.img} alt="foto" />
                        <pre>
                          <p style={{ textTransform: "capitalize" }}>
                            {product?.name}
                          </p>
                          <p>{product?.description}</p>
                        </pre>
                        <p>{product?.quantity} ta</p>
                        <span>{product?.quantity * product?.price} so'm</span>
                        <div className="order_stution">
                          {product?.status === "2" ? (
                            <>
                              <BsCheck2All style={{ color: "#3CE75B" }} />
                            </>
                          ) : product?.status === "3" ? (
                            <>
                              <RxCross1 style={{ color: "#ff0000" }} />
                            </>
                          ) : (
                            <>
                              <span>Ushbu buyurtmani qabul qilasizmi?</span>
                              <button
                                onClick={() =>
                                  orderStution({
                                    order_id: order?.id,
                                    product_id: product?.id,
                                    status: 3,
                                  })
                                }
                              >
                                Bekor qilish
                              </button>
                              <button
                                onClick={() =>
                                  orderStution({
                                    order_id: order?.id,
                                    product_id: product?.id,
                                    status: 2,
                                  })
                                }
                              >
                                Qabul qilish
                              </button>
                            </>
                          )}
                        </div>
                      </figcaption>
                    );
                  })}
                  <p className="time">{time}</p>
                </figure>
                <div className="order_footer">
                  <button>Orqaga qaytish</button>
                  <button onClick={() => orderAccept({ ...order, status: 1 })}>
                    Tayyorlashga berish
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

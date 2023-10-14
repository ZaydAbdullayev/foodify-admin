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
// const socket = io("https://lncxlmks-80.inc1.devtunnels.ms");

export const Home = () => {
  const user = JSON.parse(localStorage.getItem("user")) || [];
  const department = JSON.parse(localStorage.getItem("department")) || null;
  const newOrder = useSelector((state) => state.upload);
  const [situation, setSituation] = useState(false);
  const [orders, setOrders] = useState([]);
  const id = user?.user?.id;
  const dispatch = useDispatch();
  const point =
    department === "cashier"
      ? `get/orders/${id}/0`
      : `get/depOrders/${id}/${department}/1`;
  const sPoint =
    department === "cashier" ? `/get/newOrders/${id}` : "/get/ready/orders";

  useEffect(() => {
    setTimeout(() => {
      ApiGetService.fetching(point)
        .then((res) => {
          setOrders(res?.data?.innerData);
        })
        .catch((err) => console.log(err));
    }, 800);
  }, [newOrder, point]);

  department === "cashier" &&
    socket.on(sPoint, (data) => {
      setOrders(data);
      socket.off(sPoint);
    });
  // const usid = "080ac7a9";

  // socket.on(`get/message/${usid}`, (data) => {
  //   console.log(data);
  // });

  // to accept order's product by id
  const orderAccept = (order) => {
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
    setSituation(order?.id);
    dispatch(acUpload());
  };

  // to find oreder situation
  const orderSituation = (order) => {
    socket.emit("/accept/order", {
      status: true,
      variant: order?.status,
      user_id: order?.user_id,
    });
    socket.emit("/update/ProductSt", order);
    if (
      orders.find(({ id, status }) => id === order?.order_id && status === 3)
    ) {
      setSituation(order?.order_id);
    }
    dispatch(acUpload());
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
                className={situation === order.id ? "accepted" : ""}
              >
                <figure className="order_item">
                  <div>
                    {department === "cashier" && (
                      <span>
                        Buyurtmachi : {order?.address?.split("&")?.pop()}
                      </span>
                    )}
                    <span>Buyurtma ID № : {order?.id}</span>{" "}
                    {department === "cashier" && (
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
                    )}
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
                          {product?.status === 2 ? (
                            <>
                              <BsCheck2All style={{ color: "#3CE75B" }} />
                            </>
                          ) : product?.status === 3 ? (
                            <>
                              <RxCross1 style={{ color: "#ff0000" }} />
                            </>
                          ) : (
                            <>
                              {department === "cashier" && (
                                <>
                                  <span>Ushbu buyurtmani qabul qilasizmi?</span>
                                  <button
                                    onClick={() =>
                                      orderSituation({
                                        order_id: order?.id,
                                        product_id: product?.id,
                                        status: 3,
                                      })
                                    }
                                  >
                                    Bekor qilish
                                  </button>
                                </>
                              )}
                              <button
                                onClick={() =>
                                  orderSituation({
                                    order_id: order?.id,
                                    product_id: product?.id,
                                    status: 2,
                                  })
                                }
                                style={{ backgroundColor: "#3CE75B" }}
                              >
                                {department === "cashier"
                                  ? "Qabul qilish"
                                  : "Tayyor"}
                              </button>
                            </>
                          )}
                        </div>
                      </figcaption>
                    );
                  })}
                  <p className="time">{time}</p>
                </figure>
                {department === "cashier" && (
                  <div className="order_footer">
                    <button>Orqaga qaytish</button>
                    <button
                      onClick={() => orderAccept({ ...order, status: 1 })}
                    >
                      Tayyorlashga berish
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

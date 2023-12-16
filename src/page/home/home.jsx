import React, { useState, useEffect } from "react";
import "./home.css";
import { ApiGetService } from "../../service/api.service";
import { useDispatch, useSelector } from "react-redux";
import { acUpload } from "../../redux/upload";
import { io } from "socket.io-client";
import { LoadingBtn } from "../../components/loading/loading";
import { enqueueSnackbar as es } from "notistack";

import { BsCheck2All } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import noResult from "../../assets/images/20231109_144621.png";

// const socket = io("https://backup.foodify.uz");
// const socket = io("http://localhost:80");
const socket = io("https://vsxmzbb6-80.euw.devtunnels.ms");

export const Home = () => {
  const user = JSON.parse(localStorage.getItem("user")) || [];
  const department = JSON.parse(localStorage.getItem("department")) || null;
  const newOrder = useSelector((state) => state.upload);
  const [situation, setSituation] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState({});
  const search = useSelector((state) => state.search);
  const id = user?.user?.id;
  const dispatch = useDispatch();
  const point =
    department === "kassir" || department === "owner"
      ? `get/orders/${id}/0`
      : `get/depOrders/${id}/${department}/2`;
  const sPoint =
    department === "kassir" || department === "owner"
      ? `/get/newOrders/${id}`
      : `/get/order/${id}/${department}`;

  useEffect(() => {
    setTimeout(() => {
      ApiGetService.fetching(point)
        .then((res) => {
          setOrders(res?.data?.innerData);
        })
        .catch((err) => console.log(err));
    }, 800);
  }, [newOrder, point]);

  socket.on(sPoint, (data) => {
    setOrders(data);
    socket.off(sPoint);
  });

  // to accept order's product by id
  const orderAccept = (order) => {
    try {
      setLoading(order);
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
    } catch (err) {
      es("Xatolik yuz berdi!", { variant: "warning" });
    } finally {
      setLoading({});
    }
  };

  // to find oreder situation
  const orderSituation = (order) => {
    try {
      setLoading(order);
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
    } catch (err) {
      es("Xatolik yuz berdi!", { variant: "warning" });
    } finally {
      setLoading({});
    }
  };

  const filteredData = orders?.filter((item) => {
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
    <div className="home_page container_box">
      <div className="oreders">
        <h1>Yangi Buyurtmalar</h1>
        {filteredData.length ? (
          <div className="orders_body">
            {filteredData?.map((order) => {
              const products =
                order?.product_data && JSON?.parse(order?.product_data);
              const time = new Date(order?.receivedAt)?.toLocaleString(
                "uz-UZ",
                {
                  year: "numeric",
                  day: "numeric",
                  month: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: false,
                }
              );
              return (
                <div
                  key={order?.id}
                  className={situation === order.id ? "accepted" : ""}
                >
                  <figure className="order_item">
                    <div>
                      {department === "kassir" && (
                        <span>
                          Buyurtmachi : {order?.address?.split("&")?.pop()}
                        </span>
                      )}
                      <span>Buyurtma ID № : {order?.id}</span>{" "}
                      {department === "kassir" && (
                        <div className="btn_box">
                          <button
                            className="relative"
                            onClick={() => orderAccept({ ...order, status: 6 })}
                          >
                            {loading.id === order.id && loading.status === 6 ? (
                              <LoadingBtn />
                            ) : (
                              "Hammasini bekor qilish"
                            )}
                          </button>
                          <button
                            className="relative"
                            onClick={() => orderAccept({ ...order, status: 2 })}
                          >
                            {loading.id === order.id && loading.status === 2 ? (
                              <LoadingBtn />
                            ) : (
                              "Hammasini qabul qilish"
                            )}
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
                                {department === "kassir" && (
                                  <>
                                    <span>
                                      Ushbu buyurtmani qabul qilasizmi?
                                    </span>
                                    <button
                                      className="relative"
                                      onClick={() =>
                                        orderSituation({
                                          order_id: order?.id,
                                          product_id: product?.id,
                                          status: 3,
                                          department: department,
                                        })
                                      }
                                    >
                                      {loading.id === product.id &&
                                      loading.status === 3 ? (
                                        <LoadingBtn />
                                      ) : (
                                        "Bekor qilish"
                                      )}
                                    </button>
                                  </>
                                )}
                                <button
                                  onClick={() =>
                                    orderSituation({
                                      order_id: order?.id,
                                      product_id: product?.id,
                                      status: 2,
                                      department: department,
                                    })
                                  }
                                  style={{ backgroundColor: "#3CE75B" }}
                                  className="relative"
                                >
                                  {loading.id === product.id &&
                                  loading.status === 2 ? (
                                    <LoadingBtn />
                                  ) : department === "kassir" ? (
                                    "Qabul qilish"
                                  ) : (
                                    "Tayyor"
                                  )}
                                </button>
                              </>
                            )}
                          </div>
                        </figcaption>
                      );
                    })}
                    <p className="time">{time}</p>
                  </figure>
                  {department === "kassir" && (
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
        ) : (
          <figure className="no_result">
            <img src={noResult} alt="foto" />
          </figure>
        )}
      </div>
    </div>
  );
};

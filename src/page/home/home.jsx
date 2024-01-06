import React, { useState, useEffect } from "react";
import "./home.css";
import { ApiGetService } from "../../service/api.service";
import { useDispatch, useSelector } from "react-redux";
import { acUpload } from "../../redux/upload";
import { io } from "socket.io-client";
import { LoadingBtn } from "../../components/loading/loading";
import { enqueueSnackbar as es } from "notistack";
import { acNavStatus } from "../../redux/navbar.status";
import { NumericFormat } from "react-number-format";

import { BsCheck2All } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineFullscreen } from "react-icons/ai";
import { AiOutlineFullscreenExit } from "react-icons/ai";
import { HiCheck } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";
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
  const [full, setFull] = useState(false);
  const search = useSelector((state) => state.search);
  const id = user?.user?.id;
  const dispatch = useDispatch();
  console.log(orders);
  dispatch(acNavStatus([100]));
  const point =
    department === "kassir" || department === "owner"
      ? `get/orders/${id}/0`
      : `get/depOrders/${id}/${department}/0`;
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

  // to find order situation
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
    <div
      className={
        full ? "container_box home_page active" : "container_box home_page"
      }
    >
      <div className="oreders">
        <h1>
          Yangi Buyurtmalar{" "}
          <span onClick={() => setFull(!full)}>
            {full ? <AiOutlineFullscreenExit /> : <AiOutlineFullscreen />}
          </span>
        </h1>
        {filteredData.length ? (
          <div className={full ? "orders_body fullScreen" : "orders_body"}>
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
                  <figure className="order_item new-order_item">
                    <div className="order_item_header">
                      <p>
                        {(department === "kassir" ||
                          department === "owner") && (
                          <span>{order?.address?.split("&")?.pop()}</span>
                        )}
                        <span>ID № : {order?.id?.split("_")[0]}</span>{" "}
                      </p>
                      {(department === "kassir" || department === "owner") && (
                        <div className="btn_box">
                          <button
                            className="relative"
                            onClick={() => orderAccept({ ...order, status: 6 })}
                          >
                            {loading.id === order.id && loading.status === 6 ? (
                              <LoadingBtn />
                            ) : (
                              <RxCross2 />
                            )}
                          </button>
                          <button
                            className="relative"
                            onClick={() => orderAccept({ ...order, status: 2 })}
                          >
                            {loading.id === order.id && loading.status === 2 ? (
                              <LoadingBtn />
                            ) : (
                              <BsCheck2All />
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="order_item-body">
                      {products?.map((product) => {
                        return (
                          <figcaption key={product?.id}>
                            {/* <img src={product.img} alt="foto" /> */}
                            <p className="qty">{product?.quantity}</p>
                            <pre>
                              <p style={{ textTransform: "capitalize" }}>
                                {product?.name}
                              </p>
                              <p>{product?.description}</p>
                            </pre>
                            <NumericFormat
                              value={product?.quantity * product?.price}
                              displayType={"text"}
                              thousandSeparator={true}
                            />
                            <div className="order_stution">
                              {product?.status === 3 ? (
                                <>
                                  <BsCheck2All style={{ color: "#3CE75B" }} />
                                </>
                              ) : product?.status === 3 ? (
                                <>
                                  <RxCross1 style={{ color: "#ff0000" }} />
                                </>
                              ) : (
                                <>
                                  {!product?.status && (
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
                                        <RxCross2 />
                                      )}
                                    </button>
                                  )}
                                  <button
                                    onClick={() =>
                                      orderSituation({
                                        order_id: order?.id,
                                        product_id: product?.id,
                                        status: !product?.status ? 2 : 4,
                                        department: department,
                                      })
                                    }
                                    style={{ backgroundColor: "#3CE75B" }}
                                    className="relative"
                                  >
                                    {!product?.status ? <HiCheck /> : "Tayyor"}
                                  </button>
                                </>
                              )}
                            </div>
                          </figcaption>
                        );
                      })}
                    </div>
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

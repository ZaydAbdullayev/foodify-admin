import React, { useState, useEffect } from "react";
import "./home.css";
import { ApiGetService } from "../../service/api.service";
import { useDispatch, useSelector } from "react-redux";
import { LoadingBtn } from "../../components/loading/loading";
import { enqueueSnackbar as es } from "notistack";
import { acNavStatus } from "../../redux/navbar.status";
import { NumericFormat } from "react-number-format";
import { ResolveModal } from "./resolve.modal";
import socket from "../../socket.config";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";

import { BsCheck2All } from "react-icons/bs";
import { AiOutlineFullscreen } from "react-icons/ai";
import { AiOutlineFullscreenExit } from "react-icons/ai";
import { HiCheck } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { RiBoxingFill } from "react-icons/ri";
import { GiCook } from "react-icons/gi";
import { MdFastfood } from "react-icons/md";
import noResult from "../../assets/images/20231109_144621.png";
import { acNothification } from "../../redux/nothification";
import { acResolve } from "../../redux/resolve";

export const Home = () => {
  const user = JSON.parse(localStorage.getItem("user")) || [];
  const department = JSON.parse(localStorage.getItem("department")) || null;
  const newOrder = useSelector((state) => state.upload);
  const [situation, setSituation] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState({});
  const [full, setFull] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const search = useSelector((state) => state.search);
  const id = user?.user?.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  React.useEffect(() => {
    dispatch(acNavStatus([100]));
  }, [dispatch]);

  const point =
    department === "kassir" || department === "owner"
      ? `get/orders/${id}`
      : `get/depOrders/${id}/${department}`;
  const sPoint =
    department === "kassir" || department === "owner"
      ? `/get/newOrders/${id}`
      : `/get/order/${id}/${department}`;

  useEffect(() => {
    setTimeout(() => {
      ApiGetService.fetching(point)
        .then((res) => {
          setOrders(res?.data?.innerData);
          console.log("normal", res?.data?.innerData);
        })
        .catch((err) => console.log(err));
    }, 800);
  }, [newOrder, point]);

  socket.on(sPoint, (data) => {
    setOrders(data);
    dispatch(acNothification(true));
    console.log("socket", data);
    socket.off(sPoint);
  });

  socket.on(`/get/newOrdersOne/${id}`, (newData) => {
    console.log("new socket", newData);
    setOrders((prevOrders) => {
      const updatedOrders = [...prevOrders];
      if (newData[0] === "update") {
        const existingIndex = updatedOrders.findIndex(
          (order) => order?.id === newData[1]?.id
        );
        if (existingIndex !== -1) {
          updatedOrders[existingIndex] = newData[1];
        }
      } else if (newData[0] === "delete") {
        const deleted = updatedOrders.findIndex(
          (order) => order.id === newData[1].id
        );
        if (deleted !== -1) {
          updatedOrders.splice(deleted, 1);
        }
      } else {
        updatedOrders.push(newData);
      }
      return updatedOrders;
    });
    socket.off(`/get/newOrdersOne/${id}`);
  });

  // to accept order's product by id
  const orderAccept = (order, time) => {
    console.log("upO", {
      data: order,
      receivedAt: time,
    });
    try {
      setLoading(order);
      socket.emit("/accept/order", {
        status: true,
        variant: order?.status,
        user_id: order?.user_id,
      });
      socket.emit("/update/order/status", {
        data: order,
        receivedAt: time,
      });
      if (department === "kassir" || department === "owner") {
        socket.emit("/divide/orders/depart", order);
      }
      setSituation({ status: order?.status, id: order?.id });
    } catch (err) {
      es("Xatolik yuz berdi!", { variant: "warning" });
    } finally {
      setLoading({});
    }
  };

  // to find order situation
  const orderSituation = (order) => {
    console.log("upP", order);
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
    } catch (err) {
      es("Xatolik yuz berdi!", { variant: "warning" });
    } finally {
      setLoading({});
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("LEFT"),
    onSwipedRight: () => handleSwipe("RIGHT"),
    trackMouse: true,
  });

  const handleSwipe = async (direction) => {
    const newIndex = direction === "LEFT" ? activeIndex + 1 : activeIndex - 1;
    await setActiveIndex((newIndex + 3) % 3);
    navigate(
      `/orders/${
        newIndex === 0 ? "" : newIndex === 1 ? "cooking/food" : "prepared/food"
      }`
    );
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
      <div className="_orders">
        <h1>
          <i></i>
          <i></i>
          <span {...handlers} className="swipe-pages">
            <span
              className={activeIndex === 0 ? "active" : ""}
              onClick={() => navigate("/orders")}
            >
              <RiBoxingFill />
            </span>
            <span
              className={activeIndex === 1 ? "active after before" : ""}
              onClick={() => navigate("/orders/cooking/food")}
            >
              <GiCook />
            </span>
            <span
              className={activeIndex === 2 ? "active" : ""}
              onClick={() => navigate("/orders/prepared/food")}
            >
              <MdFastfood />
            </span>
          </span>
          <i></i>
          <span onClick={() => setFull(!full)}>
            {full ? <AiOutlineFullscreenExit /> : <AiOutlineFullscreen />}
          </span>
        </h1>
        {filteredData?.length ? (
          <div className={full ? "orders_body fullScreen" : "orders_body"}>
            {filteredData?.map((order) => {
              const pds = JSON?.parse(order?.product_data);
              const { pd, received_at } = Object.values(pds)[0];
              const time = new Date(order?.receivedAt)?.toLocaleString(
                "uz-UZ",
                {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: false,
                }
              );
              return (
                <div
                  key={order?.id}
                  className={
                    situation.id === order.id && situation.status !== 2
                      ? "accepted"
                      : ""
                  }
                  style={{
                    "--grid-col": full ? 1 : 1.5,
                    "--grid-row": pd?.length + 1,
                    display: order?.status === 4 ? "none" : "flex",
                  }}
                >
                  <figure className="order_item">
                    <div className="order_item_header">
                      <p>
                        {(department === "kassir" ||
                          department === "owner") && (
                          <span>{order?.address?.split("&")?.pop()}</span>
                        )}
                        <span>ID № : {order?.id?.split("_")[0]}</span>{" "}
                      </p>
                      <span>{time}</span>
                      {(department === "kassir" || department === "owner") && (
                        <div className="btn_box">
                          <button
                            className="relative"
                            onClick={() =>
                              orderAccept({ ...order, status: 4 }, received_at)
                            }
                          >
                            {loading.id === order.id && loading.status === 4 ? (
                              <LoadingBtn />
                            ) : (
                              <RxCross2 />
                            )}
                          </button>
                          <button
                            className="relative"
                            onClick={() => {
                              let newStatus;
                              if (order?.order_type === "online") {
                                newStatus = 1;
                              } else if (
                                order?.order_type === "offline" &&
                                order?.status === 0
                              ) {
                                newStatus = 2;
                              } else {
                                newStatus = 3;
                              }

                              orderAccept(
                                { ...order, status: newStatus },
                                received_at
                              );
                            }}
                          >
                            {loading.id === order.id && loading.status === 1 ? (
                              <LoadingBtn />
                            ) : (
                              <BsCheck2All />
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="order_item-body">
                      {pd?.map((product, ind) => {
                        return (
                          <figcaption key={product?.id + ind}>
                            <i
                              onClick={() => {
                                let newStatus;
                                if (order?.type === "online") {
                                  newStatus = 2;
                                } else {
                                  newStatus = 4;
                                }

                                if (product?.status === 4) {
                                  orderSituation({
                                    order_id: order?.id,
                                    product_id: product?.id,
                                    status: 5,
                                    department: department,
                                  });
                                } else {
                                  orderSituation({
                                    order_id: order?.id,
                                    product_id: product?.id,
                                    status: newStatus,
                                    department: department,
                                  });
                                }
                              }}
                            ></i>
                            {product?.status === 3 && <i></i>}
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
                              {product?.status === 1 && (
                                <button
                                  className="relative"
                                  onClick={() =>
                                    dispatch(
                                      acResolve({
                                        product: product,
                                        order_id: order?.id,
                                        status: 3,
                                        department: department,
                                      })
                                    )
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
                                style={{ color: "#3CE75B" }}
                                className="relative"
                                onClick={() => {
                                  let newStatus;
                                  if (order?.type === "online") {
                                    newStatus = 2;
                                  } else {
                                    newStatus = 4;
                                  }

                                  if (product?.status === 4) {
                                    orderSituation({
                                      order_id: order?.id,
                                      product_id: product?.id,
                                      status: 5,
                                      department: department,
                                    });
                                  } else {
                                    orderSituation({
                                      order_id: order?.id,
                                      product_id: product?.id,
                                      status: newStatus,
                                      department: department,
                                    });
                                  }
                                }}
                              >
                                {product?.status === 1 ? (
                                  <HiCheck />
                                ) : (
                                  <IoCheckmarkDoneCircleSharp />
                                )}
                              </button>
                            </div>
                          </figcaption>
                        );
                      })}
                    </div>
                  </figure>
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
      <ResolveModal />
    </div>
  );
};

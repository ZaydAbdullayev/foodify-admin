import React, { useEffect, useState } from "react";
import "./makingFoods.css";
import { useDispatch } from "react-redux";
import { acUpload } from "../../redux/upload";
import { acNavStatus } from "../../redux/navbar.status";
import socket from "../../socket.config";
import { useSwipeable } from "react-swipeable";
import { useLocation, useNavigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";

import noResult from "../../assets/images/20231109_144621.png";
import { MdFastfood } from "react-icons/md";
import { GiCook } from "react-icons/gi";
import { RiBoxingFill } from "react-icons/ri";
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";
import { BsCheck2All } from "react-icons/bs";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useFetchDataQuery } from "../../service/fetch.service";

export const MakingFoods = () => {
  const user = JSON.parse(localStorage.getItem("user"))?.user || [];
  const department = JSON.parse(localStorage.getItem("department")) || null;
  const { data = [] } = useFetchDataQuery({
    url: `/get/foodsBeingMade/${user?.id}`,
    tags: ["add-order"],
  });
  // const newOrder = useSelector((state) => state.upload);
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(1);
  const [situation, setSituation] = useState({});
  const [full, setFull] = useState(false);
  const [orders, setOrders] = useState([]);
  const id = user?.id;

  const navigate = useNavigate();
  const search = useLocation().search?.split("=").pop();

  useEffect(() => {
    setOrders(data?.innerData);
    dispatch(acNavStatus([100]));
  }, [dispatch, data?.innerData]);

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
        } else {
          updatedOrders.push(newData[1]);
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

  const orderAccept = (order) => {
    socket.emit("/accept/order", {
      status: true,
      variant: 3,
      user_id: order?.user_id,
    });
    socket.emit("/update/order/status", order);
    setSituation({ status: order?.status, id: order?.id });
    dispatch(acUpload());
  };

  const orderSituation = (order) => {
    console.log("upP", order);
    try {
      socket.emit("/accept/order", {
        status: true,
        variant: order?.status,
        user_id: order?.user_id,
      });
      socket.emit("/update/ProductSt", order);
      if (
        data?.innerData.find(
          ({ id, status }) => id === order?.order_id && status === 3
        )
      ) {
        setSituation(order?.order_id);
      }
    } catch (err) {}
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
    return item?.id?.toLowerCase().includes(search?.toLowerCase());
  });

  return (
    <div
      className={
        full ? "container_box home_page active" : "container_box home_page"
      }>
      <div className="_orders">
        <h1>
          <i></i>
          <i></i>
          <span {...handlers} className="swipe-pages">
            <span
              className={activeIndex === 0 ? "active" : ""}
              onClick={() => navigate("/orders")}
              aria-label='target this link "/orders"'>
              <RiBoxingFill />
            </span>
            <span
              className={activeIndex === 1 ? "active" : ""}
              onClick={() => navigate("/orders/cooking/food")}
              aria-label='target this link "/orders/cooking/food"'>
              <GiCook />
            </span>
            <span
              className={activeIndex === 2 ? "active" : ""}
              onClick={() => navigate("/orders/prepared/food")}
              aria-label='target this link "/orders/prepared/food"'>
              <MdFastfood />
            </span>
          </span>
          <i></i>
          <span
            onClick={() => setFull(!full)}
            aria-label="enter fullscreen and exit fullscreen">
            {full ? <AiOutlineFullscreenExit /> : <AiOutlineFullscreen />}
          </span>
        </h1>
        {filteredData?.length ? (
          <div className={full ? "orders_body fullScreen" : "orders_body"}>
            {filteredData?.map((order) => {
              const pds = JSON?.parse(order?.product_data);
              const { pd } = Object.values(pds)[0];
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
                    situation?.id === order?.id && situation?.status !== 2
                      ? "accepted"
                      : ""
                  }
                  style={{
                    "--grid-col": full ? 1 : 1.5,
                    "--grid-row": pd?.length + 1,
                    display: order?.status === 4 ? "none" : "flex",
                  }}>
                  <figure className="order_item">
                    <div className="order_item_header">
                      <p>
                        <span>ID № : {order?.id?.split("_")[0]}</span>{" "}
                      </p>
                      <span>{time}</span>
                      <div className="btn_box">
                        <button
                          className="relative"
                          onClick={() => orderAccept({ ...order, status: 4 })}
                          aria-label="to cancel this order">
                          <RxCross2 />
                        </button>
                        <button
                          onClick={() =>
                            orderAccept({
                              id: order?.id,
                              status: 6,
                              user_id: order?.user_id,
                            })
                          }
                          aria-label="to prepare thi r oreder">
                          <BsCheck2All />
                        </button>
                      </div>
                    </div>
                    <div className="order_item-body">
                      {pd?.map((product, ind) => {
                        return (
                          <figcaption key={product?.id + ind}>
                            <i
                              onClick={() =>
                                orderSituation({
                                  order_id: order?.id,
                                  product_id: product?.id,
                                  status: 4,
                                  department: department,
                                })
                              }></i>
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
                              <button
                                style={{ color: "#3CE75B" }}
                                onClick={() =>
                                  orderSituation({
                                    order_id: order?.id,
                                    product_id: product?.id,
                                    status: 4,
                                    department: department,
                                  })
                                }
                                aria-label="to prepare this product">
                                <IoCheckmarkDoneCircleSharp />
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
    </div>
  );
};

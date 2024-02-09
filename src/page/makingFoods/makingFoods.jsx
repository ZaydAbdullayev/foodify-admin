import React, { useEffect, useState } from "react";
import "./makingFoods.css";
import { useSelector, useDispatch } from "react-redux";
import { acUpload } from "../../redux/upload";
import { acNavStatus } from "../../redux/navbar.status";
import socket from "../../socket.config";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import { useGetMakingOrderQuery } from "../../service/order.service";

import noResult from "../../assets/images/20231109_144621.png";
import { MdFastfood } from "react-icons/md";
import { GiCook } from "react-icons/gi";
import { RiBoxingFill } from "react-icons/ri";
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";
import { HiCheck } from "react-icons/hi";

export const MakingFoods = () => {
  // const user = JSON.parse(localStorage.getItem("user")) || [];
  // const department = JSON.parse(localStorage.getItem("department")) || null;
  // const newOrder = useSelector((state) => state.upload);
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(1);
  const [stution, setStution] = useState(null);
  const [full, setFull] = useState(false);
  const navigate = useNavigate();
  const search = useSelector((state) => state.search);
  // const id = user?.user?.id;
  const { data = [] } = useGetMakingOrderQuery();
  useEffect(() => {
    dispatch(acNavStatus([100]));
  }, [dispatch]);
  // const point =
  //   department === "kassir" || department === "owner"
  //     ? `get/orders/${id}`
  //     : `get/depOrders/${id}/${department}`;


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

  // const newOrders = orders?.sort((a, b) => {
  //   const dateA = new Date(a.receivedAt);
  //   const dateB = new Date(b.receivedAt);
  //   return dateB - dateA;
  // });

  const filteredData = data?.data?.filter((item) => {
    return item?.id?.toLowerCase().includes(search?.toLowerCase());
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
              className={activeIndex === 1 ? "active" : ""}
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
              const time = new Date(received_at)?.toLocaleString("uz-UZ", {
                hour: "numeric",
                minute: "numeric",
                hour12: false,
              });
              return (
                <div
                  key={order?.id}
                  style={{
                    "--grid-col": full ? 1 : 1.5,
                    "--grid-row": pd?.length + 1,
                    display: order?.status === 4 ? "none" : "flex",
                  }}
                >
                  <figure className="order_item">
                    <div className="order_item_header">
                      <p>
                        <span>ID № : {order?.id?.split("_")[0]}</span>{" "}
                      </p>
                      <span>{time}</span>
                      <div className="btn_box">
                        <button
                          onClick={() =>
                            orderAccept({
                              id: order?.id,
                              status: 6,
                              user_id: order?.user_id,
                            })
                          }
                        >
                          Tayyor
                        </button>
                      </div>
                    </div>
                    <div className="order_item-body">
                      {pd?.map((product, ind) => {
                        return (
                          <figcaption key={product?.id + ind}>
                            <i
                            // onClick={() => {
                            //   let newStatus;
                            //   if (order?.type === "online") {
                            //     newStatus = 2;
                            //   } else {
                            //     newStatus = 4;
                            //   }

                            //   if (product?.status === 4) {
                            //     orderSituation({
                            //       order_id: order?.id,
                            //       product_id: product?.id,
                            //       status: 5,
                            //       department: department,
                            //     });
                            //   } else {
                            //     orderSituation({
                            //       order_id: order?.id,
                            //       product_id: product?.id,
                            //       status: newStatus,
                            //       department: department,
                            //     });
                            //   }
                            // }}
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
                              <button
                                style={{ color: "#3CE75B" }}
                                className="relative"
                              >
                                <HiCheck />
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

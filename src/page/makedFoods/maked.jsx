import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ApiGetService } from "../../service/api.service";
import { useDispatch } from "react-redux";
import { acNavStatus } from "../../redux/navbar.status";

import noResult from "../../assets/images/20231109_144621.png";

export const MakedFoods = () => {
  const user = JSON?.parse(localStorage?.getItem("user")) || [];
  const newOrder = useSelector((state) => state.upload);
  const [orders, setOrders] = useState([]);
  const id = user?.user?.id;
  const dispatch = useDispatch();
  dispatch(acNavStatus([100]));

  useEffect(() => {
    ApiGetService.fetching(`get/orders/${id}/3`)
      .then((res) => {
        setOrders(res?.data?.innerData);
      })
      .catch((err) => console.log(err));
  }, [id, newOrder]);

  const newOrders = orders?.sort((a, b) => {
    const dateA = new Date(a.receivedAt);
    const dateB = new Date(b.receivedAt);
    return dateB - dateA;
  });

  return (
    <div className="making_foods_box container_box">
      <h1>Tayyor bo'lgan taomlar</h1>
      <div className="orders_body">
        {newOrders.length ? (
          newOrders?.map((order) => {
            const products =
              order?.product_data && JSON?.parse(order?.product_data);
            const time = new Date(order?.receivedAt)?.toLocaleString("uz-UZ", {
              year: "numeric",
              day: "numeric",
              month: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: false,
            });
            return (
              <div key={order?.id}>
                <figure className="cooking_food">
                  <div>
                    <span>buyurtmachi : {order?.id}</span>{" "}
                    <span>Taxi qabul qilishini kutilmoqda...</span>
                  </div>
                  {products?.length &&
                    products?.map((product) => {
                      return (
                        <figcaption key={product?.id} className="order_product">
                          <img src={product?.img} alt="foto" />
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
          })
        ) : (
          <figure className="no_result">
            <img src={noResult} alt="foto" />
          </figure>
        )}
      </div>
    </div>
  );
};

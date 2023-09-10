import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ApiGetService } from "../../service/api.service";

export const MakedFoods = () => {
  const user = JSON?.parse(localStorage?.getItem("user")) || [];
  const newOrder = useSelector((state) => state.upload);
  const [orders, setOrders] = useState([]);
  const id = user?.user?.id;

  useEffect(() => {
    ApiGetService.fetching(`get/orders/${id}`)
      .then((res) => {
        setOrders(res?.data?.innerData);
      })
      .catch((err) => console.log(err));
  }, [id, newOrder]);

  const currentOrder = orders?.filter((item) => item?.status === 2);
  const newOrders = currentOrder?.sort((a, b) => {
    const dateA = new Date(a.receivedAt);
    const dateB = new Date(b.receivedAt);
    return dateB - dateA;
  });

  return (
    <div className="making_foods_box">
      <h1>Tayyor bo'lgan taomlar</h1>
      <div className="orders_body">
        {newOrders?.map((order) => {
          const products =
            order?.product_data && JSON?.parse(order?.product_data);
          const time = order?.receivedAt
            ?.substring(0, 19)
            ?.split("T")
            ?.join(" | ");
          return (
            <div key={order?.id}>
              <figure className="cooking_food">
                <div>
                  <span>buyurtma idsi : {order?.id}</span>{" "}
                  <span>Taxi qabul qilishini kutilmoqda...</span>
                </div>
                {products.length &&
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
        })}
      </div>
    </div>
  );
};

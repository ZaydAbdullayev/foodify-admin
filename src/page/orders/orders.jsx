import React, { useState, useMemo } from "react";
import "./order.css";
import "./cart.css";
import { useNavigate, useLocation } from "react-router-dom";
import { CalculateTotalPrice } from "../../service/calc.service";
import { CalculateTotalQuantity } from "../../service/calc.service";
import { useGetStProductQuery } from "../../service/s-products.service";
import { useGetStCategoryQuery } from "../../service/category.service";
import io from "socket.io-client";
import { NumericFormat } from "react-number-format";
import { LoadingBtn } from "../../components/loading/loading";
// import { enqueueSnackbar as es } from "notistack";

import { LuShoppingBasket } from "react-icons/lu";
import { BiCircle, BiCheck } from "react-icons/bi";
import { FiCheckCircle } from "react-icons/fi";
import { TbMessage2Plus } from "react-icons/tb";

// const socket = io("https://backup.foodify.uz");
// const socket = io("http://localhost:80");
const socket = io("https://vsxmzbb6-80.euw.devtunnels.ms");

export const Orders = () => {
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const navigate = useNavigate();
  const [update, setUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const [takeaway, setTakeaway] = useState(false);
  const [desc, setDesc] = useState(false);
  const [extra, setExtra] = useState("");
  const location = useLocation();
  const { data = [], isLoading } = useGetStProductQuery();
  const { data: categoryData = [] } = useGetStCategoryQuery();
  const position = location.pathname.split("/");
  // console.log(position);

  // ["", "category", "ichkari", "1", "ed2201"];
  // ["", "update", "orders", "ichkari", "3", "c3b530", "undefined"];
  const category =
    location.search.split("=")[1] || categoryData?.data?.[0]?.name;
  const cart = useMemo(() => {
    return JSON?.parse(localStorage?.getItem("cart")) || [];
  }, []);
  const total = CalculateTotalPrice(cart, 10);
  const prime_cost = CalculateTotalQuantity(cart, "prime_cost");

  const paymentData = {
    address: `&${position[3]}-stoll`,
    restaurant_id: user?.user?.id,
    user_id: position[4],
    product_data: JSON.stringify(cart),
    food_total: total?.totalPrice,
    service: total?.service,
    prime_cost: prime_cost,
    total: total?.total,
    paid: 0,
    online_paymentToken: "token",
    table_name: position[3],
    worker_name: user?.user?.name || "owner",
    worker_id: user?.user?.user_id || user?.user?.id,
    order_type: takeaway ? "Olib ketish" : "Restoran",
    t_location: position[2],
  };

  const updatePaymentData = {
    order_id: position[5],
    product_data: JSON.stringify(cart),
  };

  const handleTarget = (item) => {
    const url = item?.name
      ?.toLowerCase()
      ?.split(" ")
      ?.join("")
      ?.split("'")
      ?.join("");
    navigate(`?category=${url}`);
  };

  const addToCart = (item) => {
    setUpdate(!update);
    const cartItem = cart?.find((x) => x?.id === item?.id);
    if (cartItem) {
      cartItem.quantity++;
      localStorage?.setItem("cart", JSON?.stringify(cart));
    } else {
      cart?.push({ ...item, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  const updateCart = (item) => {
    setUpdate(!update);
    const cartItem = cart.find((x) => x.id === item.id);
    if (cartItem && item?.quantity > 0) {
      cartItem.quantity = item?.quantity;
      localStorage.setItem("cart", JSON.stringify(cart));
    } else if (cartItem && item.quantity === 0) {
      const index = cart.indexOf(cartItem);
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  const resieveOrderS = async () => {
    const uData = {
      id: position[4],
      status: 2,
    };
    if (!cart.length) {
      alert("Savatcha bo'sh");
      return;
    }
    console.log(paymentData);
    console.log(updatePaymentData);
    if (position[1] === "update-order") {
      socket.emit("/addProduct/toOrder", updatePaymentData);
    } else {
      socket.emit("/order", paymentData);
      socket.emit("/divide/orders/depart", paymentData);
      socket.emit("/update/table", uData);
    }
    // localStorage.removeItem("cart");
    // navigate("/orders/tables");
    // es("Buyurtma yuborildi!", { variant: "success" });
  };

  const addExtr = (value) => {
    setDesc(false);
    const updatedCart = cart?.map((item) => {
      if (item.id === value.id) {
        item.comment = value.comment;
      }
      return item;
    });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const filteredData = data?.data?.filter(
    (item) =>
      item?.category?.split(" ")?.join("")?.split("'")?.join("") === category
  );

  return (
    <div className="res_products">
      <div className="res_category">
        <div className="res_category_box">
          {categoryData?.data?.map((item) => {
            return (
              <span
                key={item?.id}
                onClick={() => handleTarget({ id: item?.id, name: item?.name })}
                className={
                  category ===
                  item?.name?.split(" ")?.join("")?.split("'")?.join("")
                    ? "active"
                    : ""
                }
              >
                {item?.name}
              </span>
            );
          })}
        </div>
      </div>
      <div className="res_menu">
        <div className="res_menu_box">
          {isLoading ? (
            <span className="loader_box">
              <LoadingBtn />
            </span>
          ) : (
            filteredData?.map((item) => {
              const count = cart.filter((x) => x.id === item.id);
              return (
                <div
                  className="res_menu_item"
                  key={item?.id}
                  onClick={() => addToCart(item)}
                >
                  <p style={{ textTransform: "capitalize" }}>{item?.name}</p>
                  <span>{item?.description}</span>
                  {count[0]?.quantity && <i>{count[0]?.quantity}</i>}
                </div>
              );
            })
          )}
        </div>
      </div>
      <div className="book_order">
        <span onClick={() => setOpen(!open)}>
          <LuShoppingBasket />
        </span>
        <button onClick={() => resieveOrderS()}>Rasmiylashtirish</button>
      </div>
      <div className={open ? "cart_box open" : "cart_box"}>
        <p>
          <span>Mahsulotlar</span>
        </p>
        <div className="cart_body">
          {cart?.map((item) => {
            return (
              <div className="cart_body__item" key={item?.id}>
                {desc === item.id ? (
                  <input
                    type="text"
                    name="comment"
                    autoFocus
                    autoComplete="off"
                    className="description"
                    onChange={(e) => setExtra(e.target.value)}
                  />
                ) : (
                  <p>
                    {item?.name}
                    <b>{item?.description}</b>
                    <NumericFormat
                      value={item?.price * item?.quantity}
                      thousandSeparator=" "
                      displayType="text"
                      suffix=" so'm"
                    />
                  </p>
                )}
                <p>{item?.description}</p>
                <NumericFormat
                  value={item?.price * item?.quantity}
                  thousandSeparator=" "
                  displayType="text"
                  suffix=" so'm"
                />
                <div className="update_item">
                  <button>
                    {desc === item.id ? (
                      <BiCheck
                        onClick={() => addExtr({ id: item.id, comment: extra })}
                      />
                    ) : (
                      <TbMessage2Plus onClick={() => setDesc(item.id)} />
                    )}
                  </button>
                  <button
                    onClick={() =>
                      updateCart({ id: item.id, quantity: item.quantity - 1 })
                    }
                  >
                    –
                  </button>
                  <input
                    type="number"
                    value={item?.quantity}
                    onChange={(e) =>
                      updateCart({
                        id: item.id,
                        quantity: e.target.value,
                      })
                    }
                  />
                  <button
                    onClick={() =>
                      updateCart({ id: item.id, quantity: item.quantity + 1 })
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
          <p>
            <span>Jami:</span>{" "}
            <NumericFormat
              value={total?.totalPrice || 0}
              thousandSeparator=" "
              displayType="text"
              suffix=" so'm"
            />{" "}
          </p>
        </div>
        <label
          className={takeaway ? "takeaway active" : "takeaway"}
          onClick={() => setTakeaway(!takeaway)}
        >
          {takeaway ? <FiCheckCircle /> : <BiCircle />}
          Olib ketish
        </label>
      </div>
    </div>
  );
};

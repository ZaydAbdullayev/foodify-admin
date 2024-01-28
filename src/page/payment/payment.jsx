import React, { useState } from "react";
import "./payment.css";
import { useNavigate } from "react-router-dom";
import { AddPayment } from "./addPayment/addPayment";
import { LuArrowLeftRight } from "react-icons/lu";
import { useGetPaymentOrderQuery } from "../../service/user.service";
import { useDispatch } from "react-redux";
import { acNavStatus } from "../../redux/navbar.status";

import noResult from "../../assets/images/20231109_144621.png";

export const Payment = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  // const search = useSelector((state) => state.search);
  const [date, setDate] = useState({
    start: new Date().toISOString().split("T")[0],
    end: new Date().toISOString().split("T")[0],
  });
  const { data: ordersData = [] } = useGetPaymentOrderQuery(date);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(acNavStatus([100]));
  }, [dispatch]);

  const getDetails = (id) => {
    navigate(`/financial/payment?dt=${id}`);
    setOpen(true);
  };

  // const filteredData = ordersData?.innerData?.filter((item) => {
  //   const adress = item?.address?.split("&")?.pop();
  //   return (
  //     item?.id?.toLowerCase().includes(search?.toLowerCase()) ||
  //     adress.toLowerCase().includes(search?.toLowerCase())
  //   );
  // });

  return (
    <div className="payment_container">
      <div className="document_header">
        <h1>
          To'lov kiritish {/*<span>({ordersData?.innerData?.length})</span> */}
        </h1>
        <form className="filter_date">
          <label>
            <input
              type="date"
              name="start"
              onChange={(e) => setDate({ ...date, start: e.target.value })}
            />
            <span>{date.start}</span>
          </label>
          <LuArrowLeftRight />
          <label>
            <span>{date.end}</span>
            <input
              type="date"
              name="end"
              onChange={(e) => setDate({ ...date, end: e.target.value })}
            />
          </label>
        </form>
      </div>
      {ordersData?.innerData ? (
        ordersData?.innerData?.map((item, index) => {
          const reverseIndex = ordersData?.innerData?.length - index;
          const p_data = JSON?.parse(item?.product_data);
          const payment_data = Object.values(p_data)[0]?.pd;
          return (
            <div className="payment_item" key={item.id}>
              <span>{item.order_type}</span>
              <p>
                <span>{item.order_type === "online" ? "ID" : "Stoll"}</span>
                <span className="p_name">
                  {item.order_type === "ofline" ? (
                    <span>{item.table_name}</span>
                  ) : (
                    <span>{item.id}</span>
                  )}
                </span>
                <span>{`#${reverseIndex}`}</span>
              </p>
              <p>
                <span
                  className="p_name"
                  style={{ color: "#eee9", lineHeight: "2.3" }}
                >
                  Status
                </span>
                {item?.payment_status === 1 ? (
                  <span style={{ background: "#11b911" }}>To'landi</span>
                ) : (
                  <span style={{ background: "#fe0" }}>To'lanmadi</span>
                )}
              </p>
              <ul className="p_data_box">
                <p>
                  <span>QT</span> <span className="p_name">Menu</span>{" "}
                  <span>price</span>
                </p>
                {payment_data?.map((product) => {
                  return (
                    <li key={product?.id}>
                      <span>{product?.quantity}</span>
                      <span className="p_name">{product?.name}</span>
                      <span>
                        {product?.price.replace(/\d(?=(\d{3})+$)/g, "$&,")} so'm
                      </span>
                    </li>
                  );
                })}
              </ul>
              <p style={{ lineHeight: "2" }}>
                <span className="p_name">To'lov narxi</span>
                <span>{item?.total} so'm</span>
              </p>
              <div className="p_btn__box">
                <button onClick={() => getDetails(item.id)}>Edit</button>
                <button onClick={() => getDetails(item.id)}>Payment</button>
              </div>
            </div>
          );
        })
      ) : (
        <figure className="no_result">
          <img src={noResult} alt="foto" />
        </figure>
      )}
      <AddPayment active={setOpen} actives={open} />
    </div>
  );
};

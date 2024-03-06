import React, { useEffect, useState } from "react";
import "./mobile.transaction.css";
import { useFetchDataQuery } from "../../service/fetch.service";
import { useDispatch } from "react-redux";
import { CheckBox } from "../../hooks/generate.tags";
import { acNavStatus } from "../../redux/navbar.status";
import { DatePicker } from "antd";
import { usePostDataMutation } from "../../service/fetch.service";
import useNotification from "antd/es/notification/useNotification";
import { ClearForm } from "../../service/form.service";
import { Segmented } from "antd";

import { ImCalendar } from "react-icons/im";
import { BsCashCoin } from "react-icons/bs";

export const MobileInvoice = () => {
  const user = JSON.parse(localStorage.getItem("user"))?.user || [];
  const [postData] = usePostDataMutation();
  const [type, setType] = useState("");
  const dispatch = useDispatch();
  const [api, contexHolder] = useNotification();

  const { data: invoiceData = [] } = useFetchDataQuery({
    url: `get/InvoiceGroups/${user?.id}`,
    tags: ["invoice-group"],
  });
  const { data: cashboxData = [] } = useFetchDataQuery({
    url: `get/cashbox/${user?.id}`,
    tags: ["cashboxes"],
  });
  const { data: suppData = [] } = useFetchDataQuery({
    url: `get/suppliers/${user?.id}`,
    tags: ["suplier"],
  });

  const activityData = [
    {
      name: "Operativ",
    },
    {
      name: "Sarmoya",
    },
    {
      name: "Pul",
    },
  ];

  const paymentData = [
    {
      name: "Naqd",
    },
    {
      name: "Plastik",
    },
    {
      name: "Bank",
    },
    {
      name: "Elektron",
    },
  ];

  useEffect(() => {
    dispatch(acNavStatus([0, 1, 2, 3]));
  }, [dispatch]);

  const handleButtonClick = async (type) => {
    // Diğer işlemler
    const formdata = new FormData(document.querySelector(".mobile-invoice"));
    const value = Object.fromEntries(formdata.entries());
    console.log({
      ...value,
      res_id: user?.id,
      worker: user?.worker_name || "owner",
      worker_id: user?.worker_id || user?.id,
      transaction_type: type,
    });

    const { data = [] } = await postData({
      url: `/add/transaction`,
      data: {
        ...value,
        res_id: user?.id,
        worker: user?.worker_name || "owner",
        worker_id: user?.worker_id || user?.id,
        transaction_type: type,
      },
      tags: ["cashbox-transaction"],
    });
    if (data?.message === "Transaction has been added") {
      const placement = "topRight";
      api.success({
        message: "Muaffaqiyatli!",
        description: "Ma'lumotlar muvaffaqiyatli saqlandi",
        placement,
      });
      ClearForm(".mobile-invoice");
    }
  };

  const activeData =
    type === "To'lovlar"
      ? activityData
      : type === "Yetkazuvchiga to'lov"
      ? suppData?.data
      : cashboxData?.data;

  return (
    <form className="mobile-invoice container_box">
      {contexHolder}
      <Segmented
        options={[
          "To'lovlar",
          "Yetkazuvchiga to'lov",
          "Kassa orasida almashinuv",
        ]}
        className="segmented"
        onChange={(e) => setType(e)}
        block
      />
      <div className="mobile-invoice-content">
        <div className="activity-type">
          <p>Kassa{type === "Kassa orasida almashinuv" && "dan"} * :</p>
          <label className="activity-types">
            {cashboxData?.data?.map((item, ind) => (
              <CheckBox
                key={`${item.name}_${ind}`}
                label={item.name}
                value={item.name}
                name={"cashbox"}
              />
            ))}
          </label>
        </div>
        <div className="activity-type">
          <p>
            {type === "To'lovlar"
              ? "Harakat turi"
              : type === "Yetkazuvchiga to'lov"
              ? "Yetkazuvchi tanlang"
              : "Kassaga"}{" "}
            * :
          </p>
          <label className="activity-types">
            {activeData?.map((item, ind) => (
              <CheckBox
                key={`${item.name}_${ind}`}
                label={item.name}
                value={item.name}
                name={"activity_kind"}
              />
            ))}
          </label>
        </div>
        <div className="activity-type">
          <p>Harakat guruhi * :</p>
          <label className="activity-types">
            {invoiceData?.data?.map((item, ind) => (
              <CheckBox
                key={`${item.name}_${ind}`}
                label={item.name}
                value={item.name}
                description="Harakat guruhi"
                name={"transaction_group"}
              />
            ))}
          </label>
        </div>
        <div className="activity-type">
          <p>To'lov turi * :</p>
          <label className="activity-types">
            {paymentData?.map((item, ind) => (
              <CheckBox
                key={`${item.name}_${ind}`}
                label={item.name}
                value={item.name}
                name={"payment_type"}
              />
            ))}
          </label>
        </div>
        <div className="activity-type">
          <p>Tafsilot :</p>
          <label className="activity-types short">
            <textarea name="description" placeholder="Tafsilot"></textarea>
          </label>
          <div className="amount-and-date">
            <label>
              <BsCashCoin />
              <div className="activity-types">
                <input type="number" name="amount" placeholder="Miqdori" />
              </div>
            </label>
            <label>
              <ImCalendar />
              <DatePicker
                name="date"
                className="date-picker"
                placeholder="Kun tanlang"
                variant="borderless"
              />
            </label>
          </div>
        </div>
      </div>
      <div className="_invoice-footer">
        <div className="history-screen"></div>
        <div className="activity-btn">
          <button type="button" onClick={() => handleButtonClick("income")}>
            – CHIQIM
          </button>
          <button type="button" onClick={() => handleButtonClick("expense")}>
            KIRIM +
          </button>
        </div>
      </div>
    </form>
  );
};

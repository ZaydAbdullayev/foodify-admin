import React, { useState } from "react";
import "../../storage/storage.css";
import "../../../components/modal/modal.css";
import { useFetchDataQuery } from "../../../service/fetch.service";
import { usePostDataMutation } from "../../../service/fetch.service";
import { useSelector } from "react-redux";
import { Table } from "antd";

import { RxCross2 } from "react-icons/rx";

const InvoicesPaymentModal = () => {
  const user = JSON.parse(localStorage.getItem("user"))?.user || [];
  const pay = useSelector((state) => state.pay);
  const [open, setOpen] = useState(true);
  const [postData] = usePostDataMutation();
  const { data: cashs = [] } = useFetchDataQuery({
    url: `get/cashbox/${user?.id}`,
    tags: ["cashbox"],
  });

  const columns = [
    {
      title: "№",
      dataIndex: "order",
      key: "order",
    },
    {
      title: "Sana",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Kassa",
      dataIndex: "cashbox",
      key: "cashbox",
    },
    {
      title: "To'lov turi",
      dataIndex: "payment_type",
      key: "payment_type",
    },
    {
      title: "To'lov miqdori",
      dataIndex: "cost",
      key: "cost",
    },
  ];

  const today = new Date().toISOString().split("T")[0];
  return (
    <div className={`w100 df py-container ${open && "active"}`}>
      <div className="w100 df aic jcsb py-title">
        <p>To'lash kiritish</p>
        <button onClick={() => setOpen(!open)}>
          <RxCross2 />
        </button>
      </div>
      <form className="df flc aic u_modal dark-color-mode py">
        <input type="date" name="date" defaultValue={today} />
        <select name="activity_kind">
          <option value="default">Faoliyat turi tanlang*</option>
          <option value="repare">Invitsitsiya</option>
          <option value="income">To'lov</option>
          <option value="purchase">Xarid</option>
        </select>
        <select name="transaction_category">
          <option value="default">To'lov turi tanlang*</option>
          <option value={"income"}>Kirim</option>
          <option value={"expense"}>Chiqim</option>
          <option value={"payment_to_the_supp"}>Yezkazuvchiga to'lov</option>
          <option value={"payment_from_the_supp"}>Yetkazuvchidan to'lov</option>
          <option value={"transfer"}>Pul o'tkazma</option>
        </select>
        <select name="cashbox">
          <option value="default">Kassa tanlang*</option>
          {cashs?.data?.map((i) => (
            <option key={i.id} value={i.name}>
              {i.name}
            </option>
          ))}
        </select>
        <select name="transaction_type">
          <option value="default">To'lov turi tanlang*</option>
          <option value="cash">Naqd</option>
          <option value="plastic">Plastik</option>
          <option value="transfer">Pul o'tkazma</option>
        </select>
        <input
          type="text"
          name="supplier"
          value={pay?.supplier || ""}
          disabled
        />
        <input
          type="text"
          value={`${pay?.order} - ${new Date(
            pay?.date
          ).toLocaleDateString()} to'lov miqdori: ${new Intl.NumberFormat(
            "en-US"
          ).format(pay?.cost)}`}
          disabled
        />
        <select>
          <option value={0}>Yetkazuvchidagi puldan olmaslik</option>
          <option value={pay?.moneyOnSup}>
            Yetkazuvchidagi pul <b>{pay?.moneyOnSup}</b>
          </option>
        </select>
        <input
          type="number"
          name="paid"
          placeholder={`To'lanishi kerak bo'lgan to'lov miqdori`}
          defaultValue={pay?.leftover || 0}
        />
        <input type="text" name="description" placeholder="Tavsif" />
        <input
          type="hidden"
          name="transaction_group"
          value={"invoice_payment"}
        />
        <input type="hidden" name="res_id" value={user?.id} />
        <input
          type="hidden"
          name="worker"
          value={user?.name || user?.username}
        />
        <input
          type="hidden"
          name="worker_id"
          value={user?.user_id || user?.id}
        />
        <button>To'lov</button>
      </form>
      <div className="df jcc py-money-info">
        <Table
          style={{
            width: "100%",
          }}
          columns={columns}
          dataSource={pay?.data}
          pagination={false}
          rowKey={(record) => record?.id}
        />
        {/* <div className="df jcsb aic">
          <p>
            Jami:{" "}
            {new Intl.NumberFormat("en-US").format(
              pay?.data?.reduce((acc, cur) => acc + cur.cost, 0)
            )}
          </p>
          <p>
            To'langan:{" "}
            {new Intl.NumberFormat("en-US").format(
              pay?.data?.reduce((acc, cur) => acc + cur.cost, 0) - pay?.leftover
            )}
          </p>
          <p>
            Qolgan: {new Intl.NumberFormat("en-US").format(pay?.leftover || 0)}
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default InvoicesPaymentModal;

import React, { useState } from "react";
import "../../storage/storage.css";
import "../../../components/modal/modal.css";
import { useFetchDataQuery } from "../../../service/fetch.service";
import { usePostDataMutation } from "../../../service/fetch.service";
import { usePatchDataMutation } from "../../../service/fetch.service";
import { useSelector } from "react-redux";
import { Table, Popconfirm, notification } from "antd";
import middlewareService from "../../../middleware/form.middleware";

import { RxCross2 } from "react-icons/rx";

const InvoicesPaymentModal = ({ s, setS }) => {
  const user = JSON.parse(localStorage.getItem("user"))?.user || [];
  const pay = useSelector((state) => state.pay);
  const [cashId, setCashId] = useState(null);
  const [postData] = usePostDataMutation();
  const [patchData] = usePatchDataMutation();
  const [amount, setAmount] = useState(0);
  const { data: cashs = [] } = useFetchDataQuery({
    url: `get/cashbox/${user?.id}`,
    tags: ["cashbox"],
  });
  const { data: trg = [] } = useFetchDataQuery({
    url: `get/invoiceGroups/${user?.id}`,
    tags: ["cashbox"],
  });

  const [api, contextHolder] = notification.useNotification();
  const openWarning = (placement) => {
    api.warning({
      message: "Yaroqsiz ma'lumot",
      description:
        "Iltimos, barcha maydonlarni to'ldiring yoki to'g'ri ma'lumot kiritganingizni tekshiring!",
      placement,
    });
  };

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
  const addData = async (type) => {
    try {
      const e = document.getElementById("py-modal");
      if (!e) {
        console.error("Element with id 'py-modal' not found.");
        return;
      }

      const formData = new FormData(e);
      const sd = Object.fromEntries(formData.entries());
      const value = middlewareService(sd, openWarning);
      if (!value) return;

      const res1 = await postData({
        url: "add/transaction",
        data: value,
        tags: [""],
      });

      console.log(res1);

      if (res1?.data?.message === "Transaction has been added") {
        if (type === "double") {
          const res2 = await postData({
            url: "add/transaction",
            data: {
              ...value,
              transaction_category: "paymentToSupplier",
              amount: amount - pay?.leftover,
            },
            tags: [""],
          });
          console.log(res2);
        }

        const res3 = await patchData({
          url: `update/receivedGoods/${pay.id}`,
          data: {
            paid: value.amount,
            leftover: type === "double" ? 0 : pay.leftover - value.amount,
          },
          tags: ["invoices"],
        });
        console.log(res3);
        // e.target.reset();
        // setS(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const today = new Date().toISOString().split("T")[0];
  return (
    <>
      {contextHolder}
      <div className={`w100 df py-container ${s && "active"}`}>
        <div className="w100 df aic jcsb py-title">
          <p>To'lov kiritish</p>
          <button onClick={() => setS(!s)}>
            <RxCross2 />
          </button>
        </div>
        <form className="df flc aic u_modal dark-color-mode py" id="py-modal">
          <input type="date" name="date" defaultValue={today} />
          <select name="transaction_category">
            <option value={"invoicePayment"}>Mahsulot uchun to'lov</option>
          </select>
          <select name="transaction_group">
            <option value="default">Harakat guruhi tanlang*</option>
            {trg?.data?.map((i) => (
              <option key={i.id} value={i.name}>
                {i.name}
              </option>
            ))}
          </select>
          <select
            name="cashbox"
            onChange={(e) => {
              const selectedKey =
                e.target.options[e.target.selectedIndex].getAttribute(
                  "data-i-id"
                );
              setCashId(selectedKey);
            }}>
            <option value="default">Kassa tanlang*</option>
            {cashs?.data?.map((i) => (
              <option key={i.id} value={i.name} data-i-id={i.id}>
                {i.name}
              </option>
            ))}
          </select>
          <select name="payment_type">
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
            <option value={pay?.moneyOnSup || 0}>
              Yetkazuvchidagi pul <b>{pay?.moneyOnSup || 0}</b>
            </option>
          </select>
          <input
            type="number"
            name="amount"
            placeholder={`To'lanishi kerak bo'lgan to'lov miqdori`}
            defaultValue={pay?.leftover || 0}
            onChange={(e) => setAmount(e.target.value)}
          />
          <input type="text" name="description" placeholder="Tavsif" />
          <input type="hidden" name="res_id" value={user?.id} />
          <input type="hidden" name="transaction_type" value="expense" />
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
          <input type="hidden" name="cashbox_id" value={cashId} />
          <Popconfirm
            title="Ortiqcha to'lov miqdori mavjud!"
            description={`Qolgan ${(amount - pay?.leftover)
              .toString()
              .replace(
                /(\d)(?=(\d{3})+$)/g,
                "$1 "
              )} so'm yetkazuvchidagi pullaringiz ro'yhatiga qo'shilsinmi?`}
            onConfirm={() => addData("double")}
            disabled={amount <= pay?.leftover}
            onCancel={() => addData("single")}
            okText="Yes"
            cancelText="No">
            <button
              type="button"
              onClick={() => addData("single")}
              disabled={amount > pay?.leftover}>
              To'lov
            </button>
          </Popconfirm>
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
        </div>
      </div>
    </>
  );
};

export default InvoicesPaymentModal;

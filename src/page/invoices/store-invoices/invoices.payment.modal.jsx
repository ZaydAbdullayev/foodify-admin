import React, { useState } from "react";
import "../../storage/storage.css";
import "../../../components/modal/modal.css";
import { useFetchDataQuery, usePostDataMutation } from "../../../service/fetch.service";
import { useSelector } from "react-redux";
import { Table, Popconfirm, notification } from "antd";
import middlewareService from "../../../middleware/form.middleware";

import { RxCross2 } from "react-icons/rx";

const InvoicesPaymentModal = ({ s, setS }) => {
  const user = JSON.parse(localStorage.getItem("user"))?.user || [];
  const pay = useSelector((state) => state.pay);
  const [cashId, setCashId] = useState(null);
  const [postData] = usePostDataMutation();
  const [amount, setAmount] = useState(0);
  const [moneyOnSupp, setMoneyOnSupp] = useState(null);
  const id = user?.user_id || user?.id;
  const name = user?.name || user?.username;
  const { data: cashs = [] } = useFetchDataQuery({ url: `get/cashbox`, tags: ["cashbox"], });
  const { data: trg = [] } = useFetchDataQuery({ url: `get/InvoiceGroups`, tags: ["cashbox"], });
  const { data: p_h = [] } = useFetchDataQuery({ url: `get/paymentHistory/${pay?.id}`, tags: ["payment_history"], });
  const { data: sp = [] } = useFetchDataQuery({
    url: `get/supplierPayments/${pay?.supplier_id}`,
    tags: ["supplier_payments"],
  });

  console.log("p_h", p_h);

  const [api, contextHolder] = notification.useNotification();
  const openWarning = (placement, s) => {
    api.warning({
      message: s ? "Yetarsiz summa" : "Yaroqsiz ma'lumot",
      description: s ? "Kiritilgan summa tanlangan summadan ko'p!" : "Iltimos, barcha maydonlarni to'ldiring yoki to'g'ri ma'lumot kiritganingizni tekshiring!",
      placement,
    });
  };

  const columns = [
    { title: "№", dataIndex: "order", key: "order", },
    { title: "Sana", dataIndex: "date", key: "date", },
    { title: "Kassa", dataIndex: "cashbox", key: "cashbox", },
    { title: "To'lov turi", dataIndex: "payment_type", key: "payment_type", },
    { title: "To'lov miqdori", dataIndex: "cost", key: "cost", },
  ];
  const addData = async (type) => {
    try {
      const e = document.getElementById("py-modal");
      if (!e) return;
      const formData = new FormData(e);
      const sd = Object.fromEntries(formData.entries());
      const value = middlewareService(sd, openWarning);
      if (!value) return;
      if (moneyOnSupp && moneyOnSupp < value.amount) {
        return openWarning("topRight", true);
      }
      const res1 = await postData({
        url: "add/transaction",
        data: { ...value, supplier: `${pay?.supplier}/_${pay?.supplier_id}`, },
        tags: ["payment_history", "supplier_payments", "action"],
      });
      // if (res1?.data?.message === "Transaction has been added") {
      //   if (type === "double") {
      //     await postData({
      //       url: "add/transaction",
      //       data: {
      //         ...value,
      //         transaction_category: "paymentToSupplier",
      //         amount: amount - pay?.for_payment,
      //       },
      //       tags: [""],
      //     });
      //   }
      //   await patchData({
      //     url: `update/receivedGoods/${pay.id}`,
      //     data: {
      //       paid: value.amount,
      //       for_payment: type === "double" ? 0 : pay.for_payment - value.amount,
      //     },
      //     tags: ["invoices"],
      //   });
      //   // e.target.reset();
      //   // setS(false);
      // }
      console.log("res1", res1?.data?.status);
      if (res1?.data?.status === 200) {
        e.target.reset();
        setS(!s)
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
          <select>
            <option>Mahsulot uchun to'lov</option>
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
            value={`${pay?.order || 0} - ${pay?.time} to'lov miqdori: ${new Intl.NumberFormat("en-US").format(pay?.cost || 0)}`}
            disabled
          />
          <select
            name="transaction_category"
            onChange={(e) => {
              const selectedKey =
                e.target.options[e.target.selectedIndex].getAttribute(
                  "money-on-supp"
                );
              setMoneyOnSupp(parseInt(selectedKey));
            }}>
            <option value={"invoice_payment"}>
              Yetkazuvchidagi puldan olmaslik
            </option>
            {sp?.data?.length &&
              sp?.data?.map((i) => (
                <option
                  key={i.date}
                  value={"invoice_payment_form_supplier"}
                  money-on-supp={i.available}>
                  {i.date} dan: {i.available} so'm mavjud
                </option>
              ))}
          </select>
          <input
            type="number"
            name="amount"
            placeholder={`To'lanishi kerak bo'lgan to'lov miqdori`}
            defaultValue={pay?.for_payment || 0}
            onChange={(e) => setAmount(e.target.value)}
          />
          <input type="text" name="description" placeholder="Tavsif" />
          <input type="hidden" name="transaction_type" value="expense" />
          <input type="hidden" name="worker" value={name} />
          <input type="hidden" name="worker_id" value={id} />
          <input type="hidden" name="cashbox_id" value={cashId} />
          <input type="hidden" name="action_id" value={pay?.id} />
          <Popconfirm
            title="Ortiqcha to'lov miqdori mavjud!"
            description={`Qolgan ${(amount - pay?.for_payment)
              .toString()
              .replace(/(\d)(?=(\d{3})+$)/g, "$1 ")} so'm yetkazuvchidagi pullaringiz ro'yhatiga qo'shilsinmi?`}
            onConfirm={() => addData("double")}
            disabled={amount <= pay?.for_payment}
            onCancel={() => addData("single")}
            okText="Yes"
            cancelText="No">
            <button
              type="button"
              onClick={() => addData("single")}
              disabled={amount > pay?.for_payment}>
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

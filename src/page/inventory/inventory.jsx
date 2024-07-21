import React, { useState, useEffect } from "react";
import "./inventory.css";
import {
  useFetchDataQuery,
  usePostDataMutation,
  usePatchDataMutation,
} from "../../service/fetch.service";
import { LoadingBtn } from "../../components/loading/loading";
import { enqueueSnackbar as es } from "notistack";
import { useDispatch } from "react-redux";
import { acNavStatus } from "../../redux/navbar.status";
import { DatePicker, InputNumber, Modal, Select, Input } from "antd";
import dayjs from "dayjs";

import { MdOutlineHistory, MdCheck } from "react-icons/md";
import { TbArrowBarLeft } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import { BsPencilSquare } from "react-icons/bs";

export const Inventory = () => {
  const user = JSON.parse(localStorage.getItem("user"))?.user || null;
  const { data: stores = [] } = useFetchDataQuery({
    url: user ? `get/storage/${user?.id}` : "",
    tags: ["store"],
  });
  const { data: syncsData = [] } = useFetchDataQuery({
    url: user ? `get/actions/sync_goods` : "",
    tags: ["action"],
  });
  const [storage, setStorage] = useState(null);
  const [snc, setSnc] = useState(false);
  const [loading, setLoading] = useState(false);
  const [syncsValue, setSyncsValue] = useState([]);
  const [storageV, setStorageV] = useState({
    order: 1,
    time: new Date().toISOString().split("T")[0],
    description: "",
  });
  const [active, setActive] = useState(null);
  const [seeOne, setSeeOne] = useState(false);
  const [syncs, setSyncs] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [postData] = usePostDataMutation();
  const [patchData] = usePatchDataMutation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(acNavStatus([100]));
  }, [dispatch]);

  const { data = {} } = useFetchDataQuery({
    url: storage?.id ? `get/storageItems/${storage?.id}` : "",
    tags: ["invoices", "action"],
  });

  useEffect(() => {
    if (stores?.data && stores?.data[0]) {
      setStorage({ id: stores?.data[0]?.id, name: stores?.data[0]?.name });
    }
  }, [stores?.data]);

  const headerKeys = [
    { key: "№", size: "5%" },
    { key: "Nomi", size: "20%" },
    { key: "Guruh", size: "20%" },
    { key: "Turi", size: "20%" },
    { key: "Narxi", size: "20%" },
    { key: "Soni", size: "15%" },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    const form = document.getElementById("sync-form");
    const formData = new FormData(form);
    const values = {};
    formData.forEach((value, key) => {
      values[key] = value;
    });
    setStorageV(values);
    setIsModalOpen(false);
    setSnc(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setSnc(false);
  };

  const changeQuantity = (value, ingredientId) => {
    const parsedValue = parseInt(value);
    const item = (seeOne ? active?.ingredients : data?.data)?.find(
      (item) => item.item_id === ingredientId
    );
    if (!item) return;
    const old_amount = seeOne ? item?.amount : 0;
    const ind = syncsValue.findIndex((item) => item.item_id === ingredientId);
    if (parsedValue === item?.total_quantity) {
      return;
    }
    const updatedNewData = [...syncsValue];

    if (ind !== -1) {
      updatedNewData[ind] = {
        ...updatedNewData[ind],
        amount: parsedValue - updatedNewData[ind].total_quantity + old_amount,
        old_quantity: updatedNewData[ind].total_quantity,
        total_quantity: parsedValue,
        status: "update_amount",
        id: active?.id ? active?.id : undefined,
      };
    } else if (parsedValue !== item.total_quantity) {
      updatedNewData.push({
        ...item,
        ...storageV,
        amount: parsedValue - item.total_quantity + old_amount,
        old_quantity: item.total_quantity,
        total_quantity: parsedValue,
        st1_name: storage?.name,
        st1_id: storage?.id,
        worker: user?.name || user?.username,
        worker_id: user?.user_id || user?.id,
        action_type: "sync_goods",
        invoice_group: "",
        id: active?.id ? active?.id : undefined,
        status: "update_amount"
      });
    }

    setSyncsValue(updatedNewData);
  };

  const syncData = async (status) => {
    try {
      setLoading(true); 
      let res;
      const values = {
        url: seeOne ? `/update/action` : `/add/action`,
        data: [...syncsValue],
        tags: ["action", "invoices"],
      };
      if (seeOne) {
        res = await patchData(values); 
      } else {
        res = await postData(values);
      }

      if (res?.data?.status === 200) {
        setStorage({ id: active?.st1_id, name: active?.st1_name });
        setSnc(false);
        setSyncsValue([]);
        setSeeOne(false);
        es("Sinxronlashtirish yakunlandi", { variant: "success" });
        setActive(null);
      }
    } catch (error) {
      console.log(error);
      es("Sinxronlashtirish muvoffaqiyatsiz", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const getOneSyncData = (item) => {
    setActive(item);
    setSeeOne(true);
    setSyncs(false);
  };

  return (
    <div className="container_box worker_container">
      <div className="workers_header">
        <div className="inventory_header">
          <p>Inventarizatsiya</p>{" "}
          {seeOne ? (
            <span>
              {" "}
              {active.st1_name} — {active.time}
            </span>
          ) : (
            <div className="df aic gap5">
              <Select
                name="storage"
                defaultValue={{
                  value: `${storage?.id}|${storage?.name}` || null,
                  label: storage?.name || "Ombor tanlang",
                }}
                onChange={(v) => {
                  const i_n = v?.split("|");
                  setStorage({ id: i_n[0], name: i_n[1] });
                }}
                options={stores?.data?.map((item) => ({
                  value: `${item?.id}|${item?.name}`,
                  label: item?.name || "",
                }))}
              />
              <DatePicker
                style={{ fontSize: "10px" }}
                defaultValue={dayjs(new Date())}
                onChange={(date) => setStorageV({ ...storageV, date })}
              />
            </div>
          )}
        </div>
        <div className="inventory_btn-box">
          {seeOne ? (
            <button
              onClick={() => {
                setSeeOne(false);
                setActive(null);
              }}
              aria-label="backword all inventory informstion">
              <TbArrowBarLeft />
            </button>
          ) : (
            <>
              {!snc && (
                <div
                  className={
                    syncs && syncsData?.data?.length > 0
                      ? "inventory-history active"
                      : "inventory-history"
                  }
                  onClick={() => setTimeout(() => setSyncs(!syncs), 100)}>
                  <MdOutlineHistory />
                  <span className="ticket"></span>
                  <div className="_history-body">
                    {syncsData?.data?.map((item, index) => {
                      return (
                        <p key={index} onClick={() => getOneSyncData(item)}>
                          {item.st1_name} <span>{item.time}</span>
                        </p>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
          {snc && (
            <button onClick={() => setSnc(false)} aria-label="cancel async">
              <RxCross2 />
            </button>
          )}
          <button
            className="relative"
            aria-label="to async and upload new info"
            onClick={() => {
              setSyncs(false);
              if (snc) {
                syncData(!snc);
              } else {
                if (seeOne) {
                  setSnc(true);
                  setStorageV({
                    order: active?.order,
                    time: active?.time,
                    description: active?.description,
                  });
                  setStorage(active?.st1_id);
                } else {
                  showModal();
                }
              }
            }}>
            {loading ? (
              <LoadingBtn />
            ) : snc ? (
              <MdCheck />
            ) : (
              <BsPencilSquare style={{ fontSize: "calc(var(--fs4) - 5px)" }} />
            )}
          </button>
        </div>
      </div>
      <div
        className="worker"
        style={{ borderBottom: "1px solid #ccc", padding: "0.5% 2%" }}>
        {headerKeys.map((key, ind) => (
          <p key={`${key.key}_${ind}`} style={{ "--worker-t-w": key.size }}>
            {key.key}
          </p>
        ))}
      </div>
      <div
        className="workers_body inventory_body"
        onClick={() => setSyncs(false)}>
        {(seeOne ? active?.ingredients : data?.data || [])?.map(
          (ingredient, ind) => {
            return (
              <div
                className="worker inventory-item"
                key={`${ingredient?.item_id}_${ind}`}>
                <p style={{ "--worker-t-w": "5%" }}>{ind + 1}</p>
                <p style={{ "--worker-t-w": "20%" }}>
                  <span>
                    {ingredient?.item_name}
                    {seeOne && " sync"}
                  </span>
                </p>
                <p style={{ "--worker-t-w": "20%" }}>
                  <span>{ingredient?.group}</span>
                </p>
                <p style={{ "--worker-t-w": "20%" }}>
                  <span>{ingredient?.item_type}</span>
                </p>
                <p style={{ "--worker-t-w": "20%" }}>
                  <span>{ingredient?.price}</span>
                </p>
                <p style={{ "--worker-t-w": "15%", cursor: "pointer" }}>
                  {snc ? (
                    <label className="changed_tool">
                      <input
                        type="number"
                        defaultValue={ingredient?.total_quantity}
                        onBlur={(e) => changeQuantity(e.target.value, ingredient?.item_id)}
                      />
                    </label>
                  ) : (
                    <span>
                      {ingredient?.total_quantity} {ingredient?.unit}
                      {seeOne && (
                        <del>
                          {ingredient?.old_quantity || 0}{" "}
                          {ingredient?.unit || ""}
                        </del>
                      )}
                    </span>
                  )}
                </p>
              </div>
            );
          }
        )}
      </div>
      <Modal
        title="Ushbu ma'lumotlar asosida sinxronlashtirish"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Tasdiqlash"
        cancelText="Bekor qilish">
        <form className="w100 df flc" style={{ gap: "10px" }} id="sync-form">
          <Select
            name="storage"
            style={{ fontSize: "4px" }}
            defaultValue={{
              value: `${storage?.id}|${storage?.name}` || null,
              label: storage?.name || "Ombor tanlang",
            }}
            onChange={(v) => {
              const i_n = v?.split("|");
              setStorage({ id: i_n[0], name: i_n[1] });
            }}
            options={stores?.data?.map((item) => ({
              value: `${item?.id}|${item?.name}`,
              label: item?.name || "",
            }))}
          />
          <DatePicker style={{ width: "100%", fontSize: "10px" }} defaultValue={dayjs(new Date())} name="time" />
          <InputNumber style={{ width: "100%" }} defaultValue={syncsData?.data?.length + 1} name="order" />
          <Input style={{ width: "100%" }} placeholder="Tafsilot" name="description" />
          <input type="hidden" name="st1_id" value={storage?.id} />
          <input type="hidden" name="st1_name" value={storage?.name} />
        </form>
      </Modal>
    </div>
  );
};

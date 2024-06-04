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
    url: user ? `get/syncStorage/${user?.id}` : "",
    tags: ["inventory"],
  });
  const [storageId, setStorageId] = useState(null);
  const [snc, setSnc] = useState(false);
  const [loading, setLoading] = useState(false);
  const [syncsValue, setSyncsValue] = useState([]);
  const [storageV, setStorageV] = useState({
    number: 1,
    sync_time: new Date().toLocaleDateString(),
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
    url: user && storageId ? `get/storageItems/${user.id}/${storageId}` : "",
    tags: ["invoices", "storeItems"],
  });

  useEffect(() => {
    if (stores?.data && stores?.data[0]) {
      setStorageId(stores.data[0].id);
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
    setIsModalOpen(false);
    setSnc(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setSnc(false);
  };

  const getStorageName = (id) => {
    return stores.data?.find((store) => store.id === id)?.name;
  };

  const changeQuantity = (value, ingredientId) => {
    const parsedValue = parseInt(value);

    const item = (seeOne ? active?.details : data?.data)?.find(
      (item) => item.id === ingredientId
    );
    if (!item) return; // İlgili öğe bulunamadıysa işlemi sonlandır

    const ind = syncsValue.findIndex((item) => item.id === ingredientId);

    if (parsedValue === item?.total_quantity) {
      return; // Eğer yeni değer eski değerle aynıysa işlemi sonlandır
    }

    const updatedNewData = [...syncsValue];

    if (ind !== -1) {
      updatedNewData[ind] = {
        ...updatedNewData[ind],
        amount: updatedNewData[ind].total_quantity - parsedValue,
        old_quantity: updatedNewData[ind].total_quantity,
        total_quantity: parsedValue,
      };
    } else if (parsedValue !== item.total_quantity) {
      updatedNewData.push({
        ...item,
        ...storageV,
        amount: item.total_quantity - parsedValue,
        old_quantity: item.total_quantity,
        total_quantity: parsedValue,
        st_name: getStorageName(storageId),
        storage_id: storageId,
      });
    }

    setSyncsValue(updatedNewData);
  };

  const syncData = async (status) => {
    try {
      setLoading(true);
      let response;
      const values = {
        url: seeOne ? `/update/syncStorage/${active?.id}` : `/sync/storage`,
        data: [...syncsValue],
        tags: ["inventory", "storeItems"],
      };
      if (seeOne) {
        response = await patchData(values);
      } else {
        response = await postData(values);
      }

      if (
        response?.message === "syncStorage has been added" ||
        response?.message === "syncStorage is updated"
      ) {
        setSnc(status);
        setSyncsValue([]);
        setActive(null);
        es("Sinxronlashtirish yakunlandi", { variant: "success" });
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
              {active.st_name} —{" "}
              {new Date(active.sync_time).toLocaleDateString()}
            </span>
          ) : (
            <div className="df aic gap5">
              <Select
                name="storage"
                style={{ fontSize: "4px" }}
                defaultValue={{
                  value: stores?.data?.[0]?.id,
                  label: "Ombor tanlang",
                }}
                onChange={setStorageId}
                options={stores?.data?.map((item) => ({
                  value: item?.id || null,
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
                      const day = new Date(item.sync_time).toLocaleDateString();
                      return (
                        <p key={index} onClick={() => getOneSyncData(item)}>
                          {item.st_name} <span>{day}</span>
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
            aria-label="to async and upload new info">
            {loading ? (
              <LoadingBtn />
            ) : snc ? (
              <MdCheck onClick={() => syncData(!snc)} />
            ) : (
              <BsPencilSquare
                onClick={() => {
                  if (seeOne) {
                    setSnc(true);
                    setStorageV({
                      number: active?.number,
                      sync_time: active?.sync_time,
                      description: active?.description,
                    });
                    setStorageId(active?.storage_id);
                  } else {
                    showModal();
                  }
                }}
                style={{ fontSize: "calc(var(--fs4) - 5px)" }}
              />
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
      <div className="workers_body inventory_body">
        {(seeOne ? active?.details : data?.data || [])?.map(
          (ingredient, ind) => {
            return (
              <div className="worker inventory-item" key={ingredient?.id}>
                <p style={{ "--worker-t-w": "5%" }}>{ind + 1}</p>
                <p
                  style={{
                    "--worker-t-w": "20%",
                    justifyContent: "flex-start",
                  }}>
                  <span>
                    {ingredient?.name}
                    {seeOne && "sync"}
                  </span>
                </p>
                <p style={{ "--worker-t-w": "20%" }}>
                  <span>{ingredient?.group}</span>
                </p>
                <p style={{ "--worker-t-w": "20%" }}>
                  <span>{ingredient?.type}</span>
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
                        onBlur={(e) =>
                          changeQuantity(e.target.value, ingredient?.id)
                        }
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
        <div className="w100 df flc" style={{ gap: "10px" }}>
          <Select
            name="storage"
            style={{ width: "100%", fontSize: "10px" }}
            defaultValue={{
              value: stores?.data?.[0]?.id,
              label: "Ombor tanlang",
            }}
            onChange={setStorageId}
            options={stores?.data?.map((item) => ({
              value: item?.id || null,
              label: item?.name || "",
            }))}
          />
          <DatePicker
            style={{ width: "100%", fontSize: "10px" }}
            defaultValue={dayjs(new Date())}
            onChange={(date) => setStorageV({ ...storageV, sync_time: date })}
          />
          <InputNumber
            style={{ width: "100%" }}
            defaultValue={1}
            onChange={(value) => setStorageV({ ...storageV, number: value })}
          />
          <Input
            style={{ width: "100%" }}
            placeholder="Tafsilot"
            onChange={(e) =>
              setStorageV({ ...storageV, description: e.target.value })
            }
          />
        </div>
      </Modal>
    </div>
  );
};

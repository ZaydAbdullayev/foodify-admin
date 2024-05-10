import React, { useState, useEffect, useRef } from "react";
import "./inventory.css";
import { useFetchDataQuery } from "../../service/fetch.service";
import { usePostDataMutation } from "../../service/fetch.service";
import { LoadingBtn } from "../../components/loading/loading";
import { enqueueSnackbar as es } from "notistack";
import { useDispatch } from "react-redux";
import { acNavStatus } from "../../redux/navbar.status";
import { Select } from "antd";

import { MdOutlineHistory, MdCheck } from "react-icons/md";
import { TbArrowBarLeft } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import { BsPencilSquare } from "react-icons/bs";

export const Inventory = () => {
  const user = JSON.parse(localStorage.getItem("user"))?.user || [];
  const { data: stores = [] } = useFetchDataQuery({
    url: `get/storage/${user?.id}`,
    tags: ["store"],
  });
  const { data: syncsData = [] } = useFetchDataQuery({
    url: `get/syncStorage/${user?.id}`,
    tags: ["inventory"],
  });
  const [storageId, setStorageId] = useState(stores.data?.[0]?.id);
  const [snc, setSnc] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newData, setNewData] = useState([]);
  const [oneold, setOneOld] = useState([]);
  const [oneNew, setOneNew] = useState([]);
  const [active, setActive] = useState(null);
  const [seeOne, setSeeOne] = useState(false);
  const [syncs, setSyncs] = useState(false);
  const syncRef = useRef();
  console.log("ref", syncRef);
  const [postData] = usePostDataMutation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(acNavStatus([100]));
  }, [dispatch]);

  const storageItemsQuery = useFetchDataQuery({
    url: `get/storageItems/${user?.id}/${storageId}`,
    tags: ["invoices"],
  });
  const storageItems = storageItemsQuery.data || [];

  useEffect(() => {
    if (stores?.data && stores?.data[0]) {
      setStorageId(stores?.data[0].id);
    }
  }, [stores?.data]);

  useEffect(() => {
    setNewData(storageItems?.data || []);
  }, [storageItems?.data]);

  const headerKeys = [
    { key: "№", size: "5%" },
    { key: "Nomi", size: "20%" },
    { key: "Guruh", size: "20%" },
    { key: "Turi", size: "20%" },
    { key: "Narxi", size: "20%" },
    { key: "Soni", size: "15%" },
  ];

  const changeQuantity = (e, ingredientId) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const value = Object.fromEntries(formdata.entries());

    const updatedData = newData.map((item) => {
      if (item.id === ingredientId) {
        return { ...item, total_quantity: Number(value.quantity) };
      }
      return item;
    });

    setNewData(updatedData);
  };

  const getStorageName = (id) => {
    return stores.data?.find((store) => store.id === id)?.name;
  };

  const syncData = async (status) => {
    try {
      setLoading(true);
      if (!status) {
        const uData = {
          old_data: JSON.stringify(storageItems.data),
          new_data: JSON.stringify(newData),
          storage_id: storageId,
          st_name: getStorageName(storageId),
          res_id: user?.id,
        };
        const { data = null } = await postData({
          url: `/sync/storage`,
          data: uData,
          tags: ["inventory"],
        });
        if (data.message === "syncStorage has been added") {
          setSnc(status);
          es("Sinxronlashtirish yakunlandi", { variant: "success" });
        }
      } else {
        setSnc(status);
      }
    } catch (error) {
      console.log(error);
      es("Sinxronlashtirish muvoffaqiyatsiz", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const getOneSyncData = (id) => {
    const oneData = syncsData?.data?.find((sync) => sync.id === id);
    const oldData = JSON.parse(oneData.old_data);
    const newData = JSON.parse(oneData.new_data);
    setOneOld(oldData);
    setOneNew(newData);
    setActive(oneData);
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
            <Select
              name="storage"
              style={{ fontSize: "10px" }}
              defaultValue={{
                value: stores?.data?.[0]?.id,
                label: "Ombor tanlang",
              }}
              onChange={setStorageId}
              options={stores?.data?.map((item) => ({
                value: item.id,
                label: item.name,
              }))}
            />
          )}
        </div>
        <div className="inventory_btn-box">
          {seeOne ? (
            <button
              onClick={() => setSeeOne(false)}
              aria-label="backword all inventory informstion">
              <TbArrowBarLeft />
            </button>
          ) : (
            <>
              {!snc && (
                <div
                  className={
                    syncs ? "inventory-history active" : "inventory-history"
                  }
                  onClick={() => setTimeout(() => setSyncs(!syncs), 100)}>
                  <MdOutlineHistory />
                  <span className="ticket"></span>
                  <div className="_history-body">
                    {syncsData?.data?.map((item, index) => {
                      const day = new Date(item.sync_time).toLocaleDateString();
                      return (
                        <p key={index} onClick={() => getOneSyncData(item.id)}>
                          {item.st_name} <span>{day}</span>
                        </p>
                      );
                    })}
                  </div>
                </div>
              )}
              {snc && (
                <button onClick={() => setSnc(false)} aria-label="cancel async">
                  <RxCross2 />
                </button>
              )}
              <button
                onClick={() => syncData(!snc)}
                className="relative"
                aria-label="to async and upload new info">
                {loading ? (
                  <LoadingBtn />
                ) : snc ? (
                  <MdCheck />
                ) : (
                  <BsPencilSquare
                    style={{ fontSize: "calc(var(--fs4) - 5px)" }}
                  />
                )}
              </button>
            </>
          )}
        </div>
      </div>
      <div
        className="worker"
        style={{ borderBottom: "1px solid #ccc", padding: "0.5% 2%" }}>
        {headerKeys.map((key) => (
          <p key={key.key} style={{ "--worker-t-w": key.size }}>
            {key.key}
          </p>
        ))}
      </div>
      <div className="workers_body inventory_body">
        {(seeOne ? oneNew : newData)?.map((ingredient, ind) => {
          let old = {};
          if (seeOne) {
            old = oneold?.[ind];
          }
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
                  <form
                    onSubmit={(e) => changeQuantity(e, ingredient?.id)}
                    className="changed_tool">
                    <input
                      type="number"
                      name="quantity"
                      autoFocus
                      defaultValue={ingredient?.total_quantity}
                    />
                    <button type="submit" style={{ display: "none" }}></button>
                  </form>
                ) : (
                  <span>
                    {ingredient?.total_quantity} {ingredient?.unit}
                    {seeOne && (
                      <del>
                        {old?.total_quantity || 0} {old?.unit || ""}
                      </del>
                    )}
                  </span>
                )}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

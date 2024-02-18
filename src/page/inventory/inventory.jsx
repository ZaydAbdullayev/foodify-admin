import React, { useState, useEffect } from "react";
import "./inventory.css";
import { useFetchDataQuery } from "../../service/fetch.service";
import { usePostDataMutation } from "../../service/fetch.service";
import { LoadingBtn } from "../../components/loading/loading";
import { enqueueSnackbar as es } from "notistack";
import { useDispatch } from "react-redux";
import { acNavStatus } from "../../redux/navbar.status";

import { AiOutlineFileSync } from "react-icons/ai";
import { MdOutlineHistory, MdCloudDone } from "react-icons/md";
import { TbArrowBarLeft } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";

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
          <p>Invantarizatsiya</p>{" "}
          {seeOne ? (
            <span>
              {" "}
              {active.st_name} —{" "}
              {new Date(active.sync_time).toLocaleDateString()}
            </span>
          ) : (
            <select
              name="storage"
              onChange={(e) => setStorageId(e.target.value)}
            >
              {stores.data?.map((store) => (
                <option key={store.id} value={store.id}>
                  {store.name}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="inventory_btn-box">
          {seeOne ? (
            <button onClick={() => setSeeOne(false)}>
              <TbArrowBarLeft />
            </button>
          ) : (
            <>
              <div
                className={
                  syncs ? "inventory-history active" : "inventory-history"
                }
                onClick={() => setTimeout(() => setSyncs(!syncs), 100)}
              >
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
              <button onClick={() => syncData(!snc)} className="relative">
                {loading ? (
                  <LoadingBtn />
                ) : snc ? (
                  <MdCloudDone />
                ) : (
                  <AiOutlineFileSync />
                )}
              </button>
              {snc && (
                <button onClick={() => setSnc(false)}>
                  <RxCross2 />
                </button>
              )}
            </>
          )}
        </div>
      </div>
      <div
        className="worker"
        style={{ borderBottom: "1px solid #ccc", padding: "0.5% 2%" }}
      >
        {headerKeys.map((key) => (
          <p key={key.key} style={{ "--worker-t-w": key.size }}>
            {key.key}
          </p>
        ))}
      </div>
      <div className="workers_body inventory_body">
        {seeOne
          ? oneNew?.map((ingredient, ind) => {
              const old = oneold?.[ind];
              return (
                <div className="worker inventory-item" key={ingredient?.id}>
                  <p style={{ "--worker-t-w": "5%" }}>{ind + 1}</p>
                  <p style={{ "--worker-t-w": "20%", textAlign: "start" }}>
                    <span>{ingredient?.name}sync</span>
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
                        className="changed_tool"
                      >
                        <input
                          type="number"
                          name="quantity"
                          autoFocus
                          defaultValue={ingredient?.total_quantity}
                        />
                        <button
                          type="submit"
                          style={{ display: "none" }}
                        ></button>
                      </form>
                    ) : (
                      <span>
                        {ingredient?.total_quantity} {ingredient?.unit}
                        <del>
                          {old?.total_quantity} {old?.unit}
                        </del>
                      </span>
                    )}
                  </p>
                </div>
              );
            })
          : newData?.map((ingredient, ind) => (
              <div className="worker inventory-item" key={ingredient?.id}>
                <p style={{ "--worker-t-w": "5%" }}>{ind + 1}</p>
                <p style={{ "--worker-t-w": "20%", textAlign: "start" }}>
                  <span>{ingredient?.name}</span>
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
                      className="changed_tool"
                    >
                      <input
                        type="number"
                        name="quantity"
                        autoFocus
                        defaultValue={ingredient?.total_quantity}
                      />
                      <button
                        type="submit"
                        style={{ display: "none" }}
                      ></button>
                    </form>
                  ) : (
                    <span>
                      {ingredient?.total_quantity} {ingredient?.unit}
                    </span>
                  )}
                </p>
              </div>
            ))}
      </div>
    </div>
  );
};

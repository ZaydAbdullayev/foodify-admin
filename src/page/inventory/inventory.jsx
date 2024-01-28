import React, { useState, useEffect } from "react";
import "./inventory.css";
import { useGetStorageItemsQuery } from "../../service/invoices.service";
import { useGetStoreQuery } from "../../service/store.service";
import { useAddSyncMutation } from "../../service/invenory.service";
import { LoadingBtn } from "../../components/loading/loading";
import { enqueueSnackbar as es } from "notistack";

export const Inventory = () => {
  const { data: stores = [] } = useGetStoreQuery();
  const [storageId, setStorageId] = useState(stores.data?.[0]?.id);
  const [snc, setSnc] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [newData, setNewData] = useState([]);
  const [addSync] = useAddSyncMutation();

  const storageItemsQuery = useGetStorageItemsQuery(storageId);
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
    setSelected(null);
  };

  const syncData = async (status) => {
    try {
      setLoading(true);
      if (!status) {
        const uData = {
          old_data: JSON.stringify(storageItems.data),
          new_data: JSON.stringify(newData),
          storage_id: storageId,
        };
        const { data = null } = await addSync(uData);
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

  return (
    <div className="container_box worker_container">
      <div className="workers_header">
        <div className="inventory_header">
          <p>Invantarizatsiya</p>{" "}
          <select name="storage" onChange={(e) => setStorageId(e.target.value)}>
            {stores.data?.map((store) => (
              <option key={store.id} value={store.id}>
                {store.name}
              </option>
            ))}
          </select>
        </div>
        <button onClick={() => syncData(!snc)} className="relative">
          {loading ? <LoadingBtn /> : snc ? "Yakunlash" : "Sinxronlashtirish"}
        </button>
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
        {newData?.map((ingredient, ind) => (
          <div className="worker" key={ingredient?.id}>
            <p style={{ "--worker-t-w": "5%" }}>{ind + 1}</p>
            <p style={{ "--worker-t-w": "20%" }}>
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
            <p
              style={{ "--worker-t-w": "15%", cursor: "pointer" }}
              onDoubleClick={() => {
                if (snc) {
                  setSelected(ingredient?.id);
                }
              }}
            >
              {selected === ingredient?.id ? (
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
                  <button type="submit" style={{ display: "none" }}></button>
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

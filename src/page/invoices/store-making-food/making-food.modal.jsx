import React, { useState } from "react";
import { UniversalControlModal } from "../../../components/modal-calc/modal-calc";
import { UniversalForm } from "../../../components/modal-calc/modal-calc";
import { UniversalProductControl } from "../../../components/modal-calc/modal-calc";
import { CalcResultHeader } from "../../../components/modal-calc/modal-calc";
import { CalcResultBody } from "../../../components/modal-calc/modal-calc";
import { CalcResult } from "../../../components/modal-calc/modal-calc";

import { useSelector } from "react-redux";
import { useFetchDataQuery } from "../../../service/fetch.service";

export const InvoicesModal = ({
  checkedData,
  setCheckedData,
  data,
  getProduct,
  NUM,
}) => {
  const today = new Date().toISOString().split("T")[0];
  const [id, setId] = useState(null);
  const [pId, setPId] = useState(null);
  const [rId, setRId] = useState(null);
  const [qty, setQty] = useState(0);
  const res_id = useSelector((state) => state?.res_id);
  const [activePart, setActivePart] = useState(1);
  const { data: storeData = [] } = useFetchDataQuery({
    url: `get/storage/${res_id}`,
    tags: ["store"],
  });
  const { data: storageItems = [] } = useFetchDataQuery({
    url: `get/storageItems/${res_id}/${id}`,
    tags: ["invoices"],
  });
  // const { data: productData = [] } = useFetchDataQuery({
  //   url: `get/foods/${res_id}`,
  //   tags: ["s-products", "product"],
  // });
  const parsedData = storageItems?.data;

  const updatedData = checkedData.map((newItem) => {
    const oldData = parsedData?.find((old) => old.id === newItem.id);

    if (oldData) {
      return {
        ...newItem,
        old_quantity: oldData?.total_quantity,
        total_quantity: oldData?.total_quantity
          ? oldData?.total_quantity + newItem?.amount
          : newItem?.amount,
      };
    }

    return newItem;
  });

  const selectSenderS = (event) => {
    const selectedName = event.target.value;
    const selectedItem = storeData?.data?.find(
      (item) => item.name === selectedName
    );
    const selectedId =
      selectedName === "default" || !selectedItem ? 0 : selectedItem.id;

    setId(selectedId);
  };

  const selectReceiverS = (event) => {
    const selectedName = event.target.value;
    const selectedItem = storeData?.data?.find(
      (item) => item.name === selectedName
    );
    const selectedId =
      selectedName === "default" || !selectedItem ? 0 : selectedItem.id;

    setRId(selectedId);
  };

  const selectPId = (event) => {
    const selectedName = event.target.value;
    const selectedItem = data?.find((item) => item.name === selectedName);
    const selectedId =
      selectedName === "default" || !selectedItem ? null : selectedItem.id;

    setPId(selectedId);
  };

  const currentData = activePart === 1 ? data : storageItems?.data;

  return (
    <UniversalControlModal type="making" Pdata={checkedData} id={id}>
      <UniversalForm>
        <input
          type="number"
          name="order"
          placeholder="Tartib raqam*"
          defaultValue={NUM.num}
          required
          autoComplete="off"
          style={{ "--input-width": "12%" }}
        />

        <select onChange={selectPId} style={{ "--input-width": "15%" }}>
          <option value="default">Mahsulot tanlang*</option>
          {data?.map((item) => {
            return (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            );
          })}
        </select>
        <input
          type="text"
          name="amount"
          placeholder="Miqdori"
          required
          autoComplete="off"
          style={{ "--input-width": "12%" }}
          onChange={(e) => setQty(e.target.value)}
        />
        <input
          type="date"
          name="date"
          style={{ "--input-width": "12%" }}
          defaultValue={today}
        />
        <select style={{ "--input-width": "15%" }} onChange={selectSenderS}>
          <option value="default">Beruvchi ombor*</option>
          {storeData?.data?.map((item) => {
            return (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            );
          })}
        </select>
        <select style={{ "--input-width": "15%" }} onChange={selectReceiverS}>
          <option value="default">Oluvchi ombor*</option>
          {storeData?.data?.map((item, ind) => {
            return (
              <option key={item.id + ind} value={item.name}>
                {item.name}
              </option>
            );
          })}
        </select>
        <input
          type="text"
          name="description"
          placeholder="Tavsif*"
          style={{ "--input-width": "12%" }}
        />
        <input type="hidden" name="storage_sender" value={id} />
        <input type="hidden" name="storage_receiver" value={rId} />
        <input type="hidden" name="food_id" value={pId} />
      </UniversalForm>
      <UniversalProductControl
        activePart={activePart}
        setActivePart={setActivePart}
      >
        <div className="product_box_item">
          <label aria-label="checked this elements">
            <input type="checkbox" name="id" onClick={() => getProduct(data)} />
          </label>
          <p style={{ "--data-line-size": "27%" }}>Nomi</p>
          <p style={{ "--data-line-size": "9.9%" }}>O'lchov birligi</p>
          <p style={{ "--data-line-size": "20%" }}>Guruh</p>
          <p style={{ "--data-line-size": "20%" }}>Narxi</p>
          <p style={{ "--data-line-size": "20%" }}>Miqdori</p>
        </div>
        <div className="product_box_body">
          {currentData?.map((item) => {
            const checked = checkedData.some((i) => i.id === item.id);
            return (
              <div
                className={`product_box_item ${checked ? "active" : ""}`}
                key={item.id}
              >
                <label>
                  <input
                    type="checkbox"
                    defaultChecked={checked}
                    onChange={() =>
                      getProduct({ ...item, amount: 0 }, checked ? 0 : 1)
                    }
                  />
                </label>
                <p style={{ "--data-line-size": "27%" }}>{item.name}</p>
                <p
                  style={{
                    "--data-line-size": "9.9%",
                    justifyContent: "center",
                  }}
                >
                  {item.unit}
                </p>
                <p
                  style={{
                    "--data-line-size": "20%",
                    justifyContent: "center",
                  }}
                >
                  {item.group}
                </p>
                <p
                  style={{
                    "--data-line-size": "20%",
                    justifyContent: "flex-end",
                  }}
                >
                  {checked ? (
                    <input
                      type="number"
                      defaultValue={item.price}
                      onChange={(e) =>
                        getProduct({ ...item, price: e.target.value }, 1)
                      }
                    />
                  ) : (
                    item.price
                  )}
                </p>
                <p
                  style={{
                    "--data-line-size": "20%",
                    justifyContent: "center",
                  }}
                >
                  {checked && (
                    <input
                      type="number"
                      name="amount"
                      onChange={(e) =>
                        getProduct({ ...item, amount: e.target.value }, 1)
                      }
                    />
                  )}
                </p>
              </div>
            );
          })}
        </div>
      </UniversalProductControl>
      <CalcResult data={checkedData}>
        <CalcResultHeader>
          <p>№</p>
          <p style={{ "--data-line-size": "18%" }}>Nomi</p>
          <p style={{ "--data-line-size": "10%" }}>kg/l</p>
          <p style={{ "--data-line-size": "14%" }}>Oldingi miqdor</p>
          <p style={{ "--data-line-size": "14%" }}>Miqdor</p>
          <p style={{ "--data-line-size": "14%" }}>Keyingi miqdor</p>
          <p style={{ "--data-line-size": "14%" }}>Narx</p>
          <p style={{ "--data-line-size": "14%" }}>Farq</p>
        </CalcResultHeader>
        <CalcResultBody
          data={updatedData}
          displayKeys={[
            { name: "name", size: "18%" },
            { name: "unit", size: "10%", position: 1 },
            { name: "old_quantity", size: "14%", position: 2 },
            { name: "amount", size: "14%", position: 2 },
            { name: "total_quantity", size: "14%", position: 2 },
            { name: "price", size: "14%", position: 2 },
            { name: "different", size: "14%", position: 2 },
          ]}
        />
      </CalcResult>
    </UniversalControlModal>
  );
};

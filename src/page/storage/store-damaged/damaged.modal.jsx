import React, { useState } from "react";
import { UniversalControlModal } from "../../../components/modal-calc/modal-calc";
import { UniversalForm } from "../../../components/modal-calc/modal-calc";
import { UniversalProductControl } from "../../../components/modal-calc/modal-calc";
import { CalcResultHeader } from "../../../components/modal-calc/modal-calc";
import { CalcResultBody } from "../../../components/modal-calc/modal-calc";
import { CalcResult } from "../../../components/modal-calc/modal-calc";
import { useGetStoreQuery } from "../../../service/store.service";
import { useGetStorageItemsQuery } from "../../../service/invoices.service";
import { useGetStGroupsQuery } from "../../../service/groups.service";

export const InvoicesModal = ({
  checkedData,
  setCheckedData,
  data,
  getProduct,
  NUM,
}) => {
  const today = new Date().toISOString().split("T")[0];
  const [id, setId] = useState(null);
  const { data: storeData = [] } = useGetStoreQuery();
  const { data: storageItems = [] } = useGetStorageItemsQuery(id);
  const { data: groupsData = [] } = useGetStGroupsQuery();
  const parsedData = JSON.parse(storageItems?.data || "[]");

  const updatedData = checkedData?.map((newItem) => {
    const oldData = parsedData?.find((old) => old.id === newItem.id) || {};

    if (oldData) {
      return {
        ...newItem,
        old_quantity: oldData?.total_quantity || 0,
        total_quantity: oldData?.total_quantity
          ? oldData?.total_quantity + newItem?.amount
          : newItem?.amount,
        total_price: newItem?.amount * newItem?.price,
      };
    }

    return newItem;
  });

  console.log(updatedData);

  const handleSelectChange = (event) => {
    const selectedName = event.target.value;
    const selectedItem = storeData?.data?.find(
      (item) => item.name === selectedName
    );
    const selectedId =
      selectedName === "default" || !selectedItem ? null : selectedItem.id;

    setId(selectedId);
  };

  return (
    <UniversalControlModal type="edr" Pdata={checkedData}>
      <UniversalForm>
        <input
          type="number"
          name="order"
          placeholder="Tartib raqam*"
          required
          defaultValue={NUM.num}
          autoComplete="off"
          style={{ "--input-width": "8%" }}
        />
        <input
          type="date"
          name="date"
          style={{ "--input-width": "12%" }}
          defaultValue={today}
        />
        <select
          name="storage"
          style={{ "--input-width": "15%" }}
          onChange={handleSelectChange}
        >
          <option value="default">Ombor tanlang*</option>
          {storeData?.data?.map((item) => {
            return (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            );
          })}
        </select>
        <select name="group">
          <option value="default">Guruh tanlang*</option>
          {groupsData?.data?.map((item) => {
            return (
              <option key={item.id} value={item.name}>
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
        <select name="type" style={{ "--input-width": "15%" }}>
          <option value="ingredients">Ingredientlar o'chir</option>
          <option value="products">Taomlarni o'chir</option>
        </select>
      </UniversalForm>
      <UniversalProductControl
        checkedData={checkedData}
        setCheckedData={setCheckedData}
      >
        <div className="product_box_item">
          <label>
            <input type="checkbox" name="id" onClick={() => getProduct(data)} />
          </label>
          <p style={{ "--data-line-size": "20%" }}>Nomi</p>
          <p style={{ "--data-line-size": "15%" }}>O'lchov birligi</p>
          <p style={{ "--data-line-size": "15%" }}>Guruh</p>
          <p style={{ "--data-line-size": "15%" }}>Narxi</p>
          <p style={{ "--data-line-size": "15%" }}>Turi</p>
          <p style={{ "--data-line-size": "15%" }}>Miqdori</p>
        </div>
        <div className="product_box_body">
          {data?.map((item) => {
            const checked = checkedData.some((i) => i.id === item.id);
            return (
              <div
                className={`product_box_item ${checked ? "active" : ""}`}
                key={item.id}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={checked}
                    onClick={() => getProduct(item, 0, checked ? 0 : 1)}
                  />
                </label>
                <p style={{ "--data-line-size": "20%" }}>{item.name}</p>
                <p
                  style={{
                    "--data-line-size": "15%",
                    justifyContent: "center",
                  }}
                >
                  {item.unit}
                </p>
                <p
                  style={{
                    "--data-line-size": "15%",
                    justifyContent: "center",
                  }}
                >
                  {item.group}
                </p>
                <p
                  style={{
                    "--data-line-size": "15%",
                    justifyContent: "flex-end",
                  }}
                >
                  {item.price}
                </p>
                <p
                  style={{
                    "--data-line-size": "15%",
                    justifyContent: "center",
                  }}
                >
                  {item.type}
                </p>
                <p
                  style={{
                    "--data-line-size": "15%",
                    justifyContent: "center",
                  }}
                >
                  {checked && (
                    <input
                      type="number"
                      name="amount"
                      onChange={(e) => getProduct(item, e.target.value, 1)}
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
          <p style={{ "--data-line-size": "15%" }}>Nomi</p>
          <p style={{ "--data-line-size": "13.33%" }}>Tur</p>
          <p style={{ "--data-line-size": "13.33%" }}>Eski miqdor</p>
          <p style={{ "--data-line-size": "13.33%" }}>Miqdor</p>
          <p style={{ "--data-line-size": "13.33%" }}>Yangi miqdor</p>
          <p style={{ "--data-line-size": "13.33%" }}>Narx</p>
          <p style={{ "--data-line-size": "13.33%" }}>Jami</p>
        </CalcResultHeader>
        <CalcResultBody
          data={updatedData}
          status="inv"
          displayKeys={[
            { name: "name", size: "15%" },
            { name: "type", size: "13.33%", position: 1 },
            { name: "old_quantity", size: "13.33%", position: 2 },
            { name: "amount", size: "13.33%", position: 2 },
            { name: "total_quantity", size: "13.33%", position: 2 },
            { name: "price", size: "13.33%", position: 2 },
            { name: "total_price", size: "13.33%", position: 2 },
          ]}
        />
      </CalcResult>
    </UniversalControlModal>
  );
};

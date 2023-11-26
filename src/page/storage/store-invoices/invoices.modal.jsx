import React from "react";
import { UniversalControlModal } from "../../../components/modal-calc/modal-calc";
import { UniversalForm } from "../../../components/modal-calc/modal-calc";
import { UniversalProductControl } from "../../../components/modal-calc/modal-calc";
import { CalcResultHeader } from "../../../components/modal-calc/modal-calc";
import { CalcResultBody } from "../../../components/modal-calc/modal-calc";
import { CalcResult } from "../../../components/modal-calc/modal-calc";
import { useGetStoreQuery } from "../../../service/store.service";

export const InvoicesModal = ({
  checkedData,
  setCheckedData,
  data,
  getProduct,
}) => {
  const today = new Date().toISOString().split("T")[0];
  const { data: storeData = [] } = useGetStoreQuery();
  //   {
  //     "order": "155",
  //     "res_id": "2899b5",
  //     "storage": "jhgfrty",
  //     "supplier": "sardoba1",
  //     "cost": "1000000",
  //     "paid": "600000",
  //     "leftover": "400000",
  //     "responsible": "someone",
  //     "description": "rotten tomatoes",
  //     "items_brought": "[{\"id\":\"2d03d0\",\"name\":\"tandir lavash\",\"price\":100000,\"res_id\":\"bd81c3\",\"total_quantity\":10,\"unit\":\"kg\",\"unit_price\":3600},{\"id\":\"56ef54\",\"name\":\"tandir lavash\",\"price\":360000,\"res_id\":\"bd81c3\",\"total_quantity\":10,\"unit\":\"kg\",\"unit_price\":3600}]"
  // }
  return (
    <UniversalControlModal type="product" Pdata={checkedData}>
      <UniversalForm>
        <input
          type="text"
          name="order"
          placeholder="Tartib raqam*"
          required
          autoComplete="off"
          style={{ "--input-width": "15%" }}
        />
        <input
          type="date"
          name="date"
          style={{ "--input-width": "12%" }}
          defaultValue={today}
        />
        <input
          type="text"
          name="suplier"
          placeholder="Yetkazuvchi*"
          style={{ "--input-width": "12%" }}
        />
        <select name="storage" style={{ "--input-width": "15%" }}>
          <option value="default">Ombor tanlang*</option>
          {storeData?.data?.map((item) => {
            return (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            );
          })}
        </select>
        <input
          type="text"
          name="responsible"
          placeholder="Javobgar*"
          style={{ "--input-width": "12%" }}
        />
        <input
          type="text"
          name="description"
          placeholder="Tavsif*"
          style={{ "--input-width": "12%" }}
        />
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
          <p style={{ "--data-line-size": "15%" }}>Miqdori</p>
          <p style={{ "--data-line-size": "15%" }}>Jami</p>
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
                    onClick={() => getProduct(item)}
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
                  {checked ? (
                    <input
                      type="number"
                      defaultValue={item.price}
                      onChange={(e) =>
                        getProduct({ ...item, price: e.target.value })
                      }
                    />
                  ) : (
                    item.price
                  )}
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
                      onChange={(e) => getProduct(item, e.target.value)}
                    />
                  )}
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
                      name="total"
                      onChange={(e) => getProduct(item, e.target.value)}
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
          <p style={{ "--data-line-size": "20%" }}>Nomi</p>
          <p style={{ "--data-line-size": "18%" }}>O'lchov</p>
          <p style={{ "--data-line-size": "18%" }}>Miqdori</p>
          <p style={{ "--data-line-size": "18%" }}>Narxi</p>
          <p style={{ "--data-line-size": "18%" }}>Jami</p>
        </CalcResultHeader>
        <CalcResultBody
          data={checkedData}
          displayKeys={[
            { name: "name", size: "20%" },
            { name: "unit", size: "18%", position: 1 },
            { name: "amount", size: "18%", position: 2 },
            { name: "price", size: "18%", position: 2 },
          ]}
        />
      </CalcResult>
    </UniversalControlModal>
  );
};

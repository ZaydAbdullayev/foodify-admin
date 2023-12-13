import React, { useState } from "react";
import { UniversalControlModal } from "../../../components/modal-calc/modal-calc";
import { UniversalForm } from "../../../components/modal-calc/modal-calc";
import { UniversalProductControl } from "../../../components/modal-calc/modal-calc";
import { CalcResultHeader } from "../../../components/modal-calc/modal-calc";
import { CalcResultBody } from "../../../components/modal-calc/modal-calc";
import { CalcResult } from "../../../components/modal-calc/modal-calc";
import { useGetStoreQuery } from "../../../service/store.service";
import { useGetStGroupsQuery } from "../../../service/groups.service";
import { CalculateTotalP } from "../../../service/calc.service";
import { CalculateTotalQuantity } from "../../../service/calc.service";

export const InvoicesModal = ({
  checkedData,
  setCheckedData,
  data,
  getProduct,
  NUM,
  setId,
  id,
}) => {
  const today = new Date().toISOString().split("T")[0];
  const [pId, setPId] = useState(null);
  const [qty, setQty] = useState(0);
  const { data: storeData = [] } = useGetStoreQuery();
  const { data: groupsData = [] } = useGetStGroupsQuery();

  // displayKeys={[
  //           { name: "tittle", size: "24%" },
  //           { name: "waste", size: "24%", position: 2 },
  //           { name: "get_amount", size: "24%", position: 2 },
  //           { name: "total_price", size: "24%", position: 2 },
  //         ]}
  // const akd = {
  //   amount: "",
  //   group: "sabzavotlar",
  //   id: "2941f6",
  //   name: "kartoshka",
  //   price: 100000,
  //   res_id: "2899b5",
  //   type: "Ingredient",
  //   unit: "kg",
  // };

  const total_quantity = CalculateTotalQuantity(checkedData, "amount");
  const total_price = CalculateTotalP(checkedData, "price", "amount");
  const updatedData = [
    {
      tittle: "Umumiy",
      waste: qty - total_quantity || 0,
      get_amount: total_quantity || 0,
      total_price: total_price || 0,
    },
  ];

  const handleSelectChange = (event) => {
    const selectedName = event.target.value;
    const selectedItem = storeData?.data?.find(
      (item) => item.name === selectedName
    );
    const selectedId =
      selectedName === "default" || !selectedItem ? 0 : selectedItem.id;

    setId(selectedId);
  };

  const handleSelectIDChange = (event) => {
    const selectedName = event.target.value;
    const selectedItem = data?.find((item) => item.name === selectedName);
    const selectedId =
      selectedName === "default" || !selectedItem ? null : selectedItem.id;

    setPId(selectedId);
  };

  return (
    <UniversalControlModal type="cutting" Pdata={checkedData}>
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

        <select
          name="ingredient"
          onChange={handleSelectIDChange}
          style={{ "--input-width": "15%" }}
        >
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
          style={{ "--input-width": "15%" }}
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
        <select name="ingredient_group">
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
        <input type="hidden" name="storage_id" value={id} />
        <input type="hidden" name="ingredient_id" value={pId} />
        <input type="hidden" name="waste" value={3844} />
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
          <p style={{ "--data-line-size": "15%" }}>Ombor</p>
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
                    onClick={() =>
                      getProduct({ ...item, amount: 0 }, checked ? 0 : 1)
                    }
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
                  {checked && (
                    <select
                      name="storage"
                      onChange={(e) =>
                        getProduct({ ...item, storage: e.target.value }, 1)
                      }
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
          <p style={{ "--data-line-size": "12%" }}>Nomi</p>
          <p style={{ "--data-line-size": "4%" }}>Turi</p>
          <p style={{ "--data-line-size": "8%" }}>O'lchov birligi</p>
          <p style={{ "--data-line-size": "12%" }}>Oldingi stok</p>
          <p style={{ "--data-line-size": "12%" }}>Keyingi stok</p>
          <p style={{ "--data-line-size": "12%" }}>M. farq</p>
          <p style={{ "--data-line-size": "12%" }}>Narx</p>
          <p style={{ "--data-line-size": "12%" }}>N. farq</p>
          <p style={{ "--data-line-size": "12%" }}>Foyda</p>
        </CalcResultHeader>
        <CalcResultBody
          data={updatedData}
          status="inv"
          displayKeys={[
            { name: "tittle", size: "12%" },
            { name: "waste", size: "12%", position: 2 },
            { name: "get_amount", size: "12%", position: 2 },
            { name: "total_price", size: "12%", position: 2 },
          ]}
        />
      </CalcResult>
    </UniversalControlModal>
  );
};

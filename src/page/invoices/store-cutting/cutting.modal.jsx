import React, { useState, useEffect } from "react";
import { UniversalControlModal } from "../../../components/modal-calc/modal-calc";
import { UniversalForm } from "../../../components/modal-calc/modal-calc";
import { UniversalProductControl } from "../../../components/modal-calc/modal-calc";
import { CalcResultHeader } from "../../../components/modal-calc/modal-calc";
import { CalcResultBody } from "../../../components/modal-calc/modal-calc";
import { CalcResult } from "../../../components/modal-calc/modal-calc";
import { CalculateTotalP } from "../../../service/calc.service";
import { CalculateTotalQuantity } from "../../../service/calc.service";
import { useSelector } from "react-redux";
import { useFetchDataQuery } from "../../../service/fetch.service";

export const InvoicesModal = ({
  checkedData,
  setCheckedData,
  data,
  getProduct,
  NUM,
  setId,
  id,
}) => {
  // const today = new Date().toISOString().split("T")[0];
  const [pId, setPId] = useState(null);
  const [qty, setQty] = useState(0);
  const [activePart, setActivePart] = useState(1);
  const acItem = useSelector((state) => state.activeThing);
  const res_id = useSelector((state) => state.res_id);
  const { data: storeData = [] } = useFetchDataQuery({
    url: `get/storage/${res_id}`,
    tags: ["store"],
  });
  const { data: groupsData = [] } = useFetchDataQuery({
    url: `get/ingredientGroups/${res_id}`,
    tags: ["groups"],
  });
  const acIngredients = acItem?.ingredients
    ? JSON.parse(acItem?.ingredients)
    : [];

  const total_quantity = CalculateTotalQuantity(
    [...checkedData, ...acIngredients],
    "amount"
  );
  const total_price = CalculateTotalP(
    [...checkedData, ...acIngredients],
    "price",
    "amount"
  );
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
      (item) => item?.name === selectedName
    );
    const selectedId =
      selectedName === "default" || !selectedItem ? 0 : selectedItem?.id;

    setId(selectedId);
  };

  const handleSelectIDChange = (event) => {
    const selectedName = event.target.value;
    const selectedItem = data?.find((item) => item?.name === selectedName);
    const selectedId =
      selectedName === "default" || !selectedItem ? null : selectedItem?.id;

    setPId(selectedId);
  };

  useEffect(() => {
    if (acItem?.storage) {
      const selectedItem = storeData?.data?.find(
        (item) => item?.name === acItem?.storage
      );
      const selectedId = selectedItem?.id;

      setId(selectedId);
    }
  }, [acItem?.storage, setId, storeData?.data]);

  const ingID = acItem?.ingredient_id ? acItem?.ingredient_id : pId;
  const num = acItem?.order ? acItem?.order : NUM.num;
  return (
    <UniversalControlModal
      status={acItem?.id ? true : false}
      type="cutting"
      Pdata={[...checkedData, ...acIngredients]}
      setCheckedData={setCheckedData}
    >
      <UniversalForm>
        <input
          type="number"
          name="order"
          placeholder="Tartib raqam*"
          defaultValue={num}
          required
          autoComplete="off"
          style={{ "--input-width": "12%" }}
        />

        <select
          name="ingredient"
          onChange={handleSelectIDChange}
          style={{ "--input-width": "15%" }}
        >
          {acItem?.ingredient ? (
            <option value={acItem?.ingredient}>{acItem?.ingredient}</option>
          ) : (
            <option value="default">Mahsulot tanlang*</option>
          )}

          {data?.map((item) => {
            return (
              <option key={item?.id} value={item?.name}>
                {item?.name}
              </option>
            );
          })}
        </select>
        <input
          type="text"
          name="amount"
          placeholder="Miqdori"
          defaultValue={acItem?.amount}
          required
          autoComplete="off"
          style={{ "--input-width": "12%" }}
          onChange={(e) => setQty(e.target.value)}
        />
        <input
          type="date"
          name="date"
          style={{ "--input-width": "15%" }}
          defaultValue={acItem?.date}
        />
        <select
          name="storage"
          style={{ "--input-width": "15%" }}
          onChange={handleSelectChange}
        >
          {acItem?.storage ? (
            <option value={acItem?.storage}>{acItem?.storage}</option>
          ) : (
            <option value="default">Ombor tanlang*</option>
          )}
          {storeData?.data?.map((item) => {
            return (
              <option key={item?.id} value={item?.name}>
                {item?.name}
              </option>
            );
          })}
        </select>
        <select name="ingredient_group">
          {acItem?.ingredient_group ? (
            <option value={acItem?.ingredient_group}>
              {acItem?.ingredient_group}
            </option>
          ) : (
            <option value="default">Guruh tanlang*</option>
          )}
          {groupsData?.data?.map((item) => {
            return (
              <option key={item?.id} value={item?.name}>
                {item?.name}
              </option>
            );
          })}
        </select>
        <input
          type="text"
          name="description"
          placeholder="Tavsif*"
          defaultValue={acItem?.description}
          style={{ "--input-width": "12%" }}
        />
        <input type="hidden" name="storage_id" value={id} />
        <input type="hidden" name="ingredient_id" value={ingID} />
        <input type="hidden" name="waste" value={3844} />
      </UniversalForm>
      <UniversalProductControl
        activePart={activePart}
        setActivePart={setActivePart}
      >
        <div className="product_box_item">
          <label aria-label="checked this elements">
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
            const checked = [...checkedData, ...acIngredients].find(
              (i) => i.id === item?.id
            );
            return (
              <div
                className={`product_box_item ${checked ? "active" : ""}`}
                key={item?.id}
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
                <p style={{ "--data-line-size": "20%" }}>{item?.name}</p>
                <p
                  style={{
                    "--data-line-size": "15%",
                    justifyContent: "center",
                  }}
                >
                  {item?.unit}
                </p>
                <p
                  style={{
                    "--data-line-size": "15%",
                    justifyContent: "center",
                  }}
                >
                  {item?.group}
                </p>
                <p
                  style={{
                    "--data-line-size": "15%",
                    justifyContent: "flex-end",
                  }}
                >
                  {item?.price}
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
                      {acItem?.storage ? (
                        <option value={acItem?.storage}>
                          {acItem?.storage}
                        </option>
                      ) : (
                        <option value="default">Ombor tanlang*</option>
                      )}
                      {storeData?.data?.map((item) => {
                        return (
                          <option key={item?.id} value={item?.name}>
                            {item?.name}
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
                      defaultValue={acItem?.amount}
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
      <CalcResult>
        <CalcResultHeader>
          <p>№</p>
          <p style={{ "--data-line-size": "24%" }}>Umumiy</p>
          <p style={{ "--data-line-size": "24%" }}>Qoldiq</p>
          <p style={{ "--data-line-size": "24%" }}>Olingan miqdor</p>
          <p style={{ "--data-line-size": "24%" }}>Jami mablag'</p>
        </CalcResultHeader>
        <CalcResultBody
          data={updatedData}
          status="inv"
          displayKeys={[
            { name: "tittle", size: "24%" },
            { name: "waste", size: "24%", position: 2 },
            { name: "get_amount", size: "24%", position: 2 },
            { name: "total_price", size: "24%", position: 2 },
          ]}
        />
      </CalcResult>
    </UniversalControlModal>
  );
};

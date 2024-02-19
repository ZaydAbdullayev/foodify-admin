import React, { useEffect, useState } from "react";
import { UniversalControlModal } from "../../../components/modal-calc/modal-calc";
import { UniversalForm } from "../../../components/modal-calc/modal-calc";
import { UniversalProductControl } from "../../../components/modal-calc/modal-calc";
import { CalcResultHeader } from "../../../components/modal-calc/modal-calc";
import { CalcResultBody } from "../../../components/modal-calc/modal-calc";
import { CalcResult } from "../../../components/modal-calc/modal-calc";
import { useFetchDataQuery } from "../../../service/fetch.service";
import { useSelector } from "react-redux";

export const InvoicesModal = ({
  checkedData,
  setCheckedData,
  data,
  getProduct,
  NUM,
  setId,
  id,
  acIngredients,
  acItem,
}) => {
  const today = new Date().toISOString().split("T")[0];
  const res_id = useSelector((state) => state?.res_id);
  const { data: storeData = [] } = useFetchDataQuery({
    url: `get/storage/${res_id}`,
    tags: ["store"],
  });
  const { data: groupsData = [] } = useFetchDataQuery({
    url: `get/ingredientGroups/${res_id}`,
    tags: ["groups"],
  });
  const [activePart, setActivePart] = useState(1);

  const updatedData = checkedData?.map((newItem) => {
    const oldData = data?.find((old) => old.id === newItem?.id) || {};

    if (oldData) {
      return {
        ...newItem,
        old_quantity: oldData?.total_quantity || 0,
        total_quantity:
          oldData?.total_quantity - parseInt(newItem?.amount) || 0,
        total_price: parseInt(newItem?.amount) * newItem?.price,
      };
    }

    return newItem;
  });

  console.log(updatedData);

  const handleSelectChange = (event) => {
    const selectedName = event.target.value;
    const selectedItem = storeData?.data?.find(
      (item) => item?.name === selectedName
    );
    const selectedId =
      selectedName === "default" || !selectedItem ? null : selectedItem?.id;

    setId(selectedId);
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

  const num = acItem?.order ? acItem?.order : NUM.num;
  return (
    <UniversalControlModal
      status={acItem?.id ? true : false}
      type="damaged"
      Pdata={[...checkedData, ...acIngredients]}
      setCheckedData={setCheckedData}
    >
      <UniversalForm>
        <input
          type="number"
          name="order"
          placeholder="Tartib raqam*"
          required
          defaultValue={num}
          autoComplete="off"
          style={{ "--input-width": "8%" }}
        />
        <input
          type="date"
          name="date"
          defaultValue={acItem?.date || today}
          style={{ "--input-width": "12%" }}
          // defaultValue={acItem?.date}
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
          defaultValue={acItem?.description}
          placeholder="Tavsif*"
          style={{ "--input-width": "12%" }}
        />
        <input type="hidden" name="storage_id" value={id} />
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
          <p style={{ "--data-line-size": "15%" }}>Turi</p>
          <p style={{ "--data-line-size": "15%" }}>Miqdori</p>
        </div>
        <div className="product_box_body">
          {data?.map((item) => {
            const checked = [...checkedData, ...acIngredients]?.find(
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
                  {item?.type}
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

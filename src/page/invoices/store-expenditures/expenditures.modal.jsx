import React, { useState, useEffect } from "react";
import { UniversalControlModal } from "../../../components/modal-calc/modal-calc";
import { UniversalForm } from "../../../components/modal-calc/modal-calc";
import { UniversalProductControl } from "../../../components/modal-calc/modal-calc";
import { CalcResultHeader } from "../../../components/modal-calc/modal-calc";
import { CalcResultBody } from "../../../components/modal-calc/modal-calc";
import { CalcResult } from "../../../components/modal-calc/modal-calc";
import { useSelector } from "react-redux";
import { useFetchDataQuery } from "../../../service/fetch.service";
import { DatePicker, Select, InputNumber, Input } from "antd";
import dayjs from "dayjs";

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
  const [activePart, setActivePart] = useState(1); // 1 - product, 2 - invoice
  const [values, setValues] = useState({});
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
    ? JSON?.parse(acItem?.ingredients)
    : [];
  const updatedData = checkedData?.map((newItem) => {
    const oldData = data?.find((old) => old.id === newItem?.id) || {};

    if (oldData) {
      return {
        ...newItem,
        old_quantity: oldData?.total_quantity || 0,
        total_quantity: oldData?.total_quantity
          ? oldData?.total_quantity + parseInt(newItem?.amount)
          : parseInt(newItem?.amount),
        total_price: parseInt(newItem?.amount) * newItem?.price,
      };
    }

    return newItem;
  });

  const handleSelectChange = (value) => {
    const [status, data] = value.split("=");
    if (status === "store") {
      const [name, id] = data.split("|");
      setId(id);
      setValues({ ...values, name, id });
    }
    if (status === "group") {
      setId({ ...values, gr_name: data });
    }
  };
  useEffect(() => {
    if (acItem?.storage) {
      const selectedItem = storeData?.data?.find(
        (item) => item.name === acItem?.storage
      );
      const selectedId = selectedItem?.id;

      setId(selectedId);
    }
  }, [acItem?.storage, setId, storeData?.data]);
  const num = acItem?.order ? acItem?.order : NUM.num;
  const day = acItem?.date
    ? acItem?.date
    : new Date().toISOString().split("T")[0];
  return (
    <UniversalControlModal
      status={acItem?.id ? true : false}
      type="edr"
      Pdata={[...checkedData, ...acIngredients]}
      setCheckedData={setCheckedData}
    >
      <UniversalForm>
        {/* <input
          type="number"
          name="order"
          placeholder="Tartib raqam*"
          required
          defaultValue={num}
          autoComplete="off"
          style={{ "--input-width": "15%" }}
        /> */}
        <InputNumber
          name="order"
          required
          defaultValue={num || 1}
          min={1}
          max={100000}
        />
        <DatePicker
          style={{ width: "15%" }}
          name="date"
          defaultValue={dayjs(day)}
        />
        <Select
          style={{ width: "15%" }}
          defaultValue={{
            value: "all",
            label: "Ombor tanlang*",
          }}
          onChange={handleSelectChange}
          options={storeData?.data?.map((item) => ({
            value: `store=${item?.name}|${item?.id}`,
            label: item?.name,
          }))}
        />
        <input type="hidden" name="storage" value={values.name} />
        <input type="hidden" name="storage_id" value={values.id} />
        <Select
          style={{ width: "15%" }}
          name="group"
          defaultValue={{
            value: "all",
            label: "Guruh tanlang*",
          }}
          options={groupsData?.data?.map((item) => {
            return {
              value: item?.name,
              label: item?.name,
            };
          })}
        />
        <Input
          name="description"
          defaultValue={acItem?.description ? acItem?.description : ""}
          placeholder="Tavsif*"
          style={{ width: "12%" }}
        />
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
                    defaultChecked={checked || false}
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
                      defaultValue={checked?.amount ? checked?.amount : ""}
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

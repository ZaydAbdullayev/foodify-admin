import React, { useState } from "react";
import { UniversalControlModal } from "../../../components/modal-calc/modal-calc";
import { UniversalForm } from "../../../components/modal-calc/modal-calc";
import { UniversalProductControl } from "../../../components/modal-calc/modal-calc";
import { CalcResultHeader } from "../../../components/modal-calc/modal-calc";
import { CalcResultBody } from "../../../components/modal-calc/modal-calc";
import { CalcResult } from "../../../components/modal-calc/modal-calc";

import { useSelector } from "react-redux";
import { useFetchDataQuery } from "../../../service/fetch.service";

const InvoicesModal = ({ checkedData, setCheckedData, getProduct, NUM }) => {
  const res_id = useSelector((state) => state?.res_id);
  const acItem = useSelector((state) => state?.activeThing);
  const id = useSelector((state) => state?.activeSt_id);
  const [activePart, setActivePart] = useState(1);
  const { data = [] } = useFetchDataQuery({
    url: `get/ingredients/${res_id}`,
    tags: ["ingredient"],
  });
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

  const currentData = activePart === 1 ? data?.data : storageItems?.data;
  return (
    <UniversalControlModal
      type="making"
      Pdata={checkedData}
      id={id}
      setCheckedData={setCheckedData}>
      <UniversalForm
        formData={[
          {
            type: "inputN",
            name: "order",
            plc_hr: "Tartib raqam*",
            df_value: NUM.num || 1,
          },
          {
            type: "inputD",
            name: "date",
            df_value: acItem?.date,
          },
          {
            type: "s_extra",
            extra: "food_id",
            df_value: acItem?.food_id
              ? { value: "default", label: "Mahsulot tanlang*" }
              : { value: acItem?.food_id, label: acItem?.food_id },
            options: data,
          },
          {
            type: "s_extra",
            take_id: true,
            extra: "storage_sender",
            df_value: acItem?.storage
              ? { value: acItem?.storage, label: acItem?.storage }
              : { value: "default", label: "Beruvchi ombor*" },
            options: storeData?.data,
          },
          {
            type: "s_extra",
            extra: "storage_receiver",
            df_value: acItem?.storage
              ? { value: acItem?.storage, label: acItem?.storage }
              : { value: "default", label: "Oluvchi ombor*" },
            options: storeData?.data,
          },
          {
            type: "inputN",
            name: "amount",
            plc_hr: "Miqdori*",
            df_value: acItem?.amount || "",
          },
          {
            type: "input",
            name: "description",
            plc_hr: "Tavsif",
            df_value: acItem?.description || "",
          },
        ]}
      />
      <UniversalProductControl
        activePart={activePart}
        setActivePart={setActivePart}>
        <div className="product_box_item">
          <label aria-label="checked this elements">
            <input
              type="checkbox"
              name="id"
              onClick={() => setCheckedData(data?.data)}
            />
          </label>
          <p style={{ "--data-line-size": "27%" }}>Nomi</p>
          <p style={{ "--data-line-size": "9.9%" }}>O'lchov birligi</p>
          <p style={{ "--data-line-size": "20%" }}>Guruh</p>
          <p style={{ "--data-line-size": "20%" }}>Narxi</p>
          <p style={{ "--data-line-size": "20%" }}>Miqdori</p>
        </div>
        <div className="product_box_body">
          {currentData?.map((item) => {
            const checked = checkedData.find((i) => i.id === item.id);
            return (
              <div
                className={`product_box_item ${checked ? "active" : ""}`}
                key={item.id}>
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
                  }}>
                  {item.unit}
                </p>
                <p
                  style={{
                    "--data-line-size": "20%",
                    justifyContent: "center",
                  }}>
                  {item.group}
                </p>
                <p
                  style={{
                    "--data-line-size": "20%",
                    justifyContent: "flex-end",
                  }}>
                  {checked ? (
                    <input
                      type="number"
                      defaultValue={item.price}
                      onChange={(e) =>
                        getProduct({ ...checked, price: e.target.value }, 1)
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
                  }}>
                  {checked && (
                    <input
                      type="number"
                      name="amount"
                      onChange={(e) =>
                        getProduct({ ...checked, amount: e.target.value }, 1)
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

export default InvoicesModal;

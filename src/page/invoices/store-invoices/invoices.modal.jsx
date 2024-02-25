import React, { useState, useEffect } from "react";
import { UniversalControlModal } from "../../../components/modal-calc/modal-calc";
import { UniversalForm } from "../../../components/modal-calc/modal-calc";
import { UniversalProductControl } from "../../../components/modal-calc/modal-calc";
import { CalcResultHeader } from "../../../components/modal-calc/modal-calc";
import { CalcResultBody } from "../../../components/modal-calc/modal-calc";
import { CalcResult } from "../../../components/modal-calc/modal-calc";
import { useSelector } from "react-redux";
import { useFetchDataQuery } from "../../../service/fetch.service";

export const InvoicesModal = ({ checkedData, setCheckedData, getProduct, NUM }) => {
  const acItem = useSelector((state) => state.activeThing);
  const res_id = useSelector((state) => state.res_id);
  const s_id = useSelector((state) => state.activeSt_id);
  const [id, setId] = useState(s_id);
  const [activePart, setActivePart] = useState(1); // 1 - product, 2 - invoice
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
  const { data: suplierData = [] } = useFetchDataQuery({
    url: `get/suppliers/${res_id}`,
    tags: ["suplier"],
  });
  const acIngredients = acItem?.ingredients
    ? JSON?.parse(acItem?.ingredients)
    : [];

  const updatedData = checkedData?.map((newItem) => {
    const oldData = storageItems?.data?.find((old) => old.id === newItem?.id);
    const ototal = oldData ? oldData?.total_quantity : 0;

    if (oldData) {
      return {
        ...newItem,
        old_quantity: ototal || 0,
        total_quantity: ototal
          ? parseInt(ototal) + parseInt(newItem?.amount)
          : parseInt(newItem?.amount),
      };
    } else {
      return {
        ...newItem,
        old_quantity: 0,
        total_quantity: parseInt(newItem?.amount),
      };
    }
  });

  useEffect(() => {
    if (acItem?.storage) {
      const selectedItem = storeData?.data?.find(
        (item) => item?.name === acItem?.storage
      );
      const selectedId = selectedItem?.id;

      setId(selectedId);
    }
  }, [acItem?.storage, storeData?.data]);

  // const ingredientData = storageItems?.data ? storageItems?.data : data;

  const num = acItem?.order ? acItem?.order : NUM.num;
  return (
    <UniversalControlModal
      status={acItem?.id ? true : false}
      type="invoice"
      Pdata={[...checkedData, ...acIngredients]}
      Udata={updatedData}
      id={id}
      setCheckedData={setCheckedData}
    >
      <UniversalForm
        formData={[
          {
            type: "inputN",
            name: "order",
            plc_hr: "Tartib raqam*",
            df_value: num || 1,
            size: "5%",
          },
          {
            type: "inputD",
            name: "date",
            df_value: acItem?.date,
            size: "15%",
          },
          {
            type: "s_extra",
            name: "ingredient",
            extra: "ingredient_id",
            size: "15%",
            df_value: acItem?.ingredient
              ? { value: "default", label: "Ingredient tanlang*" }
              : { value: acItem?.ingredient, label: acItem?.ingredient },
            options: data,
          },
          {
            type: "input",
            name: "amount",
            plc_hr: "Miqdori*",
            size: "12%",
            df_value: acItem?.amount || 0,
          },
          {
            type: "select",
            name: "supplier",
            size: "15%",
            df_value: acItem?.supplier
              ? {
                  value: acItem?.supplier,
                  label: acItem?.supplier,
                }
              : { value: "default", label: "Yetkazuvchi tanlang*" },
            options: suplierData?.data,
          },
          {
            type: "select",
            name: "storage",
            take_id: true,
            size: "15%",
            df_value: acItem?.storage
              ? { value: acItem?.storage, label: acItem?.storage }
              : { value: "default", label: "Ombor tanlang*" },
            options: storeData?.data,
          },
          {
            type: "input",
            name: "responsible",
            plc_hr: "Javobgar*",
            size: "12%",
            df_value: acItem?.responsible || "",
          },
          {
            type: "input",
            name: "description",
            plc_hr: "Tavsif",
            size: "12%",
            df_value: acItem?.description || "",
          },
        ]}
      />
      <UniversalProductControl
        setActivePart={setActivePart}
        activePart={activePart}
      >
        <div className="product_box_item">
          <label aria-label="checked this elements">
            <input
              type="checkbox"
              name="id"
              onClick={() => setCheckedData(data)}
            />
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
                  {checked ? (
                    <input
                      type="number"
                      defaultValue={parseInt(item?.price)}
                      onChange={(e) =>
                        getProduct(
                          { ...checked, price: parseInt(e.target.value) },
                          1
                        )
                      }
                    />
                  ) : (
                    parseInt(item?.price)
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
                      defaultValue={checked?.amount ? checked?.amount : 0}
                      onChange={(e) =>
                        getProduct({ ...checked, amount: e.target.value }, 1)
                      }
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
                      value={checked?.amount * checked?.price}
                    />
                  )}
                </p>
              </div>
            );
          })}
        </div>
      </UniversalProductControl>
      <CalcResult data={[...checkedData, ...acIngredients]}>
        <CalcResultHeader>
          <p>№</p>
          <p style={{ "--data-line-size": "20%" }}>Nomi</p>
          <p style={{ "--data-line-size": "18%" }}>O'lchov</p>
          <p style={{ "--data-line-size": "18%" }}>Oldingi miqdor</p>
          <p style={{ "--data-line-size": "18%" }}>Miqdor</p>
          <p style={{ "--data-line-size": "18%" }}>Keyingi miqdor</p>
        </CalcResultHeader>
        <CalcResultBody
          data={updatedData}
          status="inv"
          displayKeys={[
            { name: "name", size: "20%" },
            { name: "unit", size: "18%", position: 1 },
            { name: "old_quantity", size: "18%", position: 2 },
            { name: "amount", size: "18%", position: 2 },
            { name: "total_quantity", size: "18%", position: 2 },
          ]}
        />
      </CalcResult>
    </UniversalControlModal>
  );
};

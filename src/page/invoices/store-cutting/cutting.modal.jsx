import React, { useState, useEffect } from "react";
import { UniversalControlModal } from "../../../components/modal-calc/modal-calc";
import { UniversalForm } from "../../../components/modal-calc/modal-calc";
import { UniversalProductControl } from "../../../components/modal-calc/modal-calc";
import { CalcResultHeader } from "../../../components/modal-calc/modal-calc";
import { CalcResultBody } from "../../../components/modal-calc/modal-calc";
import { CalcResult } from "../../../components/modal-calc/modal-calc";
import { CalculateTotalP } from "../../../service/calc.service";
import { CalculateTotalQuantity } from "../../../service/calc.service";
import { useDispatch, useSelector } from "react-redux";
import { useFetchDataQuery } from "../../../service/fetch.service";
import { acActiveSt_id } from "../../../redux/active";

export const InvoicesModal = ({
  checkedData,
  setCheckedData,
  getProduct,
  NUM,
}) => {
  const [activePart, setActivePart] = useState(1);
  const id = useSelector((state) => state.activeSt_id);
  const acItem = useSelector((state) => state.activeThing);
  const res_id = useSelector((state) => state.res_id);
  const dispatch = useDispatch();
  const { data = [] } = useFetchDataQuery({
    url: `get/storageItems/${res_id}/${id}`,
    tags: ["invoices"],
  });
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
      waste: total_quantity || 0,
      get_amount: total_quantity || 0,
      total_price: total_price || 0,
    },
  ];

  useEffect(() => {
    if (acItem?.storage) {
      const selectedItem = storeData?.data?.find(
        (item) => item?.name === acItem?.storage
      );
      const selectedId = selectedItem?.id;
      dispatch(acActiveSt_id(selectedId));
    }
  }, [acItem?.storage, dispatch, storeData?.data]);

  const num = acItem?.order ? acItem?.order : NUM.num;
  return (
    <UniversalControlModal
      status={acItem?.id ? true : false}
      type="cutting"
      Pdata={[...checkedData, ...acIngredients]}
      setCheckedData={setCheckedData}
    >
      <UniversalForm
        formData={[
          {
            type: "inputN",
            name: "order",
            plc_hr: "Tartib raqam*",
            df_value: num || 1,
          },
          {
            type: "inputD",
            name: "date",
            df_value: acItem?.date,
          },
          {
            type: "s_extra",
            name: "ingredient",
            extra: "ingredient_id",
            df_value: {
              value: acItem?.ingredient || "default",
              label: acItem?.ingredient || "Ingredient tanlang*",
            },
            options: data,
          },
          {
            type: "inputN",
            name: "amount",
            plc_hr: "Miqdori*",
            df_value: acItem?.amount || 0,
          },
          {
            type: "s_extra",
            name: "storage",
            take_id: true,
            extra: "storage_id",
            df_value: acItem?.storage
              ? { value: acItem?.storage, label: acItem?.storage }
              : { value: "default", label: "Ombor tanlang*" },
            options: storeData?.data,
          },
          {
            type: "select",
            name: "invoice_group",
            df_value: acItem?.invoice_group
              ? {
                  value: acItem?.invoice_group,
                  label: acItem?.invoice_group,
                }
              : { value: "default", label: "Guruh tanlang*" },
            options: groupsData?.data,
          },
          {
            type: "input",
            name: "description",
            plc_hr: "Tavsif",
            df_value: acItem?.description || "",
          },
          {
            type: "inputH",
            name: "waste",
            df_value: total_quantity || 0,
          },
        ]}
      />
      <UniversalProductControl
        activePart={activePart}
        setActivePart={setActivePart}
      >
        <div className="product_box_item">
          <label aria-label="checked this elements">
            <input
              type="checkbox"
              name="id"
              onClick={() => setCheckedData(data?.data)}
            />
          </label>
          <p style={{ "--data-line-size": "20%" }}>Nomi</p>
          <p style={{ "--data-line-size": "15%" }}>O'lchov birligi</p>
          <p style={{ "--data-line-size": "15%" }}>Guruh</p>
          <p style={{ "--data-line-size": "15%" }}>Narxi</p>
          <p style={{ "--data-line-size": "15%" }}>Ombor</p>
          <p style={{ "--data-line-size": "15%" }}>Miqdori</p>
        </div>
        <div className="product_box_body">
          {data?.data?.map((item) => {
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
                        getProduct(
                          { ...checked, st_receiver: e.target.value },
                          1
                        )
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
                          <option key={item?.id} value={item?.id}>
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

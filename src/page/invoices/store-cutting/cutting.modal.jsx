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
import { addAllIng } from "../../../service/unique.service";

const InvoicesModal = ({ checkedData, setCheckedData, getProduct, NUM }) => {
  const [activePart, setActivePart] = useState(1);
  const id = useSelector((state) => state.activeSt_id);
  const acItem = useSelector((state) => state.activeThing);
  const res_id = useSelector((state) => state.res_id);
  const amount = useSelector((state) => state.cuttingA);
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

  const updatedIngData = checkedData?.map((newItem) => {
    const oldData = data?.data?.find((old) => old.id === newItem?.id) || {};

    if (oldData) {
      return {
        ...newItem,
        total_price: parseInt(newItem?.amount) * newItem?.price,
      };
    }

    return newItem;
  });
  const updatedData = [
    {
      name: "Umumiy",
      waste: amount - total_quantity || 0,
      amount: total_quantity || 0,
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
      setCheckedData={setCheckedData}>
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
            name: "storage",
            take_id: true,
            extra: "storage_id",
            df_value: { value: "default", label: "Ombor tanlang*" },
            options: storeData?.data,
          },
          {
            type: "s_search",
            name: "ingredient",
            extra: "ingredient_id",
            df_value: {
              value: acItem?.ingredient || "default",
              label: acItem?.ingredient || "Ingredient tanlang*",
            },
            options: data?.data,
          },
          {
            type: "inputN",
            name: "amount",
            shareV: true,
            plc_hr: "Miqdori*",
            df_value: acItem?.amount || "",
          },
          {
            type: "select",
            name: "invoice_group",
            df_value: {
              value: acItem?.invoice_group || "default",
              label: acItem?.invoice_group || "Guruh tanlang*",
            },
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
            df_value: amount - total_quantity || 0,
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
              onClick={() => addAllIng(checkedData, data?.data, setCheckedData)}
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
                key={item?.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={checked}
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
                  }}>
                  {item?.unit}
                </p>
                <p
                  style={{
                    "--data-line-size": "15%",
                    justifyContent: "center",
                  }}>
                  {item?.group}
                </p>
                <p
                  style={{
                    "--data-line-size": "15%",
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
                    "--data-line-size": "15%",
                    justifyContent: "center",
                  }}>
                  {checked && (
                    <select
                      onChange={(e) =>
                        getProduct(
                          { ...checked, st_receiver: e.target.value },
                          1
                        )
                      }>
                      <option value={acItem?.storage || "default"}>
                        {acItem?.storage || "Ombor tanlang*"}
                      </option>
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
                  }}>
                  {checked && (
                    <input
                      type="number"
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
          <p style={{ inlineSize: "var(--univslH)" }}>№</p>
          <p style={{ "--data-line-size": "24%" }}>Umumiy</p>
          <p style={{ "--data-line-size": "24%" }}>Qoldiq</p>
          <p style={{ "--data-line-size": "24%" }}>Olingan miqdor</p>
          <p style={{ "--data-line-size": "24%" }}>Jami mablag'</p>
        </CalcResultHeader>
        <CalcResultBody
          data={[...updatedIngData, ...updatedData]}
          status="inv"
          displayKeys={[
            { name: "name", size: "24%" },
            { name: "waste", size: "24%", position: 2 },
            { name: "amount", size: "24%", position: 2 },
            { name: "total_price", size: "24%", position: 2 },
          ]}
        />
      </CalcResult>
    </UniversalControlModal>
  );
};

export default InvoicesModal;

import React, { useState, useEffect } from "react";
import { UniversalControlModal } from "../../../components/modal-calc/modal-calc";
import { UniversalForm } from "../../../components/modal-calc/modal-calc";
import { UniversalProductControl } from "../../../components/modal-calc/modal-calc";
import { CalcResultHeader } from "../../../components/modal-calc/modal-calc";
import { CalcResultBody } from "../../../components/modal-calc/modal-calc";
import { CalcResult } from "../../../components/modal-calc/modal-calc";
import { useDispatch, useSelector } from "react-redux";
import { useFetchDataQuery } from "../../../service/fetch.service";
import { acActiveSt_id } from "../../../redux/active";
import { addAllIng } from "../../../service/unique.service";

const InvoicesModal = ({
  checkedData,
  setCheckedData,
  getProduct,
  NUM,
  acItem,
}) => {
  // const today = new Date().toISOString().split("T")[0];
  const [activePart, setActivePart] = useState(1); // 1 - product, 2 - invoice
  const acS = useSelector((state) => state.activeSt_id);
  const res_id = useSelector((state) => state.res_id);
  const dispatch = useDispatch();
  const { data = [] } = useFetchDataQuery({
    url: `get/storageItems/${res_id}/${acItem?.st1_id || acS}`,
    tags: ["invoices"],
  });
  const { data: storeData = [] } = useFetchDataQuery({
    url: `get/storage/${res_id}`,
    tags: ["store"],
  });
  const { data: groupsData = [] } = useFetchDataQuery({
    url: `get/InvoiceGroups/${res_id}`,
    tags: ["invoice-group"],
  });
  const acIngredients = acItem?.ingredients;
  const updatedData = checkedData?.map((newItem) => {
    const oldData =
      data?.data?.find((old) => old.item_id === newItem?.item_id) || {};

    if (oldData) {
      return {
        ...newItem,
        old_quantity: oldData?.total_quantity || 0,
        total_quantity: oldData?.total_quantity
          ? oldData?.total_quantity - parseInt(newItem?.amount)
          : parseInt(newItem?.amount),
        total_price: parseInt(newItem?.amount) * newItem?.price,
      };
    }

    return newItem;
  });
  useEffect(() => {
    if (acItem?.st1_name) {
      const selectedItem = storeData?.data?.find(
        (item) => item.name === acItem?.st1_name
      );
      const selectedId = selectedItem?.id;

      dispatch(acActiveSt_id(selectedId));
    }
  }, [acItem?.st1_name, dispatch, storeData?.data]);
  const num = acItem?.order ? acItem?.order : NUM.num;
  return (
    <UniversalControlModal
      status={acItem?.id ? true : false}
      type="edr"
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
            df_value: acItem?.storage
              ? { value: acItem?.storage, label: acItem?.storage }
              : { value: "default", label: "Ombor tanlang*" },
            options: storeData?.data,
          },
          {
            type: "select",
            name: "group",
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
          <p style={{ "--data-line-size": "15%" }}>Turi</p>
          <p style={{ "--data-line-size": "15%" }}>Miqdori</p>
        </div>
        <div className="product_box_body">
          {data?.data?.map((item, index) => {
            const checked = [...checkedData, ...acIngredients]?.find(
              (i) => i.id === item?.item_id
            );
            return (
              <div
                className={`product_box_item ${checked ? "active" : ""}`}
                key={index + 298283200}>
                <label>
                  <input
                    type="checkbox"
                    checked={checked || false}
                    onChange={() =>
                      getProduct({ ...item, amount: 0 }, checked ? 0 : 1)
                    }
                  />
                </label>
                <p style={{ "--data-line-size": "20%" }}>{item?.item_name}</p>
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
                  {item?.price}
                </p>
                <p
                  style={{
                    "--data-line-size": "15%",
                    justifyContent: "center",
                  }}>
                  {item?.item_type}
                </p>
                <p
                  style={{
                    "--data-line-size": "15%",
                    justifyContent: "center",
                  }}>
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
          <p style={{ inlineSize: "var(--univslH)" }}>№</p>
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
            { name: "item_name", size: "15%" },
            { name: "item_type", size: "13.33%", position: 1 },
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

export default InvoicesModal;

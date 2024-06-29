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

const InvoicesModal = ({ checkedData, setCheckedData, getProduct, NUM }) => {
  const user = JSON.parse(localStorage.getItem("user"))?.user || [];
  const acItem = useSelector((state) => state.activeThing);
  const s_id = useSelector((state) => state.activeSt_id);
  const dispatch = useDispatch();
  const [activePart, setActivePart] = useState(1); // 1 - product, 2 - invoice
  const { data = [] } = useFetchDataQuery({
    url: `get/ingredients/${user?.id}`,
    tags: ["ingredient"],
  });
  const { data: storeData = [] } = useFetchDataQuery({
    url: `get/storage/${user?.id}`,
    tags: ["store"],
  });
  const { data: storageItems = [] } = useFetchDataQuery({
    url: `get/storageItems/${user?.id}/${s_id || acItem?.st1_id}`,
    tags: ["invoices"],
  });
  const { data: suplierData = [] } = useFetchDataQuery({
    url: `get/suppliers/${user?.id}`,
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
      dispatch(acActiveSt_id(selectedId));
    }
  }, [acItem?.storage, dispatch, storeData?.data]);

  // const ingredientData = storageItems?.data ? storageItems?.data : data;
  const ds = [
    {
      action_type: "received_goods",
      order: 4,
      time: "2021-03-07",
      res_id: "2899b5",
      st1_id: "0c510d",
      st1_name: "Oshxona ombori",
      item_id: "4417f1",
      item_name: "Sabzi",
      item_type: "ingredient",
      group: "Sabzavotlar",
      unit: "kg",
      price: 3521,
      amount: 20,
      worker: "Zayd",
      worker_id: "0a709d",
      responsible: "Muzaffar",
      invoice_group: "income",
      description: "Sabzi sotib olindi",
      is_undone: 0,
    },
    {
      action_type: "received_goods",
      order: 1,
      time: "2024-06-24",
      res_id: "2899b5",
      st1_id: "0c510d",
      item_id: "0237e31e",
      st1_name: "Oshxona ombori",
      item_name: "kartoshka",
      item_type: "Ingredient",
      group: "Sabzavotlar",
      unit: "kg",
      price: 3000,
      amount: "10",
      worker: "test",
      worker_id: "2899b5",
      responsible: "ds",
      invoice_group: "income",
      description: "ds",
      supplier: "Go’shtchi",
      supplier_id: "6c1adc",
    },
  ];

  const num = acItem?.order ? acItem?.order : NUM.num;
  return (
    <UniversalControlModal
      status={acItem?.id ? true : false}
      type="action"
      Pdata={[...checkedData, ...acIngredients]}
      Udata={updatedData}
      id={s_id || acItem?.st1_id}
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
            name: "time",
            df_value: acItem?.time || new Date().toISOString().split("T")[0],
          },
          {
            type: "s_extra",
            name: "supplier",
            extra: "supplier_id",
            df_value: acItem?.supplier
              ? {
                  value: acItem?.supplier,
                  label: acItem?.supplier_id,
                }
              : { value: "default", label: "Yetkazuvchi tanlang*" },
            options: suplierData?.data,
            u_option: [acItem?.supplier, acItem?.supplier_id],
          },
          {
            type: "s_extra",
            name: "st1_name",
            extra: "st1_id",
            take_id: true,
            df_value: acItem?.st1_name
              ? { value: acItem?.st1_name, label: acItem?.st1_id }
              : { value: "default", label: "Ombor tanlang*" },
            options: storeData?.data,
            u_option: [acItem?.st1_name, acItem?.st1_id],
          },
          {
            type: "input",
            name: "responsible",
            plc_hr: "Javobgar*",
            df_value: acItem?.responsible || "",
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
        setActivePart={setActivePart}
        activePart={activePart}>
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
          <p style={{ "--data-line-size": "15%" }}>Miqdori</p>
          <p style={{ "--data-line-size": "15%" }}>Jami</p>
        </div>
        <div className="product_box_body">
          {data?.data?.map((item) => {
            const checked = [...checkedData, ...acIngredients]?.find(
              (i) => i.item_id === item?.item_id
            );
            return (
              <div
                className={`product_box_item ${checked ? "active" : ""}`}
                key={item?.item_id}>
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
                  }}>
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
                  }}>
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
          <p style={{ inlineSize: "var(--univslH)" }}>№</p>
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
            { name: "item_name", size: "20%" },
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

export default InvoicesModal;

import React, { useEffect, useState } from "react";
import { UniversalControlModal } from "../../../components/modal-calc/modal-calc";
import { UniversalForm } from "../../../components/modal-calc/modal-calc";
import { UniversalProductControl } from "../../../components/modal-calc/modal-calc";
import { CalcResultHeader } from "../../../components/modal-calc/modal-calc";
import { CalcResultBody } from "../../../components/modal-calc/modal-calc";
import { CalcResult } from "../../../components/modal-calc/modal-calc";
import { usePostDataMutation } from "../../../service/fetch.service";
// import { CalculateTotalP } from "../../../service/calc.service";
// import { Select } from "antd";

import { BsReceiptCutoff } from "react-icons/bs";
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
  acIngredients,
}) => {
  // const today = new Date().toISOString().split("T")[0];
  const [activePart, setActivePart] = useState(1);
  const [calcData, setCalcData] = useState([]);
  const res_id = useSelector((state) => state?.res_id);
  const id = useSelector((state) => state?.activeSt_id);
  const dispatch = useDispatch();
  const [postData] = usePostDataMutation();
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
  const { data: productData = [] } = useFetchDataQuery({
    url: `get/foods/${res_id}`,
    tags: ["s-products", "product"],
  });

  const updatedData = checkedData?.map((newItem) => {
    const oldData = data?.data?.find((old) => old.id === newItem.id) || {};

    if (oldData) {
      const after = oldData?.total_quantity
        ? oldData?.total_quantity - parseInt(newItem?.amount)
        : parseInt(newItem?.amount);
      return {
        ...newItem,
        total_quantity: oldData?.total_quantity || 0,
        total_after: oldData?.total_after ? oldData?.total_after : after,
        total_price: parseInt(newItem?.amount) * parseInt(newItem?.price),
      };
    }

    return newItem;
  });

  useEffect(() => {
    if (acItem?.storage) {
      const selectedItem = storeData?.data?.find(
        (item) => item.name === acItem?.storage
      );
      const selectedId = selectedItem?.id;

      dispatch(acActiveSt_id(selectedId));
    }
  }, [acItem?.storage, dispatch, storeData?.data]);

  const revordCalcData = async (data) => {
    if (id === null) return alert("Ombor tanlanmagan");
    const value = await postData({
      url: `calculate/goods`,
      data: data,
      tags: ["carry-up"],
    });
    setCheckedData((prevFoodsData) => {
      const updatedFoodsData = [...prevFoodsData];

      value?.data?.message.forEach((item) => {
        const existingItemIndex = updatedFoodsData.findIndex(
          (existItem) => existItem.id === item.id
        );

        if (existingItemIndex !== -1) {
          updatedFoodsData[existingItemIndex].amount =
            parseInt(updatedFoodsData[existingItemIndex].amount) + item?.amount;
        } else {
          updatedFoodsData.push(item);
        }
      });
      return updatedFoodsData;
    });
  };

  const activeData = activePart === 1 ? data?.data : productData?.data;
  const num = acItem?.order ? acItem?.order : NUM?.num;

  return (
    <UniversalControlModal
      status={acItem?.id ? true : false}
      type="carryUp"
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
            name: "storage_sender",
            extra: "s_storage",
            take_id: true,
            df_value: { value: "default", label: "Beruvchi ombor*" },
            options: storeData?.data,
          },
          {
            type: "s_extra",
            name: "storage_receiver",
            extra: "r_storage",
            df_value: { value: "default", label: "Oluvchi ombor*" },
            options: storeData?.data,
          },
          {
            type: "select",
            name: "invoice_group",
            df_value: { value: "default", label: "Guruh tanlang*" },
            options: groupsData?.data,
          },
          {
            type: "input",
            name: "description",
            plc_hr: "Tavsif",
            df_value: acItem?.description,
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
          <p style={{ "--data-line-size": activePart === 1 ? "20%" : "60%" }}>
            Nomi
          </p>
          {activePart === 1 && (
            <>
              <p style={{ "--data-line-size": "15%" }}>O'lchov birligi</p>
              <p style={{ "--data-line-size": "15%" }}>Guruh</p>
              <p style={{ "--data-line-size": "15%" }}>Narxi</p>
              <p style={{ "--data-line-size": "15%" }}>Turi</p>
            </>
          )}
          <p style={{ "--data-line-size": "15%" }}>Miqdori</p>
          {activePart === 2 && <p style={{ "--data-line-size": "20%" }}></p>}
        </div>
        <div className="product_box_body">
          {activeData?.map((item) => {
            const checked = [...checkedData, ...acIngredients]?.find(
              (i) => i.id === item.id
            );
            return (
              <div
                className={`product_box_item ${checked ? "active" : ""}`}
                key={item.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() =>
                      getProduct({ ...item, amount: 0 }, checked ? 0 : 1)
                    }
                  />
                </label>
                <p
                  style={{
                    "--data-line-size": activePart === 1 ? "20%" : "60%",
                  }}>
                  {item.name}
                </p>
                {activePart === 1 && (
                  <>
                    <p
                      style={{
                        "--data-line-size": "15%",
                        justifyContent: "center",
                      }}>
                      {item.unit}
                    </p>
                    <p
                      style={{
                        "--data-line-size": "15%",
                        justifyContent: "center",
                      }}>
                      {item.group}
                    </p>
                    <p
                      style={{
                        "--data-line-size": "15%",
                        justifyContent: "flex-end",
                      }}>
                      {item.price}
                    </p>
                    <p
                      style={{
                        "--data-line-size": "15%",
                        justifyContent: "center",
                      }}>
                      {item?.type?.charAt(0)}
                    </p>
                  </>
                )}
                <p
                  style={{
                    "--data-line-size": "15%",
                    justifyContent: "center",
                  }}>
                  {(checked || activePart === 2) && (
                    <input
                      type="number"
                      name="amount"
                      defaultValue={acItem?.amount}
                      onChange={(e) =>
                        activePart === 2
                          ? setCalcData({
                              ...calcData,
                              amount: e.target.value,
                              food_id: item.id,
                              storage_sender: id,
                            })
                          : getProduct({ ...item, amount: e.target.value }, 1)
                      }
                    />
                  )}
                </p>

                {activePart === 2 && (
                  <p
                    style={{
                      "--data-line-size": "20%",
                      color: checked ? "" : "#787aff",
                      justifyContent: "flex-end",
                    }}
                    onClick={() => revordCalcData(calcData)}>
                    <u>
                      <BsReceiptCutoff style={{ fontSize: "var(--fs5)" }} />
                    </u>
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </UniversalProductControl>
      <CalcResult>
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
            { name: "name", size: "15%" },
            { name: "type", size: "13.33%", position: 1 },
            { name: "total_quantity", size: "13.33%", position: 2 },
            { name: "amount", size: "13.33%", position: 2 },
            { name: "total_after", size: "13.33%", position: 2 },
            { name: "price", size: "13.33%", position: 2 },
            { name: "total_price", size: "13.33%", position: 2 },
          ]}
        />
      </CalcResult>
    </UniversalControlModal>
  );
};

export default InvoicesModal;

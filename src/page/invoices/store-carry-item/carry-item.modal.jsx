import React, { useEffect, useState } from "react";
import { UniversalControlModal, UniversalForm, UniversalProductControl, CalcResultHeader, CalcResultBody, CalcResult } from "../../../components/modal-calc/modal-calc";
import { usePostDataMutation } from "../../../service/fetch.service";
// import { CalculateTotalP } from "../../../service/calc.service";
// import { Select } from "antd";

import { BsReceiptCutoff } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useFetchDataQuery } from "../../../service/fetch.service";
import { acActiveSt_id } from "../../../redux/active";
import { addAllIng } from "../../../service/unique.service";

const InvoicesModal = ({ checkedData, setCheckedData, getProduct, NUM, acItem, }) => {
  const today = new Date().toISOString().split("T")[0];
  const [activePart, setActivePart] = useState(1);
  const [calcData, setCalcData] = useState([]);
  const res_id = useSelector((state) => state?.res_id);
  const id = useSelector((state) => state?.activeSt_id);
  const dispatch = useDispatch();
  const [postData] = usePostDataMutation();
  const { data = [] } = useFetchDataQuery({ url: `get/storageItems/${id || acItem?.st1_id}`, tags: ["invoices"], });
  const { data: storeData = [] } = useFetchDataQuery({ url: `get/storage/${res_id}`, tags: ["store"], });
  const { data: groupsData = [] } = useFetchDataQuery({ url: `get/InvoiceGroups/${res_id}`, tags: ["invoice-group"], });
  const { data: productData = [] } = useFetchDataQuery({ url: `get/foods/${res_id}`, tags: ["s-products", "product"], });

  const updatedData = checkedData?.map((newItem) => {
    const oldData =
      data?.data?.find((old) => old.item_id === newItem.item_id) || {};

    if (oldData) {
      newItem.amount = parseInt(newItem.amount);
      const after = oldData?.total_quantity ? oldData?.total_quantity - newItem?.amount : newItem?.amount;
      return {
        ...newItem,
        total_quantity: acItem?.item_id ? oldData?.total_quantity + newItem?.amount : oldData?.total_quantity || 0,
        total_after: after,
        total_price: newItem?.amount * parseInt(newItem?.price),
      };
    }

    return newItem;
  });

  useEffect(() => {
    if (acItem?.st1_id) {
      dispatch(acActiveSt_id(acItem?.st1_id));
    }
  }, [acItem?.st1_id, dispatch]);

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
        const existingItemIndex = updatedFoodsData.findIndex((existItem) => existItem.item_id === item.item_id);

        if (existingItemIndex !== -1) {
          updatedFoodsData[existingItemIndex].amount = parseInt(updatedFoodsData[existingItemIndex].amount) + item?.amount;
        } else {
          updatedFoodsData.push(item);
        }
      });
      return updatedFoodsData;
    });
  };

  const activeData = activePart === 1 ? data?.data : productData?.data;
  const num = (acItem?.order ? acItem?.order : NUM?.num) || 1;

  return (
    <UniversalControlModal
      status={acItem?.id ? true : false}
      type="action"
      Pdata={checkedData}
      setCheckedData={setCheckedData}
      Udata={acItem}>
      <UniversalForm
        formData={[
          {
            type: "inputN",
            name: "order",
            plc_hr: "Tartib raqam*",
            df_value: num,
          },
          { type: "inputD", name: "time", df_value: acItem?.time || today, },
          {
            type: "s_extra",
            name: "st1_name",
            extra: "st1_id",
            take_id: true,
            df_value: acItem?.st1_name
              ? { value: acItem?.st1_name, label: acItem?.st1_id }
              : { value: "default", label: "Beruvchi ombor*" },
            options: storeData?.data,
            u_option: [acItem?.st1_name, acItem?.st1_id],
          },
          {
            type: "s_extra",
            name: "st2_name",
            extra: "st2_id",
            df_value: acItem?.st2_name
              ? { value: acItem?.st2_name, label: acItem?.st2_id, }
              : { value: "default", label: "Oluvchi ombor*" },
            options: storeData?.data,
            u_option: [acItem?.st2_name, acItem?.st2_id],
          },
          {
            type: "select",
            name: "invoice_group",
            df_value: acItem?.invoice_group
              ? { value: acItem?.invoice_group, label: acItem?.invoice_group }
              : { value: "default", label: "Guruh tanlang*" },
            options: groupsData?.data,
            u_option: [acItem?.invoice_group],
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
              onChange={() => addAllIng(checkedData, data?.data, setCheckedData)}
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
            const checked = checkedData?.find(
              (i) => i.item_id === item.item_id
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
                <p style={{ "--data-line-size": activePart === 1 ? "20%" : "60%", }}>
                  {item.item_name}
                </p>
                {activePart === 1 && (
                  <>
                    <p style={{ "--data-line-size": "15%", justifyContent: "center", }}>
                      {item.unit}
                    </p>
                    <p style={{ "--data-line-size": "15%", justifyContent: "center", }}>
                      {item.group}
                    </p>
                    <p style={{ "--data-line-size": "15%", justifyContent: "flex-end", }}>
                      {item.price}
                    </p>
                    <p style={{ "--data-line-size": "15%", justifyContent: "center", }}>
                      {item?.item_type?.charAt(0)}
                    </p>
                  </>
                )}
                <p style={{ "--data-line-size": "15%", justifyContent: "center", }}>
                  {(checked || activePart === 2) && (
                    <input
                      type="number"
                      name="amount"
                      defaultValue={checked?.amount}
                      onChange={(e) =>
                        activePart === 2
                          ? setCalcData({ ...calcData, amount: e.target.value, food_id: item.id, storage_sender: id, })
                          : getProduct({ ...checked, amount: e.target.value }, 1)
                      }
                    />
                  )}
                </p>

                {activePart === 2 && (
                  <p
                    style={{ "--data-line-size": "20%", color: checked ? "" : "#787aff", justifyContent: "flex-end", }}
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
            { name: "item_name", size: "15%" },
            { name: "item_type", size: "13.33%", position: 1 },
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

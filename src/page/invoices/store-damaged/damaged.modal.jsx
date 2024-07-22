import React, { useEffect, useState } from "react";
import { UniversalControlModal, UniversalForm, UniversalProductControl, CalcResultHeader, CalcResultBody, CalcResult } from "../../../components/modal-calc/modal-calc";
import { useFetchDataQuery } from "../../../service/fetch.service";
import { useDispatch, useSelector } from "react-redux";
import { acActiveSt_id } from "../../../redux/active";
import { addAllIng } from "../../../service/unique.service";

const InvoicesModal = ({ checkedData, setCheckedData, getProduct, NUM, acItem, }) => {
  const res_id = useSelector((state) => state?.res_id);
  const id = useSelector((state) => state?.activeSt_id);
  const dispatch = useDispatch();
  const { data = [] } = useFetchDataQuery({ url: `get/storageItems/${acItem?.st1_id || id}`, tags: ["invoices"], });
  const { data: storeData = [] } = useFetchDataQuery({ url: `get/storage/${res_id}`, tags: ["store"], });
  const { data: groupsData = [] } = useFetchDataQuery({ url: `get/invoiceGroups/${res_id}`, tags: ["invoice-group"], });
  const [activePart, setActivePart] = useState(1);

  const updatedData = checkedData?.map((newItem) => {
    const oldData = data?.data?.find((old) => old?.item_id === newItem?.item_id) || {};

    if (oldData) {
      newItem.amount = parseInt(newItem.amount);
      return {
        ...newItem,
        old_quantity: acItem?.item_id ? oldData?.total_quantity + newItem?.amount : oldData?.total_quantity,
        total_quantity: oldData?.total_quantity - newItem?.amount || 0,
        total_price: newItem?.amount * newItem?.price,
      };
    }

    return newItem;
  });

  useEffect(() => {
    if (acItem?.st1_id) {
      dispatch(acActiveSt_id(acItem?.st1_id));
    }
  }, [acItem?.st1_id, dispatch]);

  const num = acItem?.order ? acItem?.order : NUM.num;
  return (
    <UniversalControlModal
      status={acItem?.id ? true : false}
      type="action"
      Pdata={checkedData}
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
            name: "st1_name",
            take_id: true,
            extra: "st1_id",
            df_value: acItem?.st1_name
              ? { value: acItem?.st1_name, label: acItem?.st1_name }
              : { value: "default", label: "Ombor tanlang*" },
            options: storeData?.data,
            u_option: [acItem?.st1_name, acItem?.st1_id],
          },
          {
            type: "select",
            name: "invoice_group",
            df_value: acItem?.invoice_group
              ? { value: acItem?.invoice_group, label: acItem?.invoice_group, }
              : { value: "default", label: "Guruh tanlang*" },
            options: groupsData?.data || [],
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
        activePart={activePart}
        setActivePart={setActivePart}>
        <div className="product_box_item">
          <label aria-label="checked this elements">
            <input
              type="checkbox"
              name="id"
              onChange={() => addAllIng(checkedData, data?.data, setCheckedData)}
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
          {data?.data?.map((item) => {
            const checked = checkedData?.find((i) => i.id === item?.id);
            return (
              <div
                className={`product_box_item ${checked ? "active" : ""}`}
                key={item?.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => getProduct({ ...item, amount: 0 }, checked ? 0 : 1)}
                  />
                </label>
                <p style={{ "--data-line-size": "20%" }}>{item?.item_name}</p>
                <p style={{ "--data-line-size": "15%", justifyContent: "center", }}>
                  {item?.unit}
                </p>
                <p style={{ "--data-line-size": "15%", justifyContent: "center", }}>
                  {item?.group}
                </p>
                <p style={{ "--data-line-size": "15%", justifyContent: "flex-end", }}>
                  {item?.price}
                </p>
                <p style={{ "--data-line-size": "15%", justifyContent: "center", }}>
                  {item?.item_type}
                </p>
                <p style={{ "--data-line-size": "15%", justifyContent: "center", }}>
                  {checked && (
                    <input
                      type="number"
                      name="amount"
                      defaultValue={checked?.amount}
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

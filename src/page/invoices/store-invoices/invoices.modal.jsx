import React, { useState, useEffect, useCallback } from "react";
import { UniversalControlModal, UniversalForm, UniversalProductControl, CalcResultHeader, CalcResultBody, CalcResult } from "../../../components/modal-calc/modal-calc";

import { useDispatch, useSelector } from "react-redux";
import { useFetchDataQuery } from "../../../service/fetch.service";
import { acActiveSt_id } from "../../../redux/active";
import { addAllIng } from "../../../service/unique.service";
import { useSearchAppParams } from "../../../hooks/useSearchParam";
import { getProductService } from "../../../service/form.service";
import { LoaderSvg } from "../../../components/loading/loading";

const InvoicesModal = ({ NUM }) => {
  const today = new Date().toISOString().split("T")[0]
  const user = JSON.parse(localStorage.getItem("user"))?.user || [];
  const s_id = useSelector((state) => state.activeSt_id);
  const { time = today } = useSelector((state) => state.values)?.vl;
  const dispatch = useDispatch();
  const [activePart, setActivePart] = useState(1);
  const [checkedData, setCheckedData] = useState([]);
  const { pair } = useSearchAppParams().getAllParams();
  let { data: acItem = {}, isLoading } = useFetchDataQuery({ url: pair?.id ? `get/actions/received_goods/${pair?.id}` : null, tags: ["invoices"], });
  const { data = [], isLoading: gl } = useFetchDataQuery({ url: `get/ingredients`, tags: ["ingredient"], });
  const { data: storeData = [] } = useFetchDataQuery({ url: `get/storage`, tags: ["store"], });
  const { data: storageItems = [] } = useFetchDataQuery({ url: `get/storageItems/${pair?.st1_id || s_id}/${time}`, tags: ["invoices", "action"], });
  const { data: suplierData = [] } = useFetchDataQuery({ url: `get/suppliers/${user?.id}`, tags: ["suplier"], });
  const updatedData = checkedData?.map((newItem) => {
    const oldData = storageItems?.data?.find((old) => old.item_id === newItem?.item_id);
    const ototal = oldData ? oldData?.total_quantity : 0;
    const n = parseFloat(newItem?.amount);
    if (oldData) {
      return {
        ...newItem,
        old_quantity: ototal || 0,
        total_quantity: ototal ? parseFloat(ototal) + n : n,
      };
    } else {
      return {
        ...newItem,
        old_quantity: 0,
        total_quantity: n,
      };
    }
  });

  isLoading = pair?.id ? isLoading : false;
  acItem = !isLoading ? acItem?.data?.[0] : acItem;
  console.log("acItem", acItem);

  useEffect(() => {
    if (pair?.st1_id) { dispatch(acActiveSt_id(pair?.st1_id)); }
  }, [pair?.st1_id, dispatch]);

  useEffect(() => {
    if (acItem?.ingredients) { setCheckedData(acItem?.ingredients); }
  }, [acItem?.ingredients]);

  const getProduct = useCallback((item, status) => {
    if (isLoading) return;
    getProductService(item, status, acItem, setCheckedData, "received_goods", "income");
  }, [acItem, isLoading]);

  // const ingredientData = storageItems?.data ? storageItems?.data : data;
  return (
    <UniversalControlModal
      status={pair?.id ? true : false}
      type="action"
      Pdata={checkedData}
      Udata={updatedData}
      id={s_id || pair?.st1_id}
      setCheckedData={setCheckedData}>
      {isLoading ? <LoaderSvg color="#eee" fontSize="24px" /> : <UniversalForm
        formData={[
          {
            type: "inputN",
            name: "order",
            plc_hr: "Tartib raqam*",
            df_value: acItem?.order ? acItem?.order : NUM.num,
          },
          {
            type: "inputD",
            name: "time",
            df_value: acItem?.time || today,
          },
          {
            type: "s_extra",
            name: "supplier",
            extra: "supplier_id",
            df_value: acItem?.supplier
              ? {
                value: acItem?.supplier_id,
                label: acItem?.supplier,
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
              ? { value: acItem?.st1_id, label: acItem?.st1_name }
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
      />}
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
          <p style={{ "--data-line-size": "20%" }}>Nomi</p>
          <p style={{ "--data-line-size": "15%" }}>O'lchov birligi</p>
          <p style={{ "--data-line-size": "15%" }}>Guruh</p>
          <p style={{ "--data-line-size": "15%" }}>Narxi</p>
          <p style={{ "--data-line-size": "15%" }}>Miqdori</p>
          <p style={{ "--data-line-size": "15%" }}>Jami</p>
        </div>
        <div className="product_box_body">
          {gl ? <LoaderSvg color="#eee" fontSize="24px" /> : data?.data?.map((item, i) => {
            const checked = checkedData?.find((i) => i.item_id === item?.item_id);
            return (
              <div
                className={`product_box_item ${checked ? "active" : ""}`}
                key={`${item?.item_id}-${i}`}>
                <label>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() =>
                      getProduct({ ...item, amount: 0 }, checked ? 0 : 1)
                    }
                  />
                </label>
                <p style={{ "--data-line-size": "20%" }}>{item?.item_name}</p>
                <p style={{ "--data-line-size": "15%", justifyContent: "center", }}>
                  {item?.unit}
                </p>
                <p style={{ "--data-line-size": "15%", justifyContent: "center", }}>
                  {item?.group}
                </p>
                <p
                  style={{ "--data-line-size": "15%", justifyContent: "flex-end", }}>
                  {checked ? (
                    <input
                      type="number"
                      defaultValue={parseInt(item?.price)}
                      onChange={(e) => getProduct({ ...checked, price: parseInt(e.target.value) }, 1)}
                    />
                  ) : (
                    parseInt(item?.price)
                  )}
                </p>
                <p style={{ "--data-line-size": "15%", justifyContent: "center", }}>
                  {checked && (
                    <input
                      type="number"
                      name="amount"
                      defaultValue={checked?.amount ? checked?.amount : 0}
                      onChange={(e) => getProduct({ ...checked, amount: e.target.value }, 1)}
                    />
                  )}
                </p>
                <p style={{ "--data-line-size": "15%", justifyContent: "center", }}>
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
      <CalcResult data={checkedData}>
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
          total={false}
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
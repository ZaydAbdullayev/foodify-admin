import React, { useEffect, useState, useCallback } from "react";
import { UniversalControlModal, UniversalForm, UniversalProductControl, CalcResultHeader, CalcResultBody, CalcResult } from "../../../components/modal-calc/modal-calc";
import { useFetchDataQuery } from "../../../service/fetch.service";
import { useDispatch, useSelector } from "react-redux";
import { acActiveSt_id } from "../../../redux/active";
import { addAllIng } from "../../../service/unique.service";
import { useSearchAppParams } from "../../../hooks/useSearchParam";
import { getProductService } from "../../../service/form.service";
import { LoaderSvg } from "../../../components/loading/loading";

const InvoicesModal = ({ NUM }) => {
  const today = new Date().toISOString().split("T")[0]
  const res_id = useSelector((state) => state?.res_id);
  const id = useSelector((state) => state?.activeSt_id);
  const [checkedData, setCheckedData] = useState([]);
  const [activePart, setActivePart] = useState(1);
  const { time = today } = useSelector((state) => state?.values).vl;
  const { pair } = useSearchAppParams().getAllParams();
  const dispatch = useDispatch();
  let { data: acItem = {}, isLoading } = useFetchDataQuery({ url: pair?.id ? `get/actions/received_goods/${pair?.id}` : null, tags: ["invoices"], });
  const { data = [], isLoading: gl } = useFetchDataQuery({ url: `get/storageItems/${pair?.st1_id || id}/${time}`, tags: ["invoices", "action"], });
  const { data: storeData = [] } = useFetchDataQuery({ url: `get/storage`, tags: ["store"], });
  const { data: groupsData = [] } = useFetchDataQuery({ url: `get/InvoiceGroups`, tags: ["invoice-group"], });
  isLoading = pair?.id ? isLoading : false;
  acItem = !isLoading ? acItem?.data?.[0] : acItem;

  const getProduct = useCallback((item, status) => {
    if (isLoading) return;
    getProductService(item, status, acItem, setCheckedData, "demeged_goods", "expense");
  }, [acItem, isLoading])

  useEffect(() => {
    if (pair?.st1_id) { dispatch(acActiveSt_id(pair?.st1_id)); }
  }, [pair?.st1_id, dispatch]);

  useEffect(() => {
    if (acItem?.ingredients) { setCheckedData(acItem?.ingredients); }
  }, [acItem?.ingredients]);

  const updatedData = checkedData?.map((newItem) => {
    const oldData = data?.data?.find((old) => old?.item_id === newItem?.item_id) || {};

    if (oldData) {
      const n = /^-?\d+(\.\d+)?$/.test(newItem.amount) ? newItem.amount : parseFloat(newItem.amount)
      return {
        ...newItem,
        old_quantity: acItem?.item_id ? oldData?.total_quantity + n : oldData?.total_quantity,
        total_quantity: oldData?.total_quantity + n || 0,
        total_price: n * newItem?.price,
      };
    }

    return newItem;
  });

  return (
    <UniversalControlModal
      status={pair?.id ? true : false}
      type="action"
      Pdata={checkedData}
      setCheckedData={setCheckedData}>
      {isLoading ? <LoaderSvg color="#eee" fontSize="24px" /> :
        <UniversalForm
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
        />}
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
          {gl ? <LoaderSvg color="#eee" fontSize="24px" /> : data?.data?.map((item) => {
            const checked = checkedData?.find((i) => i.item_id === item?.item_id);
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
                        getProduct({ ...checked, amount: -e.target.value }, 1)
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
          total={false}
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

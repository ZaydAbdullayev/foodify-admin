import React, { useState, useCallback, useEffect } from "react";
import { UniversalControlModal } from "../../../components/modal-calc/modal-calc";
import { UniversalForm } from "../../../components/modal-calc/modal-calc";
import { UniversalProductControl } from "../../../components/modal-calc/modal-calc";
import { CalcResultHeader } from "../../../components/modal-calc/modal-calc";
import { CalcResultBody } from "../../../components/modal-calc/modal-calc";
import { CalcResult } from "../../../components/modal-calc/modal-calc";

import { useDispatch, useSelector } from "react-redux";
import { useFetchDataQuery } from "../../../service/fetch.service";
import { addAllIng } from "../../../service/unique.service";
import { useSearchAppParams } from "../../../hooks/useSearchParam";
import { getProductService } from "../../../service/form.service";
import { acActiveSt_id } from "../../../redux/active";
import { LoaderSvg } from "../../../components/loading/loading";

const InvoicesModal = ({ NUM }) => {
  const today = new Date().toISOString().split("T")[0]
  const res_id = useSelector((state) => state?.res_id);
  const id = useSelector((state) => state?.activeSt_id);
  const { time = today } = useSelector((state) => state?.values).vl;
  const [activePart, setActivePart] = useState(1);
  const [checkedData, setCheckedData] = useState([]);
  const { pair } = useSearchAppParams().getAllParams();
  const dispatch = useDispatch();
  let { data: acItem = {}, isLoading } = useFetchDataQuery({ url: pair?.id ? `get/actions/received_goods/${pair?.id}` : null, tags: ["invoices"], });
  const { data = [], isLoading: gl } = useFetchDataQuery({ url: `get/ingredients`, tags: ["ingredient"], });
  const { data: storeData = [] } = useFetchDataQuery({ url: `get/storage/${res_id}`, tags: ["store"], });
  const { data: storageItems = [] } = useFetchDataQuery({ url: `get/storageItems/${pair.st1_id || id}/${time}`, tags: ["invoices", "action"], });
  const { data: productData = [] } = useFetchDataQuery({ url: `get/foods/${res_id}`, tags: ["s-products", "product"], });
  isLoading = pair?.id ? isLoading : false;
  acItem = !isLoading ? acItem?.data?.[0] : acItem;

  const updatedData = checkedData.map((newItem) => {
    const oldData = storageItems?.data?.find((old) => old.item_id === newItem.item_id);

    if (oldData) {
      const n = parseFloat(newItem?.amount) || 0;
      return {
        ...newItem,
        old_quantity: oldData?.total_quantity,
        total_quantity: oldData?.total_quantity ? oldData?.total_quantity - n : -n,
      };
    }

    return newItem;
  });

  const getProduct = useCallback((item, status) => {
    if (isLoading) return;
    getProductService(item, status, acItem, setCheckedData, "cutting_increase", "income");
  }, [acItem, isLoading])

  useEffect(() => {
    if (pair?.st1_id) { dispatch(acActiveSt_id(pair?.st1_id)); }
  }, [pair?.st1_id, dispatch]);

  useEffect(() => {
    if (acItem?.ingredients) { setCheckedData(acItem?.ingredients); }
  }, [acItem?.ingredients]);

  const currentData = activePart === 1 ? data?.data : productData?.data;
  return (
    <UniversalControlModal
      status={acItem?.id ? true : false}
      type="pile_action"
      Pdata={checkedData}
      id={id}
      setCheckedData={setCheckedData}
      sp={"making_decrease"}
    >
      {isLoading ? <LoaderSvg color="#eee" fontSize="24px" /> : <UniversalForm
        formData={[
          {
            type: "inputN",
            name: "order",
            plc_hr: "Tartib raqam*",
            df_value: NUM.num || 1,
          },
          {
            type: "inputD",
            name: "time",
            df_value: acItem?.time || today,
          },
          {
            type: "s_extra",
            name: "item_name",
            extra: "item_id",
            getFullInfo: true,
            df_value: acItem?.item_id
              ? { value: acItem?.item_id, label: acItem?.item_name }
              : { value: "default", label: "Mahsulot tanlang*" },
            options: data?.data,
            u_option: [acItem?.item_name, acItem?.item_id],
          },
          {
            type: "s_extra",
            take_id: true,
            name: "st1_name",
            extra: "st1_id",
            df_value: acItem?.st1_id
              ? { value: acItem?.st1_id, label: acItem?.st1_name }
              : { value: "default", label: "Beruvchi ombor*" },
            options: storeData?.data,
            u_option: [acItem?.st1_name, acItem?.st1_id],
          },
          {
            type: "s_extra",
            name: "st2_name",
            extra: "st2_id",
            df_value: acItem?.st2_id
              ? { value: acItem?.st2_id, label: acItem?.st2_name }
              : { value: "default", label: "Oluvchi ombor*" },
            options: storeData?.data,
            u_option: [acItem?.st2_name, acItem?.st2_id],
          },
          {
            type: "inputN",
            name: "amount",
            plc_hr: "Miqdori*",
            df_value: acItem?.amount || "",
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
          <p style={{ "--data-line-size": "27%" }}>Nomi</p>
          <p style={{ "--data-line-size": "9.9%" }}>O'lchov birligi</p>
          <p style={{ "--data-line-size": "20%" }}>Guruh</p>
          <p style={{ "--data-line-size": "20%" }}>Narxi</p>
          <p style={{ "--data-line-size": "20%" }}>Miqdori</p>
        </div>
        <div className="product_box_body">
          {gl ? <LoaderSvg color="#eee" fontSize="24px" /> : currentData?.map((item) => {
            const checked = checkedData.find((i) => i.item_id === item.item_id);
            return (
              <div
                className={`product_box_item ${checked ? "active" : ""}`}
                key={item.item_id}>
                <label>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() =>
                      getProduct({ ...item, amount: 0 }, checked ? 0 : 1)
                    }
                  />
                </label>
                <p style={{ "--data-line-size": "27%" }}>{item.item_name}</p>
                <p
                  style={{
                    "--data-line-size": "9.9%",
                    justifyContent: "center",
                  }}>
                  {item.unit}
                </p>
                <p
                  style={{
                    "--data-line-size": "20%",
                    justifyContent: "center",
                  }}>
                  {item.group}
                </p>
                <p
                  style={{
                    "--data-line-size": "20%",
                    justifyContent: "flex-end",
                  }}>
                  {checked ? (
                    <input
                      type="number"
                      defaultValue={item.price}
                      onChange={(e) => getProduct({ ...checked, price: e.target.value }, 1)}
                    />
                  ) : (
                    item.price
                  )}
                </p>
                <p
                  style={{
                    "--data-line-size": "20%",
                    justifyContent: "center",
                  }}>
                  {checked && (
                    <input
                      type="number"
                      name="amount"
                      onChange={(e) => getProduct({ ...checked, amount: e.target.value }, 1)}
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
          <p style={{ "--data-line-size": "18%" }}>Nomi</p>
          <p style={{ "--data-line-size": "10%" }}>kg/l</p>
          <p style={{ "--data-line-size": "14%" }}>Oldingi miqdor</p>
          <p style={{ "--data-line-size": "14%" }}>Miqdor</p>
          <p style={{ "--data-line-size": "14%" }}>Keyingi miqdor</p>
          <p style={{ "--data-line-size": "14%" }}>Narx</p>
          <p style={{ "--data-line-size": "14%" }}>Farq</p>
        </CalcResultHeader>
        <CalcResultBody
          data={updatedData}
          total={true}
          displayKeys={[
            { name: "item_name", size: "18%" },
            { name: "unit", size: "10%", position: 1 },
            { name: "old_quantity", size: "14%", position: 2 },
            { name: "amount", size: "14%", position: 2 },
            { name: "total_quantity", size: "14%", position: 2 },
            { name: "price", size: "14%", position: 2 },
            // { name: "different", size: "14%", position: 2 },
          ]}
        />
      </CalcResult>
    </UniversalControlModal>
  );
};

export default InvoicesModal;

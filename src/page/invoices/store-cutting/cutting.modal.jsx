import React, { useState, useEffect, useCallback } from "react";
import { UniversalControlModal, UniversalForm, UniversalProductControl, CalcResultHeader, CalcResultBody, CalcResult } from "../../../components/modal-calc/modal-calc";
import { CalculateTotalP, CalculateTotalQuantity } from "../../../service/calc.service";
import { useDispatch, useSelector } from "react-redux";
import { useFetchDataQuery } from "../../../service/fetch.service";
import { acActiveSt_id } from "../../../redux/active";
import { addAllIng } from "../../../service/unique.service";
import { useSearchAppParams } from "../../../hooks/useSearchParam";
import { getProductService } from "../../../service/form.service";
import { LoaderSvg } from "../../../components/loading/loading";

const InvoicesModal = ({ NUM }) => {
  const today = new Date().toISOString().slice(0, 10)
  const [activePart, setActivePart] = useState(1);
  const [checkedData, setCheckedData] = useState([]);
  const id = useSelector((state) => state.activeSt_id);
  const res_id = useSelector((state) => state.res_id);
  const amount = useSelector((state) => state.cuttingA);
  const { time = today } = useSelector((state) => state.values).vl;
  const { pair } = useSearchAppParams().getAllParams();
  const dispatch = useDispatch();
  let { data: acItem = {}, isLoading } = useFetchDataQuery({ url: pair?.id ? `get/actions/received_goods/${pair?.id}` : null, tags: ["invoices"], });
  const { data = [], isLoading: gl } = useFetchDataQuery({ url: `get/storageItems/${acItem.st1_id || id}/${time}`, tags: ["invoices", "action"], });
  const { data: storeData = [] } = useFetchDataQuery({ url: `get/storage`, tags: ["store"], });
  const { data: groupsData = [] } = useFetchDataQuery({ url: `get/invoiceGroups/${res_id}`, tags: ["invoice-groups"], });
  isLoading = pair?.id ? isLoading : false;
  acItem = !isLoading ? acItem?.data?.[0] : acItem;
  const total_quantity = CalculateTotalQuantity(checkedData, "amount");
  const total_price = CalculateTotalP(checkedData, "price", "amount");

  const updatedIngData = checkedData?.map((newItem) => {
    const oldData =
      data?.data?.find((old) => old.item_id === newItem?.item_id) || {};

    if (oldData) {
      return {
        ...newItem,
        total_price: parseFloat(newItem?.amount) * newItem?.price,
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

  return (
    <UniversalControlModal
      status={pair?.id ? true : false}
      type="pile_action"
      Pdata={checkedData}
      setCheckedData={setCheckedData}
      sp={"cutting_decrease"}>
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
              name: "st2_name",
              take_id: true,
              extra: "st2_id",
              df_value: { value: "default", label: "Ombor tanlang*" },
              options: storeData?.data,
              u_option: [acItem?.st2_name, acItem?.st2_id],
            },
            {
              type: "s_search",
              name: "item_name",
              extra: "item_id",
              df_value: {
                value: acItem?.item_id || "default",
                label: acItem?.item_name || "Ingredient tanlang*",
              },
              options: data?.data,
              getFullInfo: true,
              u_option: [acItem?.item_name, acItem?.item_id],
            },
            {
              type: "inputN",
              name: "amount",
              getAmount: true,
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
              u_option: [acItem?.invoice_group]
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
          <p style={{ "--data-line-size": "15%" }}>Ombor</p>
          <p style={{ "--data-line-size": "15%" }}>Miqdori</p>
        </div>
        <div className="product_box_body">
          {gl ? <LoaderSvg color="#eee" fontSize="24px" /> : data?.data?.map((item) => {
            const checked = checkedData.find((i) => i.item_id === item?.item_id);
            return (
              <div
                className={`product_box_item ${checked ? "active" : ""}`}
                key={item?.item_id}>
                <label>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => getProduct({ ...item, amount: 0 }, checked ? 0 : 1)}
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
                      onChange={(e) => {
                        getProduct(
                          { ...checked, st1_id: e.target.value, st1_name: e.target.selectedOptions[0].getAttribute("st-name"), },
                          1
                        );
                      }}>
                      <option
                        value={acItem?.st1_id || "default"}
                        st-name={acItem?.st1_name}>
                        {acItem?.st1_id || "Ombor tanlang*"}
                      </option>
                      {storeData?.data?.map((item) => {
                        return (
                          <option key={item?.id} value={item?.id} st-name={item.name}>
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
                      defaultValue={acItem?.amount || 0}
                      onChange={(e) => getProduct({ ...checked, amount: -e.target.value }, 1)}
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
          total={false}
          displayKeys={[
            { name: "item_name", size: "24%" },
            { name: "waste", size: "24%", position: 2 },
            { name: "amount", size: "24%", position: 2 },
            { name: "total_amount", size: "24%", position: 2 },
          ]}
        />
      </CalcResult>
    </UniversalControlModal>
  );
};

export default InvoicesModal;

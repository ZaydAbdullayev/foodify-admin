import React, { useEffect, useState } from "react";
import { UniversalControlModal } from "../../../components/modal-calc/modal-calc";
import { UniversalForm } from "../../../components/modal-calc/modal-calc";
import { UniversalProductControl } from "../../../components/modal-calc/modal-calc";
import { CalcResultHeader } from "../../../components/modal-calc/modal-calc";
import { CalcResultBody } from "../../../components/modal-calc/modal-calc";
import { CalcResult } from "../../../components/modal-calc/modal-calc";
import { useGetStoreQuery } from "../../../service/store.service";
import { useGetStGroupsQuery } from "../../../service/groups.service";
import { useCalcStCarryUpMutation } from "../../../service/carry-up.service";
import { useGetStProductQuery } from "../../../service/s-products.service";

import { BsReceiptCutoff } from "react-icons/bs";

export const InvoicesModal = ({
  data,
  checkedData,
  setCheckedData,
  getProduct,
  NUM,
  setId,
  id,
  acItem,
  acIngredients,
}) => {
  const today = new Date().toISOString().split("T")[0];
  const [activePart, setActivePart] = useState(1);
  const [calcData, setCalcData] = useState([]); // [{id: 1, amount: 1, sender_storage : id}]
  const { data: storeData = [] } = useGetStoreQuery();
  const { data: groupsData = [] } = useGetStGroupsQuery();
  const [calcStCarryUp] = useCalcStCarryUpMutation();
  const { data: productData = [] } = useGetStProductQuery();

  const updatedData = checkedData?.map((newItem) => {
    const oldData = data?.find((old) => old.id === newItem.id) || {};

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

  const handleSelectChange = (event) => {
    const selectedName = event.target.value;
    const selectedItem = storeData?.data?.find(
      (item) => item.name === selectedName
    );
    const selectedId =
      selectedName === "default" || !selectedItem ? 0 : selectedItem.id;

    setId(selectedId);
  };

  useEffect(() => {
    if (acItem?.storage) {
      const selectedItem = storeData?.data?.find(
        (item) => item.name === acItem?.storage
      );
      const selectedId = selectedItem?.id;

      setId(selectedId);
    }
  }, [acItem?.storage, setId, storeData?.data]);

  const revordCalcData = async (data) => {
    if (id === null) return alert("Ombor tanlanmagan");
    const value = await calcStCarryUp(data);
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

  const activeData = activePart === 1 ? data : productData?.data;

  return (
    <UniversalControlModal
      status={acItem?.id ? true : false}
      type="carryUp"
      Pdata={[...checkedData, ...acIngredients]}
      setCheckedData={setCheckedData}
    >
      <UniversalForm>
        <input
          type="number"
          name="order"
          placeholder="Tartib raqam*"
          defaultValue={acItem?.order ? acItem?.order : NUM?.num}
          required
          autoComplete="off"
          style={{ "--input-width": "8%" }}
        />
        <input
          type="date"
          name="date"
          style={{ "--input-width": "15%" }}
          defaultValue={acItem?.date ? acItem?.date : today}
        />
        <select
          name="storage_sender"
          onChange={handleSelectChange}
          style={{ "--input-width": "15%" }}
        >
          {acItem?.storage ? (
            <option value={acItem?.storage}>{acItem?.storage}</option>
          ) : (
            <option value="default">Beruvchi ombor*</option>
          )}
          {storeData?.data?.map((item) => {
            return (
              <option key={item?.id} value={item?.name}>
                {item?.name}
              </option>
            );
          })}
        </select>
        <select name="storage_receiver" style={{ "--input-width": "15%" }}>
          {acItem?.storage ? (
            <option value={acItem?.storage}>{acItem?.storage}</option>
          ) : (
            <option value="default">Oluvchi ombor*</option>
          )}
          {storeData?.data?.map((item) => {
            return (
              <option key={item?.id} value={item?.name}>
                {item?.name}
              </option>
            );
          })}
        </select>
        <select name="ingredient_group">
          {acItem?.ingredient_group ? (
            <option value={acItem?.ingredient_group}>
              {acItem?.ingredient_group}
            </option>
          ) : (
            <option value="default">Guruh tanlang*</option>
          )}
          {groupsData?.data?.map((item) => {
            return (
              <option key={item?.id} value={item?.name}>
                {item?.name}
              </option>
            );
          })}
        </select>
        <input
          type="text"
          name="description"
          defaultValue={acItem?.description ? acItem?.description : ""}
          placeholder="Tavsif"
          style={{ "--input-width": "12%" }}
        />
        <input type="hidden" name="storage_id" value={id} />
      </UniversalForm>
      <UniversalProductControl
        setActivePart={setActivePart}
        activePart={activePart}
      >
        <div className="product_box_item">
          <label>
            <input type="checkbox" name="id" onClick={() => getProduct(data)} />
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
                key={item.id}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={checked}
                    onClick={() =>
                      getProduct({ ...item, amount: 0 }, checked ? 0 : 1)
                    }
                  />
                </label>
                <p
                  style={{
                    "--data-line-size": activePart === 1 ? "20%" : "60%",
                  }}
                >
                  {item.name}
                </p>
                {activePart === 1 && (
                  <>
                    <p
                      style={{
                        "--data-line-size": "15%",
                        justifyContent: "center",
                      }}
                    >
                      {item.unit}
                    </p>
                    <p
                      style={{
                        "--data-line-size": "15%",
                        justifyContent: "center",
                      }}
                    >
                      {item.group}
                    </p>
                    <p
                      style={{
                        "--data-line-size": "15%",
                        justifyContent: "flex-end",
                      }}
                    >
                      {item.price}
                    </p>
                    <p
                      style={{
                        "--data-line-size": "15%",
                        justifyContent: "center",
                      }}
                    >
                      {item?.type?.charAt(0)}
                    </p>
                  </>
                )}
                <p
                  style={{
                    "--data-line-size": "15%",
                    justifyContent: "center",
                  }}
                >
                  {(checked || activePart === 2) && (
                    <input
                      type="number"
                      name="amount"
                      defaultValue={acItem?.amount ? acItem?.amount : ""}
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
                    onClick={() => revordCalcData(calcData)}
                  >
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
          <p>№</p>
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

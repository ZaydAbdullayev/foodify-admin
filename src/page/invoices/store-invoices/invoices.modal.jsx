import React, { useState, useEffect } from "react";
import { UniversalControlModal } from "../../../components/modal-calc/modal-calc";
import { UniversalForm } from "../../../components/modal-calc/modal-calc";
import { UniversalProductControl } from "../../../components/modal-calc/modal-calc";
import { CalcResultHeader } from "../../../components/modal-calc/modal-calc";
import { CalcResultBody } from "../../../components/modal-calc/modal-calc";
import { CalcResult } from "../../../components/modal-calc/modal-calc";
import { useGetStoreQuery } from "../../../service/store.service";
import { useGetStorageItemsQuery } from "../../../service/invoices.service";
import { useGetStSuplierQuery } from "../../../service/suplier.service";
import { useSelector } from "react-redux";

export const InvoicesModal = ({
  checkedData,
  setCheckedData,
  data,
  getProduct,
  NUM,
}) => {
  const today = new Date().toISOString().split("T")[0];
  const acItem = useSelector((state) => state.activeThing);
  const [id, setId] = useState(null);
  const [activePart, setActivePart] = useState(1); // 1 - product, 2 - invoice
  const { data: storeData = [] } = useGetStoreQuery();
  const { data: storageItems = [] } = useGetStorageItemsQuery(id);
  const { data: suplierData = [] } = useGetStSuplierQuery();
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

  const handleSelectChange = (event) => {
    const selectedName = event.target.value;
    const selectedItem = storeData?.data?.find(
      (item) => item?.name === selectedName
    );
    const selectedId =
      selectedName === "default" || !selectedItem ? null : selectedItem?.id;

    setId(selectedId);
  };

  useEffect(() => {
    if (acItem?.storage) {
      const selectedItem = storeData?.data?.find(
        (item) => item?.name === acItem?.storage
      );
      const selectedId = selectedItem?.id;

      setId(selectedId);
    }
  }, [acItem?.storage, storeData?.data]);

  const ingredientData = storageItems?.data ? storageItems?.data : data;

  return (
    <UniversalControlModal
      status={acItem?.id ? true : false}
      type="invoice"
      Pdata={[...checkedData, ...acIngredients]}
      Udata={updatedData}
      id={id}
      setCheckedData={setCheckedData}
    >
      <UniversalForm>
        <input
          type="number"
          name="order"
          placeholder="Tartib raqam*"
          required
          autoComplete="off"
          defaultValue={acItem?.order ? acItem?.order : NUM.num}
          style={{ "--input-width": "15%" }}
        />
        <input
          type="date"
          name="date"
          style={{
            "--input-width": "12%",
          }}
          defaultValue={acItem?.date ? acItem?.date : today}
        />
        <select name="supplier" style={{ "--input-width": "12%" }}>
          {acItem?.supplier ? (
            <option value={acItem?.supplier}>{acItem?.supplier}</option>
          ) : (
            <option value="default">Yetkazuvchi tanlang*</option>
          )}
          {suplierData?.data?.map((item) => {
            return (
              <option key={item?.id} value={item?.name}>
                {item?.name}
              </option>
            );
          })}
        </select>
        <select
          name="storage"
          style={{ "--input-width": "15%" }}
          onChange={handleSelectChange}
        >
          {acItem?.storage ? (
            <option value={acItem?.storage}>{acItem?.storage}</option>
          ) : (
            <option value="default">Ombor tanlang*</option>
          )}
          {storeData?.data?.map((item) => {
            return (
              <option key={item?.id} value={item?.name}>
                {item?.name}
              </option>
            );
          })}
        </select>
        <input
          type="text"
          name="responsible"
          placeholder="Javobgar*"
          required
          defaultValue={acItem?.responsible ? acItem?.responsible : ""}
          style={{ "--input-width": "12%" }}
        />
        <input
          type="text"
          name="description"
          placeholder="Tavsif*"
          defaultValue={acItem?.description ? acItem?.description : ""}
          style={{ "--input-width": "12%" }}
        />
      </UniversalForm>
      <UniversalProductControl
        setActivePart={setActivePart}
        activePart={activePart}
      >
        <div className="product_box_item">
          <label>
            <input type="checkbox" name="id" onClick={() => getProduct(data)} />
          </label>
          <p style={{ "--data-line-size": "20%" }}>Nomi</p>
          <p style={{ "--data-line-size": "15%" }}>O'lchov birligi</p>
          <p style={{ "--data-line-size": "15%" }}>Guruh</p>
          <p style={{ "--data-line-size": "15%" }}>Narxi</p>
          <p style={{ "--data-line-size": "15%" }}>Miqdori</p>
          <p style={{ "--data-line-size": "15%" }}>Jami</p>
        </div>
        <div className="product_box_body">
          {data?.map((item) => {
            const checked = [...checkedData, ...acIngredients]?.find(
              (i) => i.id === item?.id
            );
            return (
              <div
                className={`product_box_item ${checked ? "active" : ""}`}
                key={item?.id}
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
                <p style={{ "--data-line-size": "20%" }}>{item?.name}</p>
                <p
                  style={{
                    "--data-line-size": "15%",
                    justifyContent: "center",
                  }}
                >
                  {item?.unit}
                </p>
                <p
                  style={{
                    "--data-line-size": "15%",
                    justifyContent: "center",
                  }}
                >
                  {item?.group}
                </p>
                <p
                  style={{
                    "--data-line-size": "15%",
                    justifyContent: "flex-end",
                  }}
                >
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
                  }}
                >
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
                  }}
                >
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
          <p>№</p>
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
            { name: "name", size: "20%" },
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

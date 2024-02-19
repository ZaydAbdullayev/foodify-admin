import React from "react";
import { UniversalControlModal } from "../../../components/modal-calc/modal-calc";
import { UniversalForm } from "../../../components/modal-calc/modal-calc";
import { UniversalProductControl } from "../../../components/modal-calc/modal-calc";
import { CalcResultHeader } from "../../../components/modal-calc/modal-calc";
import { CalcResultBody } from "../../../components/modal-calc/modal-calc";
import { CalcResult } from "../../../components/modal-calc/modal-calc";
import { useFetchDataQuery } from "../../../service/fetch.service";
import { useSelector } from "react-redux";
// import { CalculateTotalP } from "../../../service/calc.service";
// import { CalculateTotalQuantity } from "../../../service/calc.service";

export const InvoicesModal = ({
  checkedData,
  data,
  getProduct,
  NUM,
  setCheckedData,
}) => {
  const today = new Date().toISOString().split("T")[0];
  const [activePart, setActivePart] = React.useState(1);
  const [id, setId] = React.useState(null);
  const res_id = useSelector((state) => state?.res_id);
  const user = JSON.parse(localStorage.getItem("user"))?.user || {};
  const { data: storeData = [] } = useFetchDataQuery({
    url: `get/storage/${res_id}`,
    tags: ["store"],
  });
  const { data: storageItems = [] } = useFetchDataQuery({
    url: `get/storageItems/${user?.user?.id}/${id}`,
    tags: ["invoices"],
  });

  const updatedData = checkedData?.map((newItem) => {
    const oldData = storageItems?.data?.find((old) => old.id === newItem.id);
    const ototal = oldData ? parseInt(oldData?.total_quantity) : 0;

    if (oldData) {
      return {
        ...newItem,
        old_quantity: ototal || 0,
        total_quantity: ototal + parseInt(newItem?.amount),
        difference: ototal - parseInt(newItem?.amount),
        excess_price:
          ototal - parseInt(newItem?.amount) > 0
            ? newItem.price * (ototal - parseInt(newItem?.amount))
            : 0,
        lack_price:
          ototal - parseInt(newItem?.amount) < 0
            ? newItem.price * (ototal - parseInt(newItem?.amount))
            : 0,
        total_price: parseInt(newItem?.amount) * newItem?.price,
      };
    } else {
      return {
        ...newItem,
        old_quantity: 0,
        total_quantity: parseInt(newItem?.amount),
        difference: parseInt(newItem?.amount),
        excess_price: parseInt(newItem?.amount) * newItem?.price,
        lack_price: 0,
        total_price: parseInt(newItem?.amount) * newItem?.price,
      };
    }
  });

  const getId = (e) => {
    const selectedItem = storeData?.data?.find((item) => item?.name === e);
    const selectedId =
      e === "default" || !selectedItem ? null : selectedItem?.id;

    setId(selectedId);
  };

  return (
    <UniversalControlModal
      type="envanter"
      Pdata={checkedData}
      setCheckedData={setCheckedData}
    >
      <UniversalForm>
        <input
          type="number"
          name="order"
          placeholder="Tartib raqam*"
          defaultValue={NUM.num}
          required
          autoComplete="off"
          style={{ "--input-width": "12%" }}
        />
        <input
          type="date"
          name="date"
          style={{ "--input-width": "15%" }}
          defaultValue={today}
        />
        <select
          name="store"
          style={{ "--input-width": "15%" }}
          onChange={(e) => getId(e.target.value)}
        >
          <option value="default" disabled hidden>
            Ombor tanlang
          </option>
          {storeData?.data?.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="description"
          placeholder="Tavsif*"
          style={{ "--input-width": "12%" }}
        />
        <input type="hidden" value={user?.id} />
      </UniversalForm>
      <UniversalProductControl
        setActivePart={setActivePart}
        activePart={activePart}
        type="envanter"
      >
        <div className="product_box_item">
          <label aria-label="checked this elements">
            <input type="checkbox" name="id" onClick={() => getProduct(data)} />
          </label>
          <p style={{ "--data-line-size": "25%" }}>Nomi</p>
          <p style={{ "--data-line-size": "14%" }}>O'. birligi</p>
          <p style={{ "--data-line-size": "19%" }}>Guruhi</p>
          <p style={{ "--data-line-size": "19%" }}>Nomi</p>
          <p style={{ "--data-line-size": "19%" }}>Miqdor</p>
        </div>
        <div className="product_box_body">
          {data?.map((item) => {
            const checked = checkedData.some((i) => i.id === item.id);
            return (
              <div
                className={`product_box_item ${checked ? "active" : ""}`}
                key={item.id}
              >
                <label>
                  <input
                    type="checkbox"
                    defaultChecked={checked}
                    onChange={() =>
                      getProduct({ ...item, amount: 0 }, checked ? 0 : 1)
                    }
                  />
                </label>
                <p style={{ "--data-line-size": "60%" }}>{item.name}</p>
                <p
                  style={{
                    "--data-line-size": "15%",
                    justifyContent: "center",
                  }}
                >
                  {checked && (
                    <input
                      type="text"
                      name="amount"
                      placeholder="miqdori"
                      autoComplete="off"
                      onChange={(e) =>
                        getProduct({ ...item, amount: e.target.value }, 1)
                      }
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
          <p>№</p>
          <p style={{ "--data-line-size": "20%" }}>Nomi</p>
          <p style={{ "--data-line-size": "15%" }}>Turi</p>
          <p style={{ "--data-line-size": "30%" }}>O'lchov birligi</p>
          <p style={{ "--data-line-size": "30%" }}>Bor edi</p>
          <p style={{ "--data-line-size": "30%" }}>Mavjud</p>
          <p style={{ "--data-line-size": "30%" }}>Faqr</p>
          <p style={{ "--data-line-size": "30%" }}>Narx</p>
          <p style={{ "--data-line-size": "30%" }}>Ortiqcha(narx)</p>
          <p style={{ "--data-line-size": "30%" }}>Kam(narx)</p>
          <p style={{ "--data-line-size": "30%" }}>Balans</p>
        </CalcResultHeader>
        <CalcResultBody
          data={updatedData}
          displayKeys={[
            { name: "name", size: "20%" },
            { name: "type", size: "15%", position: 1 },
            { name: "unit", size: "30%", position: 1 },
            { name: "old_quantity", size: "30%", position: 2 },
            { name: "total_quantity", size: "30%", position: 2 },
            { name: "difference", size: "30%", position: 2 },
            { name: "price", size: "30%", position: 2 },
            { name: "excess_price", size: "30%", position: 2 },
            { name: "lack_price", size: "30%", position: 2 },
            { name: "total_price", size: "30%", position: 2 },
          ]}
        />
      </CalcResult>
    </UniversalControlModal>
  );
};

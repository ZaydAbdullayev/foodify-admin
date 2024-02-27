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

export const InvoicesModal = ({ checkedData, getProduct, NUM, setCheckedData }) => {
  const [activePart, setActivePart] = React.useState(1);
  const acItem = useSelector((state) => state?.activeThing);
  const id = useSelector((state) => state?.activeSt_id);
  const user = JSON.parse(localStorage.getItem("user"))?.user || {};
  const { data = [] } = useFetchDataQuery({
    url: `get/foods/${user?.id}`,
    tag: ["s-product"],
  });
  const { data: storeData = [] } = useFetchDataQuery({
    url: `get/storage/${user?.id}`,
    tags: ["store"],
  });
  const { data: storageItems = [] } = useFetchDataQuery({
    url: `get/storageItems/${user?.id}/${id}`,
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

  const num = acItem?.order ? acItem?.order : NUM.num;
  return (
    <UniversalControlModal
      type="envanter"
      Pdata={checkedData}
      setCheckedData={setCheckedData}
    >
      <UniversalForm
        formData={[
          {
            type: "inputN",
            name: "order",
            plc_hr: "Tartib raqam*",
            df_value: num || 1,
            size: "5%",
          },
          {
            type: "inputD",
            name: "date",
            df_value: acItem?.date,
            size: "15%",
          },
          {
            type: "select",
            name: "storage",
            take_id: true,
            size: "15%",
            df_value: { value: "default", label: "Ombor tanlang*" },
            options: storeData?.data,
          },
          {
            type: "input",
            name: "description",
            plc_hr: "Tavsif",
            size: "12%",
            df_value: acItem?.description,
          },
          {
            type: "inputH",
            name: "res_id",
            df_value: user?.id,
          },
        ]}
      />
      <UniversalProductControl
        setActivePart={setActivePart}
        activePart={activePart}
        type="envanter"
      >
        <div className="product_box_item">
          <label aria-label="checked this elements">
            <input
              type="checkbox"
              name="id"
              onClick={() => setCheckedData(data)}
            />
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

import React from "react";
import { UniversalControlModal } from "../../../components/modal-calc/modal-calc";
import { UniversalForm } from "../../../components/modal-calc/modal-calc";
import { UniversalProductControl } from "../../../components/modal-calc/modal-calc";
import { CalcResultHeader } from "../../../components/modal-calc/modal-calc";
import { CalcResultBody } from "../../../components/modal-calc/modal-calc";
import { CalcResult } from "../../../components/modal-calc/modal-calc";
// import { CalculateTotalP } from "../../../service/calc.service";
// import { CalculateTotalQuantity } from "../../../service/calc.service";

export const InvoicesModal = ({ checkedData, data, getProduct, NUM }) => {
  const today = new Date().toISOString().split("T")[0];
  const [activePart, setActivePart] = React.useState(1);
  const user = JSON.parse(localStorage.getItem("user"))?.user || {};

  const updatedData = checkedData?.map((newItem) => {
    const oldData = data?.find((old) => old.id === newItem.id) || {};

    if (oldData) {
      return {
        ...newItem,
        total_price: newItem?.amount * newItem?.price,
      };
    }

    return newItem;
  });

  return (
    <UniversalControlModal type="preOrder" Pdata={checkedData}>
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
        <input
          type="text"
          name="responsible"
          placeholder="Javobgar*"
          required
          autoComplete="off"
          style={{ "--input-width": "12%" }}
        />
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
        type="preOrder"
      >
        <div className="product_box_item">
          <label>
            <input type="checkbox" name="id" onClick={() => getProduct(data)} />
          </label>
          <p style={{ "--data-line-size": "60%" }}>Nomi</p>
          <p style={{ "--data-line-size": "30%" }}>Miqdor</p>
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
                    checked={checked || false}
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
          <p style={{ "--data-line-size": "23%" }}>Nomi</p>
          <p style={{ "--data-line-size": "8%" }}>Turi</p>
          <p style={{ "--data-line-size": "20%" }}>Miqdor</p>
          <p style={{ "--data-line-size": "20%" }}>Narx</p>
          <p style={{ "--data-line-size": "20%" }}>Jami</p>
        </CalcResultHeader>
        <CalcResultBody
          data={updatedData}
          displayKeys={[
            { name: "name", size: "23%" },
            { name: "type", size: "8%", position: 2 },
            { name: "amount", size: "20%", position: 2 },
            { name: "price", size: "20%", position: 2 },
            { name: "total_price", size: "20%", position: 2 },
          ]}
        />
      </CalcResult>
    </UniversalControlModal>
  );
};

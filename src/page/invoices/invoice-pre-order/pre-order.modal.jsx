import React from "react";
import { UniversalControlModal } from "../../../components/modal-calc/modal-calc";
import { UniversalForm } from "../../../components/modal-calc/modal-calc";
import { UniversalProductControl } from "../../../components/modal-calc/modal-calc";
import { CalcResultHeader } from "../../../components/modal-calc/modal-calc";
import { CalcResultBody } from "../../../components/modal-calc/modal-calc";
import { CalcResult } from "../../../components/modal-calc/modal-calc";
import { useFetchDataQuery } from "../../../service/fetch.service";

export const InvoicesModal = ({
  checkedData,
  getProduct,
  NUM,
  setCheckedData,
}) => {
  const today = new Date().toISOString().split("T")[0];
  const [activePart, setActivePart] = React.useState(1);
  const user = JSON.parse(localStorage.getItem("user"))?.user || {};
  const { data = [] } = useFetchDataQuery({
    url: `get/foods/${user?.id}`,
    tags: ["s-product"],
  });

  const updatedData = checkedData?.map((newItem) => {
    const oldData = data?.data?.find((old) => old.id === newItem.id) || {};

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
      <UniversalForm
        formData={[
          {
            type: "inputN",
            name: "order",
            plc_hr: "Tartib raqam*",
            df_value: Number.num || 1,
          },
          {
            type: "inputD",
            name: "date",
            df_value: today,
          },
          {
            type: "input",
            name: "responsible",
            plc_hr: "Javobgar*",
            df_value: "",
          },
          {
            type: "input",
            name: "description",
            plc_hr: "Tavsif",
            df_value: "",
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
        type="preOrder"
      >
        <div className="product_box_item">
          <label aria-label="checked this elements">
            <input
              type="checkbox"
              name="id"
              onClick={() => setCheckedData(data?.data)}
            />
          </label>
          <p style={{ "--data-line-size": "60%" }}>Nomi</p>
          <p style={{ "--data-line-size": "30%" }}>Miqdor</p>
        </div>
        <div className="product_box_body">
          {data?.data?.map((item) => {
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

import { useState } from "react";

export const UniversalSecondPColumn = ({
  children,
  data,
  updateData,
  status,
}) => {
  return (
    <div className="section_u">
      <p>
        Tanlanagan Mahsulotlar <button>HISOBLASH</button>
      </p>
      <div className="second_column_body">
        <div className="product_box_item">
          <label>
            <input type="checkbox" name="id" onClick={() => updateData(data)} />
          </label>
          <p>№</p>
          <p style={{ "--data-line-size": "40%" }}>Nomi</p>
          <p style={{ "--data-line-size": "25%" }}>O'lchov birligi</p>
          <p style={{ "--data-line-size": "25%" }}>Miqdori</p>
        </div>
        <div className="product_box_body">
          {data.map((item, index) => {
            const handleUpdateData = () => {
              updateData(item);
            };
            const checked = status.some((i) => i.id === item.id);

            return (
              <div
                className={`product_box_item ${checked ? "active" : ""}`}
                key={item.id}
              >
                <label>
                  <input
                    type="checkbox"
                    name="id"
                    checked={checked}
                    onClick={() => handleUpdateData(item)}
                  />
                </label>
                <label>{index + 1}</label>
                <p style={{ "--data-line-size": "40%" }}>{item.name}</p>
                <p
                  style={{
                    "--data-line-size": "25%",
                    justifyContent: "center",
                  }}
                >
                  {item.unit}
                </p>
                <p
                  style={{
                    "--data-line-size": "25%",
                    justifyContent: "center",
                  }}
                >
                  <input type="text" />
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const UniversalProductControl = ({ children }) => {
  const [checkedData, setCheckedData] = useState([]);
  const [sCheckedData, setSCheckedData] = useState([]);
  const [activePart, setActivePart] = useState(1);
  const [allData, setAllData] = useState([]); // Replace with your initial data
  const [innerData, setInnerData] = useState([]);

  const getProduct = (item) => {
    const isChecked = checkedData.some((i) => i.id === item.id);
    setCheckedData((prevData) =>
      isChecked ? prevData.filter((i) => i.id !== item.id) : [...prevData, item]
    );
  };

  const updateData = (item) => {
    const isChecked = sCheckedData.some((i) => i.id === item.id);
    setSCheckedData((prevData) =>
      isChecked ? prevData.filter((i) => i.id !== item.id) : [...prevData, item]
    );
  };

  const rewardData = () => {
    // Add checked items to the existing innerData
    setInnerData((prevInnerData) => [...prevInnerData, ...checkedData]);

    // Remove checked items from the original data
    const remainingData = allData.filter(
      (item) => !checkedData.some((i) => i.id === item.id)
    );
    setAllData(remainingData);
    setCheckedData([]);
  };

  const resetData = () => {
    // Add checked items back to the original data
    setAllData((prevAllData) => [...prevAllData, ...sCheckedData]);

    // Remove checked items from the innerData
    setInnerData((prevInnerData) =>
      prevInnerData.filter((i) => !sCheckedData.some((j) => j.id === i.id))
    );

    setSCheckedData([]);
  };

  return (
    <div className="u-control_add_box">
      <div className="section_u">
        <div className="add_box__header">
          <div className="wdfaic _header_parts">
            <span
              className={activePart === 1 ? "active" : "passive"}
              onClick={() => setActivePart(1)}
            >
              ingredientlar
            </span>
            <span
              className={activePart === 2 ? "active" : "passive"}
              onClick={() => setActivePart(2)}
            >
              importlar
            </span>
          </div>
          <input type="search" name="search" placeholder="Qidirish..." />
          {activePart === 1 && (
            <>
              <select name="group">
                <option value="default">Guruh tanlang</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
              <select name="ombor">
                <option value="default">Ombor tanlang</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </>
          )}
        </div>
        <div className="u-control_product_box">
          <div className="product_box_item">
            <label>
              <input
                type="checkbox"
                name="id"
                onClick={() => getProduct(data)}
              />
            </label>
            <p style={{ "--data-line-size": "35%" }}>Nomi</p>
            <p style={{ "--data-line-size": "20%" }}>O'lchov birligi</p>
            <p style={{ "--data-line-size": "20%" }}>Guruh</p>
            <p style={{ "--data-line-size": "20%" }}>Narxi</p>
          </div>
          <div className="product_box_body">
            {data.map((item) => {
              const checked = checkedData.some((i) => i.id === item.id);
              return (
                <div
                  className={`product_box_item ${checked ? "active" : ""}`}
                  key={item.id}
                >
                  <label>
                    <input
                      type="checkbox"
                      name="id"
                      checked={checked}
                      onClick={() => getProduct(item)}
                    />
                  </label>
                  <p style={{ "--data-line-size": "35%" }}>{item.name}</p>
                  <p
                    style={{
                      "--data-line-size": "20%",
                      justifyContent: "center",
                    }}
                  >
                    {item.unit}
                  </p>
                  <p
                    style={{
                      "--data-line-size": "20%",
                      justifyContent: "center",
                    }}
                  >
                    {item.group}
                  </p>
                  <p
                    style={{
                      "--data-line-size": "20%",
                      justifyContent: "flex-end",
                    }}
                  >
                    {item.price * item.id - 300}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="u-contral_column_btn">
        <button onClick={() => rewardData()}></button>
        <button onClick={() => resetData()}></button>
      </div>
      <UniversalSecondPColumn
        data={innerData}
        updateData={updateData}
        status={sCheckedData}
      />
    </div>
  );
};

export const data = [
  {
    id: 1,
    name: "test 1",
    price: 10000,
    unit: "kg",
    group: "test",
  },
  {
    id: 2,
    name: "test 2",
    price: 10000,
    unit: "kg",
    group: "wfe",
  },
  {
    id: 3,
    name: "test 3",
    price: 10000,
    unit: "kg",
    group: "test",
  },
  {
    id: 4,
    name: "test 4",
    price: 10000,
    unit: "kg",
    group: "test",
  },
  {
    id: 5,
    name: "test 5",
    price: 10000,
    unit: "kg",
    group: "test",
  },
  {
    id: 6,
    name: "test 6",
    price: 10000,
    unit: "kg",
    group: "test",
  },
  {
    id: 7,
    name: "test 7",
    price: 10000,
    unit: "kg",
    group: "test",
  },
  {
    id: 8,
    name: "test 8",
    price: 10000,
    unit: "kg",
    group: "test",
  },
  {
    id: 9,
    name: "test 9",
    price: 10000,
    unit: "kg",
    group: "test",
  },
];

export const calculateTotal = (data) => {
  let total = 0;

  data.ingredients.forEach((ingredient) => {
    const amount = ingredient.amount || 0;
    const price = ingredient.price || 0;

    total += amount * price;
  });

  const remainingPrice = data.price - total;

  const result = data.price / total || 0;
  return {
    markup: result,
    prime_cost: total,
    profit: remainingPrice.toFixed(2),
  };
};

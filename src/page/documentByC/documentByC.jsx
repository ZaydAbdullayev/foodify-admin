import React, { memo } from "react";
import "./documentByC.css";
import { useLocation } from "react-router-dom";
import { NumericFormat } from "react-number-format";

export const DocumentByC = memo(({ open, setOpen }) => {
  const ct = useLocation().search.split("?cp=").pop();
  return (
    <div className={open ? "document_conatainer open" : "document_conatainer"}>
      <div className="category_box">
        <h1>
          <span style={{ textTransform: "capitalize" }}>
            {ct.split("+").join(" ")}
          </span>{" "}
          bo'limi uchun hisobot
        </h1>
        <div className="category_body">
          {prdocuts.map((item) => {
            return (
              <div className="category_item">
                <h3>{item.name}</h3>
                <span>{item.sold} ta</span>
                <NumericFormat
                  value={item.sold * 100000}
                  displayType={"text"}
                  thousandSeparator=" "
                  suffix={" so'm"}
                />
              </div>
            );
          })}
        </div>
        <div className="category_footer">
          <button onClick={() => setOpen(false)}>Orqaga</button>
          <button>lorem</button>
        </div>
      </div>
    </div>
  );
});

const prdocuts = [
  {
    id: 1,
    name: "Burger",
    sold: 102,
  },
  {
    id: 2,
    name: "Pizza",
    sold: 22,
  },
  {
    id: 3,
    name: "Shaurma",
    sold: 80,
  },
  {
    id: 4,
    name: "Somsa",
    sold: 135,
  },
  {
    id: 5,
    name: "Lavash",
    sold: 50,
  },
  {
    id: 6,
    name: "Kebab",
    sold: 10,
  },
  {
    id: 7,
    name: "Shashlik",
    sold: 5,
  },
  {
    id: 8,
    name: "Coffee",
    sold: 102,
  },
  {
    id: 9,
    name: "Kokteyl",
    sold: 22,
  },
  {
    id: 10,
    name: "Pepsi",
    sold: 80,
  },
];

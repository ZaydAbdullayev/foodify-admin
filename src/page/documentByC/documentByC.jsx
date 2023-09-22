import React, { memo } from "react";
import "./documentByC.css";
import { useLocation } from "react-router-dom";

export const DocumentByC = memo(() => {
  const ct = useLocation().pathname.split("/").pop();
  return (
    <div className="category_box container_box">
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
            </div>
          );
        })}
      </div>
    </div>
  );
});

const prdocuts = [
  {
    id: 1,
    name: "Burger",
    sold: 10,
  },
  {
    id: 2,
    name: "Pizza",
    sold: 20,
  },
  {
    id: 3,
    name: "Shaurma",
    sold: 30,
  },
  {
    id: 4,
    name: "Somsa",
    sold: 40,
  },
];

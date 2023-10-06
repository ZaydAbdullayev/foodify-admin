import React, { memo } from "react";
import "./documentByC.css";
import { useLocation } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import { useGetDepProductsQuery } from "../../service/product.service";

export const DocumentByC = memo(({ open, setOpen }) => {
  const ct = useLocation().search.split("?cp=").pop();
  const department = ct.split("|").shift();
  const date = ct.split("|dateby=").pop();
  const dData = {
    dep: department,
    start: date.split("&").shift(),
    end: date.split("&").pop(),
  };
  const { data = [] } = useGetDepProductsQuery(dData);

  return (
    <div className={open ? "document_conatainer open" : "document_conatainer"}>
      <div className="category_box">
        <h1>
          <span style={{ textTransform: "capitalize" }}>
            {department.split("%20").join(" ")}
          </span>{" "}
          bo'limi uchun hisobot
        </h1>
        <div className="category_body">
          {data?.departmentProfit?.map((item) => {
            return (
              <div className="category_item">
                <h3>{item?.product}</h3>
                <span>{item?.totalQuantity} ta</span>
                <NumericFormat
                  value={item?.totalPrice}
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

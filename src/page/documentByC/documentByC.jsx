import React, { memo } from "react";
import "./documentByC.css";
import { useLocation } from "react-router-dom";

export const DocumentByC = memo(() => {
  const ct = useLocation().search;
  const categoryName= ct.split("=").pop()
  return (
    <div className="category_box container_box">
      <h1>{categoryName?.split("+").join(" ")}</h1>
    </div>
  );
});

import React, { useState } from "react";
import "./document.css";
import { useNavigate } from "react-router-dom";
import { MdDateRange } from "react-icons/md";
import { LuArrowLeftRight } from "react-icons/lu";
import AnimatedNumber from "animated-number-react";
import { useGetByDateQuery } from "../../service/product.service";
import { DocumentByC } from "../documentByC/documentByC";

export const Document = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState({
    fdate: new Date().toISOString().split("T")[0],
    tdate: new Date().toISOString().split("T")[0],
  });
  const { data = [] } = useGetByDateQuery(date);

  const getCategry = (name) => {
    const category = name?.split(" ").join("+");
    navigate(`/historical/?cp=${category}`);
    setOpen(true);
  };

  const formatValue = (value) => value.toFixed(0);

  return (
    <div className="container_box document_box">
      <div className="document_header">
        <h1>Barcha hisobotlar</h1>

        <form className="filter_date">
          <label>
            <input
              type="date"
              name="fdate"
              onChange={(e) => setDate({ ...date, fdate: e.target.value })}
            />
            <span>{date.fdate}</span>
          </label>
          <LuArrowLeftRight />
          <label>
            <span>{date.tdate}</span>
            <input
              type="date"
              name="tdate"
              onChange={(e) => setDate({ ...date, tdate: e.target.value })}
            />
          </label>
        </form>
      </div>
      <div className="document_body">
        {data?.departmentSales?.map((item, index) => {
          return (
            <div
              className="document_item"
              key={index}
              onClick={() => getCategry(item?.department)}
            >
              <p>
                <MdDateRange />
                <span>bugun:</span>
                <span style={{ textTransform: "lowercase" }}>
                  <AnimatedNumber
                    value={item?.totalQuantity}
                    formatValue={formatValue}
                  />{" "}
                  ta
                </span>
              </p>
              <h3>{item?.department}</h3>
              <span>
                $ :{" "}
                <AnimatedNumber
                  value={item?.totalSales}
                  formatValue={formatValue}
                />{" "}
                sum
              </span>
            </div>
          );
        })}
      </div>
      <DocumentByC open={open} setOpen={setOpen} />
    </div>
  );
};

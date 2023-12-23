import React from "react";
import "./table.css";
import { useNavigate } from "react-router-dom";

export const Table = ({ data }) => {
  const navigate = useNavigate();

  const handleTarget = (item) => {
    // const location = item?.location?.split(" ")?.join("-");
    // if (item?.status === 0) {
    //   navigate(`category/${location}/${item?.name}/${item?.id}`);
    //   return;
    // }
    // navigate(`${location}/${item?.name}/${item?.id}`);
  };

  return data?.map((item) => {
    return (
      <div
        className="table_box"
        key={item?.id}
        onClick={() => handleTarget(item)}
      >
        <div
          className={
            item?.status === 0
              ? "chair"
              : item?.status === 1
              ? "chair busy_chair"
              : "chair served_chair"
          }
        ></div>
        <div
          className={
            item?.status === 0
              ? "chair"
              : item?.status === 1
              ? "chair busy_chair"
              : "chair served_chair"
          }
        ></div>
        <div
          className={
            item?.status === 0
              ? "table"
              : item?.status === 1
              ? "table busy_table"
              : "table served_table"
          }
        >
          {item?.name}
        </div>
        <div
          className={
            item?.status === 0
              ? "chair"
              : item?.status === 1
              ? "chair busy_chair"
              : "chair served_chair"
          }
        ></div>
        <div
          className={
            item?.status === 0
              ? "chair"
              : item?.status === 1
              ? "chair busy_chair"
              : "chair served_chair"
          }
        ></div>
      </div>
    );
  });
};

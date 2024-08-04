import React, { useState, memo } from "react";
import "./full-report.css";
import { useParams } from "react-router-dom";
import { DynamicTable } from "../../../hooks/generate.tags";
import { useFetchDataQuery } from "../../../service/fetch.service";
import { useSearchAppParams } from "../../../hooks/useSearchParam";
import { LoaderSvg } from "../../../components/loading/loading";

export const FullReportById = memo(() => {
  const values = useParams();
  const [type, setType] = useState("income_details");
  const { pair } = useSearchAppParams().getAllParams();
  const { data: s = {}, isLoading } = useFetchDataQuery({ url: `/ingredientsReportDetails/${values.st_id}/${values.item_id}/${values.start}/${values.end}`, tags: ["reportDetails"] })

  return (
    <div className="container full-report-container">
      <div className="full-report-header">
        <p>Ombor: {pair.storage}</p>
        <p>Ingredient: {pair.item}</p>
        <p>Sana: {values.start} - {values.end}</p>
        <p>Oxirgi inventarizatsiya: {pair.last}</p>
        <p>Ilk miqdori: {pair.start}</p>
        <p>Oxirgi miqdori: {pair.end}</p>
        <p
          className={type === "income_details" ? "active" : ""}
          style={{ cursor: "pointer" }}
          onClick={() => setType("income_details")}
        >
          Kirim: {pair.income}
        </p>
        <p
          className={type === "expense_details" ? "active" : ""}
          style={{ cursor: "pointer" }}
          onClick={() => setType("expense_details")}
        >
          Chiqim: {pair.expense}
        </p>
      </div>
      <div className="full-report-details">
        {isLoading ? <LoaderSvg color="#eee" fontSize="28px" /> : s?.data?.[type]?.map((item, index) => {
          return (
            item.details !== null && (
              <div
                className="_details-content"
                style={{ "--grid-row-table-row": item.details.length + 2 }}>
                <p style={{ textTransform: "capitalize" }}>{item.type}</p>
                <DynamicTable
                  data={item?.details}
                  index={index}
                  key={`${item.type}_${index}`}
                />
              </div>
            )
          );
        })}
      </div>
    </div>
  );
});

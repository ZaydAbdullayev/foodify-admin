import React, { useState } from "react";
import "./document.css";
import { useNavigate, useLocation } from "react-router-dom";
import { MdDateRange } from "react-icons/md";
import { LuArrowLeftRight } from "react-icons/lu";
import AnimatedNumber from "animated-number-react";
import { useFetchDataQuery } from "../../service/fetch.service";
import { DocumentByC } from "../documentByC/documentByC";
import { LoadingBtn } from "../../components/loading/loading";
import { useDispatch, useSelector } from "react-redux";
import { acNavStatus } from "../../redux/navbar.status";
import { LiaCalendarDaySolid } from "react-icons/lia";

import noResult from "../../assets/images/20231109_144621.png";

export const Document = () => {
  const navigate = useNavigate();
  const res_id = useSelector((state) => state.res_id);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState({
    fdate: new Date().toISOString().split("T")[0],
    tdate: new Date().toISOString().split("T")[0],
  });
  const { data = [], isLoading } = useFetchDataQuery({
    url: `get/departmentSales/${res_id}/${date?.fdate}/${date?.tdate}`,
    tags: [""],
  });
  const search = useLocation().search?.split("=").pop();
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(acNavStatus([100]));
  }, [dispatch]);

  const getCategry = (name) => {
    navigate(`/historical/?cp=${name}|dateby=${date.fdate}&${date.tdate}`);
    setOpen(true);
  };

  const formatValue = (value) => value.toFixed(0);

  const filteredData = data?.departmentSales?.filter((item) => {
    return item?.department?.toLowerCase()?.includes(search?.toLowerCase());
  });

  return (
    <div className="container_box document_box">
      <div className="document_header">
        <h1>Barcha hisobotlar</h1>

        <form className="filter_date">
          <label data-icon={<LiaCalendarDaySolid />}>
            <input
              type="date"
              name="fdate"
              onChange={(e) => setDate({ ...date, fdate: e.target.value })}
            />
            <span>{date.fdate}</span>
          </label>
          <LuArrowLeftRight />
          <label data-icon={<LiaCalendarDaySolid />}>
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
        {isLoading ? (
          <span className="loader_box relative">
            <LoadingBtn />
          </span>
        ) : filteredData?.length ? (
          filteredData?.map((item, index) => {
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
          })
        ) : (
          <figure className="no_result">
            <img src={noResult} alt="foto" />
          </figure>
        )}
      </div>
      <DocumentByC open={open} setOpen={setOpen} />
    </div>
  );
};

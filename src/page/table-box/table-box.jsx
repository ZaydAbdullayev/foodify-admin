import React, { useState, useEffect } from "react";
import "./table-box.css";
import { Table } from "../../components/table/table";
// import { useGetLocationQuery } from "../../service/table.service";
import io from "socket.io-client";
import { useDispatch } from "react-redux";
import { acNavStatus } from "../../redux/navbar.status";

// const socket = io("https://backup.foodify.uz");
// const socket = io("http://localhost:80");
const socket = io("https://vsxmzbb6-80.euw.devtunnels.ms");

export const TableBox = () => {
  const user = JSON.parse(localStorage.getItem("user")) || null;
  //   const { data: category = [] } = useGetLocationQuery();
  const [active, setActive] = useState(category?.data?.[0]);
  const dispatch = useDispatch();
  dispatch(acNavStatus([101, 100]));
  //   const [tablesData, setTablesData] = useState([]);
  // isLoading: loading, isError: error, data: tables = []

  const filterData = (type) => {
    setActive(type);
    const data = {
      res_id: user?.user?.id,
      location: type,
    };
    // socket.emit("/get/tables", data);
    // socket.on(`/get/table/${data.res_id}/${data.location}`, (data) => {
    //   setTablesData(data);
    // });
  };

  useEffect(() => {
    filterData(category?.[0].id);
  }, []);

  return (
    <div className="box">
      <div className="home">
        <div className="universal_box home_filter">
          {category?.map((item) => {
            return (
              <span
                className={
                  active === item.id
                    ? "home_filter__item active"
                    : "home_filter__item"
                }
                key={item}
                onClick={() => filterData(item.id)}
              >
                {item.name}
              </span>
            );
          })}
        </div>

        <div className="home_table_box">
          <Table data={tables} />
        </div>
      </div>
    </div>
  );
};

const tables = [
  {
    id: 1,
    type: "tashqari",
    name: 1,
    status: "free",
  },
  {
    id: 2,
    type: "tashqari",
    name: 2,
    status: "busy",
  },
  {
    id: 3,
    type: "tashqari",
    name: 3,
    status: "served",
  },
  {
    id: 4,
    type: "tashqari",
    name: 4,
    status: "free",
  },
  {
    id: 7,
    type: "ichkari",
    name: 3,
    status: "served",
  },
  {
    id: 5,
    type: "ichkari",
    name: 1,
    status: "free",
  },
  {
    id: 6,
    type: "ichkari",
    name: 2,
    status: "busy",
  },
  {
    id: 8,
    type: "ichkari",
    name: 4,
    status: "free",
  },
  {
    id: 9,
    type: "padval",
    name: 1,
    status: "free",
  },
  {
    id: 11,
    type: "padval",
    name: 3,
    status: "served",
  },
  {
    id: 10,
    type: "padval",
    name: 2,
    status: "busy",
  },
  {
    id: 12,
    type: "padval",
    name: 4,
    status: "free",
  },
  {
    id: 13,
    type: "padval",
    name: 1,
    status: "free",
  },
  {
    id: 14,
    type: "padval",
    name: 2,
    status: "busy",
  },
  {
    id: 15,
    type: "padval",
    name: 3,
    status: "served",
  },
  {
    id: 16,
    type: "padval",
    name: 4,
    status: "free",
  },
];

const category = [
  {
    id: 1,
    name: "tashqari",
  },
  {
    id: 2,
    name: "ichkari",
  },
  {
    id: 3,
    name: "2-qavat",
  },
  {
    id: 4,
    name: "padval",
  },
];

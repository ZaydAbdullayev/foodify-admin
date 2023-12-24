import React, { useState, useEffect } from "react";
import "./table-box.css";
import { Table } from "../../components/table/table";
import { useGetLocationQuery } from "../../service/table.service";
import io from "socket.io-client";
import { useDispatch } from "react-redux";
import { acNavStatus } from "../../redux/navbar.status";
import { UniversalModal } from "../../components/modal/modal";
import { PatternFormat } from "react-number-format";

// const socket = io("https://backup.foodify.uz");
// const socket = io("http://localhost:80");
const socket = io("https://vsxmzbb6-80.euw.devtunnels.ms");

export const TableBox = () => {
  const user = JSON.parse(localStorage.getItem("user"))?.user || null;
  const { data: category = [] } = useGetLocationQuery();
  const [active, setActive] = useState(category?.data?.[0]);
  const [newType, setNewType] = useState("");
  const [type, setType] = useState("stoll");
  const dispatch = useDispatch();
  dispatch(acNavStatus([0, 101, 100]));
  console.log(category);
  const [tablesData, setTablesData] = useState([]);
  // isLoading: loading, isError: error, data: tables = []

  const filterData = (type) => {
    setActive(type);
    const data = {
      res_id: user?.id,
      location: type,
    };
    socket.emit("/get/tables", data);
    socket.on(`/get/table/${data.res_id}/${data.location}`, (data) => {
      setTablesData(data);
    });
  };

  useEffect(() => {
    filterData(category?.data?.[0]);
  }, [category?.data]);

  return (
    <div className="box">
      <div className="home">
        <div className="universal_box home_filter">
          {category?.data?.map((item) => {
            return (
              <span
                className={
                  active === item
                    ? "home_filter__item active"
                    : "home_filter__item"
                }
                key={item}
                onClick={() => filterData(item)}
              >
                {item}
              </span>
            );
          })}
        </div>

        <div className="home_table_box">
          <Table data={tablesData} />
        </div>
      </div>
      <UniversalModal type="table">
        <select name="location" onChange={(e) => setNewType(e.target.value)}>
          <option value="">Joylashuv tanlang</option>
          {category?.data?.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
          <option value="new">Yangi joylashuv oshish</option>
        </select>
        {newType === "new" && (
          <input
            type="text"
            name="location"
            required
            autoComplete="off"
            placeholder="Joylashuv nomi qo'shing *"
          />
        )}
        <input
          type="text"
          name="name"
          required
          autoComplete="off"
          placeholder={`Xona/Stoll raqamini kiriting *`}
        />
        <select name="people" onChange={(e) => setType(e.target.value)}>
          <option value="4">Xona/Stoll sig'imi</option>
          <option value="4">4 kishilik</option>
          <option value="6">6ta kishilik</option>
          <option value="8">8ta kishilik</option>
          <option value="10">10ta kishilik</option>
          <option value="manual">Qo'lda kiritish</option>
        </select>
        {type === "manual" && (
          <input
            type="number"
            name="people"
            required
            autoComplete="off"
            placeholder="Xona/Stoll sig'imi *"
          />
        )}
        <PatternFormat
          name="percentage"
          placeholder="Stoll uchun foizni kiritish"
          format="##%"
          mask="_"
          autoComplete="off"
        />
        <input
          type="number"
          name="minutelyCost"
          autoComplete="off"
          placeholder="Minutlik narx"
        />
        <input type="hidden" name="res_id" value={user?.id} />
      </UniversalModal>
    </div>
  );
};

// const tables = [
//   {
//     id: 1,
//     type: "tashqari",
//     name: 1,
//     people: 4,
//     status: 0,
//   },
//   {
//     id: 2,
//     type: "tashqari",
//     name: 2,
//     people: 6,
//     status: 1,
//   },
//   {
//     id: 3,
//     type: "tashqari",
//     name: 3,
//     people: 4,
//     status: 2,
//   },
//   {
//     id: 4,
//     type: "tashqari",
//     name: 4,
//     people: 8,
//     status: 0,
//   },
//   {
//     id: 7,
//     type: "ichkari",
//     name: 3,
//     people: 6,
//     status: 2,
//   },
//   {
//     id: 5,
//     type: "ichkari",
//     name: 1,
//     people: 4,
//     status: 0,
//   },
//   {
//     id: 6,
//     type: "ichkari",
//     name: 2,
//     people: 8,
//     status: 1,
//   },
//   {
//     id: 8,
//     type: "ichkari",
//     name: 4,
//     people: 4,
//     status: 0,
//   },
//   {
//     id: 9,
//     type: "padval",
//     name: 1,
//     people: 6,
//     status: 0,
//   },
//   {
//     id: 11,
//     type: "padval",
//     name: 3,
//     people: 4,
//     status: 2,
//   },
//   {
//     id: 10,
//     type: "padval",
//     name: 2,
//     people: 8,
//     status: 1,
//   },
//   {
//     id: 12,
//     type: "padval",
//     name: 4,
//     people: 4,
//     status: 0,
//   },
//   {
//     id: 13,
//     type: "padval",
//     name: 1,
//     people: 6,
//     status: 0,
//   },
//   {
//     id: 14,
//     type: "padval",
//     name: 2,
//     people: 4,
//     status: 1,
//   },
//   {
//     id: 15,
//     type: "padval",
//     name: 3,
//     people: 6,
//     status: 2,
//   },
//   {
//     id: 16,
//     type: "padval",
//     name: 4,
//     people: 6,
//     status: 0,
//   },
// ];

// const category = [
//   {
//     id: 1,
//     name: "tashqari",
//   },
//   {
//     id: 2,
//     name: "ichkari",
//   },
//   {
//     id: 3,
//     name: "2-qavat",
//   },
//   {
//     id: 4,
//     name: "padval",
//   },
// ];

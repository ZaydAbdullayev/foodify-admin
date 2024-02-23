import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { DatePicker, Select, Input } from "antd";
import dayjs from "dayjs";

import { acGetNewData } from "../../redux/search";
import { useFetchDataQuery } from "../../service/fetch.service";
import { calculateMonthRange } from "../../service/calc-date.service";
import { getFormattedDate } from "../../service/calc-date.service";
import { calculateWeekRange } from "../../service/calc-date.service";

import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
const { RangePicker } = DatePicker;

export const UniversalFilter = (data, key, value) => {
  return data.filter((item) => {
    if (Array.isArray(item[key])) {
      return item[key].includes(value);
    }
    if (typeof item[key] === "string") {
      return item[key].toLowerCase().includes(value.toLowerCase());
    }
    return item[key] === value;
  });
};

export const UniversalFilterBox = () => {
  const [search, setSearch] = React.useState({});
  const dispatch = useDispatch();
  const { date } = useSelector((state) => state.uSearch);
  const status = useSelector((state) => state.status);
  const res_id = useSelector((state) => state.res_id);
  const { data = [] } = useFetchDataQuery({
    url: `get/cashbox/${res_id}`,
    tags: ["cashbox"],
  });
  const navigate = useNavigate();

  const today = getFormattedDate(0);
  const yesterday = getFormattedDate(1);
  const beforeyesterday = getFormattedDate(2);
  const thisWeek = calculateWeekRange(0);
  const lastWeek = calculateWeekRange(-7);
  const thisMonth = calculateMonthRange(0);
  const lastMonth = calculateMonthRange(-1);
  const thisYear = getFormattedDate(365);

  const uploadData = (e, fieldName) => {
    const newValue = e;
    navigate(`?${fieldName}=${newValue}`);
    if (fieldName === "date")
      return dispatch(acGetNewData(fieldName, JSON.parse(newValue)));
    const time = {
      start: date?.start,
      end: date?.end,
    };
    if (fieldName === "start" || fieldName === "end") {
      time[fieldName] = newValue;
      dispatch(acGetNewData("date", time));
    } else {
      dispatch(acGetNewData(fieldName, newValue));
    }
  };

  return (
    <div className="short-hands_sort__box">
      {status?.includes(5) && (
        <label aria-label="to filter the data according by name">
          <input
            type="search"
            name="name"
            placeholder="Nomi bo'yicha qidirish..."
            onChange={(e) => setSearch({ ...search, name: e.target.value })}
          />
        </label>
      )}
      {status?.includes(4) && (
        <label aria-label="to filter the data according by group">
          <input
            type="search"
            name="groups"
            placeholder="Guruh bo'yicha qidirish..."
            onChange={(e) => setSearch({ ...search, groups: e.target.value })}
          />
        </label>
      )}

      {status?.includes(6) && (
        <Select
          defaultValue={{
            value: JSON.stringify({ start: today, end: today }),
            label: "Bugun",
          }}
          aria-label="select data from to end"
          onChange={(e) => uploadData(e, "date")}
          options={[
            {
              value: JSON.stringify({ start: today, end: today }),
              label: "Bugun",
            },
            {
              value: JSON.stringify({ start: yesterday, end: today }),
              label: "Kecha",
            },
            {
              value: JSON.stringify({
                start: beforeyesterday,
                end: beforeyesterday,
              }),
              label: "Avvalgi kun",
            },
            { value: JSON.stringify(thisWeek), label: "Bu hafta" },
            { value: JSON.stringify(lastWeek), label: "O'tgan hafta" },
            { value: JSON.stringify(thisMonth), label: "Bu oy" },
            { value: JSON.stringify(lastMonth), label: "O'tgan oy" },
            {
              value: JSON.stringify({ start: thisYear, end: today }),
              label: "Bu yil",
            },
          ]}
        />
      )}

      {status?.includes(7) && (
        <label>
          <RangePicker
            defaultValue={[dayjs(today), dayjs(today)]}
            aria-label="select data from to end"
          />
        </label>
      )}
      {status?.includes(8) && (
        <Select
          defaultValue={{ value: "all", label: "Kassa bo'yicha" }}
          aria-label="select cashbox"
          onChange={(e) => uploadData(e, "cashier")}
          options={
            data?.data?.map((item) => ({
              value: item.id,
              label: item.name,
            })) || []
          }
        />
      )}
      {status?.includes(9) && (
        <Select
          defaultValue={{ value: "all", label: "Ombor bo'yicha" }}
          aria-label="select storage"
          onChange={(e) => uploadData(e, "storage")}
          options={
            data?.data?.map((item) => ({
              value: item.id,
              label: item.name,
            })) || []
          }
        />
      )}
      {status?.includes(10) && (
        <label aria-label="to filter the data according by waiter">
          <input
            type="search"
            name="waiter"
            placeholder="Offitsant bo'yicha qidirish..."
            onChange={(e) => setSearch({ ...search, waiter: e.target.value })}
          />
        </label>
      )}
      {status?.includes(11) && (
        <label aria-label="to filter the data according by table/room's location">
          <input
            type="search"
            name="location"
            placeholder="Joylashuv bo'yicha qidirish..."
            onChange={(e) => setSearch({ ...search, location: e.target.value })}
          />
        </label>
      )}
      {status?.includes(12) && (
        <label aria-label="to filter the data according by table or room">
          <input
            type="search"
            name="table"
            placeholder="Stoll/Xona bo'yicha qidirish..."
            onChange={(e) => setSearch({ ...search, table: e.target.value })}
          />
        </label>
      )}
      {status?.includes(15) && (
        <button
          style={
            search.length ? {} : { opacity: "0.4", border: "1px solid #ccc6" }
          }
          aria-label="to click for search"
        >
          <BsSearch />
        </button>
      )}
    </div>
  );
};

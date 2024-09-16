import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { DatePicker, Select, Input } from "antd";
import dayjs from "dayjs";

import { acGetNewData } from "../../redux/search";
import { useFetchDataQuery } from "../../service/fetch.service";
import { calculateMonthRange } from "../../service/calc-date.service";
import { getFormattedDate } from "../../service/calc-date.service";
import { calculateWeekRange } from "../../service/calc-date.service";
import { CgArrowsExchange } from "react-icons/cg";
import { useSearchAppParams } from "../../hooks/useSearchParam";

import { BsSearch } from "react-icons/bs";
const { RangePicker } = DatePicker;

export const universalFilter = (data, key, value) => {
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


export const UniversalFilterBox = ({ status = null }) => {
  const [search, setSearch] = React.useState({});
  const dispatch = useDispatch();
  const { setParams } = useSearchAppParams()
  const { date } = useSelector((state) => state.uSearch);
  let fields = useSelector((state) => state.status);
  const { data = [] } = useFetchDataQuery({
    url: `get/cashbox`,
    tags: ["cashbox"],
  });
  const { data: storage = [], isLoading: sl } = useFetchDataQuery({ url: `get/storage`, tags: ["store"], });
  const { data: ingredientData = [] } = useFetchDataQuery({ url: `get/ingredients`, tags: ["ingredient"], });
  fields = status ? status : fields;

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
    if (fieldName === "date") {
      const rewordValue = JSON.parse(newValue);
      setParams({ start: rewordValue.start, end: rewordValue.end });
    } else {
      setParams({ [fieldName]: newValue });
    }
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

  useEffect(() => {
    if (!sl && fields?.includes(9)) {
      setParams({ storage: storage?.data?.[0]?.id || "all" });
    }
  }, [setParams, sl, storage?.data, fields]);

  return (
    <div className="short-hands_sort__box">
      {fields?.includes(5) && (
        <label aria-label="to filter the data according by name">
          <Input
            name="name"
            placeholder="Nomi bo'yicha qidirish..."
            aria-label="place for write info"
            onChange={(e) => setSearch({ ...search, name: e })}
          />
        </label>
      )}
      {fields?.includes(4) && (
        <label aria-label="to filter the data according by group">
          <Input
            name="group"
            placeholder="Guruh bo'yicha qidirish..."
            onChange={(e) => setSearch({ ...search, group: e })}
          />
        </label>
      )}
      {fields?.includes(6) && (
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
      {fields?.includes(8) && (
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
      {fields?.includes(9) && (
        <Select
          defaultValue={{ value: "all", label: "Ombor bo'yicha" }}
          aria-label="select storage"
          onChange={(e) => uploadData(e, "storage")}
          options={
            storage?.data?.map((item) => ({
              value: item.id,
              label: item.name,
            })) || []
          }
        />
      )}
      {fields?.includes(10) && (
        <label aria-label="to filter the data according by waiter">
          <Input
            name="waiter"
            placeholder="Offitsant bo'yicha qidirish..."
            onChange={(e) => setSearch({ ...search, waiter: e })}
          />
        </label>
      )}
      {fields?.includes(11) && (
        <label aria-label="to filter the data according by table/room's location">
          <Input
            name="location"
            placeholder="Joylashuv bo'yicha qidirish..."
            onChange={(e) => setSearch({ ...search, location: e })}
          />
        </label>
      )}
      {fields?.includes(12) && (
        <label aria-label="to filter the data according by table or room">
          <Input
            name="table"
            placeholder="Stoll/Xona bo'yicha qidirish..."
            onChange={(e) => setSearch({ ...search, table: e })}
          />
        </label>
      )}
      {fields?.includes(7) && (
        <label>
          {window.innerWidth > 768 ? (
            <RangePicker
              defaultValue={[dayjs(date.start), dayjs(date.end)]}
              aria-label="select data from to end"
              onChange={(date, dateString) =>
                uploadData(
                  JSON.stringify({
                    start: dateString?.[0],
                    end: dateString?.[1],
                  }),
                  "date"
                )
              }
            />
          ) : (
            <>
              <DatePicker
                defaultValue={dayjs(date.start)}
                aria-label="select data from"
                onChange={(date, dateString) => uploadData(dateString, "start")}
              />{" "}
              <CgArrowsExchange style={{ color: "#eee" }} />{" "}
              <DatePicker
                defaultValue={dayjs(date.end)}
                aria-label="select data to"
                onChange={(date, dateString) => uploadData(dateString, "end")}
              />
            </>
          )}
        </label>
      )}
      {fields?.includes(13) && (
        <Select
          showSearch
          style={{
            width: 200,
          }}
          placeholder="Mahsulot tanlang*"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").includes(input?.toLowerCase())
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          options={
            ingredientData?.data?.map((item) => ({
              value: item?.item_id,
              label: item?.item_name,
            })) || []
          }
        />
      )}
      {fields?.includes(15) && (
        <button
          style={
            search.length ? {} : { opacity: "0.4", border: "1px solid #ccc6" }
          }
          aria-label="to click for search">
          <BsSearch />
        </button>
      )}
    </div>
  );
};

const filter_codes_by_page = {
  1: [5, 6, 7, 8, 9, 10, 11, 12, 15],
  2: [5, 6, 7, 8, 9, 10, 11, 12, 15],
  3: [5, 6, 7, 8, 9, 10, 11, 12, 15],
  4: [4, 6, 7, 8, 9, 15],
  5: [4, 6, 7, 8, 9, 15],
  6: [4, 6, 7, 8, 9, 15],
  7: [4, 6, 7, 8, 9, 15],
  8: [4, 6, 7, 8, 9, 15],
  9: [4, 6, 7, 8, 9, 15],
  10: [4, 6, 7, 8, 9, 15],
  11: [4, 6, 7, 8, 9, 15],
  12: [4, 6, 7, 8, 9, 15],
  13: [4, 6, 7, 8, 9, 15],
  14: [4, 6, 7, 8, 9, 15],
  15: [4, 6, 7, 8, 9, 15],
  16: [4, 6, 7, 8, 9, 15],
  17: [4, 6, 7, 8, 9, 15],
  18: [4, 6, 7, 8, 9, 15],
  19: [4, 6, 7, 8, 9, 15],
  20: [4, 6, 7, 8, 9, 15],
  21: [4, 6, 7, 8, 9, 15],
  22: [4, 6, 7, 8, 9, 15],
}

import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { acOpenUModal, acOpenUModalU } from "../../redux/u-modal";
import { acGetNewData } from "../../redux/search";
import { useGetCashboxQuery } from "../../service/cashbox.service";
import { calculateMonthRange } from "../../service/calc-date.service";
import { getFormattedDate } from "../../service/calc-date.service";
import { calculateWeekRange } from "../../service/calc-date.service";

import { BsSearch } from "react-icons/bs";
import { BiEdit, BiPlus } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { MdTableBar } from "react-icons/md";

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

export const  UniversalFilterBox = () => {
  const [search, setSearch] = React.useState({});
  const dispatch = useDispatch();
  const acItem = useSelector((state) => state.active);
  const acP = useSelector((state) => state.activeThing);
  const { date } = useSelector((state) => state.uSearch);
  const status = useSelector((state) => state.status);
  const { data = [] } = useGetCashboxQuery();

  const today = getFormattedDate(0);
  const yesterday = getFormattedDate(1);
  const beforeyesterday = getFormattedDate(2);
  const thisWeek = calculateWeekRange(0);
  const lastWeek = calculateWeekRange(-7);
  const thisMonth = calculateMonthRange(0);
  const lastMonth = calculateMonthRange(-1);
  const thisYear = getFormattedDate(365);

  const openUModal = () => {
    dispatch(acOpenUModal());
  };

  const openUModalU = () => {
    if (acP.id) {
      dispatch(acOpenUModal());
    } else {
      dispatch(acOpenUModalU());
    }
  };

  const uploadData = (e, fieldName) => {
    const newValue = e.target.value;
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
    <>
      {status?.includes(0) && (
        <div className="short_hands">
          {status?.includes(1) && (
            <button onClick={openUModal}>
              <BiPlus />
            </button>
          )}
          {status.includes(101) && (
            <button onClick={openUModal}>
              <b>+</b>
              <MdTableBar />{" "}
            </button>
          )}
          {status?.includes(2) && (
            <button
              style={
                acItem.id || acP?.id
                  ? {}
                  : { opacity: "0.4", border: "1px solid #ccc6" }
              }
              onClick={openUModalU}
            >
              <BiEdit />
            </button>
          )}
          {status?.includes(3) && (
            <button
              style={
                acItem.id || acP?.id
                  ? {}
                  : { opacity: "0.4", border: "1px solid #ccc6" }
              }
            >
              <MdDelete />
            </button>
          )}
          <div className="short-hands_sort__box">
            {status?.includes(5) && (
              <label>
                <input
                  type="search"
                  name="name"
                  placeholder="Nomi bo'yicha qidirish..."
                  onChange={(e) =>
                    setSearch({ ...search, name: e.target.value })
                  }
                />
              </label>
            )}
            {status?.includes(4) && (
              <label>
                <input
                  type="search"
                  name="groups"
                  placeholder="Guruh bo'yicha qidirish..."
                  onChange={(e) =>
                    setSearch({ ...search, groups: e.target.value })
                  }
                />
              </label>
            )}
            {status?.includes(6) && (
              <select onChange={(e) => uploadData(e, "date")}>
                <option value={JSON.stringify({ start: today, end: today })}>
                  Bugun
                </option>
                <option
                  value={JSON.stringify({ start: yesterday, end: today })}
                >
                  Kecha
                </option>
                <option
                  value={JSON.stringify({
                    start: beforeyesterday,
                    end: beforeyesterday,
                  })}
                >
                  Avvalgi kun
                </option>
                <option value={JSON.stringify(thisWeek)}>Bu hafta</option>
                <option value={JSON.stringify(lastWeek)}>O'tgan hafta</option>
                <option value={JSON.stringify(thisMonth)}>Bu oy</option>
                <option value={JSON.stringify(lastMonth)}>O'tgan oy</option>
                <option value={JSON.stringify({ start: thisYear, end: today })}>
                  Bu yil
                </option>
              </select>
            )}
            {status?.includes(7) && (
              <>
                <label>
                  <input
                    type="date"
                    name="start"
                    value={date?.start}
                    onChange={(e) => uploadData(e, "start")}
                  />
                </label>
                <label>
                  <input
                    type="date"
                    name="end"
                    value={date?.end}
                    onChange={(e) => uploadData(e, "end")}
                  />
                </label>
              </>
            )}
            {status?.includes(8) && (
              <select onChange={(e) => uploadData(e, "cashier")}>
                <option value="all">Kassa bo'yicha</option>
                {data?.data?.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            )}
            {status?.includes(9) && (
              <select onChange={(e) => uploadData(e, "storage")}>
                <option value="all">Ombor bo'yicha</option>
                {data?.data?.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            )}
            {status?.includes(15) && (
              <button
                style={
                  search.length
                    ? {}
                    : { opacity: "0.4", border: "1px solid #ccc6" }
                }
              >
                <BsSearch />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

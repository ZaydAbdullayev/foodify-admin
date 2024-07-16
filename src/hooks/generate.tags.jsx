import React, { useEffect } from "react";
import { useState } from "react";
import { DatePicker, Input, InputNumber, Select, Checkbox, Table } from "antd";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { acActiveSt_id, acFormValues, acActive } from "../redux/active";
import "./hook.css";
import { acCutting } from "../redux/calc";

function genrateId() {
  const roomNumber = Math.floor(100000 + Math.random() * 900000);
  return roomNumber;
}

export const GenerateField = ({ fieldData }) => {
  const dispatch = useDispatch();
  const values = useSelector((state) => state.values);
  const [datas, setDatas] = useState({ name: "", id: "" });
  const {
    type = "text",
    options = [],
    plc_hr = "",
    df_value = "",
    name = "",
    extra = "",
    take_id = false,
    getAmount = false,
    u_option = [],
    getFullInfo = false,
  } = fieldData;

  // useEffect(() => {
  //   if (df_value && df_value !== "" && values?.vl[name] !== df_value) {
  //     dispatch(acFormValues("A_V", { ...values?.vl, [name]: df_value }));
  //   }
  // }, [dispatch, values?.vl, name, df_value]);

  const getExtraValue = (extraV) => {
    const value = extraV?.split("=")?.[1]?.split("|");
    if (!getFullInfo) {
      setDatas({ name: value[0], id: value[1] });
      dispatch(
        acFormValues("A_V", {
          ...values?.vl,
          [name]: value[0],
          [extra]: value[1],
        })
      );
    } else {
      const i = options.find((item) => item.item_id === value[1]);
      dispatch(acActive(i ? i : {}));
    }
    if (take_id) {
      dispatch(acActiveSt_id(value[1]));
    }
  };

  const getSelectValue = (value) => {
    setDatas((prevDatas) => ({ ...prevDatas, select: value }));
    dispatch(acFormValues("A_V", { ...values?.vl, [name]: value }));
  };

  const onlyNumber = (value) => {
    const newValue = value.replace(/[^0-9]/g, "");
    return newValue;
  };

  const getValues = (e) => {
    dispatch(acFormValues("A_V", { ...values?.vl, [name]: e.target.value }));
  };

  switch (type) {
    case "select":
      return (
        <>
          <Select
            aria-label="place for choose option"
            defaultValue={df_value}
            onChange={getSelectValue}
            options={options.map((item) => ({
              label: item?.name,
              value: item?.name,
            }))}
          />
          <input
            name={name}
            type="hidden"
            value={u_option?.[0] || datas?.select}
          />
        </>
      );

    case "input":
      return (
        <>
          <Input
            name={name}
            placeholder={plc_hr}
            defaultValue={df_value}
            onChange={getValues}
            aria-label="place for write info"
          />
        </>
      );

    case "inputD":
      return (
        <>
          <DatePicker
            name={name}
            defaultValue={dayjs(df_value)}
            onChange={(date, dateString) => {
              dispatch(
                acFormValues("A_V", { ...values?.vl, [name]: dateString })
              );
            }}
            aria-label="place for select date"
          />
        </>
      );

    case "checkbox":
      return (
        <>
          <Checkbox
            name={name}
            defaultChecked={df_value}
            onChange={getValues}
            aria-label="place for check this element"
          />
        </>
      );

    case "inputN":
      return (
        <InputNumber
          name={name}
          formatter={(value) => `${onlyNumber(value)}`}
          parser={(value) => onlyNumber(value)}
          placeholder={plc_hr}
          defaultValue={df_value}
          onChange={(e) => {
            dispatch(acFormValues("A_V", { ...values?.vl, [name]: e }));
            if (getAmount) {
              dispatch(acCutting(e));
            }
          }}
          min={1}
          max={9999999999}
          aria-label="place for write number value"
        />
      );

    case "s_extra":
      return (
        <>
          <Select
            aria-label="place for choose option"
            defaultValue={df_value}
            onChange={getExtraValue}
            options={
              Array.isArray(options)
                ? options.map((item) => ({
                    label: item?.name || item?.item_name || item?.food_name,
                    value: `${extra}=${
                      item?.name || item?.item_name || item?.food_name
                    }|${item?.id || item?.item_id || item?.food_id}`,
                  }))
                : []
            }
          />
          <input
            type="hidden"
            name={name}
            value={u_option?.[0] || datas?.name}
            aria-label={`place for secret value ${datas?.name}`}
          />
          <input
            type="hidden"
            name={extra}
            value={u_option?.[1] || datas?.id}
            aria-label={`place for secret value ${datas?.id}`}
          />
        </>
      );

    case "s_search":
      return (
        <>
          <Select
            showSearch
            placeholder={plc_hr}
            defaultValue={df_value}
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={
              options?.map((item) => ({
                value: `${extra}=${item?.item_name}|${item?.item_id}`,
                label: item?.item_name,
              })) || []
            }
            aria-label="place for search option"
            onChange={getExtraValue}
          />
          <input
            type="hidden"
            name={name}
            value={u_option?.[0] || datas?.name}
            aria-label={`place for secret value ${datas?.name}`}
          />
          <input
            type="hidden"
            name={extra}
            value={u_option?.[1] || datas?.id}
            aria-label={`place for secret value ${datas?.id}`}
          />
        </>
      );

    default:
      return null;
  }
};

export const DynamicTable = ({ data, index }) => {
  const key = genrateId();
  const columns = Object.keys(data[0]).map((key) => ({
    title: key,
    dataIndex: key,
    key: key,
  }));
  return <Table dataSource={data} columns={columns} key={key + index} />;
};

export const CheckBox = ({ name, label, description = "", value }) => {
  return (
    <label className="universal-checkbox">
      <input type="radio" name={name} required value={value} />
      <span className="checkmark">
        <span>{label}</span>
        <span style={{ color: "#eee6" }}>{description}</span>
      </span>
    </label>
  );
};

export const GetRealTime = () => {
  const [time, setTime] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(dayjs().format("HH:mm:ss"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span>{time}</span>;
};

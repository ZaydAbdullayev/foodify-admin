import React from "react";
import { useState } from "react";
import { DatePicker, Input, InputNumber, Select, Checkbox, Table } from "antd";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { acActiveSt_id } from "../redux/active";
import "./hook.css";

function genrateId() {
  const roomNumber = Math.floor(100000 + Math.random() * 900000);
  return roomNumber;
}

export const GenerateField = (fieldData, index) => {
  const dispatch = useDispatch();
  const [datas, setDatas] = useState({ name: "", id: "" });
  const {
    type = "text",
    options = [],
    plc_hr = "",
    df_value = "",
    name = "",
    extra = "",
    take_id = false,
  } = fieldData;

  const getExtraValue = (extra) => {
    const values = extra?.split("=")?.[1]?.split("|");
    setDatas({ ...datas, name: values[0], id: values[1] });
    if (take_id) {
      dispatch(acActiveSt_id(values[1]));
    }
  };

  const getSelectValue = (value) => {
    setDatas({ ...datas, select: value });
  };

  switch (type) {
    case "select":
      return (
        <>
          <Select
            key={genrateId()}
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
            key={genrateId()}
            type="hidden"
            value={datas?.select}
          />
        </>
      );

    case "input":
      return (
        <>
          <Input
            key={genrateId()}
            name={name}
            placeholder={plc_hr}
            defaultValue={df_value}
            aria-label="place for write info"
          />
        </>
      );

    case "inputD":
      return (
        <>
          <DatePicker
            key={genrateId()}
            name={name}
            defaultValue={dayjs(df_value)}
            aria-label="place for select date"
          />
        </>
      );

    case "checkbox":
      return (
        <>
          <Checkbox
            key={genrateId()}
            name={name}
            defaultChecked={df_value}
            aria-label="place for check this element"
          />
        </>
      );

    case "inputN":
      return (
        <InputNumber
          key={genrateId()}
          name={name}
          placeholder={plc_hr}
          defaultValue={df_value}
          min={1}
          max={99999}
          aria-label="place for write number value"
        />
      );

    case "inputH":
      return (
        <input
          type="hidden"
          key={genrateId()}
          name={name}
          defaultValue={df_value}
          aria-label="place for secret value"
        />
      );

    case "s_extra":
      return (
        <>
          <Select
            key={genrateId()}
            aria-label="place for choose option"
            defaultValue={df_value}
            onChange={getExtraValue}
            options={options?.map((item) => ({
              label: item?.name,
              value: `${extra}=${item?.name}|${item?.id}`,
            }))}
          />
          <input
            key={genrateId()}
            type="hidden"
            name={name}
            value={datas?.name}
            aria-label={`place for secret value ${datas?.name}`}
          />
          <input
            type="hidden"
            name={extra}
            key={genrateId()}
            value={datas?.id}
            aria-label={`place for secret value ${datas?.id}`}
          />
        </>
      );

    default:
      return null;
  }
};

export const DynamicTable = ({ data, index }) => {
  const columns = Object.keys(data[0]).map((key) => ({
    title: key,
    dataIndex: key,
    key: key,
  }));
  return <Table dataSource={data} columns={columns} key={genrateId()} />;
};

export const CheckBox = ({ name, label, description = "", value }) => {
  return (
    <label className="universal-checkbox" key={genrateId()}>
      <input type="radio" name={name} required value={value} />
      <span className="checkmark">
        <span>{label}</span>
        <span style={{ color: "#eee6" }}>{description}</span>
      </span>
    </label>
  );
};

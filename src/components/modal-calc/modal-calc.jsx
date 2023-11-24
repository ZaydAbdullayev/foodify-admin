import React, { useState } from "react";
import "./modal-calc.css";
import { enqueueSnackbar as es } from "notistack";
import { data } from "./components";
// import { LoadingBtn } from "../../components/loading/loading";

import { FaCalculator, FaCheck } from "react-icons/fa";
import { TbArrowBarLeft } from "react-icons/tb";

export const UniversalControlModal = ({ children, type }) => {
  const fetchValues = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const value = Object.fromEntries(formdata.entries());
    console.log(value);

    try {
      let result;

      switch (type) {
        default:
          break;
      }

      if (result?.error) {
        es({ message: "Xatolik", variant: "error" });
      } else if (result?.data) {
        e.target.reset();
        es({ message: "Taxrirlash muvoffaqiyatli!", variant: "success" });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className="u-control-container" onSubmit={fetchValues}>
      <UniversalForm />
      <UniversalProductControl />
      <CalcResult />
      <div className="u-control_action__box">
        <button type="submit">
          <span>
            <FaCheck />
          </span>
          <i>qo'shish</i>
        </button>
        <button type="button">
          <span>
            <FaCalculator />
          </span>
          <i>hisoblash</i>
        </button>
        <button type="button">
          <span>
            <TbArrowBarLeft />
          </span>
          <i>bekor qilish</i>
        </button>
      </div>
    </form>
  );
};

export const UniversalForm = ({ children }) => {
  return (
    <div className="wdfaic u-control_form_box">
      <input type="text" placeholder="test" name="salom" />
      <input type="text" placeholder="test" name="kalom" />
      <input type="text" placeholder="test" name="salim" />
      <input type="date" name="date" />
      {children}
    </div>
  );
};

export const UniversalProductControl = ({ children }) => {
  const [checkedData, setCheckedData] = useState([]);
  const [activePart, setActivePart] = useState(1);

  const getProduct = (item) => {
    const isChecked = checkedData.some((i) => i.id === item.id);
    setCheckedData((prevData) =>
      isChecked ? prevData.filter((i) => i.id !== item.id) : [...prevData, item]
    );
  };

  return (
    <div className="u-control_add_box">
      <div className="section_u">
        <div className="add_box__header">
          <div className="wdfaic _header_parts">
            <span
              className={activePart === 1 ? "active" : "passive"}
              onClick={() => setActivePart(1)}
            >
              ingredientlar
            </span>
            <span
              className={activePart === 2 ? "active" : "passive"}
              onClick={() => setActivePart(2)}
            >
              importlar
            </span>
          </div>
          <input type="search" placeholder="Qidirish..." />
          {activePart === 1 && (
            <>
              <select>
                <option value="default">Guruh tanlang</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
              <select>
                <option value="default">Ombor tanlang</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </>
          )}
        </div>
        <div className="u-control_product_box">
          <div className="product_box_item">
            <label>
              <input
                type="checkbox"
                name="id"
                onClick={() => getProduct(data)}
              />
            </label>
            <p style={{ "--data-line-size": "35%" }}>Nomi</p>
            <p style={{ "--data-line-size": "20%" }}>O'lchov birligi</p>
            <p style={{ "--data-line-size": "20%" }}>Guruh</p>
            <p style={{ "--data-line-size": "20%" }}>Narxi</p>
            <p style={{ "--data-line-size": "20%" }}>Miqdori</p>
          </div>
          <div className="product_box_body">
            {data.map((item) => {
              const checked = checkedData.some((i) => i.id === item.id);
              return (
                <div
                  className={`product_box_item ${checked ? "active" : ""}`}
                  key={item.id}
                >
                  <label>
                    <input
                      type="checkbox"
                      checked={checked}
                      onClick={() => getProduct(item)}
                    />
                  </label>
                  <p style={{ "--data-line-size": "35%" }}>{item.name}</p>
                  <p
                    style={{
                      "--data-line-size": "20%",
                      justifyContent: "center",
                    }}
                  >
                    {item.unit}
                  </p>
                  <p
                    style={{
                      "--data-line-size": "20%",
                      justifyContent: "center",
                    }}
                  >
                    {item.group}
                  </p>
                  <p
                    style={{
                      "--data-line-size": "20%",
                      justifyContent: "flex-end",
                    }}
                  >
                    {item.price * item.id - 300}
                  </p>
                  <p
                    style={{
                      "--data-line-size": "20%",
                      justifyContent: "center",
                    }}
                  >
                    {checked && (
                      <input type="text" name={`${item.name}-quantity`} />
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export const CalcResult = ({ data, status }) => {
  return (
    <div className="u-control_calc_box">
      <p>Bir taom narxining hisob kitobi</p>
      <div className="u-control_calc_body">
        <CalcResultHeader />
        <CalcResultBody data={data} status={status} />
      </div>
    </div>
  );
};

export const CalcResultHeader = ({ children }) => {
  return (
    <div className="product_box_item">
      <p>№</p>
      <p style={{ "--data-line-size": "30%" }}>Nomi</p>
      <p style={{ "--data-line-size": "20%" }}>Miqdori</p>
      <p style={{ "--data-line-size": "20%" }}>Tan narxi</p>
      <p style={{ "--data-line-size": "20%" }}>Narxi</p>
      {children}
    </div>
  );
};

export const CalcResultBody = ({ children, data }) => {
  return (
    <div className="product_box_body">
      {data?.map((item, index) => {
        return (
          <div className="product_box_item" key={item.id}>
            <label>{index + 1}</label>
            <p style={{ "--data-line-size": "30%" }}>{item.name}</p>
            <p
              style={{
                "--data-line-size": "20%",
                justifyContent: "center",
              }}
            >
              {item.unit}
            </p>
            <p
              style={{
                "--data-line-size": "20%",
                justifyContent: "center",
              }}
            >
              {item.quantity || 32}
            </p>
            <p
              style={{
                "--data-line-size": "20%",
                justifyContent: "center",
              }}
            >
              {item.quantity || 32}
            </p>
            {children}
          </div>
        );
      })}
    </div>
  );
};

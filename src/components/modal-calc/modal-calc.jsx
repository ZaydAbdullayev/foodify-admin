import React, { useState } from "react";
import "./modal-calc.css";
import { enqueueSnackbar as es } from "notistack";
import { useSelector, useDispatch } from "react-redux";
import { acCloseUModal } from "../../redux/u-modal";
import { calculateTotal } from "./components";
import { acCalc } from "../../redux/calc";
import { LoadingBtn } from "../../components/loading/loading";
import { useAddStProductMutation } from "../../service/s-products.service";

import { FaCalculator, FaCheck } from "react-icons/fa";
import { TbArrowBarLeft } from "react-icons/tb";
const user = JSON.parse(localStorage.getItem("user"))?.user || null;

export const UniversalControlModal = ({ children, type, Pdata, name }) => {
  const open = useSelector((state) => state.uModal);
  const [fetchdata, setFetchdata] = useState({});
  const [loading, setLoading] = useState(false);
  const [addStProduct] = useAddStProductMutation();
  const dispatch = useDispatch();

  const fetchValues = async (values) => {
    setLoading(true);
    if (values.ingredients && Array.isArray(values.ingredients)) {
      values.ingredients = JSON.stringify(values.ingredients);
    }

    try {
      let result;
      switch (type) {
        case "product":
          result = await addStProduct(values);
          break;
        default:
          break;
      }

      if (result?.error) {
        es({ message: "Xatolik", variant: "error" });
      } else if (result?.data) {
        es({ message: "Qo'shildi", variant: "success" });
        dispatch(acCloseUModal());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getValues = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const value = Object.fromEntries(formdata.entries());
    const data = { ...value, ingredients: Pdata };
    data.res_id = user.id;
    delete data.amount;
    const result = calculateTotal(data);
    dispatch(acCalc(result));
    setFetchdata({ ...data, ...result });
  };

  return (
    <form
      className={open ? "u-control-container open" : "u-control-container"}
      onSubmit={getValues}
    >
      {children}
      <div
        className={
          open ? "u-control_action__box active" : "u-control_action__box"
        }
      >
        <button type="button" onClick={() => fetchValues(fetchdata)}>
          <i>qo'shish</i>
          <span className="relative">
            {loading ? <LoadingBtn /> : <FaCheck />}
          </span>
        </button>
        <button type="submit">
          <i>hisoblash</i>
          <span>
            <FaCalculator />
          </span>
        </button>
        <button type="button" onClick={() => dispatch(acCloseUModal())}>
          <i>bekor qilish</i>
          <span>
            <TbArrowBarLeft />
          </span>
        </button>
      </div>
    </form>
  );
};

export const UniversalForm = ({ children }) => {
  return <div className="wdfaic u-control_form_box">{children}</div>;
};

export const UniversalProductControl = ({ children }) => {
  const [activePart, setActivePart] = useState(1);

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
        <div className="u-control_product_box">{children}</div>
      </div>
    </div>
  );
};

export const CalcResult = ({ children, data, status }) => {
  const calculatedData = useSelector((state) => state.calc);
  return (
    <div className="u-control_calc_box">
      <div className="u-control_calc_body">{children}</div>
      {status === "cr" && (
        <div className="product_box_footer">
          <p>
            Tan narx: <span>{calculatedData?.prime_cost}</span>
          </p>
          <p>
            Foyda: <span>{calculatedData?.profit}</span>
          </p>
          <p>
            Foyda(%): <span>{calculatedData?.markup?.toFixed(2)}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export const CalcResultHeader = ({ children }) => {
  return <div className="product_box_item">{children}</div>;
};

export const CalcResultBody = ({ data = [], displayKeys }) => {
  console.log("calc-data", data);
  return (
    <div className="product_box_body">
      {data?.map((item, index) => (
        <div className="product_box_item" key={item.id}>
          <label>{index + 1}</label>
          {displayKeys?.map(({ name, size, position }) => (
            <p
              key={name}
              style={{
                "--data-line-size": size,
                justifyContent: position
                  ? position === 1
                    ? "center"
                    : "end"
                  : "start",
              }}
            >
              {item[name]}
            </p>
          ))}
          <p
            style={{
              "--data-line-size": "18%",
              justifyContent: "end",
            }}
          >
            {item.price * item.amount}
          </p>
        </div>
      ))}
    </div>
  );
};

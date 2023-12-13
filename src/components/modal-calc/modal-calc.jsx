import React, { useState } from "react";
import "./modal-calc.css";
import { enqueueSnackbar as es } from "notistack";
import { useSelector, useDispatch } from "react-redux";
import { acCloseUModal } from "../../redux/u-modal";
import { calculateTotal } from "./components";
import { acCalc } from "../../redux/calc";
import { LoadingBtn } from "../../components/loading/loading";
import { useAddStProductMutation } from "../../service/s-products.service";
import { useGetStoreQuery } from "../../service/store.service";
import { useGetStGroupsQuery } from "../../service/groups.service";
import { useAddStInvoiceMutation } from "../../service/invoices.service";
import { useUpdateStItemsMutation } from "../../service/store.service";
import { useAddStCuttingMutation } from "../../service/cutting.service";
import { ClearForm } from "../../service/clear-form.service";
import { useAddStDamagedMutation } from "../../service/damaged.service";
import { useAddStExpenditureMutation } from "../../service/expenditures.service";
import { useAddStCarryUpMutation } from "../../service/carry-up.service";
import { useAddMakingFoodMutation } from "../../service/making-food.service";

import { FaCalculator, FaCheck } from "react-icons/fa";
import { TbArrowBarLeft } from "react-icons/tb";
const user = JSON.parse(localStorage.getItem("user"))?.user || null;

export const UniversalControlModal = ({ children, type, Pdata, Udata, id }) => {
  const open = useSelector((state) => state.uModal);
  const [fetchdata, setFetchdata] = useState({});
  const [loading, setLoading] = useState(false);
  const [addStProduct] = useAddStProductMutation();
  const [addStInvoice] = useAddStInvoiceMutation();
  const [updateStItems] = useUpdateStItemsMutation();
  const [addStCutting] = useAddStCuttingMutation();
  const [addStDamaged] = useAddStDamagedMutation();
  const [addStExpenditure] = useAddStExpenditureMutation();
  const [addStCarryUp] = useAddStCarryUpMutation();
  const [addMakingFood] = useAddMakingFoodMutation();
  const dispatch = useDispatch();

  const fetchValues = async (values) => {
    setLoading(true);
    if (values.ingredients && Array.isArray(values.ingredients)) {
      values.ingredients = JSON.stringify(values.ingredients);
    }
    console.log("values", values);

    try {
      let result;
      switch (type) {
        case "product":
          result = await addStProduct(values);
          break;
        case "invoice":
          result = await addStInvoice(values);
          await updateStItems({ id, ingredients: Udata });
          break;
        case "cutting":
          result = await addStCutting(values);
          break;
        case "damaged":
          result = await addStDamaged(values);
          break;
        case "edr":
          result = await addStExpenditure(values);
          break;
        case "carryUp":
          result = await addStCarryUp(values);
          break;
        case "making":
          result = await addMakingFood(values);
          break;
        default:
          break;
      }

      if (result?.error) {
        es({ message: "Xatolik", variant: "error" });
      } else if (result?.data) {
        es({ message: "Qo'shildi", variant: "success" });
        ClearForm("u-control-form");
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
    if (type !== "cutting") {
      delete data.amount;
    }
    console.log("data", data);

    const result = calculateTotal(data);
    dispatch(acCalc(result));
    if (type === "product") {
      setFetchdata({ ...data, ...result });
    }
    if (type === "invoice") {
      setFetchdata({
        ...data,
        cost: result.prime_cost,
        leftover: result.prime_cost,
      });
    }
    if (type === "cutting") {
      setFetchdata({ ...data });
    }
    if (type === "damaged") {
      setFetchdata({ ...data, cost: result.prime_cost });
    }
  };

  return (
    <form
      className={open ? "u-control-container open" : "u-control-container"}
      onSubmit={getValues}
      id="u-control-form"
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

export const UniversalProductControl = ({
  children,
  setActivePart,
  activePart,
}) => {
  const { data: store = [] } = useGetStoreQuery();
  const { data: groups = [] } = useGetStGroupsQuery();

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
              taomlar
            </span>
          </div>
          <input type="search" placeholder="Qidirish..." />
          {activePart === 1 && (
            <>
              <select>
                <option value="default">Guruh tanlang</option>
                {groups?.data?.map((item) => {
                  return (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
              <select>
                <option value="default">Ombor tanlang</option>
                {store?.data?.map((item) => {
                  return (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </>
          )}
        </div>
        <div className="u-control_product_box">{children}</div>
      </div>
    </div>
  );
};

export const CalcResult = ({ children, status }) => {
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

export const CalcResultBody = ({ data = [], status, displayKeys }) => {
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
          {status !== "inv" && (
            <p
              style={{
                "--data-line-size": "18%",
                justifyContent: "end",
              }}
            >
              {item.price * item.amount}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

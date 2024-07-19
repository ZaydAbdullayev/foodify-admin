import React, { useState, useEffect } from "react";
import "./modal-calc.css";
import { enqueueSnackbar as es } from "notistack";
import { useSelector, useDispatch } from "react-redux";
import { acCloseUModal, acGetUrl } from "../../redux/u-modal";
import { calculateTotal } from "./components";
import { acCalc, acCutting } from "../../redux/calc";
import { LoadingBtn } from "../../components/loading/loading";
import { useFetchDataQuery, usePostDataMutation, usePatchDataMutation } from "../../service/fetch.service";
import { ClearForm } from "../../service/form.service";
import { acFormValues, acPassiveThing, acStorageId } from "../../redux/active";
import { notification } from "antd";
import middlewareService from "../../middleware/form.middleware";
import { GenerateField } from "../../hooks/generate.tags";
import { Popover, ConfigProvider } from "antd";

import { FaCalculator, FaCheck, FaInfo } from "react-icons/fa";
import { TbArrowBarLeft } from "react-icons/tb";
import { RiImageAddFill } from "react-icons/ri";
import { setRelease } from "../../redux/deleteFoods";
import { useLocation } from "react-router-dom";
const user = JSON.parse(localStorage.getItem("user"))?.user || null;

export const UniversalControlModal = ({ children, status, type, Pdata, Udata, setCheckedData, sp = false, }) => {
  const open = useSelector((state) => state.uModal);
  const image = useSelector((state) => state.image);
  const ing = useSelector((state) => state.ing);
  const formV = useSelector((state) => state.values);
  const lc = useLocation()?.search;
  const p_code = new URLSearchParams(lc).get("page-code");
  const [fetchdata, setFetchdata] = useState({});
  const [loading, setLoading] = useState(false);
  const [postData] = usePostDataMutation();
  //update points
  const [patchData] = usePatchDataMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    setFetchdata({});
  }, [Pdata, Udata]);

  const [api, contextHolder] = notification.useNotification();
  const openWarning = (placement, c) => {
    api.warning({
      message: "Yaroqsiz ma'lumot",
      description: `Iltimos, ${c ? `Hisoblashni 📇 bosganingizdan amin bo'ling` : "barcha maydonlarni to'ldiring"} yoki to'g'ri ma'lumot kiritganingizni tekshiring!`,
      placement,
    });
  };

  const content = (
    <div>
      <p>
        <TbArrowBarLeft /> – Oynani yopish uchun
      </p>
      <p>
        <FaCalculator /> – Oynadagi malumotlarni hisoblash uchun
      </p>
      <p>
        <FaCheck /> – Oynadagi malumotlarni saqlash uchun
      </p>
      <p>
        <RiImageAddFill /> – Mahsulot uchun rasm qo'shish uchun <br /> (faqat
        mahsulot qo'shish sahifasida ko'rinadi)
      </p>
    </div>
  );

  const fetchValues = async (v) => {
    setLoading(true);
    console.log("fetchdata", fetchdata?.length, fetchdata);
    const value = v.ingredients;
    try {
      let result;

      if (status) {
        switch (type) {
          case "product":
            result = await patchData({
              url: `update/foodIngredients`,
              data: {
                food: formV.vl,
                ingredients: Pdata,
              },
              tags: ["s-products"],
            });
            break;
          case "action":
            result = await patchData({
              url: `update/action`,
              data: Pdata,
              tags: ["action"],
            });
            break;
          default:
            break;
        }
      } else {
        switch (type) {
          case "product":
            result = await postData({
              url: "add/food",
              data: {
                food: { ...formV.vl, img: image.img },
                ingredients: Pdata,
              },
              tags: ["s-products"],
            });
            break;
          case "action":
            result = await postData({
              url: "add/action",
              data: Pdata,
              tags: ["action", "invoices"],
            });
            break;
          case "pile_action":
            result = await postData({
              url: "add/action",
              data: [
                ...Pdata,
                {
                  ...(ing || {}),
                  ...formV.vl,
                  action_type: sp,
                  st1_id: formV.vl.st2_id,
                  s1_name: formV.vl.s2_name,
                },
              ],
              tags: ["action", "invoices"],
            });
            break;
          case "preOrder":
            result = await postData({
              url: "add/preOrders",
              data: value,
              tags: ["pre-order"],
            });
            break;
          default:
            break;
        }
      }

      if (result?.error) {
        es({ message: "Xatolik", variant: "error" });
      } else {
        es({ message: "Qo'shildi", variant: "success" });
        // ClearForm("#u-control-form");
        // dispatch(acCloseUModal());
        // dispatch(acPassiveThing());
        // dispatch(acFormValues("R_V", {}));
        // setCheckedData([]);
        // dispatch(acCutting(0));
        // dispatch(acGetUrl({ st: false, img: "" }));
        // dispatch(setRelease(p_code));
      }
    } catch (err) {
      console.error(err);
      console.log("error", err);
    } finally {
      setLoading(false);
    }
  };

  const getValues = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const ds = Object.fromEntries(formdata.entries());
    console.log("ds", ds);
    const value = middlewareService(ds, openWarning);
    if (!value) return;
    const data = { ...value, ingredients: Pdata };
    data.res_id = user.id;
    if (type !== "cutting") {
      delete data.amount;
    }
    const result = calculateTotal(data);
    dispatch(acCalc(result));
    console.log("data", data, "result", result, "fetchdata", fetchdata);
  };

  const closeModal = () => {
    dispatch(acCloseUModal());
    dispatch(acPassiveThing());
    setCheckedData([]);
  };

  return (
    <>
      {contextHolder}
      <form
        className={open ? "u-control-container open" : "u-control-container"}
        onSubmit={getValues}
        id="u-control-form">
        {children}
        <div
          className={open ? "u-control_action__box active" : "u-control_action__box"}>
          <ConfigProvider
            theme={{
              components: {
                Popover: {
                  fontSize: "var(--fs6)",
                },
              },
            }}>
            <Popover
              content={content}
              title="Harakat tugmalari vazifalari"
              placement="topRight"
              trigger="click">
              <button type="button" aria-label="get info about buttons">
                <FaInfo />
              </button>
            </Popover>
          </ConfigProvider>
          {image.img !== "" && (
            <figure
              onClick={() => dispatch(acGetUrl({ st: true, img: image?.img, type: "view" }))}>
              <img src={image?.img} alt="peoduct images" />
            </figure>
          )}
          {type === "product" && (
            <button
              type="button"
              onClick={() => dispatch(acGetUrl({ st: true, img: "" }))}
              aria-label="modal of add image">
              <RiImageAddFill />
            </button>
          )}
          <button
            type="button"
            className="relative"
            onClick={() => fetchValues(fetchdata)}
            aria-label="add values of the all input's value">
            {loading ? <LoadingBtn /> : <FaCheck />}
          </button>
          <button
            type="submit"
            aria-label="calculate values of the all input's value">
            <FaCalculator />
          </button>
          <button
            type="button"
            onClick={() => closeModal()}
            aria-label="close modal">
            <TbArrowBarLeft />
          </button>
        </div>
      </form>
    </>
  );
};

export const UniversalForm = ({ formData }) => {
  return (
    <div className="wdfaic u-control_form_box">
      {formData?.map((field, index) => (
        <GenerateField key={`${index}_${field?.name}`} fieldData={field} />
      ))}
    </div>
  );
};

export const UniversalProductControl = ({ children, setActivePart, activePart, type, }) => {
  const { data: store = [] } = useFetchDataQuery({ url: `/get/storage/${user?.id}`, tags: ["store"], });
  const { data: groups = [] } = useFetchDataQuery({ url: `get/ingredientGroups`, tags: ["groups"], });
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (store?.data?.length > 0) {
      dispatch(acStorageId(store?.data?.[0]?.id));
    }
  }, [dispatch, store?.data]);

  return (
    <div className="u-control_add_box">
      <div className="section_u">
        <div className="add_box__header">
          <div className="wdfaic _header_parts">
            {type === "preOrder" ? (
              <span className="active">taomlar</span>
            ) : (
              <>
                <span
                  className={activePart === 1 ? "active" : "passive"}
                  onClick={() => setActivePart(1)}
                  aria-label="target ingredient section">
                  ingredientlar
                </span>
                <span
                  className={activePart === 2 ? "active" : "passive"}
                  onClick={() => setActivePart(2)}
                  aria-label=" target product section">
                  taomlar
                </span>
              </>
            )}
          </div>
          <input
            type="search"
            placeholder="Qidirish..."
            aria-label="search ingredient or products for add"
          />
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
              <select onChange={(e) => dispatch(acStorageId(e.target.value))}>
                {store?.data?.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>
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
            Foyda: <span>{calculatedData?.profit?.toFixed(2)}</span>
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
        <div className="product_box_item" key={item.item_id + index}>
          <label>{index + 1}</label>
          {displayKeys?.map(({ name, size, position }, ind) => (
            <p
              key={`${ind}_${name}`}
              style={{
                "--data-line-size": size,
                justifyContent: position ? position === 1 ? "center" : "end" : "start",
              }}>
              {item?.[name] || 0}
            </p>
          ))}
          {status !== "inv" && (
            <p
              style={{ "--data-line-size": "18%", justifyContent: "end", }}>
              {(item.price * item.amount)?.toFixed(1)}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

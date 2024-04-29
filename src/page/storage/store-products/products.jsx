import React, { useState, lazy, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LoadingBtn } from "../../../components/loading/loading";
import { data } from "../../../components/modal-calc/components";
import { acActiveThing, acPassiveThing } from "../../../redux/active";
import { Addproduct } from "../../../components/Addproduct/addproduct";
import { setDocuments, setRelease } from "../../../redux/deleteFoods";
import { setAllDocuments } from "../../../redux/deleteFoods";
import { useNavigate } from "react-router-dom";
import { UniversalControlModal } from "../../../components/modal-calc/modal-calc";
import { UniversalForm } from "../../../components/modal-calc/modal-calc";
import { UniversalProductControl } from "../../../components/modal-calc/modal-calc";
import { CalcResultHeader } from "../../../components/modal-calc/modal-calc";
import { CalcResultBody } from "../../../components/modal-calc/modal-calc";
import { CalcResult } from "../../../components/modal-calc/modal-calc";
import { CalculateTotalP } from "../../../service/calc.service";

import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { acNavStatus } from "../../../redux/navbar.status";
import { UniversalFilterBox } from "../../../components/filter/filter";
import { useFetchDataQuery } from "../../../service/fetch.service";

export const StorageProducts = () => {
  const [sort, setSort] = useState({ id: null, state: false });
  const [checked, setChecked] = useState(false);
  const [checkedData, setCheckedData] = useState([]);
  const [showMore, setShowMore] = useState([]);
  const [activePart, setActivePart] = useState(1);
  const acItem = useSelector((state) => state.activeThing);
  const ckddt = useSelector((state) => state.delRouter);
  const id = useSelector((state) => state.storageId);
  const img = useSelector((state) => state.image);
  const res_id = useSelector((state) => state.res_id);
  const acIngredients = acItem?.ingredients
    ? JSON?.parse(acItem?.ingredients)
    : [];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: products = [], isLoading } = useFetchDataQuery({
    url: `get/foods/${res_id}`,
    tags: ["s-products", "product"],
  });
  const { data: ingredients = [] } = useFetchDataQuery({
    url: `get/ingredients/${res_id}`,
    tags: ["ingredient"],
  });
  const { data: category = [] } = useFetchDataQuery({
    url: `get/${res_id}/categories`,
    tags: ["category"],
  });

  React.useEffect(() => {
    dispatch(acNavStatus([0, 1, 2, 3, 5, 4, 9, 15]));
  }, [dispatch]);

  const getProduct = (item, status) => {
    const isChecked = checkedData.some((i) => i.id === item.id);
    if (status === 0) {
      setCheckedData((prevData) => prevData.filter((i) => i.id !== item.id));
      return;
    }
    if (isChecked) {
      setCheckedData((prevData) =>
        prevData.map((i) =>
          i.id === item.id ? { ...item, storage_id: id } : i
        )
      );
    } else {
      setCheckedData((prevData) => [...prevData, { ...item, storage_id: id }]);
    }
  };

  const sortData =
    products?.data &&
    [...products?.data].sort((a, b) => {
      if (sort.state) {
        return a?.name?.localeCompare(b?.name);
      } else {
        return b?.name?.localeCompare(a?.name);
      }
    });

  const headerData = [
    { name: "Nomi", size: "15%" },
    { name: "Narxi", size: "10%" },
    { name: "Tan narxi", size: "11%" },
    { name: "Foyda", size: "10%" },
    { name: "Foyda%", size: "10%" },
    { name: "Kategoriya", size: "12%" },
    { name: "Ombor", size: "12%" },
    { name: "Hisoblash", size: "10%" },
    { name: "Tarix", size: "8%" },
  ];

  const displayKeys = [
    { name: "name", size: "15%" },
    { name: "price", size: "10%", position: 2 },
    { name: "prime_cost", size: "11%", position: 2 },
    { name: "profit", size: "10%", position: 2 },
    { name: "markup", size: "10%", position: 2 },
    { name: "category", size: "12%" },
    { name: "storage", size: "12%" },
  ];

  const innerHeaderData = [
    { name: "№", size: "", border: "1px solid #ccc4" },
    { name: "Nomi", size: "30%", border: "1px solid #ccc4" },
    { name: "O'lchov birligi", size: "16.5%", border: "1px solid #ccc4" },
    { name: "Miqdori", size: "16.5%", border: "1px solid #ccc4" },
    { name: "Narxi", size: "16.5%", border: "1px solid #ccc4" },
    { name: "Jami", size: "16.5%", border: "0" },
  ];

  const innerDisplayKeys = [
    { name: "name", size: "30%" },
    { name: "unit", size: "16.5%", position: 1 },
    { name: "amount", size: "16.5%", position: 1 },
    { name: "price", size: "16.5%", position: 2 },
  ];

  const modalData = activePart === 1 ? ingredients : products;

  return (
    <div className="storage_container">
      <UniversalFilterBox />
      <div className="storage_body">
        <p>
          <span>Mahsulotlar</span>
        </p>
        <div className="storage_body_item _item-header">
          <label>
            <input
              type="checkbox"
              name="id"
              onClick={() => {
                setChecked(!checked);
                dispatch(
                  checked
                    ? setRelease("products")
                    : setAllDocuments("products", products.data)
                );
              }}
              aria-label="checked this elements"
            />
          </label>
          <p style={{ inlineSize: "var(--univslH)" }}>№</p>
          {headerData?.map((item, index) => {
            return (
              <label
                onClick={() => setSort({ id: 1, state: !sort.state })}
                style={{ "--data-line-size": item.size }}
                key={index}
                aria-label="sort data down of top or top of down">
                <p>{item.name}</p>
                {sort.id === 1 && sort.state ? (
                  <RiArrowUpSLine />
                ) : (
                  <RiArrowDownSLine />
                )}
              </label>
            );
          })}
        </div>
        <div className="storage_body_box">
          {isLoading ? (
            <span className="loader_box relative">
              <LoadingBtn />
            </span>
          ) : (
            sortData?.map((item, index) => {
              const ingredients = item?.ingredients
                ? JSON?.parse(item?.ingredients)
                : [];
              const check = ckddt?.products?.some((i) => i.id === item.id);
              return (
                <div
                  className={
                    showMore?.includes(item?.id)
                      ? "storage_body__box active"
                      : "storage_body__box"
                  }
                  key={item.id}>
                  <div
                    className={
                      acItem === item.id
                        ? "storage_body_item active"
                        : "storage_body_item"
                    }
                    key={item.id}
                    onDoubleClick={() => {
                      dispatch(
                        !acItem?.id ? acActiveThing(item) : acPassiveThing()
                      );
                      dispatch(setDocuments("products", item));
                      navigate(`?page-code=products`);
                    }}>
                    <label
                      onClick={() => {
                        dispatch(
                          !acItem?.id ? acActiveThing(item) : acPassiveThing()
                        );
                        dispatch(setDocuments("products", item));
                        navigate(`?page-code=products`);
                      }}
                      aria-label="checked this elements">
                      <input type="checkbox" name="id" defaultChecked={check} />
                    </label>
                    <p style={{ inlineSize: "var(--univslH)" }}>{index + 1}</p>
                    {displayKeys?.map(({ name, size, position }, ind) => (
                      <p
                        key={ind}
                        style={{
                          "--data-line-size": size,
                          justifyContent: position
                            ? position === 1
                              ? "center"
                              : "flex-end"
                            : "flex-start",
                        }}>
                        {item[name]}
                      </p>
                    ))}
                    <p
                      style={{
                        "--data-line-size": "10%",
                        justifyContent: "center",
                      }}
                      onClick={() =>
                        setShowMore(
                          showMore?.includes(item?.id)
                            ? showMore?.filter((i) => i !== item?.id)
                            : [...showMore, item.id]
                        )
                      }>
                      <u
                        style={
                          showMore?.includes(item?.id)
                            ? { color: "#787aff" }
                            : {}
                        }>
                        tafsilot
                      </u>
                    </p>
                    <p
                      style={{
                        "--data-line-size": "8%",
                        justifyContent: "center",
                      }}
                      onClick={() =>
                        setShowMore(
                          showMore?.includes(item?.id)
                            ? showMore?.filter((i) => i !== item?.id)
                            : [...showMore, item.id]
                        )
                      }>
                      <u
                        style={
                          showMore?.includes(item?.id)
                            ? { color: "#787aff" }
                            : {}
                        }>
                        tarix
                      </u>
                    </p>
                  </div>
                  {showMore?.includes(item?.id) && (
                    <div className=" storage-body_inner_item">
                      <div
                        className="storage_body_item"
                        style={{ background: "#454545" }}>
                        {innerHeaderData?.map((item, index) => {
                          return (
                            <p
                              style={{
                                "--data-line-size": item.size,
                                borderRight: item.border,
                              }}
                              key={index}>
                              {item.name}
                            </p>
                          );
                        })}
                      </div>
                      {ingredients?.map((product, ind) => {
                        return (
                          <div
                            className="storage_body_item inner_item"
                            key={ind}>
                            <p
                              style={{
                                borderRight: "1px solid #ccc4",
                              }}>
                              {ind + 1}
                            </p>
                            {innerDisplayKeys?.map(
                              ({ name, size, position }, innerind) => (
                                <p
                                  key={innerind}
                                  style={{
                                    "--data-line-size": size,
                                    justifyContent: position
                                      ? position === 1
                                        ? "center"
                                        : "flex-end"
                                      : "flex-start",
                                    borderRight: "1px solid #ccc4",
                                  }}>
                                  {product[name]}
                                </p>
                              )
                            )}
                            <p
                              style={{
                                "--data-line-size": "16.5%",
                              }}>
                              {product.amount * item.price}
                            </p>
                          </div>
                        );
                      })}
                      <div
                        className="storage_body_item inner_item"
                        style={{ background: "#454545" }}>
                        <p></p>
                        <p style={{ "--data-line-size": "66%" }}>
                          {item?.date?.split("T")[0]}{" "}
                          {item?.date?.split("T")[1]?.split(".")[0]}
                          -ga ko'ra Jami mablag'
                        </p>
                        <p
                          style={{
                            "--data-line-size": "30%",
                            justifyContent: "flex-end",
                          }}>
                          {CalculateTotalP(ingredients, "price", "amount")}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
      <UniversalControlModal
        status={acItem?.id ? true : false}
        type="product"
        Pdata={[...checkedData, ...acIngredients]}
        setCheckedData={setCheckedData}>
        <UniversalForm
          formData={[
            {
              type: "input",
              name: "name",
              plc_hr: "Nomi*",
              df_value: acItem?.name,
            },
            {
              type: "s_extra",
              extra: "category_id",
              name: "category",
              df_value: { value: "default", label: "Kategoriya tanlang*" },
              options: category?.data,
            },
            {
              type: "inputN",
              name: "price",
              plc_hr: "Narxi*",
              df_value: acItem?.price,
            },
            {
              type: "inputD",
              name: "date",
              df_value: acItem?.date,
            },
            {
              type: "input",
              name: "description",
              plc_hr: "Tavsif*",
              df_value: acItem?.description || "",
            },
            {
              type: "inputH",
              name: "img",
              df_value: img?.img || "",
            },
          ]}
        />
        <UniversalProductControl
          activePart={activePart}
          setActivePart={setActivePart}>
          <div className="product_box_item">
            <label>
              <input
                type="checkbox"
                name="id"
                onClick={() => getProduct(data)}
              />
            </label>
            <p
              style={{
                "--data-line-size": activePart === 1 ? "35%" : "60%",
              }}>
              Nomi
            </p>
            {activePart === 1 && (
              <>
                <p style={{ "--data-line-size": "20%" }}>O'lchov birligi</p>
                <p style={{ "--data-line-size": "20%" }}>Guruh</p>
                <p style={{ "--data-line-size": "20%" }}>Narxi</p>
              </>
            )}
            <p style={{ "--data-line-size": "20%" }}>Miqdori</p>
          </div>
          <div className="product_box_body">
            {modalData?.data?.map((item, index) => {
              const checked = [...checkedData, ...acIngredients]?.find(
                (i) => i.id === item.id
              );
              return (
                <div
                  className={`product_box_item ${checked ? "active" : ""}`}
                  key={item.id}>
                  <label>
                    <input
                      type="checkbox"
                      defaultChecked={checked}
                      onChange={() =>
                        getProduct({ ...item, amount: 0 }, checked ? 0 : 1)
                      }
                    />
                  </label>
                  <p
                    style={{
                      "--data-line-size": activePart === 1 ? "35%" : "60%",
                    }}>
                    {item.name}
                  </p>
                  {activePart === 1 && (
                    <>
                      <p
                        style={{
                          "--data-line-size": "20%",
                          justifyContent: "center",
                        }}>
                        {item.unit}
                      </p>
                      <p
                        style={{
                          "--data-line-size": "20%",
                          justifyContent: "center",
                        }}>
                        {item.group}
                      </p>
                      <p
                        style={{
                          "--data-line-size": "20%",
                          justifyContent: "flex-end",
                        }}>
                        {item.price}
                      </p>
                    </>
                  )}
                  <p
                    style={{
                      "--data-line-size": "20%",
                      justifyContent: "center",
                    }}>
                    {checked && (
                      <input
                        type="text"
                        name="amount"
                        defaultValue={checked?.amount ? checked.amount : 0}
                        onChange={(e) =>
                          getProduct({ ...checked, amount: e.target.value }, 1)
                        }
                      />
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        </UniversalProductControl>
        <CalcResult data={[...checkedData, ...acIngredients]} status="cr">
          <CalcResultHeader>
            <p style={{ inlineSize: "var(--univslH)" }}>№</p>
            <p style={{ "--data-line-size": "30%" }}>Nomi</p>
            <p style={{ "--data-line-size": "20%" }}>Miqdori</p>
            <p style={{ "--data-line-size": "20%" }}>Tan narxi</p>
            <p style={{ "--data-line-size": "20%" }}>Narxi</p>
          </CalcResultHeader>
          <CalcResultBody
            data={checkedData}
            displayKeys={[
              { name: "name", size: "30%" },
              { name: "amount", size: "20%" },
              { name: "price", size: "20%" },
            ]}
          />
        </CalcResult>
      </UniversalControlModal>
      <Addproduct />
    </div>
  );
};

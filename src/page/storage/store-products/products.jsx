import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { acActive } from "../../../redux/active";
import { useGetStProductQuery } from "../../../service/s-products.service";
import { LoadingBtn } from "../../../components/loading/loading";
import { UniversalControlModal } from "../../../components/modal-calc/modal-calc";
import { UniversalForm } from "../../../components/modal-calc/modal-calc";
import { UniversalProductControl } from "../../../components/modal-calc/modal-calc";
import { CalcResultHeader } from "../../../components/modal-calc/modal-calc";
import { CalcResultBody } from "../../../components/modal-calc/modal-calc";
import { CalcResult } from "../../../components/modal-calc/modal-calc";
import { data } from "../../../components/modal-calc/components";
import { useGetStIngredientsQuery } from "../../../service/ingredient.service";
import { useGetStCategoryQuery } from "../../../service/category.service";

import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

export const StorageProducts = () => {
  //   const user = JSON.parse(localStorage.getItem("user"))?.user || null;
  const [sort, setSort] = useState({ id: null, state: false });
  const [checked, setChecked] = useState(false);
  const [checkedData, setCheckedData] = useState([]);
  const today = new Date().toISOString().split("T")[0];
  const [showMore, setShowMore] = useState(null);
  const acItem = useSelector((state) => state.active);
  const dispatch = useDispatch();
  const { data: products = [], isLoading } = useGetStProductQuery();
  const { data: ingredients = [] } = useGetStIngredientsQuery();
  const { data: category = [] } = useGetStCategoryQuery();
  console.log(products);

  const getProduct = (item, amount, status) => {
    const isChecked = checkedData.some((i) => i.id === item.id);
    if (status === 0) {
      setCheckedData((prevData) => prevData.filter((i) => i.id !== item.id));
      return;
    }
    if (isChecked) {
      setCheckedData((prevData) =>
        prevData.map((i) =>
          i.id === item.id ? { ...i, amount: parseInt(amount, 10) || 0 } : i
        )
      );
    } else {
      setCheckedData((prevData) => [
        ...prevData,
        { ...item, amount: parseInt(amount, 10) || 0 },
      ]);
    }
  };

  const sortData =
    products?.data &&
    [...products?.data].sort((a, b) => {
      if (sort.state) {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

  // const udb = {
  //   category: "default",
  //   date: "2023-11-24T19:00:00.000Z",
  //   id: "f483d1",
  //   ingredients: "[object Object]",
  //   markup: 0,
  //   name: "aq",
  //   price: "100000",
  //   prime_cost: "",
  //   profit: "",
  //   res_id: "2899b5",
  // };

  return (
    <div className="storage_container">
      <div className="storage_header"></div>
      <div className="storage_body">
        <p>Mahsulotlar</p>
        <div className="storage_body_item">
          <label>
            <input
              type="checkbox"
              name="id"
              onClick={() => setChecked(!checked)}
            />
          </label>
          <p>№</p>
          <label
            onClick={() => setSort({ id: 1, state: !sort.state })}
            style={{ "--data-line-size": "15%" }}
          >
            <p>Nomi</p>
            {sort.id === 1 && sort.state ? (
              <RiArrowUpSLine />
            ) : (
              <RiArrowDownSLine />
            )}
          </label>
          <label
            onClick={() => setSort({ id: 1, state: !sort.state })}
            style={{ "--data-line-size": "10%" }}
          >
            <p>Narxi</p>
            {sort.id === 1 && sort.state ? (
              <RiArrowUpSLine />
            ) : (
              <RiArrowDownSLine />
            )}
          </label>
          <label
            onClick={() => setSort({ id: 1, state: !sort.state })}
            style={{ "--data-line-size": "11%" }}
          >
            <p>Tan narxi</p>
            {sort.id === 1 && sort.state ? (
              <RiArrowUpSLine />
            ) : (
              <RiArrowDownSLine />
            )}
          </label>
          <label
            onClick={() => setSort({ id: 1, state: !sort.state })}
            style={{ "--data-line-size": "10%" }}
          >
            <p>Foyda</p>
            {sort.id === 1 && sort.state ? (
              <RiArrowUpSLine />
            ) : (
              <RiArrowDownSLine />
            )}
          </label>
          <label
            onClick={() => setSort({ id: 1, state: !sort.state })}
            style={{ "--data-line-size": "10%" }}
          >
            <p>Foyda%</p>
            {sort.id === 1 && sort.state ? (
              <RiArrowUpSLine />
            ) : (
              <RiArrowDownSLine />
            )}
          </label>
          <label
            onClick={() => setSort({ id: 1, state: !sort.state })}
            style={{ "--data-line-size": "12%" }}
          >
            <p>Kategoriya</p>
            {sort.id === 1 && sort.state ? (
              <RiArrowUpSLine />
            ) : (
              <RiArrowDownSLine />
            )}
          </label>
          <label
            onClick={() => setSort({ id: 1, state: !sort.state })}
            style={{ "--data-line-size": "12%" }}
          >
            <p>Ombor</p>
            {sort.id === 1 && sort.state ? (
              <RiArrowUpSLine />
            ) : (
              <RiArrowDownSLine />
            )}
          </label>
          <p style={{ "--data-line-size": "10%", justifyContent: "center" }}>
            Hisoblash
          </p>
          <p style={{ "--data-line-size": "8%", justifyContent: "center" }}>
            Tarix
          </p>
        </div>
        <div className="storage_body_box">
          {isLoading ? (
            <span className="loader_box relative">
              <LoadingBtn />
            </span>
          ) : (
            sortData?.map((item, index) => {
              return (
                <div
                  className={
                    showMore === item.id
                      ? "storage_body__box active"
                      : "storage_body__box"
                  }
                >
                  <div
                    className={
                      acItem === item.id
                        ? "storage_body_item active"
                        : "storage_body_item"
                    }
                    key={item.id}
                    onDoubleClick={() =>
                      dispatch(
                        acActive({
                          id: !acItem.id ? item.id : null,
                        })
                      )
                    }
                  >
                    <label
                      onClick={() =>
                        dispatch(
                          acActive({
                            id: !acItem.id ? item.id : null,
                          })
                        )
                      }
                    >
                      {checked ? (
                        <input type="checkbox" name="id" checked />
                      ) : (
                        <input type="checkbox" name="id" />
                      )}
                    </label>
                    <p>{index + 1}</p>
                    <p style={{ "--data-line-size": "15%" }}>{item.name}</p>
                    <p
                      style={{
                        "--data-line-size": "10%",
                        justifyContent: "flex-end",
                      }}
                    >
                      {item.price}
                    </p>
                    <p
                      style={{
                        "--data-line-size": "11%",
                        justifyContent: "flex-end",
                      }}
                    >
                      {item.prime_cost}
                    </p>
                    <p
                      style={{
                        "--data-line-size": "10%",
                        justifyContent: "flex-end",
                      }}
                    >
                      {item.profit}
                    </p>
                    <p
                      style={{
                        "--data-line-size": "10%",
                        justifyContent: "flex-end",
                      }}
                    >
                      {item.markup}
                    </p>
                    <p style={{ "--data-line-size": "12%" }}>{item.category}</p>
                    <p style={{ "--data-line-size": "12%" }}>{item.storage}</p>
                    <p
                      style={{
                        "--data-line-size": "10%",
                        justifyContent: "center",
                      }}
                      onClick={() =>
                        setShowMore(showMore === item.id ? null : item.id)
                      }
                    >
                      <u
                        style={showMore === item.id ? { color: "#787aff" } : {}}
                      >
                        hisoblash
                      </u>
                    </p>
                    <p
                      style={{
                        "--data-line-size": "8%",
                        justifyContent: "center",
                      }}
                      onClick={() =>
                        setShowMore(showMore === item.id ? null : item.id)
                      }
                    >
                      <u
                        style={showMore === item.id ? { color: "#787aff" } : {}}
                      >
                        tarix
                      </u>
                    </p>
                  </div>
                  <div className=" storage-body_inner_item">
                    <div className="storage_body_item">
                      <p
                        style={{
                          borderRight: "1px solid #ccc5",
                        }}
                      >
                        №
                      </p>
                      <p
                        style={{
                          "--data-line-size": "35%",
                          borderRight: "1px solid #ccc5",
                        }}
                      >
                        Nomi
                      </p>
                      <p
                        style={{
                          "--data-line-size": "20%",
                          borderRight: "1px solid #ccc5",
                        }}
                      >
                        Narxi
                      </p>
                      <p
                        style={{
                          "--data-line-size": "25%",
                          borderRight: "1px solid #ccc5",
                        }}
                      >
                        Tan Narxi
                      </p>
                      <p style={{ "--data-line-size": "15%" }}>Foyda</p>
                    </div>
                    {item?.data?.map((product, ind) => {
                      return (
                        <div className="storage_body_item inner_item" key={ind}>
                          <p
                            style={{
                              borderRight: "1px solid #ccc5",
                            }}
                          >
                            {ind + 1}
                          </p>
                          <p style={{ "--data-line-size": "35%" }}>
                            {product.name}
                          </p>
                          <p style={{ "--data-line-size": "20%" }}>
                            {product.password}
                          </p>
                          <p style={{ "--data-line-size": "25%" }}>
                            {item.remain}
                          </p>
                          <p style={{ "--data-line-size": "15%" }}>
                            {item.total}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      <UniversalControlModal type="product" Pdata={checkedData}>
        <UniversalForm>
          <input
            type="text"
            name="name"
            placeholder="Nomi*"
            required
            autoComplete="off"
            style={{ "--input-width": "15%" }}
          />
          <select name="category" style={{ "--input-width": "15%" }}>
            <option value="default">Kategoriya tanlang*</option>
            {category?.data?.map((item) => {
              return (
                <option value={item.name} key={item.id}>
                  {item.name}
                </option>
              );
            })}
          </select>
          <input
            type="number"
            name="price"
            placeholder="Narxi*"
            style={{ "--input-width": "12%" }}
          />
          <input
            type="date"
            name="date"
            style={{ "--input-width": "12%" }}
            defaultValue={today}
          />
        </UniversalForm>
        <UniversalProductControl
          checkedData={checkedData}
          setCheckedData={setCheckedData}
        >
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
            {ingredients?.data?.map((item, index) => {
              const checked = checkedData?.some((i) => i.id === item.id);
              return (
                <div
                  className={`product_box_item ${checked ? "active" : ""}`}
                  key={item.id}
                >
                  <label>
                    <input
                      type="checkbox"
                      checked={checked}
                      onClick={() => getProduct(item, 0, checked ? 0 : 1)}
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
                    {item.price}
                  </p>
                  <p
                    style={{
                      "--data-line-size": "20%",
                      justifyContent: "center",
                    }}
                  >
                    {checked && (
                      <input
                        type="text"
                        name="amount"
                        onChange={(e) => getProduct(item, e.target.value, 1)}
                      />
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        </UniversalProductControl>
        <CalcResult data={checkedData} status="cr">
          <CalcResultHeader>
            <p>№</p>
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
    </div>
  );
};

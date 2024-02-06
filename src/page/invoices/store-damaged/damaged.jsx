import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { acActiveThing, acPassiveThing } from "../../../redux/active";
import { LoadingBtn } from "../../../components/loading/loading";
import { InvoicesModal } from "./damaged.modal";
import { useGetStorageItemsQuery } from "../../../service/invoices.service";
import { useGetStDamagedQuery } from "../../../service/damaged.service";
import { acNavStatus } from "../../../redux/navbar.status";
import { useNavigate } from "react-router-dom";

import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { UniversalFilterBox } from "../../../components/filter/filter";
import {
  setAllDocuments,
  setDocuments,
  setRelease,
} from "../../../redux/deleteFoods";

export const StorageDamaged = () => {
  const [sort, setSort] = useState({ id: null, state: false });
  const [checked, setChecked] = useState(false);
  const [checkedData, setCheckedData] = useState([]);
  const [showMore, setShowMore] = useState(null);
  const [id, setId] = useState(0);
  const acItem = useSelector((state) => state.activeThing);
  const ckddt = useSelector((state) => state.delRouter);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: ingredientData = [] } = useGetStorageItemsQuery(id);
  const { data: demagedData = [], isLoading } = useGetStDamagedQuery();
  React.useEffect(() => {
    dispatch(acNavStatus([0, 1, 2, 3, 6, 7, 9, 15]));
  }, [dispatch]);
  const acIngredients = acItem?.ingredients
    ? JSON.parse(acItem?.ingredients)
    : [];

  const getProduct = (item, status) => {
    const isChecked = checkedData.some((i) => i.id === item?.id);
    if (status === 0) {
      setCheckedData((prevData) => prevData.filter((i) => i.id !== item?.id));
      return;
    }
    if (isChecked) {
      setCheckedData((prevData) =>
        prevData.map((i) => (i.id === item?.id ? item : i))
      );
    } else {
      setCheckedData((prevData) => [...prevData, item]);
    }
  };

  const headerKeys = [
    { name: "Kun", size: "16.5%", sort: true },
    { name: "Ombor", size: "16.5%", sort: true },
    { name: "Miqdor", size: "16.5%", sort: true },
    { name: "Guruh", size: "16.5%", sort: true },
    { name: "Tavsif", size: "16.5%", sort: true },
    { name: "Tafsilot", size: "11%", sort: false },
  ];

  const displayKeys = [
    { name: "storage", size: "16.5%" },
    { name: "cost", size: "16.5%" },
    { name: "ingredient_group", size: "16.5%" },
    { name: "description", size: "16.5%" },
  ];

  const innerHeaderKeys = [
    { name: "№", border: "1px solid #ccc5" },
    { name: "Nomi", size: "28%", border: "1px solid #ccc5" },
    { name: "Narxi", size: "19.3%", border: "1px solid #ccc5" },
    { name: "Oldin", size: "19.3%", border: "1px solid #ccc5" },
    { name: "Keyin", size: "19.3%", border: "1px solid #ccc5" },
    { name: "Farq", size: "10%" },
  ];

  const innerDisplayKeys = [
    { name: "name", size: "28%" },
    { name: "price", size: "19.3%" },
    { name: "old_quantity", size: "19.3%", tick: true },
    { name: "total_quantity", size: "19.3%", tick: true },
    { name: "amount", size: "10%", tick: true },
  ];

  const sortData =
    demagedData?.data &&
    [...demagedData?.data]?.sort((a, b) => {
      if (sort.state) {
        return a?.name?.localeCompare(b.name);
      } else {
        return b?.name?.localeCompare(a.name);
      }
    });

  return (
    <div className="storage_container">
      <UniversalFilterBox />
      <div className="storage_body">
        <p>
          <span>Zararlangan ovqatlar</span>
        </p>
        <div className="storage_body_item">
          <label>
            <input
              type="checkbox"
              name="id"
              onClick={() => {
                setChecked(!checked);
                dispatch(
                  checked
                    ? setRelease("damaged")
                    : setAllDocuments("damaged", demagedData?.data)
                );
              }}
            />
          </label>
          <p>№</p>
          {headerKeys.map((item, index) => {
            return (
              <label
                style={{
                  "--data-line-size": item?.size,
                  cursor: item?.sort ? "pointer" : "default",
                }}
                onClick={() => {
                  if (item?.sort) {
                    setSort({ id: index, state: !sort.state });
                  }
                }}
              >
                <p>{item?.name}</p>
                {item?.sort ? (
                  sort.id === index && sort.state ? (
                    <RiArrowUpSLine className="sort_arrow" />
                  ) : (
                    <RiArrowDownSLine className="sort_arrow" />
                  )
                ) : (
                  ""
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
            sortData?.map((item) => {
              const date = new Date(item?.date).toLocaleDateString("uz-UZ", {
                day: "numeric",
                month: "numeric",
                year: "numeric",
              });
              const innerData = JSON.parse(item?.ingredients);
              const check = ckddt?.damaged?.some((el) => el?.id === item?.id);
              return (
                <div
                  className={
                    showMore === item?.id
                      ? "storage_body__box active"
                      : "storage_body__box"
                  }
                >
                  <div
                    className={
                      acItem === item?.id
                        ? "storage_body_item active"
                        : "storage_body_item"
                    }
                    key={item?.id}
                    onDoubleClick={() => {
                      dispatch(
                        !acItem?.id ? acActiveThing(item) : acPassiveThing()
                      );
                      dispatch(setDocuments("damaged", item));
                      navigate(`?page-code=damaged`);
                    }}
                  >
                    <label
                      onClick={() => {
                        dispatch(
                          !acItem?.id ? acActiveThing(item) : acPassiveThing()
                        );
                        dispatch(setDocuments("damaged", item));
                        navigate(`?page-code=damaged`);
                      }}
                    >
                      <input type="checkbox" name="id" checked={check} />
                    </label>
                    <p>{item?.order}</p>
                    <p style={{ "--data-line-size": "16.5%" }}>{date}</p>
                    {displayKeys.map((key, ind) => (
                      <p style={{ "--data-line-size": key?.size }} key={ind}>
                        {item[key?.name]}
                      </p>
                    ))}
                    <p
                      style={{
                        "--data-line-size": "11%",
                        justifyContent: "center",
                      }}
                      onClick={() =>
                        setShowMore(showMore === item?.id ? null : item?.id)
                      }
                    >
                      <u
                        style={
                          showMore === item?.id ? { color: "#787aff" } : {}
                        }
                      >
                        tafsilot
                      </u>
                    </p>
                  </div>
                  <div className=" storage-body_inner_item">
                    <div
                      className="storage_body_item"
                      style={{ background: "#3339" }}
                    >
                      {innerHeaderKeys.map((key, ind) => (
                        <p
                          style={{
                            "--data-line-size": key?.size,
                            borderRight: key?.border,
                          }}
                          key={ind}
                        >
                          {key?.name}
                        </p>
                      ))}
                    </div>
                    {innerData?.map((product, ind) => {
                      return (
                        <div className="storage_body_item inner_item" key={ind}>
                          <p
                            style={{
                              borderRight: "1px solid #ccc5",
                            }}
                          >
                            {ind + 1}
                          </p>
                          {innerDisplayKeys.map((key, index) => (
                            <p
                              style={{
                                "--data-line-size": key?.size,
                                borderRight: key?.border,
                              }}
                              key={index}
                            >
                              {product[key?.name] === 0
                                ? parseInt(product?.amount) +
                                  product?.total_quantity
                                : product[key?.name]}{" "}
                              {key?.tick ? product?.unit : ""}
                            </p>
                          ))}
                        </div>
                      );
                    })}
                    <div
                      className="storage_body_item"
                      style={{ background: "#3339" }}
                    >
                      <p></p>
                      <p
                        style={{
                          "--data-line-size": "66%",
                          borderRight: "1px solid #ccc5",
                          justifyContent: "flex-start",
                        }}
                      >
                        Jami zarar:
                      </p>
                      <p
                        style={{
                          "--data-line-size": "30%",
                          justifyContent: "flex-end",
                        }}
                      >
                        {item?.cost} so'm
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      <InvoicesModal
        data={ingredientData?.data}
        checkedData={checkedData}
        setCheckedData={setCheckedData}
        getProduct={getProduct}
        NUM={
          !isLoading && {
            num:
              JSON.parse(demagedData?.data ? demagedData?.data[0]?.order : 0) +
              1,
          }
        }
        setId={setId}
        id={id}
        acIngredients={acIngredients}
        acItem={acItem}
      />
    </div>
  );
};

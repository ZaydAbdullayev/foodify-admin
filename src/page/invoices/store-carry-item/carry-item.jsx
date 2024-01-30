import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { acActiveThing } from "../../../redux/active";
import { LoadingBtn } from "../../../components/loading/loading";
import { InvoicesModal } from "./carry-item.modal";
import { useGetStCuttingQuery } from "../../../service/cutting.service";
import { useGetStorageItemsQuery } from "../../../service/invoices.service";

import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { acNavStatus } from "../../../redux/navbar.status";
import { UniversalFilterBox } from "../../../components/filter/filter";

export const StorageCarryUp = () => {
  const [sort, setSort] = useState({ id: null, state: false });
  const [checked, setChecked] = useState(false);
  const [checkedData, setCheckedData] = useState([]);
  const [showMore, setShowMore] = useState(null);
  const [id, setId] = useState(0);
  const acItem = useSelector((state) => state.activeThing);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(acNavStatus([0, 1, 2, 3, 6, 7, 9, 15]));
  }, [dispatch]);
  const { data: ingredientData = [] } = useGetStorageItemsQuery(id);
  const { data: cuttingData = [], isLoading } = useGetStCuttingQuery();
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

  const sortData =
    cuttingData?.data &&
    [...cuttingData?.data]?.sort((a, b) => {
      if (sort.state) {
        return a?.name?.localeCompare(b.name);
      } else {
        return b?.name?.localeCompare(a.name);
      }
    });

  const headerKeys = [
    { name: "Kun", size: "14%", sort: true },
    { name: "Ombordan", size: "14%", sort: true },
    { name: "Omborga", size: "14%", sort: true },
    { name: "Miqdor", size: "14%", sort: true },
    { name: "Guruh", size: "14%", sort: true },
    { name: "Tavsif", size: "14%", sort: true },
    { name: "Tafsilot", size: "10%", position: "center" },
  ];

  const displayKeys = [
    { name: "sender_storage", size: "14%" },
    { name: "receiver_storage", size: "14%" },
    { name: "waste", size: "14%", position: "flex-end" },
    { name: "ingredient_group", size: "14%" },
    { name: "description", size: "14%" },
  ];

  const innerHeaderKeys = [
    { name: "№", border: "1px solid #ccc5" },
    { name: "Nomi", size: "35%", border: "1px solid #ccc5" },
    { name: "Narxi", size: "20%", border: "1px solid #ccc5" },
    { name: "Tan Narxi", size: "25%", border: "1px solid #ccc5" },
    { name: "Foyda", size: "15%" },
  ];

  const innerDisplayKeys = [
    { name: "name", size: "35%" },
    { name: "password", size: "20%" },
    { name: "remain", size: "25%" },
    { name: "total", size: "15%" },
  ];

  return (
    <div className="storage_container">
      <UniversalFilterBox />
      <div className="storage_body">
        <p>
          <span>Ko'chirib o'tkazish</span>
        </p>
        <div className="storage_body_item">
          <label>
            <input
              type="checkbox"
              name="id"
              onClick={() => setChecked(!checked)}
            />
          </label>
          <p>№</p>
          {headerKeys?.map((item, index) => {
            return (
              <label
                style={{
                  "--data-line-size": item?.size,
                  justifyContent: item?.position,
                }}
                key={index}
                onClick={() => {
                  if (item?.sort) {
                    setSort({ id: index, state: !sort.state });
                  }
                }}
              >
                <p>{item?.name}</p>
                {sort.id === index ? (
                  sort.state ? (
                    <RiArrowDownSLine />
                  ) : (
                    <RiArrowUpSLine />
                  )
                ) : null}
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
                    onDoubleClick={() =>
                      dispatch(acActiveThing(!acItem?.id ? item : {}))
                    }
                  >
                    <label
                      onClick={() =>
                        dispatch(acActiveThing(!acItem?.id ? item : {}))
                      }
                    >
                      {checked ? (
                        <input type="checkbox" name="id" checked />
                      ) : acItem?.id === item?.id ? (
                        <input type="checkbox" name="id" checked />
                      ) : (
                        <input type="checkbox" name="id" />
                      )}
                    </label>
                    <p>{item?.order}</p>
                    <p style={{ "--data-line-size": "14%" }}>{date}</p>
                    {displayKeys?.map((key, index) => {
                      return (
                        <p
                          style={{
                            "--data-line-size": key?.size,
                            justifyContent: key?.position,
                          }}
                          key={index}
                        >
                          {item[key?.name] || 0}
                        </p>
                      );
                    })}
                    <p
                      style={{
                        "--data-line-size": "10%",
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
                      {innerHeaderKeys?.map((item, index) => {
                        return (
                          <p
                            style={{
                              "--data-line-size": item?.size,
                              borderRight: item?.border,
                            }}
                            key={index}
                          >
                            {item?.name}
                          </p>
                        );
                      })}
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
                          {innerDisplayKeys?.map((key, index) => {
                            return (
                              <p
                                style={{
                                  "--data-line-size": key?.size,
                                  borderRight: key?.border,
                                }}
                                key={index}
                              >
                                {product[key?.name] || 0}
                              </p>
                            );
                          })}
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
      <InvoicesModal
        data={ingredientData?.data}
        checkedData={checkedData}
        setCheckedData={setCheckedData}
        getProduct={getProduct}
        NUM={
          !isLoading && {
            num:
              JSON.parse(cuttingData?.data ? cuttingData?.data[0]?.order : 0) +
              1,
          }
        }
        setId={setId}
        id={id}
        acItem={acItem}
        acIngredients={acIngredients}
      />
    </div>
  );
};

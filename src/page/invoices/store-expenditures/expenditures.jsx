import React, { useState, lazy, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { acActiveThing, acPassiveThing } from "../../../redux/active";
import { LoadingBtn } from "../../../components/loading/loading";
import { useNavigate } from "react-router-dom";
import { CalculateTotalP } from "../../../service/calc.service";

import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { acNavStatus } from "../../../redux/navbar.status";
import { UniversalFilterBox } from "../../../components/filter/filter";
import { setDocuments, setRelease } from "../../../redux/deleteFoods";
import { setAllDocuments } from "../../../redux/deleteFoods";
import { useFetchDataQuery } from "../../../service/fetch.service";

const InvoicesModal = lazy(() => import("./expenditures.modal"));

export const StorageExpenditures = () => {
  const [sort, setSort] = useState({ id: null, state: false });
  const [checked, setChecked] = useState(false);
  const [checkedData, setCheckedData] = useState([]);
  const [showMore, setShowMore] = useState([]);
  const acItem = useSelector((state) => state.activeThing);
  const ckddt = useSelector((state) => state.delRouter);
  const res_id = useSelector((state) => state.res_id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: invoiceData = [], isLoading } = useFetchDataQuery({
    url: `get/usedGoods/${res_id}`,
    tags: ["expenditure"],
  });
  React.useEffect(() => {
    dispatch(acNavStatus([0, 1, 2, 3, 6, 7, 9, 15]));
  }, [dispatch]);
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
    invoiceData &&
    [...invoiceData].sort((a, b) => {
      if (sort.state) {
        return a?.name?.localeCompare(b.name);
      } else {
        return b?.name?.localeCompare(a.name);
      }
    });

  const headerData = [
    { name: "Kun", size: "15.6%" },
    { name: "Ombor", size: "15.6%" },
    { name: "Miqdor", size: "15.6%" },
    { name: "Guruh", size: "15.6%" },
    { name: "Tavsif", size: "15.6%" },
    { name: "Tafsilot", size: "15.6%" },
  ];

  const displayKeys = [
    { name: "storage", size: "15.6%" },
    { name: "cost", size: "15.6%" },
    { name: "group", size: "15.6%" },
    { name: "description", size: "15.6%" },
  ];

  // ingredients: '[{"id":"0af650","name":"Olma sharbati","unit":"l","group":"Gazli-suv va sharbatlar","res_id":"2899b5","price":8000,"type":"Ingredient","storage_id":null,"amount":"50","old_quantity":0,"total_quantity":100}]';

  const innerHEaderKeys = [
    { name: "№", border: "1px solid #ccc5" },
    { name: "Nomi", size: "18.7%", border: "1px solid #ccc5" },
    { name: "Turi", size: "8.7%", border: "1px solid #ccc5" },
    { name: "Narx", size: "13.7%", border: "1px solid #ccc5" },
    { name: "Oldingi soni", size: "13.7%", border: "1px solid #ccc5" },
    { name: "Soni", size: "13.7%", border: "1px solid #ccc5" },
    { name: "Keyingi soni", size: "13.7%", border: "1px solid #ccc5" },
    { name: "Jami", size: "13.7%" },
  ];

  const innerData = [
    { name: "name", size: "18.7%", border: "1px solid #ccc5" },
    { name: "type", size: "8.7%", border: "1px solid #ccc5", short: true },
    { name: "price", size: "13.7%", border: "1px solid #ccc5" },
    { name: "total_quantity", size: "13.7%", border: "1px solid #ccc5" },
    { name: "amount", size: "13.7%", border: "1px solid #ccc5" },
  ];

  return (
    <div className="storage_container">
      <UniversalFilterBox />
      <div className="storage_body">
        <p>
          <span>Chiqimlar</span>
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
                    ? setRelease("invoice")
                    : setAllDocuments("invoice", invoiceData?.data)
                );
              }}
              aria-label="checked this elements"
            />
          </label>
          <p style={{ inlineSize: "var(--univslH)" }}>№</p>
          {headerData.map((item, index) => {
            return (
              <p
                style={{
                  "--data-line-size": item.size,
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                key={index}
                onClick={() =>
                  setSort({
                    id: index,
                    state: !sort.state,
                  })
                }>
                {item.name}
                {sort.id === index && sort.state ? (
                  <RiArrowUpSLine className="sort_icon" />
                ) : (
                  <RiArrowDownSLine className="sort_icon" />
                )}
              </p>
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
              const date = new Date(item?.date).toLocaleDateString("uz-UZ", {
                day: "numeric",
                month: "numeric",
                year: "numeric",
              });
              const check = ckddt?.invoice?.some((el) => el?.id === item?.id);
              const innerDatas = JSON.parse(item?.ingredients);
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
                      acItem === item?.id
                        ? "storage_body_item active"
                        : "storage_body_item"
                    }
                    onDoubleClick={() => {
                      dispatch(
                        !acItem?.id ? acActiveThing(item) : acPassiveThing()
                      );
                      dispatch(setDocuments("invoice", item));
                      navigate(`?page-code=invoice`);
                    }}>
                    <label
                      onClick={() => {
                        dispatch(
                          !acItem?.id ? acActiveThing(item) : acPassiveThing()
                        );
                        dispatch(setDocuments("invoice", item));
                        navigate(`?page-code=invoice`);
                      }}
                      aria-label="checked this elements">
                      <input type="checkbox" name="id" defaultChecked={check} />
                    </label>
                    <p style={{ inlineSize: "var(--univslH)" }}>
                      {item?.order}
                    </p>
                    <p style={{ "--data-line-size": "15.6%" }}>{date}</p>
                    {displayKeys.map((key) => {
                      return (
                        <p style={{ "--data-line-size": key.size }}>
                          {item[key.name]}
                        </p>
                      );
                    })}
                    <p
                      style={{
                        "--data-line-size": "15.6%",
                        justifyContent: "center",
                      }}
                      onClick={() =>
                        setShowMore((prev) =>
                          prev?.includes(item?.id)
                            ? prev?.filter((i) => i !== item?.id)
                            : [...prev, item?.id]
                        )
                      }>
                      <u
                        style={
                          showMore?.includes(item?.id)
                            ? { color: "#787aff" }
                            : {}
                        }>
                        Tafsilot
                      </u>
                    </p>
                  </div>
                  {showMore?.includes(item?.id) && (
                    <div className=" storage-body_inner_item">
                      <div className="storage_body_item">
                        {innerHEaderKeys.map((item, index) => {
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
                      {innerDatas?.map((product, ind) => {
                        return (
                          <div
                            className="storage_body_item inner_item"
                            key={ind}>
                            <p
                              style={{
                                borderRight: "1px solid #ccc5",
                                justifyContent: "center",
                              }}>
                              {ind + 1}
                            </p>
                            {innerData.map((key, index) => {
                              return (
                                <p
                                  style={{
                                    "--data-line-size": key.size,
                                    borderRight: key.border,
                                  }}
                                  key={index}>
                                  {key.short
                                    ? product[key.name]?.slice(0, 1)
                                    : product[key.name]}
                                </p>
                              );
                            })}
                            <p
                              style={{
                                "--data-line-size": "13.7%",
                                borderRight: "1px solid #ccc5",
                              }}>
                              {product?.total_quantity - product?.amount}
                            </p>
                            <p style={{ "--data-line-size": "13.7%" }}>
                              {product?.price * product?.amount}
                            </p>
                          </div>
                        );
                      })}
                      <div
                        className="storage_body_item inner_item"
                        style={{ background: "#3339" }}>
                        <p></p>
                        <p style={{ "--data-line-size": "66%" }}>
                          {date} ga ko'ra Jami mablag'
                        </p>
                        <p
                          style={{
                            "--data-line-size": "30%",
                            justifyContent: "flex-end",
                          }}>
                          {CalculateTotalP(innerDatas, "price", "amount")}
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
      <Suspense>
        <InvoicesModal
          checkedData={checkedData}
          setCheckedData={setCheckedData}
          getProduct={getProduct}
          NUM={
            !isLoading && {
              num:
                JSON.parse(
                  invoiceData?.data ? invoiceData?.data[0]?.order : 0
                ) + 1,
            }
          }
        />
      </Suspense>
    </div>
  );
};

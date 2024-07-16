import React, { useState, lazy, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
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
  const [acItem, setAcItem] = useState({ id: null, ingredients: [] });
  const ckddt = useSelector((state) => state.delRouter);
  const formV = useSelector((state) => state.values);
  const open = useSelector((state) => state.uModal);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: expenseData = [], isLoading } = useFetchDataQuery({
    url: `get/actions/used_goods`,
    tags: ["action", "invoices"],
  });
  React.useEffect(() => {
    dispatch(acNavStatus([0, 1, 2, 3, 6, 7, 9, 15]));
  }, [dispatch]);
  const getProduct = (item, status) => {
    const isChecked = checkedData.some((i) => i.item_id === item?.item_id);
    if (status === 0) {
      setCheckedData((prevData) =>
        prevData.filter((i) => i.item_id !== item?.item_id)
      );
      return;
    }
    if (isChecked) {
      setCheckedData((prevData) =>
        prevData.map((i) => (i.item_id === item?.item_id ? item : i))
      );
    } else {
      setCheckedData((prevData) => [
        ...prevData,
        { ...item, ...formV?.vl, action_type: "used_goods" },
      ]);
    }
  };

  const sortData =
    expenseData?.data &&
    [...(expenseData?.data || [])].sort((a, b) => {
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
    { name: "st1_name", size: "15.6%" },
    { name: "total_amount", size: "15.6%" },
    { name: "invoice_group", size: "15.6%" },
    { name: "description", size: "15.6%" },
  ];

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
    { name: "item_name", size: "18.7%", border: "1px solid #ccc5" },
    { name: "item_type", size: "8.7%", border: "1px solid #ccc5", short: true },
    { name: "price", size: "13.7%", border: "1px solid #ccc5" },
    { name: "total_quantity", size: "13.7%", border: "1px solid #ccc5" },
    { name: "amount", size: "13.7%", border: "1px solid #ccc5" },
  ];

  const actionItem = (item) => {
    dispatch(setDocuments("expense", item));
    navigate(`?page-code=expense`);
    setCheckedData(acItem?.id ? [] : item?.ingredients);
    setAcItem(
      acItem?.id && ckddt?.expense?.length > 0
        ? { id: null, ingredients: [] }
        : item
    );
  };

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
                    : setAllDocuments("invoice", expenseData?.data)
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
              const check = ckddt?.invoice?.some((el) => el?.id === item?.id);
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
                    onDoubleClick={() => actionItem(item)}>
                    <label aria-label="checked this elements">
                      <input
                        type="checkbox"
                        name="id"
                        checked={check}
                        onChange={() => actionItem(item)}
                      />
                    </label>
                    <p style={{ inlineSize: "var(--univslH)" }}>
                      {item?.order}
                    </p>
                    <p style={{ "--data-line-size": "15.6%" }}>
                      {item?.time?.split(" ")?.[0]}
                    </p>
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
                      {item?.ingredients?.map((product, ind) => {
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
                          {item?.time} ga ko'ra Jami mablag'
                        </p>
                        <p
                          style={{
                            "--data-line-size": "30%",
                            justifyContent: "flex-end",
                          }}>
                          {CalculateTotalP(
                            item?.ingredients,
                            "price",
                            "amount"
                          )}
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
      {open && (
        <Suspense>
          <InvoicesModal
            checkedData={checkedData}
            setCheckedData={setCheckedData}
            getProduct={getProduct}
            NUM={!isLoading && { num: expenseData?.data?.length + 1 }}
            acItem={acItem}
          />
        </Suspense>
      )}
    </div>
  );
};

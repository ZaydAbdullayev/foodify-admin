import React, { useState, lazy, Suspense, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LoadingBtn } from "../../../components/loading/loading";
import { useNavigate } from "react-router-dom";
import { CalculateTotalP } from "../../../service/calc.service";

import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { acNavStatus } from "../../../redux/navbar.status";
import { UniversalFilterBox } from "../../../components/filter/filter";
import { setDocuments, setRelease, setAllDocuments } from "../../../redux/deleteFoods";
import { useFetchDataQuery } from "../../../service/fetch.service";
import { acFormValues } from "../../../redux/active";

const InvoicesModal = lazy(() => import("./expenditures.modal"));

export const StorageExpenditures = () => {
  const [sort, setSort] = useState({ id: null, state: false });
  const [checked, setChecked] = useState(false);
  const [checkedData, setCheckedData] = useState([]);
  const [showMore, setShowMore] = useState([]);
  const [acItem, setAcItem] = useState({ id: null, ingredients: [] });
  const ckddt = useSelector((state) => state.delRouter);
  const open = useSelector((state) => state.uModal);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: expenseData = [], isLoading } = useFetchDataQuery({ url: `get/actions/used_goods`, tags: ["action", "invoices"], });

  useEffect(() => { dispatch(acNavStatus([0, 1, 2, 3, 6, 7, 9, 15])); }, [dispatch]);

  const getProduct = (item, status) => {
    const itemId = item?.item_id;
    const acItemId = acItem?.id;
    const e = acItem?.ingredients?.some((i) => i.item_id === itemId);

    setCheckedData((prevData) => {
      const isChecked = prevData.some((i) => i.item_id === itemId);
      if (status === 0) {
        if (acItemId) {
          return prevData.map((i) => i.item_id === itemId ? { ...item, status: "delete" } : i);
        }
        return prevData.filter((i) => i.item_id !== itemId);
      }
      if (isChecked) {
        return prevData.map((i) => i.item_id === itemId ? { ...item, id: acItem.id, status: acItemId && e ? "update_amount" : item.status } : i);
      }
      return [...prevData, { ...item, action_type: "used_goods", invoice_group: "expense", status: acItemId ? "add" : undefined }];
    });
  };

  const sortData = expenseData?.data && [...(expenseData?.data || [])].sort((a, b) => {
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
    { name: "Nomi", size: "20%", border: "1px solid #ccc5" },
    { name: "Narx", size: "15.7%", border: "1px solid #ccc5" },
    { name: "Oldingi soni", size: "14%", border: "1px solid #ccc5" },
    { name: "Soni", size: "13.8%", border: "1px solid #ccc5" },
    { name: "Keyingi soni", size: "14.7%", border: "1px solid #ccc5" },
    { name: "Jami", size: "17.8%" },
  ];

  const innerData = [
    { name: "item_name", size: "20%", border: "1px solid #ccc5" },
    { name: "price", size: "15.7%", border: "1px solid #ccc5" },
    { name: "total_quantity", size: "14%", border: "1px solid #ccc5" },
    { name: "amount", size: "13.8%", border: "1px solid #ccc5" },
  ];

  const actionItem = (item) => {
    dispatch(setDocuments("expense", item));
    navigate(`?page-code=expense`);
    setCheckedData(acItem?.id ? [] : item?.ingredients);
    setAcItem(acItem?.id && ckddt?.expense?.length > 1 ? { id: null, ingredients: [] } : item);
    const mutationItem = { ...item }
    delete mutationItem.ingredients;
    dispatch(acFormValues("A_F_V", mutationItem));
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
              onChange={() => {
                setChecked(!checked);
                dispatch(checked ? setRelease("expense") : setAllDocuments("expense", expenseData?.data));
              }}
              aria-label="checked this elements"
            />
          </label>
          <p style={{ inlineSize: "var(--univslH)" }}>№</p>
          {headerData.map((item, index) => {
            return (
              <p
                style={{ "--data-line-size": item.size, justifyContent: "center", cursor: "pointer", }}
                key={index}
                onClick={() => setSort({ id: index, state: !sort.state, })}>
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
              sortData?.map((item) => {
                const check = ckddt?.expense?.some((el) => el?.id === item?.id);
              return (
                <div
                  className={showMore?.includes(item?.id) ? "storage_body__box active" : "storage_body__box"}
                  key={item.id}>
                  <div
                    className={acItem === item?.id ? "storage_body_item active" : "storage_body_item"}
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
                    <p style={{ "--data-line-size": "15.6%", justifyContent: "center", }}
                      onClick={() =>
                        setShowMore((prev) => prev?.includes(item?.id) ? prev?.filter((i) => i !== item?.id) : [...prev, item?.id])
                      }>
                      <u style={showMore?.includes(item?.id) ? { color: "#787aff" } : {}}>
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
                              style={{ "--data-line-size": item.size, borderRight: item.border, }}
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
                            <p style={{ borderRight: "1px solid #ccc5", justifyContent: "center", }}>
                              {ind + 1}
                            </p>
                            {innerData.map((key, index) => {
                              return (
                                <p style={{ "--data-line-size": key.size, borderRight: key.border, }}
                                  key={index}>
                                  {key.short ? product[key.name]?.slice(0, 1) : product[key.name]}
                                </p>
                              );
                            })}
                            <p style={{ "--data-line-size": "14.7%", borderRight: "1px solid #ccc5", }}>
                              {product?.total_quantity - product?.amount}
                            </p>
                            <p style={{ "--data-line-size": "17.8%" }}>
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
                        <p style={{ "--data-line-size": "30%", justifyContent: "flex-end", }}>
                          {CalculateTotalP(item?.ingredients, "price", "amount")}
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

import React, { useState, lazy, Suspense, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LoadingBtn } from "../../../components/loading/loading";
import { acNavStatus } from "../../../redux/navbar.status";
import { useNavigate } from "react-router-dom";

import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { UniversalFilterBox } from "../../../components/filter/filter";
import { setDocuments, setRelease } from "../../../redux/deleteFoods";
import { setAllDocuments } from "../../../redux/deleteFoods";
import { useFetchDataQuery } from "../../../service/fetch.service";
import { acFormValues } from "../../../redux/active";

const InvoicesModal = lazy(() => import("./damaged.modal"));

export const StorageDamaged = () => {
  const [sort, setSort] = useState({ id: null, state: false });
  const [checked, setChecked] = useState(false);
  const [checkedData, setCheckedData] = useState([]);
  const [showMore, setShowMore] = useState([]);
  const [acItem, setAcItem] = useState({ id: null, ingredients: [] });
  const ckddt = useSelector((state) => state.delRouter);
  const open = useSelector((state) => state.uModal);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: demagedData = [], isLoading } = useFetchDataQuery({ url: `get/actions/damaged_goods`, tags: ["action", "invoices"], });
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
      return [...prevData, { ...item, action_type: "damaged_goods", invoice_group: "expense", status: acItemId ? "add" : undefined }];
    });
  };

  const actionItem = (item) => {
    dispatch(setDocuments("damagedGoods", item));
    navigate(`?page-code=damagedGoods`);
    setCheckedData(acItem?.id ? [] : item?.ingredients);
    setAcItem(acItem?.id && ckddt?.damagedGoods?.length > 1 ? { id: null, ingredients: [] } : item);
    const mutationItem = { ...item }
    delete mutationItem.ingredients;
    dispatch(acFormValues("A_F_V", mutationItem));
  };

  const headerKeys = [
    { name: "Kun", size: "16.5%", sort: true },
    { name: "Ombor", size: "16.5%", sort: true },
    { name: "Miqdor", size: "16.5%", sort: true, p: "center" },
    { name: "Guruh", size: "16.5%", sort: true },
    { name: "Tavsif", size: "16.5%", sort: true },
    { name: "Tafsilot", size: "11%", sort: false },
  ];

  const displayKeys = [
    { name: "st1_name", size: "16.5%" },
    { name: "total_amount", size: "16.5%", p: "center" },
    { name: "invoice_group", size: "16.5%" },
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
    { name: "item_name", size: "28%" },
    { name: "price", size: "19.3%" },
    { name: "old_amount", size: "19.3%", tick: true },
    { name: "total_amount", size: "19.3%", tick: true },
    { name: "amount", size: "10%", tick: true },
  ];

  const sortData = demagedData?.data && [...demagedData?.data]?.sort((a, b) => {
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
        <div className="storage_body_item _item-header">
          <label>
            <input
              type="checkbox"
              name="id"
              checked={checked}
              onChange={() => {
                setChecked(!checked);
                dispatch(checked ? setRelease("damagedGoods") : setAllDocuments("damagedGoods", demagedData?.data));
              }}
              aria-label="checked this elements"
            />
          </label>
          <p style={{ inlineSize: "var(--univslH)" }}>№</p>
          {headerKeys.map((item, index) => {
            return (
              <label
                style={{
                  "--data-line-size": item?.size,
                  cursor: item?.sort ? "pointer" : "default",
                  justifyContent: item?.p,
                }}
                key={`${item.name}_${index}`}
                onClick={() => {
                  if (item?.sort) {
                    setSort({ id: index, state: !sort.state });
                  }
                }}>
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
              const check = ckddt?.damaged?.some((el) => el?.id === item?.id);
              return (
                <div
                  className={showMore?.includes(item?.id) ? "storage_body__box active" : "storage_body__box"}
                  key={item?.id}>
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
                    <p style={{ "--data-line-size": "16.5%" }}>
                      {item?.time?.split(" ")?.[0]}
                    </p>
                    {displayKeys.map((key, ind) => (
                      <p style={{ "--data-line-size": key?.size, justifyContent: key.p, }}
                        key={ind}>
                        {item[key?.name]}
                      </p>
                    ))}
                    <p
                      style={{
                        "--data-line-size": "11%",
                        justifyContent: "center",
                      }}
                      onClick={() =>
                        setShowMore((prev) => prev?.includes(item?.id) ? prev?.filter((i) => i !== item?.id) : [...prev, item?.id])
                      }>
                      <u style={showMore?.includes(item?.id) ? { color: "#787aff" } : {}}>
                        tafsilot
                      </u>
                    </p>
                  </div>
                  {showMore?.includes(item?.id) && (
                    <div className=" storage-body_inner_item">
                      <div
                        className="storage_body_item"
                        style={{ background: "#3339" }}>
                        {innerHeaderKeys.map((key, ind) => (
                          <p style={{ "--data-line-size": key?.size, borderRight: key?.border, }}
                            key={ind}>
                            {key?.name}
                          </p>
                        ))}
                      </div>
                      {item?.ingredients?.map((product, ind) => {
                        return (
                          <div
                            className="storage_body_item inner_item"
                            key={ind}>
                            <p style={{ borderRight: "1px solid #ccc5", }}>
                              {ind + 1}
                            </p>
                            {innerDisplayKeys.map((key, index) => (
                              <p
                                style={{ "--data-line-size": key?.size, borderRight: key?.border, }}
                                key={index}>
                                {product[key?.name] === 0 ? parseInt(product?.amount) + product?.total_quantity : product[key?.name]}{" "}
                                {key?.tick ? product?.unit : ""}
                              </p>
                            ))}
                          </div>
                        );
                      })}
                      <div
                        className="storage_body_item"
                        style={{ background: "#3339" }}>
                        <p></p>
                        <p
                          style={{
                            "--data-line-size": "66%",
                            borderRight: "1px solid #ccc5",
                            justifyContent: "flex-start",
                          }}>
                          Jami zarar:
                        </p>
                        <p
                          style={{
                            "--data-line-size": "30%",
                            justifyContent: "flex-end",
                          }}>
                          {item?.cost} so'm
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
            NUM={!isLoading && { num: demagedData?.data?.length + 1 }}
            acItem={acItem}
          />
        </Suspense>
      )}
    </div>
  );
};

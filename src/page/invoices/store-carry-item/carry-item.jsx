import React, { useState, lazy, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LoadingBtn } from "../../../components/loading/loading";
import { useFetchDataQuery } from "../../../service/fetch.service";
import { useNavigate } from "react-router-dom";

import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { acNavStatus } from "../../../redux/navbar.status";
import { UniversalFilterBox } from "../../../components/filter/filter";
import { setDocuments, setRelease } from "../../../redux/deleteFoods";
import { setAllDocuments } from "../../../redux/deleteFoods";

const InvoicesModal = lazy(() => import("./carry-item.modal"));

export const StorageCarryUp = () => {
  const [sort, setSort] = useState({ id: null, state: false });
  const [checked, setChecked] = useState(false);
  const [checkedData, setCheckedData] = useState([]);
  const [showMore, setShowMore] = useState([]);
  const [acItem, setAcItem] = useState({ id: null, ingredients: [] });
  const ckddt = useSelector((state) => state.delRouter);
  const open = useSelector((state) => state.uModal);
  const formV = useSelector((state) => state.values);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  React.useEffect(() => {
    dispatch(acNavStatus([0, 1, 2, 3, 6, 7, 9, 15]));
  }, [dispatch]);

  const { data: cuttingData = [], isLoading } = useFetchDataQuery({
    url: `/get/actions/moved_goods`,
    tags: ["action", "invoices"],
  });

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
        { ...item, ...formV.vl, id: acItem?.id, action_type: "moved_goods" },
      ]);
    }
  };

  const itemAction = (item) => {
    dispatch(setDocuments("movedGoods", item));
    navigate(`?page-code=movedGoods`);
    setCheckedData(acItem?.id ? [] : item?.ingredients);
    setAcItem(
      acItem?.id && ckddt?.movedGoods?.length > 0
        ? { id: null, ingredients: [] }
        : item
    );
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
    { name: "st1_name", size: "14%" },
    { name: "st2_name", size: "14%" },
    { name: "total_amount", size: "14%", position: "flex-end" },
    { name: "invoice_group", size: "14%" },
    { name: "description", size: "14%" },
  ];

  const innerHeaderKeys = [
    { name: "№", border: "1px solid #ccc5" },
    { name: "Nomi", size: "35%", border: "1px solid #ccc5" },
    { name: "Narxi", size: "20%", border: "1px solid #ccc5" },
    { name: "Miqdori", size: "15%", border: "1px solid #ccc5" },
    { name: "Jami", size: "25%" },
  ];

  const innerDisplayKeys = [
    { name: "item_name", size: "35%" },
    { name: "price", size: "20%" },
    { name: "amount", size: "15%" },
    { name: "total_amount", size: "25%" },
  ];

  return (
    <div className="storage_container">
      <UniversalFilterBox />
      <div className="storage_body">
        <p>
          <span>Ko'chirib o'tkazish</span>
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
                    ? setRelease("movedGoods")
                    : setAllDocuments("movedGoods", cuttingData?.data)
                );
              }}
              aria-label="checked this elements"
            />
          </label>
          <p style={{ inlineSize: "var(--univslH)" }}>№</p>
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
                }}>
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
              const innerData = item?.ingredients || [];
              const check = ckddt?.movedGoods?.some(
                (el) => el?.id === item?.id
              );
              return (
                <div
                  className={
                    showMore?.includes(item?.id)
                      ? "storage_body__box active"
                      : "storage_body__box"
                  }
                  key={item?.id}>
                  <div
                    className={
                      acItem === item?.id || check
                        ? "storage_body_item active"
                        : "storage_body_item"
                    }
                    key={item?.id}
                    onDoubleClick={() => itemAction(item)}>
                    <label aria-label="checked this elements">
                      <input
                        type="checkbox"
                        name="id"
                        checked={check}
                        onChange={() => itemAction(item)}
                      />
                    </label>
                    <p style={{ inlineSize: "var(--univslH)" }}>
                      {item?.order}
                    </p>
                    <p style={{ "--data-line-size": "14%" }}>{item?.time}</p>
                    {displayKeys?.map((key, index) => {
                      return (
                        <p
                          style={{
                            "--data-line-size": key?.size,
                            justifyContent: key?.position,
                          }}
                          key={index}>
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
                        setShowMore(
                          showMore?.includes(item?.id)
                            ? showMore?.filter((el) => el !== item?.id)
                            : [...showMore, item?.id]
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
                  </div>
                  {showMore?.includes(item?.id) && (
                    <div className=" storage-body_inner_item">
                      <div
                        className="storage_body_item"
                        style={{ background: "#3339" }}>
                        {innerHeaderKeys?.map((item, index) => {
                          return (
                            <p
                              style={{
                                "--data-line-size": item?.size,
                                borderRight: item?.border,
                              }}
                              key={index}>
                              {item?.name}
                            </p>
                          );
                        })}
                      </div>
                      {innerData?.map((product, ind) => {
                        return (
                          <div
                            className="storage_body_item inner_item"
                            key={ind}>
                            <p
                              style={{
                                borderRight: "1px solid #ccc5",
                              }}>
                              {ind + 1}
                            </p>
                            {innerDisplayKeys?.map((key, index) => {
                              return (
                                <p
                                  style={{
                                    "--data-line-size": key?.size,
                                    borderRight: key?.border,
                                  }}
                                  key={index}>
                                  {key?.name === "total"
                                    ? product?.price * product?.amount
                                    : product[key?.name] || 0}
                                </p>
                              );
                            })}
                          </div>
                        );
                      })}
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
            NUM={!isLoading && { num: 1 }}
            acItem={acItem}
          />
        </Suspense>
      )}
    </div>
  );
};

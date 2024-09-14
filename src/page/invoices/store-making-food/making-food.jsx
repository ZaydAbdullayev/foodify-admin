import React, { useState, lazy, Suspense, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LoadingBtn } from "../../../components/loading/loading";

import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { acNavStatus } from "../../../redux/navbar.status";
import { UniversalFilterBox } from "../../../components/filter/filter";
import { setRelease } from "../../../redux/deleteFoods";
import { setAllDocuments } from "../../../redux/deleteFoods";
import { useFetchDataQuery } from "../../../service/fetch.service";
import { useActionItemService } from "../../../service/form.service";

const InvoicesModal = lazy(() => import("./making-food.modal"));

export const InvoicesMakingFood = () => {
  const [sort, setSort] = useState({ id: null, state: false });
  const [checked, setChecked] = useState(false);
  const [showMore, setShowMore] = useState([]);
  const ckddt = useSelector((state) => state.delRouter);
  const open = useSelector((state) => state.uModal);
  const { actionItem } = useActionItemService();
  const dispatch = useDispatch();
  const { data: makedFood = [], isLoading } = useFetchDataQuery({ url: `get/actions/making_increase/${null}`, tags: ["action", "invoices"], });
  useEffect(() => { dispatch(acNavStatus([0, 1, 2, 3, 6, 7, 15])); }, [dispatch]);

  const sortData = makedFood?.data && [...makedFood?.data].sort((a, b) => {
    if (sort?.state) {
      return a?.name?.localeCompare(b?.name);
    } else {
      return b?.name?.localeCompare(a?.name);
    }
  });

  const headerData = [
    { name: "Kun", size: "12%" },
    { name: "Mahsulot", size: "12%" },
    { name: "Bekor q/n ombor", size: "12%" },
    { name: "Qabul q/n ombor", size: "12%" },
    { name: "Soni", size: "10%" },
    { name: "Narxi", size: "10%" },
    { name: "Jami", size: "10%" },
    { name: "Tavsif", size: "9%", position: "center" },
    { name: "Tafsilot", size: "8%", position: "center" },
  ];

  const displayKeys = [
    { name: "item_id", size: "12%" },
    { name: "st1_name", size: "12%" },
    { name: "st2_name", size: "12%" },
    { name: "amount", size: "10%", position: "flex-end" },
    { name: "total_amount", size: "10%", position: "flex-end" },
    { name: "total_amount", size: "10%", position: "flex-end" },
    { name: "description", size: "9%" },
  ];

  const innerDisplayKeys = [

  ];

  return (
    <div className="storage_container">
      <UniversalFilterBox />
      <div className="storage_body">
        <p>
          <span>Mahsulot tayyorlash</span>
        </p>
        <div className="storage_body_item _item-header">
          <label>
            <input
              type="checkbox"
              name="id"
              checked={checked}
              onChange={() => {
                setChecked(!checked);
                dispatch(checked ? setRelease("making") : setAllDocuments("making", makedFood?.data));
              }}
              aria-label="checked this elements"
            />
          </label>
          <p style={{ inlineSize: "var(--univslH)" }}>№</p>
          {headerData?.map((item, index) => {
            return (
              <p
                key={index}
                style={{
                  "--data-line-size": item?.size,
                  justifyContent: item?.position || "flex-start",
                }}
                onClick={() => {
                  setSort({ id: index, state: !sort.state });
                }}>
                {item?.name}{" "}
                {sort.id === index ? (
                  sort.state ? (
                    <RiArrowUpSLine />
                  ) : (
                    <RiArrowDownSLine />
                  )
                ) : null}
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
              const check = ckddt?.making?.some((el) => el?.id === item?.id);
              return (
                <div
                  className={showMore?.includes(item?.id) ? "storage_body__box active" : "storage_body__box"}>
                  <div
                    className={check ? "storage_body_item active" : "storage_body_item"}
                    key={item?.id}
                    onDoubleClick={() => actionItem("making", item, check)}>
                    <label aria-label="checked this elements">
                      <input
                        type="checkbox"
                        name="id"
                        checked={check}
                        onChange={() => actionItem("making", item, check)}
                      />
                    </label>
                    <p style={{ inlineSize: "var(--univslH)" }}>
                      {item?.order}
                    </p>
                    <p style={{ "--data-line-size": "12%" }}>{item?.time}</p>
                    {displayKeys?.map((key, index) => {
                      return (
                        <p
                          key={index}
                          style={{
                            "--data-line-size": key?.size,
                            justifyContent: key?.position || "flex-start",
                          }}>
                          {item[key?.name]}
                        </p>
                      );
                    })}
                    <p style={{ "--data-line-size": "8%", justifyContent: "center", }}
                      onClick={() =>
                        setShowMore((prev) => prev?.includes(item?.id) ? prev?.filter((i) => i !== item?.id) : [...prev, item?.id])
                      }>
                      <u
                        style={showMore?.includes(item?.id) ? { color: "#787aff" } : {}}>
                        tafsilot
                      </u>
                    </p>
                  </div>
                  {showMore?.includes(item?.id) && (
                    <div className=" storage-body_inner_item">
                      <div className="storage_body_item">
                        <p style={{ borderRight: "1px solid #ccc5", }}>
                          №
                        </p>
                        <p style={{ "--data-line-size": "35%", borderRight: "1px solid #ccc5", }}>
                          Nomi
                        </p>
                        <p style={{ "--data-line-size": "20%", borderRight: "1px solid #ccc5", }}>
                          Narxi
                        </p>
                        <p style={{ "--data-line-size": "25%", borderRight: "1px solid #ccc5", }}>
                          Tan Narxi
                        </p>
                        <p style={{ "--data-line-size": "15%" }}>Foyda</p>
                      </div>
                      {item?.data?.map((product, ind) => {
                        return (
                          <div
                            className="storage_body_item inner_item"
                            key={ind}>
                            <p style={{ borderRight: "1px solid #ccc5", }}>
                              {ind + 1}
                            </p>
                            <p style={{ "--data-line-size": "35%" }}>
                              {product?.item_name}
                            </p>
                            <p style={{ "--data-line-size": "20%" }}>
                              {product.password}
                            </p>
                            <p style={{ "--data-line-size": "25%" }}>
                              {item?.remain}
                            </p>
                            <p style={{ "--data-line-size": "15%" }}>
                              {item?.total}
                            </p>
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
          <InvoicesModal NUM={!isLoading && { num: makedFood?.data?.length + 1 }} />
        </Suspense>
      )}
    </div>
  );
};

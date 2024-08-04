import React, { useState, lazy, Suspense, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LoadingBtn } from "../../../components/loading/loading";
import { acNavStatus } from "../../../redux/navbar.status";
import { UniversalFilterBox } from "../../../components/filter/filter";

import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { setRelease } from "../../../redux/deleteFoods";
import { setAllDocuments } from "../../../redux/deleteFoods";
import { useFetchDataQuery } from "../../../service/fetch.service";
import { useActionItemService } from "../../../service/form.service";

const InvoicesModal = lazy(() => import("./cutting.modal"));

export const StorageCutting = () => {
  const [sort, setSort] = useState({ id: null, state: false });
  const [checked, setChecked] = useState(false);
  const [showMore, setShowMore] = useState([]);
  const ckddt = useSelector((state) => state.delRouter);
  const open = useSelector((state) => state.uModal);
  const { actionItem } = useActionItemService();
  const dispatch = useDispatch();
  const { data: dmData = [], isLoading } = useFetchDataQuery({ url: `get/actions/cutting_decrease/${null}`, tags: ["action", "invoices"], });
  useEffect(() => { dispatch(acNavStatus([0, 1, 2, 3, 6, 7, 9, 15])); }, [dispatch]);

  const sortData = dmData?.data && [...dmData?.data]?.sort((a, b) => {
    if (sort.state) {
      return a?.name?.localeCompare(b.name);
    } else {
      return b?.name?.localeCompare(a.name);
    }
  });
  const headerData = [
    { name: "Kun", size: "12%" },
    { name: "Ombor", size: "12%" },
    { name: "Mahsulot", size: "12%" },
    { name: "Miqdor", size: "12%" },
    { name: "Qoldiq", size: "12%" },
    { name: "Guruh", size: "12%" },
    { name: "Ta'rif", size: "12%" },
    { name: "Tafsilot", size: "10%", position: "center" },
  ];
  const displayKeys = [
    { name: "st1_name", size: "12%" },
    { name: "item_name", size: "12%" },
    { name: "amount", size: "12%", position: "flex-end" },
    { name: "waste", size: "12%", position: "flex-end" },
    { name: "invoice_group", size: "12%" },
    { name: "description", size: "12%" },
  ];

  return (
    <div className="storage_container">
      <UniversalFilterBox />
      <div className="storage_body">
        <p>
          <span>Maydalash</span>
        </p>
        <div className="storage_body_item _item-header">
          <label>
            <input
              type="checkbox"
              name="id"
              checked={checked}
              onChange={() => {
                setChecked(!checked);
                dispatch(checked ? setRelease("cutting") : setAllDocuments("cutting", dmData?.data));
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
                  justifyContent: item?.position,
                }}
                onClick={() => setSort({ id: index, state: !sort.state })}>
                {item?.name}
                {sort.id === index &&
                  (sort.state ? <RiArrowUpSLine /> : <RiArrowDownSLine />)}
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
              const check = ckddt?.cutting?.some((el) => el?.id === item?.id);
              return (
                <div
                  key={item?.id}
                  className={showMore?.includes(item?.id) ? "storage_body__box active" : "storage_body__box"}>
                  <div
                    className={check ? "storage_body_item active" : "storage_body_item"}
                    key={item?.id}
                    onDoubleClick={() => actionItem("cutting", item, check)}>
                    <label aria-label="checked this elements">
                      <input
                        type="checkbox"
                        name="id"
                        checked={check}
                        onChange={() => actionItem("cutting", item, check)}
                      />
                    </label>
                    <p style={{ inlineSize: "var(--univslH)" }}>
                      {item?.order}
                    </p>
                    <p style={{ "--data-line-size": "12%" }}>
                      {item?.time?.split(" ")?.[0]}
                    </p>
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
                    <p
                      style={{
                        "--data-line-size": "10%",
                        justifyContent: "center",
                      }}
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
                        <p
                          style={{ borderRight: "1px solid #ccc5", }}>
                          №
                        </p>
                        <p
                          style={{ "--data-line-size": "35%", borderRight: "1px solid #ccc5", }}>
                          Nomi
                        </p>
                        <p
                          style={{ "--data-line-size": "20%", borderRight: "1px solid #ccc5", }}>
                          Narxi
                        </p>
                        <p
                          style={{ "--data-line-size": "25%", borderRight: "1px solid #ccc5", }}>
                          Tan Narxi
                        </p>
                        <p style={{ "--data-line-size": "15%" }}>Foyda</p>
                      </div>
                      {item?.ingredients?.map((product, ind) => {
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
                            <p style={{ "--data-line-size": "35%" }}>
                              {product.item_name}
                            </p>
                            <p style={{ "--data-line-size": "20%" }}>
                              {product.price}
                            </p>
                            <p style={{ "--data-line-size": "25%" }}>
                              {product?.cost_price}
                            </p>
                            <p style={{ "--data-line-size": "15%" }}>
                              {product?.total_amount}
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
          <InvoicesModal NUM={!isLoading && { num: dmData?.length + 1 }} />
        </Suspense>
      )}
    </div>
  );
};

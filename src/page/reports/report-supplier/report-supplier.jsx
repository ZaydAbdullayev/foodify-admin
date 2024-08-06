import React, { useState, useEffect, lazy, Suspense } from "react";
import "../../storage/storage.css";
import "../universal.css";
import { useSelector } from "react-redux";
import { CalculateTotalQuantity } from "../../../service/calc.service";
import { acOpenUModal } from "../../../redux/u-modal";
import { useDispatch } from "react-redux";

import { LoadingBtn } from "../../../components/loading/loading";
import { acNavStatus } from "../../../redux/navbar.status";
import { UniversalFilterBox } from "../../../components/filter/filter";
import { useFetchDataQuery, usePostDataMutation } from "../../../service/fetch.service";
import { useSearchAppParams } from "../../../hooks/useSearchParam";
const UniversalModal = lazy(() => import("../../../components/modal/modal"));

export const ReportSuppliers = () => {
  const { pair } = useSearchAppParams().getAllParams();
  const user = JSON.parse(localStorage.getItem("user"))?.user || null;
  const today = new Date().toISOString().split("T")[0];
  // const acItem = useSelector((state) => state.values)?.vl;
  const open = useSelector((state) => state.uModal);
  const [postData] = usePostDataMutation();
  const dispatch = useDispatch();
  const { data: spp_data = [], isLoading } = useFetchDataQuery({ url: `/get/supplierReport/${pair?.start || today}/${pair?.end || today}`, tags: ["supplier-report"], });
  const [sort, setSort] = useState({ id: null, state: false });
  const [showMore, setShowMore] = useState();
  const [details, setDetails] = useState({});
  useEffect(() => { dispatch(acNavStatus([0, 4, 6, 7, 15])); }, [dispatch]);

  const depData = []
  const getDetails = async (id, details) => {
    setShowMore((prev) => prev?.includes(id) ? prev?.filter((i) => i !== id) : [...(prev || []), id])
    if (details) return;
    try {
      const result = await postData({ url: `supplierReportDetails/${id}/${pair?.start || today}/${pair?.end || today}`, tags: ["s-r-d"], });
      if (result?.error) return console.log(result.error);
      setDetails((prev) => ({ ...prev, [id]: result?.data?.data }));
    } catch (error) {
      console.error("veri seti bulunamadi");
    }
  }

  const headerData = [
    { name: "Nomi", size: "15%" },
    { name: "Boshlanish vaqt (balans)", position: "center", items: { profit: "Daromad", price: "Xarajat" }, size: "18.4%", },
    { name: "Aylanish (balans)", position: "center", items: { profit: "Daromad", price: "Xarajat" }, size: "18.4%", },
    { name: "Tugash vaqt (balans)", position: "center", items: { profit: "Daromad", price: "Xarajat" }, size: "18.4%", },
    { name: "To'lov", size: "9%" },
    { name: "Tranzaksiyalar", size: "9%" },
    { name: "Tafsilotlar", size: "9%" },
  ];
  const displayKeys = [
    { name: "supplier", size: "15%", border: "none" },
    { name: "items", size: "18.4%", position: "center", children: ["start_total_debit", "start_total_credit"] },
    { name: "items", size: "18.4%", position: "center", children: ["between_total_debit", "between_total_credit"] },
    { name: "items", size: "18.4%", position: "flex-end", children: ["end_total_debit", "end_total_credit"] },
  ];
  const displayTotalKeys = [
    { name: "Umumiy", size: "15%", position: "center", tick: "Umumiy" },
    { name: "items", size: "18.4%", position: "flex-end", children: ["start_total_debit", "start_total_credit"] },
    { name: "items", size: "18.4%", position: "flex-end", children: ["between_total_debit", "between_total_credit"] },
    { name: "items", size: "18.4%", position: "flex-end", children: ["end_total_debit", "end_total_credit"] },
    { name: "remain", size: "9%", position: "flex-end" },
    { name: "remain", size: "9%", position: "flex-end" },
    { name: "remain", size: "9%", position: "flex-end" },
  ];
  const innerHeaderKeys = [
    { name: "№", size: "4%", b: "1px solid #ccc5" },
    { name: "Sana", size: "20%", b: "1px solid #ccc5" },
    { name: "Mablag'", size: "16.5%", b: "1px solid #ccc5" },
    { name: "To'landi", size: "16.5%", b: "1px solid #ccc5" },
    { name: "Qarz", size: "16.5%", b: "1px solid #ccc5" },
    { name: "Tafsif", size: "16.5%", b: "1px solid #ccc5" },
    { name: "To'lash", size: "10%" },
  ];
  const innerDisplayKeys = [
    { name: "order", size: "4%", border: "1px solid #ccc5", p: "center" },
    { name: "time", size: "20%", border: "1px solid #ccc5" },
    { name: "amount", size: "16.5%", border: "1px solid #ccc5" },
    { name: "paid", size: "16.5%", border: "1px solid #ccc5" },
    { name: "for_payment", size: "16.5%", border: "1px solid #ccc5" },
    { name: "description", size: "16.5%", border: "1px solid #ccc5" },
  ];

  const openUModal = () => {
    dispatch(acOpenUModal());
  };

  return (
    <div className="storage_container">
      <UniversalFilterBox />
      <div className="storage_body">
        <p>
          <span>Yetkazuvchilar uchun hisobot</span>
        </p>
        <div className="storage_body_item reports_item _item-header">
          <p style={{ inlineSize: "var(--univslH)" }}>№</p>
          {headerData?.map((item, index) => {
            return (
              <label
                onClick={() => setSort({ id: 1, state: !sort.state })}
                style={{
                  "--data-line-size": item.size,
                  justifyContent: item?.position || "flex-start",
                }}
                aria-label="sort data down of top or top of down"
                key={index}>
                <p>{item.name}</p>
                {item?.items && (
                  <>
                    <span>{item?.items?.profit}</span>
                    <span>{item?.items?.price}</span>
                  </>
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
              spp_data?.data?.map((item, index) => {
              return (
                <div
                  className={showMore?.includes(item?.supplier_id) ? "storage_body__box active" : "storage_body__box"}
                  key={item?.supplier_id}>
                  <div
                    className={"storage_body_item"}>
                    <p style={{ "--data-line-size": "var(--univslH)" }}>
                      {index + 1}
                    </p>
                    {displayKeys?.map(({ name, size, position, children }, index) => (
                      <p
                        key={index}
                        style={{ "--data-line-size": size, justifyContent: position || "flex-start", }}>
                        {name === "items" ? (
                          <>
                            <span className="reports_span">
                              {item?.[children[0]]}
                            </span>
                            <span className="reports_span">
                              {item?.[children[1]]}
                            </span>
                          </>
                        ) : (<>{item[name]}</>)}
                      </p>
                    ))}
                    <p
                      style={{ "--data-line-size": "9%", justifyContent: "center", }}
                      onClick={openUModal}
                      aria-label="to click to add paymetn this order">
                      <u>to'lov</u>
                    </p>
                    <p
                      style={{ "--data-line-size": "9%", justifyContent: "center", }}
                      onClick={() => console.log("hello")}>
                      <u style={showMore?.includes(item?.supplier_id) ? { color: "#787aff" } : {}}>
                        tranzaksiyalar
                      </u>
                    </p>
                    <p
                      style={{ "--data-line-size": "9%", justifyContent: "center", }}
                      onClick={() => getDetails(item?.supplier_id, details?.[item?.supplier_id])}>
                      <u style={showMore?.includes(item?.supplier_id) ? { color: "#787aff" } : {}}>
                        tafsilot
                      </u>
                    </p>
                  </div>
                  {showMore?.includes(item?.supplier_id) && (
                    <div className="storage-body_inner_item">
                      <div className="storage_body_item">
                        {innerHeaderKeys?.map((key, index) => {
                          return (
                            <p style={{ "--data-line-size": key.size, borderRight: key.b, }} key={index}>
                              {key.name}
                            </p>
                          );
                        })}
                      </div>
                      {details?.[item?.supplier_id] ? details?.[item?.supplier_id]?.map((product, ind) => {
                        return (
                          <div className="storage_body_item inner_item">
                            {innerDisplayKeys?.map((key, index) => {
                              return (
                                <p style={{ "--data-line-size": key.size, borderRight: key.border, justifyContent: key.p || "" }} key={index}>
                                  {product[key.name]}
                                </p>
                              );
                            })}
                            <p style={{ "--data-line-size": "10%", justifyContent: "center" }}>
                              <u>to'lash</u>
                            </p>
                          </div>
                        );
                      }) : <span className="loader_box relative"><LoadingBtn /></span>}
                    </div>
                  )}
                </div>
              );
            })
          )}
          <div className={"storage_body_item"} style={{ background: "#3339" }}>
            <p></p>
            {displayTotalKeys?.map(({ name, size, position, tick, children }, index) => (
              <p
                key={index}
                style={{ "--data-line-size": size, justifyContent: position || "flex-start", }}>
                {name === "items" ? (
                  <>
                    <span className="reports_span">
                      {CalculateTotalQuantity(spp_data?.data, children[0])}
                    </span>
                    <span className="reports_span">
                      {CalculateTotalQuantity(spp_data?.data, children[1])}
                    </span>
                  </>
                ) : ""}
                {tick}
              </p>
            ))}
          </div>
        </div>
      </div>
      {open && <Suspense>
        <UniversalModal
          type="cash"
          title="To'lov qilish"
          status={false}>
          <label>
            <input type="date" name="date" defaultValue={today} required />
            <select name="department">
              <option value="default">To'lov guruhi tanlang*</option>
              {depData?.data?.map((item, index) => {
                return (
                  <option value={item.name} key={index}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </label>
          <label>
            <select name="department">
              <option value="default">To'lov category tanlang*</option>
              {depData?.data?.map((item, index) => {
                return (
                  <option value={item.name} key={index}>
                    {item.name}
                  </option>
                );
              })}
            </select>
            <select name="department">
              <option value="default">Kassa tanlang*</option>
              {depData?.data?.map((item, index) => {
                return (
                  <option value={item.name} key={index}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </label>
          <select name="department">
            <option value="default">Yetkazuvchi tanlang*</option>
            {depData?.data?.map((item, index) => {
              return (
                <option value={item.name} key={index}>
                  {item.name}
                </option>
              );
            })}
          </select>
          <select name="department">
            <option value="default">To'lov turi tanlang*</option>
            {depData?.data?.map((item, index) => {
              return (
                <option value={item.name} key={index}>
                  {item.name}
                </option>
              );
            })}
          </select>
          <input type="text" name="price" placeholder="Miqdor" required />
          <input type="text" name="description" placeholder="Tavsif" required />
          <input type="hidden" name="res_id" value={user?.id} />
        </UniversalModal>
      </Suspense>}
    </div>
  );
};

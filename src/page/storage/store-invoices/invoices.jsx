import React, { useState } from "react";
// import { UniversalModal } from "../../../components/modal/modal";
// import { UniversalUModal } from "../../../components/modal/modal";
import { useSelector, useDispatch } from "react-redux";
import { acActive } from "../../../redux/active";
import { storageD } from "../store-data";

import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { LoadingBtn } from "../../../components/loading/loading";
import { data } from "../../../components/modal-calc/components";
import { InvoicesModal } from "./invoices.modal";
import { useGetStIngredientsQuery } from "../../../service/ingredient.service";
import { useGetStInvoiceQuery } from "../../../service/invoices.service";

export const StorageInvoices = () => {
  //   const user = JSON.parse(localStorage.getItem("user"))?.user || null;
  const [sort, setSort] = useState({ id: null, state: false });
  const [checked, setChecked] = useState(false);
  const [checkedData, setCheckedData] = useState([]);
  const [showMore, setShowMore] = useState(null);
  const acItem = useSelector((state) => state.active);
  const dispatch = useDispatch();
  const { data: ingredientData = [] } = useGetStIngredientsQuery();
  const { data: invoiceData = [], isLoading } = useGetStInvoiceQuery();

  const getProduct = (item, amount) => {
    const isChecked = checkedData.some((i) => i.id === item.id);
    if (isChecked) {
      setCheckedData((prevData) =>
        prevData.map((i) =>
          i.id === item.id ? { ...item, amount: parseInt(amount, 10) || 0 } : i
        )
      );
    } else {
      setCheckedData((prevData) => [
        ...prevData,
        { ...item, amount: parseInt(amount, 10) || 0 },
      ]);
    }
  };

  // const sortData = storageD.sort((a, b) => {
  //   if (sort.state) {
  //     return a.name.localeCompare(b.name);
  //   } else {
  //     return b.name.localeCompare(a.name);
  //   }
  // });

  const sortData =
    invoiceData?.data &&
    [...invoiceData?.data].sort((a, b) => {
      if (sort.state) {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

  return (
    <div className="storage_container">
      <div className="storage_header"></div>
      <div className="storage_body">
        <p>To'lovlar</p>
        <div className="storage_body_item">
          <label>
            <input
              type="checkbox"
              name="id"
              onClick={() => setChecked(!checked)}
            />
          </label>
          <p>№</p>
          <label
            onClick={() => setSort({ id: 1, state: !sort.state })}
            style={{ "--data-line-size": "15%" }}
          >
            <p>Kun</p>
            {sort.id === 1 && sort.state ? (
              <RiArrowUpSLine />
            ) : (
              <RiArrowDownSLine />
            )}
          </label>
          <label
            onClick={() => setSort({ id: 1, state: !sort.state })}
            style={{ "--data-line-size": "10%" }}
          >
            <p>Ombor</p>
            {sort.id === 1 && sort.state ? (
              <RiArrowUpSLine />
            ) : (
              <RiArrowDownSLine />
            )}
          </label>
          <label
            onClick={() => setSort({ id: 1, state: !sort.state })}
            style={{ "--data-line-size": "11%" }}
          >
            <p>Yetkazuvchi</p>
            {sort.id === 1 && sort.state ? (
              <RiArrowUpSLine />
            ) : (
              <RiArrowDownSLine />
            )}
          </label>
          <label
            onClick={() => setSort({ id: 1, state: !sort.state })}
            style={{ "--data-line-size": "10%" }}
          >
            <p>Summa</p>
            {sort.id === 1 && sort.state ? (
              <RiArrowUpSLine />
            ) : (
              <RiArrowDownSLine />
            )}
          </label>
          <label
            onClick={() => setSort({ id: 1, state: !sort.state })}
            style={{ "--data-line-size": "10%" }}
          >
            <p>To'langan</p>
            {sort.id === 1 && sort.state ? (
              <RiArrowUpSLine />
            ) : (
              <RiArrowDownSLine />
            )}
          </label>
          <label
            onClick={() => setSort({ id: 1, state: !sort.state })}
            style={{ "--data-line-size": "12%" }}
          >
            <p>To'lanishi k/k</p>
            {sort.id === 1 && sort.state ? (
              <RiArrowUpSLine />
            ) : (
              <RiArrowDownSLine />
            )}
          </label>
          <label
            onClick={() => setSort({ id: 1, state: !sort.state })}
            style={{ "--data-line-size": "12%" }}
          >
            <p>Javobgar</p>
            {sort.id === 1 && sort.state ? (
              <RiArrowUpSLine />
            ) : (
              <RiArrowDownSLine />
            )}
          </label>
          <p style={{ "--data-line-size": "10%", justifyContent: "center" }}>
            Tavsif
          </p>
          <p style={{ "--data-line-size": "8%", justifyContent: "center" }}>
            Tafsilot
          </p>
        </div>
        <div className="storage_body_box">
          {isLoading ? (
            <span className="loader_box relative">
              <LoadingBtn />
            </span>
          ) : (
            sortData?.map((item) => {
              return (
                <div
                  className={
                    showMore === item.id
                      ? "storage_body__box active"
                      : "storage_body__box"
                  }
                >
                  <div
                    className={
                      acItem === item.id
                        ? "storage_body_item active"
                        : "storage_body_item"
                    }
                    key={item.id}
                    onDoubleClick={() =>
                      dispatch(
                        acActive({
                          id: !acItem.id ? item.id : null,
                        })
                      )
                    }
                  >
                    <label
                      onClick={() =>
                        dispatch(
                          acActive({
                            id: !acItem.id ? item.id : null,
                          })
                        )
                      }
                    >
                      {checked ? (
                        <input type="checkbox" name="id" checked />
                      ) : (
                        <input type="checkbox" name="id" />
                      )}
                    </label>
                    <p>{item.id}</p>
                    <p style={{ "--data-line-size": "15%" }}>{item.name}</p>
                    <p
                      style={{
                        "--data-line-size": "10%",
                        justifyContent: "flex-end",
                      }}
                    >
                      {item.remain}
                    </p>
                    <p
                      style={{
                        "--data-line-size": "11%",
                        justifyContent: "flex-end",
                      }}
                    >
                      {item.remain}
                    </p>
                    <p
                      style={{
                        "--data-line-size": "10%",
                        justifyContent: "flex-end",
                      }}
                    >
                      {item.remain}
                    </p>
                    <p
                      style={{
                        "--data-line-size": "10%",
                        justifyContent: "flex-end",
                      }}
                    >
                      {item.remain}
                    </p>
                    <p style={{ "--data-line-size": "12%" }}>{item.dep}</p>
                    <p style={{ "--data-line-size": "12%" }}>{item.category}</p>
                    <p
                      style={{
                        "--data-line-size": "10%",
                        justifyContent: "center",
                      }}
                      onClick={() =>
                        setShowMore(showMore === item.id ? null : item.id)
                      }
                    >
                      <u
                        style={showMore === item.id ? { color: "#787aff" } : {}}
                      >
                        hisoblash
                      </u>
                    </p>
                    <p
                      style={{
                        "--data-line-size": "8%",
                        justifyContent: "center",
                      }}
                      onClick={() =>
                        setShowMore(showMore === item.id ? null : item.id)
                      }
                    >
                      <u
                        style={showMore === item.id ? { color: "#787aff" } : {}}
                      >
                        tarix
                      </u>
                    </p>
                  </div>
                  <div className=" storage-body_inner_item">
                    <div className="storage_body_item">
                      <p
                        style={{
                          borderRight: "1px solid #ccc5",
                        }}
                      >
                        №
                      </p>
                      <p
                        style={{
                          "--data-line-size": "35%",
                          borderRight: "1px solid #ccc5",
                        }}
                      >
                        Nomi
                      </p>
                      <p
                        style={{
                          "--data-line-size": "20%",
                          borderRight: "1px solid #ccc5",
                        }}
                      >
                        Narxi
                      </p>
                      <p
                        style={{
                          "--data-line-size": "25%",
                          borderRight: "1px solid #ccc5",
                        }}
                      >
                        Tan Narxi
                      </p>
                      <p style={{ "--data-line-size": "15%" }}>Foyda</p>
                    </div>
                    {item?.data?.map((product, ind) => {
                      return (
                        <div className="storage_body_item inner_item" key={ind}>
                          <p
                            style={{
                              borderRight: "1px solid #ccc5",
                            }}
                          >
                            {ind + 1}
                          </p>
                          <p style={{ "--data-line-size": "35%" }}>
                            {product.name}
                          </p>
                          <p style={{ "--data-line-size": "20%" }}>
                            {product.password}
                          </p>
                          <p style={{ "--data-line-size": "25%" }}>
                            {item.remain}
                          </p>
                          <p style={{ "--data-line-size": "15%" }}>
                            {item.total}
                          </p>
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
        setCheckedData={setChecked}
        getProduct={getProduct}
      />
    </div>
  );
};

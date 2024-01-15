import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { acActiveThing } from "../../../redux/active";
import { LoadingBtn } from "../../../components/loading/loading";
import { InvoicesModal } from "./cutting.modal";
import { useGetStCuttingQuery } from "../../../service/cutting.service";
import { useGetStorageItemsQuery } from "../../../service/invoices.service";
import { acNavStatus } from "../../../redux/navbar.status";
import { UniversalFilterBox } from "../../../components/filter/filter";

import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

export const StorageCutting = () => {
  const [sort, setSort] = useState({ id: null, state: false });
  const [checked, setChecked] = useState(false);
  const [checkedData, setCheckedData] = useState([]);
  const [showMore, setShowMore] = useState(null);
  const [id, setId] = useState(0);
  const acItem = useSelector((state) => state.activeThing);
  const dispatch = useDispatch();
  const { data: ingredientData = [] } = useGetStorageItemsQuery(id);
  const { data: cuttingData = [], isLoading } = useGetStCuttingQuery();
  React.useEffect(() => {
    dispatch(acNavStatus([0, 1, 2, 3, 6, 7, 9, 15]));
  }, [dispatch]);
  console.log(checkedData);

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
    { name: "storage", size: "12%" },
    { name: "ingredient", size: "12%" },
    { name: "amount", size: "12%", position: "flex-end" },
    { name: "waste", size: "12%", position: "flex-end" },
    { name: "ingredient_group", size: "12%" },
    { name: "description", size: "12%" },
  ];

  return (
    <div className="storage_container">
      <UniversalFilterBox />
      <div className="storage_body">
        <p>
          <span>Maydalash</span>
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
          {headerData?.map((item, index) => {
            return (
              <p
                key={index}
                style={{
                  "--data-line-size": item?.size,
                  justifyContent: item?.position,
                }}
                onClick={() => {
                  setSort({ id: index, state: !sort.state });
                }}
              >
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
              const date = new Date(item?.date).toLocaleDateString("uz-UZ", {
                day: "numeric",
                month: "numeric",
                year: "numeric",
              });
              return (
                <div
                  key={item?.id}
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
                    <p style={{ "--data-line-size": "12%" }}>{date}</p>
                    {displayKeys?.map((key, index) => {
                      return (
                        <p
                          key={index}
                          style={{
                            "--data-line-size": key?.size,
                            justifyContent: key?.position || "flex-start",
                          }}
                        >
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
                            {item?.remain}
                          </p>
                          <p style={{ "--data-line-size": "15%" }}>
                            {item?.total}
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
      />
    </div>
  );
};

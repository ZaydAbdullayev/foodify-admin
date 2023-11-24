import React, { useState } from "react";
// import { UniversalModal } from "../../../components/modal/modal";
// import { UniversalUModal } from "../../../components/modal/modal";
import { useSelector, useDispatch } from "react-redux";
import { acActive } from "../../../redux/active";
import { storageD } from "../store-data";
import { useGetStProductQuery } from "../../../service/s-products.service";

import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { LoadingBtn } from "../../../components/loading/loading";

export const StorageProducts = () => {
  //   const user = JSON.parse(localStorage.getItem("user"))?.user || null;
  const [sort, setSort] = useState({ id: null, state: false });
  const [checked, setChecked] = useState(false);
  //   const [newIngGr, setNewIngGr] = useState(null);
  const [showMore, setShowMore] = useState(null);
  //   const [newGrData, setNewGrData] = useState(null);
  const acItem = useSelector((state) => state.active);
  const dispatch = useDispatch();
  const { data: ingredientData = [], isLoading } = useGetStProductQuery();

  const sortData = storageD.sort((a, b) => {
    if (sort.state) {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  // const sortData =
  //   ingredientData?.data &&
  //   [...ingredientData?.data].sort((a, b) => {
  //     if (sort.state) {
  //       return a.name.localeCompare(b.name);
  //     } else {
  //       return b.name.localeCompare(a.name);
  //     }
  //   });

  return (
    <div className="storage_container">
      <div className="storage_header"></div>
      <div className="storage_body">
        <p>Mahsulotlar</p>
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
            <p>Nomi</p>
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
            <p>Narxi</p>
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
            <p>Tan narxi</p>
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
            <p>Foyda</p>
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
            <p>Foyda%</p>
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
            <p>Kategoriya</p>
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
            <p>Ombor</p>
            {sort.id === 1 && sort.state ? (
              <RiArrowUpSLine />
            ) : (
              <RiArrowDownSLine />
            )}
          </label>
          <p style={{ "--data-line-size": "10%", justifyContent: "center" }}>
            Hisoblash
          </p>
          <p style={{ "--data-line-size": "8%", justifyContent: "center" }}>
            Tarix
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
      {/* <UniversalModal
        type={newIngGr === "new" ? "newIngGr" : "ing"}
        newGrData={{ name: newGrData, res_id: user?.id }}
      >
        <p>Ingredient qo'shish</p>
        <input type="text" name="name" placeholder="Guruh nomi*" required />
        <input type="hidden" name="res_id" value={user?.id} />
        <select name="unit">
          <option value="default">O'lchov birligi tanlang*</option>
          <option value="kg">kg</option>
          <option value="l">litr</option>
          <option value="ta">ta</option>
        </select>
      </UniversalModal>
      <UniversalUModal
        type={newIngGr === "new" ? "newIngGr" : "ing"}
        newGrData={{ name: newGrData, res_id: user?.id }}
      >
        <p>Categoriya qo'shish</p>
        <input
          type="text"
          name="name"
          placeholder="Ingredient nomi*"
          required
        />
        <input type="hidden" name="res_id" value={user?.id} />
        <select name="unit">
          <option value="default">O'lchov birligi tanlang*</option>
          <option value="kg">kg</option>
          <option value="l">litr</option>
          <option value="ta">ta</option>
        </select>
      </UniversalUModal> */}
    </div>
  );
};

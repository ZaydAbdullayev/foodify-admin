import React, { useState, lazy, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { acActiveThing, acPassiveThing } from "../../../redux/active";
import { useNavigate } from "react-router-dom";

import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { LoadingBtn } from "../../../components/loading/loading";
import { acNavStatus } from "../../../redux/navbar.status";
import { UniversalFilterBox } from "../../../components/filter/filter";
import { setDocuments, setRelease } from "../../../redux/deleteFoods";
import { setAllDocuments } from "../../../redux/deleteFoods";
import { useFetchDataQuery } from "../../../service/fetch.service";
const UniversalModal = lazy(() => import("../../../components/modal/modal"));

export const StorageIngredients = () => {
  const user = JSON.parse(localStorage.getItem("user"))?.user || null;
  const [sort, setSort] = useState({ id: null, state: false });
  const [checked, setChecked] = useState(false);
  const [newIngGr, setNewIngGr] = useState(null);
  const [showMore, setShowMore] = useState([]);
  const [newGrData, setNewGrData] = useState(null);
  const [acItem, setAcItem] = useState({ item_id: null });
  const ckddt = useSelector((state) => state.delRouter);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: groupData = [] } = useFetchDataQuery({
    url: `get/ingredientGroups/${user?.id}`,
    tags: ["groups"],
  });
  const { data: ingredientData = [], isLoading } = useFetchDataQuery({
    url: `get/ingredients/${user?.id}`,
    tags: ["ingredient"],
  });
  React.useEffect(() => {
    dispatch(acNavStatus([0, 1, 2, 3, 4, 5, 15]));
  }, [dispatch]);
  const sortData =
    ingredientData?.data &&
    [...ingredientData?.data].sort((a, b) => {
      if (sort.state) {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

  const acionItem = (item) => {
    dispatch(!acItem?.item_id ? acActiveThing(item) : acPassiveThing());
    dispatch(setDocuments("ingredient", item));
    navigate(`?page-code=ingredient`);
    setAcItem(item);
  };

  const headerKeys = [
    { name: "Nomi", size: "40%" },
    { name: "O'lchov birligi", size: "20%" },
    { name: "Guruh", size: "30%" },
    { name: "Narxi", size: "20%" },
  ];

  const displayKeys = [
    { name: "item_name", size: 40 },
    { name: "unit", size: 20, position: "center" },
    { name: "group", size: 30 },
    { name: "price", size: 20, position: "flex-end" },
  ];

  const item_d_hk = [
    { name: "Nomi", size: 21, border: "1px solid #ccc5" },
    { name: "Categoriya", size: 21, border: "1px solid #ccc5" },
    { name: "Bo'lim", size: 21, border: "1px solid #ccc5" },
    { name: "Ombor", size: 21, border: "1px solid #ccc5" },
    { name: "Miqdor", size: 12 },
  ];
  const item_d_dk = [
    { name: "name", size: 21, border: "1px solid #ccc5" },
    { name: "category", size: 21, border: "1px solid #ccc5" },
    { name: "department", size: 21, border: "1px solid #ccc5" },
    { name: "storage", size: 21, border: "1px solid #ccc5" },
    { name: "quantity", size: 12 },
  ];
  const item_p_hk = [
    { name: "Raqam", size: 16, border: "1px solid #ccc5" },
    { name: "Sana", size: 26, border: "1px solid #ccc5" },
    { name: "Harakat", size: 26, border: "1px solid #ccc5" },
    { name: "1x/narxi", size: 26 },
  ];
  const item_p_dk = [
    { name: "order", size: 16, border: "1px solid #ccc5" },
    { name: "date", size: 26, border: "1px solid #ccc5", fix: true },
    { name: "action", size: 26, border: "1px solid #ccc5" },
    { name: "price", size: 26 },
  ];

  return (
    <div className="storage_container">
      <UniversalFilterBox />
      <div className="storage_body">
        <p>
          <span>Ingridientlar</span>
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
                    ? setRelease("ingredient")
                    : setAllDocuments("ingredient", ingredientData?.data)
                );
              }}
              aria-label="checked this elements"
            />
          </label>
          <p style={{ inlineSize: "var(--univslH)" }}>№</p>
          {headerKeys.map((title, index) => (
            <label
              onClick={() => setSort({ id: 1, state: !sort.state })}
              style={{ "--data-line-size": title.size }}
              key={index + 3280}
              aria-label="sort data down of top or top of down">
              <p>{title.name}</p>
              {sort.id === 1 && sort.state ? (
                <RiArrowUpSLine />
              ) : (
                <RiArrowDownSLine />
              )}
            </label>
          ))}
          <p style={{ "--data-line-size": "20%", justifyContent: "center" }}>
            Oyqatlar
          </p>
        </div>
        <div className="storage_body_box">
          {isLoading ? (
            <span className="loader_box relative">
              <LoadingBtn />
            </span>
          ) : (
            sortData?.map((item, index) => {
              const check = ckddt?.ingredient?.find(
                (el) => el.item_id === item.item_id
              );
              return (
                <div
                  className={
                    showMore?.includes(item?.item_id)
                      ? "storage_body__box active"
                      : "storage_body__box"
                  }>
                  <div
                    className={
                      acItem === item.item_id
                        ? "storage_body_item active"
                        : "storage_body_item"
                    }
                    key={item.item_id}
                    onDoubleClick={() => acionItem(item)}>
                    <label aria-label="checked this elements">
                      <input
                        type="checkbox"
                        name="id"
                        checked={check}
                        onChange={() => acionItem(item)}
                      />
                    </label>
                    <p style={{ inlineSize: "var(--univslH)" }}>{index + 1}</p>
                    {displayKeys.map((key, ind) => (
                      <p
                        style={{
                          "--data-line-size": `${key.size}%`,
                          justifyContent: key.position || "flex-start",
                        }}
                        key={ind + key.size}>
                        {item[key.name]}
                      </p>
                    ))}
                    <p
                      style={{
                        "--data-line-size": "20%",
                        justifyContent: "center",
                      }}
                      onClick={() =>
                        setShowMore((prev) =>
                          prev?.includes(item?.item_id)
                            ? prev?.filter((el) => el !== item?.item_id)
                            : [...prev, item?.item_id]
                        )
                      }>
                      <u
                        style={
                          showMore?.includes(item?.item_id)
                            ? { color: "#787aff" }
                            : {}
                        }>
                        ovqatlar
                      </u>
                    </p>
                  </div>
                  {showMore?.includes(item?.item_id) && (
                    <>
                      <div className=" storage-body_inner_item">
                        <div
                          className="storage_body_item"
                          style={{ background: "#454545" }}>
                          <p
                            style={{
                              "--data-line-size": "100%",
                              justifyContent: "center",
                            }}>
                            Ovqatlar{" "}
                            {!JSON?.parse(item?.details)?.length ? " yo'q" : ""}
                          </p>
                        </div>
                        <div
                          className="storage_body_item"
                          style={{
                            display: JSON?.parse(item?.details)?.length
                              ? "flex"
                              : "none",
                            background: "#454545",
                          }}>
                          <p
                            style={{
                              borderRight: "1px solid #ccc5",
                            }}>
                            №
                          </p>
                          {item_d_hk.map(({ name, size, border }, index) => (
                            <p
                              style={{
                                "--data-line-size": `${size}%`,
                                justifyContent: "center",
                                borderRight: border,
                              }}
                              key={`${index}_${name}`}>
                              {name}
                            </p>
                          ))}
                        </div>
                        {JSON?.parse(item?.details)?.map((product, ind) => {
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
                              {item_d_dk.map(
                                ({ name, size, border }, index) => (
                                  <p
                                    style={{
                                      "--data-line-size": `${size}%`,
                                      justifyContent: "center",
                                      borderRight: border,
                                    }}
                                    key={`${index}_${name}`}>
                                    {product[name]}
                                  </p>
                                )
                              )}
                            </div>
                          );
                        })}
                      </div>
                      <div className=" storage-body_inner_item">
                        <div
                          className="storage_body_item"
                          style={{ background: "#454545" }}>
                          <p
                            style={{
                              "--data-line-size": "100%",
                              justifyContent: "center",
                            }}>
                            Faktura narxi{" "}
                            {!JSON?.parse(item?.priceAction)?.length
                              ? " yo'q"
                              : ""}
                          </p>
                        </div>
                        <div
                          className="storage_body_item"
                          style={{
                            display: JSON?.parse(item?.priceAction)?.length
                              ? "flex"
                              : "none",
                            background: "#454545",
                          }}>
                          <p
                            style={{
                              borderRight: "1px solid #ccc5",
                            }}>
                            №
                          </p>
                          {item_p_hk.map(({ name, size, border }, index) => (
                            <p
                              style={{
                                "--data-line-size": `${size}%`,
                                justifyContent: "center",
                                borderRight: border,
                              }}
                              key={`${index}_${name}`}>
                              {name}
                            </p>
                          ))}
                        </div>
                        {JSON?.parse(item?.priceAction)?.map((product, ind) => {
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
                              {item_p_dk.map(
                                ({ name, size, border, fix }, index) => (
                                  <p
                                    style={{
                                      "--data-line-size": `${size}%`,
                                      justifyContent: "center",
                                      borderRight: border,
                                    }}
                                    key={`${index}_${name}`}>
                                    {fix
                                      ? new Date(
                                          product[name]
                                        )?.toLocaleDateString()
                                      : product[name]}
                                  </p>
                                )
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
      <Suspense>
        <UniversalModal
          type={newIngGr === "new" ? "newIngGr" : "ing"}
          newGrData={{ name: newGrData, res_id: user?.id }}
          setChecked={setChecked}
          title="Ingredient qo'shish"
          status={acItem.item_id ? false : true}>
          <input
            type="text"
            name="item_name"
            defaultValue={acItem.item_name}
            placeholder="Ingredient nomi*"
            required
          />
          <input type="hidden" name="res_id" value={user?.id} />
          {acItem.item_id && (
            <input type="hidden" name="item_id" value={acItem?.item_id} />
          )}
          <select name="unit">
            {acItem?.unit ? (
              <option value={acItem.unit}>{acItem.unit}</option>
            ) : (
              <option value="default">O'ljov birligi</option>
            )}
            <option value="kg">kg</option>
            <option value="l">litr</option>
            <option value="ta">ta</option>
          </select>
          <select name="group" onChange={(e) => setNewIngGr(e.target.value)}>
            {acItem?.group ? (
              <option value={acItem.group}>{acItem.group}</option>
            ) : (
              <option value="default">Guruh tanlang*</option>
            )}
            {groupData?.data?.map((item, index) => {
              return (
                <option value={item.name} key={index}>
                  {item.name}
                </option>
              );
            })}
            <option value="new">Yangi guruh</option>
          </select>
          {newIngGr === "new" && (
            <input
              type="text"
              name="group"
              placeholder="Yangi guruh nomi*"
              required
              onChange={(e) => setNewGrData(e.target.value)}
            />
          )}
        </UniversalModal>
      </Suspense>
    </div>
  );
};

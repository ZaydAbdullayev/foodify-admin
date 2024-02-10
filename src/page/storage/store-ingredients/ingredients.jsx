import React, { useState } from "react";
import { UniversalModal } from "../../../components/modal/modal";
import { useSelector, useDispatch } from "react-redux";
import { acActiveThing, acPassiveThing } from "../../../redux/active";
import { useGetStGroupsQuery } from "../../../service/groups.service";
import { useGetStIngredientsQuery } from "../../../service/ingredient.service";
import { useNavigate } from "react-router-dom";

import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { LoadingBtn } from "../../../components/loading/loading";
import { acNavStatus } from "../../../redux/navbar.status";
import { UniversalFilterBox } from "../../../components/filter/filter";
import {
  setAllDocuments,
  setDocuments,
  setRelease,
} from "../../../redux/deleteFoods";

export const StorageIngredients = () => {
  const user = JSON.parse(localStorage.getItem("user"))?.user || null;
  const [sort, setSort] = useState({ id: null, state: false });
  const [checked, setChecked] = useState(false);
  const [newIngGr, setNewIngGr] = useState(null);
  const [showMore, setShowMore] = useState(null);
  const [newGrData, setNewGrData] = useState(null);
  const acItem = useSelector((state) => state.activeThing);
  const ckddt = useSelector((state) => state.delRouter);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: groupData = [] } = useGetStGroupsQuery();
  const { data: ingredientData = [], isLoading } = useGetStIngredientsQuery();
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

  return (
    <div className="storage_container">
      <UniversalFilterBox />
      <div className="storage_body">
        <p>
          <span>Ingridientlar</span>
        </p>
        <div className="storage_body_item">
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
            />
          </label>
          <p>№</p>
          <label
            onClick={() => setSort({ id: 1, state: !sort.state })}
            style={{ "--data-line-size": "40%" }}
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
            style={{ "--data-line-size": "20%" }}
          >
            <p>O'lchov birligi</p>
            {sort.id === 1 && sort.state ? (
              <RiArrowUpSLine />
            ) : (
              <RiArrowDownSLine />
            )}
          </label>
          <label
            onClick={() => setSort({ id: 1, state: !sort.state })}
            style={{ "--data-line-size": "30%" }}
          >
            <p>Guruh</p>
            {sort.id === 1 && sort.state ? (
              <RiArrowUpSLine />
            ) : (
              <RiArrowDownSLine />
            )}
          </label>
          <label
            onClick={() => setSort({ id: 1, state: !sort.state })}
            style={{ "--data-line-size": "20%" }}
          >
            <p>Narxi</p>
            {sort.id === 1 && sort.state ? (
              <RiArrowUpSLine />
            ) : (
              <RiArrowDownSLine />
            )}
          </label>
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
              const check = ckddt?.ingredient?.find((el) => el.id === item.id);
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
                    onDoubleClick={() => {
                      dispatch(
                        !acItem?.id ? acActiveThing(item) : acPassiveThing()
                      );
                      dispatch(setDocuments("ingredient", item));
                      navigate(`?page-code=ingredient`);
                    }}
                  >
                    <label
                      onClick={() => {
                        dispatch(
                          !acItem?.id ? acActiveThing(item) : acPassiveThing()
                        );
                        dispatch(setDocuments("ingredient", item));
                        navigate(`?page-code=ingredient`);
                      }}
                    >
                      <input type="checkbox" name="id" defaultChecked={check} />
                    </label>
                    <p>{index + 1}</p>
                    <p style={{ "--data-line-size": "40%" }}>{item.name}</p>
                    <p style={{ "--data-line-size": "20%" }}>{item.unit}</p>
                    <p style={{ "--data-line-size": "30%" }}>{item.group}</p>
                    <p
                      style={{
                        "--data-line-size": "20%",
                        justifyContent: "flex-end",
                      }}
                    >
                      {item.price}
                    </p>
                    <p
                      style={{
                        "--data-line-size": "20%",
                        justifyContent: "center",
                      }}
                      onClick={() =>
                        setShowMore(showMore === item.id ? null : item.id)
                      }
                    >
                      <u
                        style={showMore === item.id ? { color: "#787aff" } : {}}
                      >
                        ovqatlar
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
      <UniversalModal
        type={newIngGr === "new" ? "newIngGr" : "ing"}
        newGrData={{ name: newGrData, res_id: user?.id }}
        setChecked={setChecked}
        title="Ingredient qo'shish"
        status={acItem.id ? false : true}
      >
        <input
          type="text"
          name="name"
          defaultValue={acItem.name}
          placeholder="Ingredient nomi*"
          required
        />
        <input type="hidden" name="res_id" value={user?.id} />
        {acItem.id && <input type="hidden" name="id" value={acItem?.id} />}
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
            name="name"
            placeholder="Yangi guruh nomi*"
            required
            onChange={(e) => setNewGrData(e.target.value)}
          />
        )}
      </UniversalModal>
    </div>
  );
};

import React, { useState } from "react";
import { UniversalModal } from "../../../components/modal/modal";
import { useSelector, useDispatch } from "react-redux";
import { acActiveThing, acPassiveThing } from "../../../redux/active";
import { useGetStoreDepQuery } from "../../../service/dep.service";
import { useGetStoreQuery } from "../../../service/store.service";
import { LoadingBtn } from "../../../components/loading/loading";
import { acNavStatus } from "../../../redux/navbar.status";
import { useNavigate } from "react-router-dom";

import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { UniversalFilterBox } from "../../../components/filter/filter";
import { setDocuments, setRelease } from "../../../redux/deleteFoods";
import { setAllDocuments } from "../../../redux/deleteFoods";

export const StorageDep = () => {
  const user = JSON.parse(localStorage.getItem("user"))?.user || null;
  const [sort, setSort] = useState({ id: null, state: false });
  const [checked, setChecked] = useState(false);
  const acItem = useSelector((state) => state.activeThing);
  const ckddt = useSelector((state) => state.delRouter);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: depData = [], isLoading } = useGetStoreDepQuery();
  const { data: storeData = [] } = useGetStoreQuery();
  React.useEffect(() => {
    dispatch(acNavStatus([0, 1, 2, 3]));
  }, [dispatch]);

  const sortData =
    depData?.data &&
    [...depData.data].sort((a, b) => {
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
          <span>Bo'limlar</span>
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
                    ? setRelease("main")
                    : setAllDocuments("main", depData?.data)
                );
              }}
            />
          </label>
          <p>№</p>
          <label
            onClick={() => setSort({ id: 1, state: !sort.state })}
            style={{ "--data-line-size": "40%" }}
          >
            <p>Bo'limlar</p>
            {sort.id === 1 && sort.state ? (
              <RiArrowUpSLine />
            ) : (
              <RiArrowDownSLine />
            )}
          </label>
          <label
            onClick={() => setSort({ id: 1, state: !sort.state })}
            style={{ "--data-line-size": "40%" }}
          >
            <p>Ombor</p>
            {sort.id === 1 && sort.state ? (
              <RiArrowUpSLine />
            ) : (
              <RiArrowDownSLine />
            )}
          </label>
        </div>
        <div className="storage_body_box">
          {isLoading ? (
            <span className="loader_box relative">
              <LoadingBtn />
            </span>
          ) : (
            sortData?.map((item, index) => {
              const check = ckddt?.main?.some((el) => el?.id === item?.id);
              return (
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
                    dispatch(setDocuments("main", item));
                    navigate(`?page-code=main`);
                  }}
                >
                  <label
                    onClick={() => {
                      dispatch(
                        !acItem?.id ? acActiveThing(item) : acPassiveThing()
                      );
                      dispatch(setDocuments("main", item));
                      navigate(`?page-code=main`);
                    }}
                  >
                    <input type="checkbox" name="id" defaultChecked={check} />
                  </label>
                  <p>{index + 1}</p>
                  <p style={{ "--data-line-size": "40%" }}>{item.name}</p>
                  <p style={{ "--data-line-size": "40%" }}>{item.storage}</p>
                </div>
              );
            })
          )}
        </div>
      </div>
      <UniversalModal
        type="dep"
        setChecked={setChecked}
        title="Bo'lim qo'shish"
        status={acItem.id ? false : true}
      >
        <input
          type="text"
          name="name"
          placeholder="Bo'lim nomi*"
          defaultValue={acItem.name}
          required
        />
        <input type="hidden" name="res_id" value={user?.id} />
        {acItem.id && <input type="hidden" name="id" value={acItem?.id} />}
        <select name="storage">
          {acItem.id ? (
            <option value={acItem.storage}>{acItem.storage}</option>
          ) : (
            <option value="default">Ombor tanlang</option>
          )}
          {storeData?.data?.map((item) => {
            return (
              <option value={item?.name} key={item.id}>
                {item?.name}
              </option>
            );
          })}
        </select>
      </UniversalModal>
    </div>
  );
};

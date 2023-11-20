import React, { useState } from "react";
import "./storage.css";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { UniversalModal } from "../../components/modal/modal";
import { useSelector, useDispatch } from "react-redux";
import { acActive } from "../../redux/active";
import { storageD } from "./store-data";
import { Outlet } from "react-router-dom";
import { useGetStoreQuery } from "../../service/store.service";
import { LoadingBtn } from "../../components/loading/loading";

export const Storage = () => {
  const user = JSON.parse(localStorage.getItem("user"))?.user || null;
  const [sort, setSort] = useState({ id: null, state: false });
  const [checked, setChecked] = useState(false);
  const acItem = useSelector((state) => state.active);
  const dispatch = useDispatch();
  const { data = [], isLoading } = useGetStoreQuery();
  console.log(data?.data);

  const sortData =
    data?.data &&
    [...data.data].sort((a, b) => {
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
        <p>Omborlar</p>
        <div className="storage_body_item">
          <label>
            <input
              type="checkbox"
              name="id"
              onClick={() => setChecked(!checked)}
            />
          </label>
          <p>№</p>
          <label onClick={() => setSort({ id: 1, state: !sort.state })}>
            <p>Nomi</p>
            {sort.id === 1 && sort.state ? (
              <RiArrowUpSLine />
            ) : (
              <RiArrowDownSLine />
            )}
          </label>
        </div>
        <div className="storage_body_box">
          {isLoading ? (
            <span className="loading_box relative">
              <LoadingBtn />
            </span>
          ) : (
            sortData?.map((item, index) => {
              return (
                <div
                  className={
                    acItem === item.id
                      ? "storage_body_item active"
                      : "storage_body_item"
                  }
                  key={item.id}
                  onClick={() => dispatch(acActive(item.id))}
                >
                  <label>
                    {checked ? (
                      <input type="checkbox" name="id" checked />
                    ) : (
                      <input type="checkbox" name="id" />
                    )}
                  </label>
                  <p>{index + 1}</p>
                  <p style={{ "--data-line-size": "21%" }}>{item.name}</p>
                </div>
              );
            })
          )}
        </div>
      </div>
      <UniversalModal type="main">
        <p>Ombor qo'shish</p>
        <input type="text" name="name" placeholder="Ombor nomi*" required />
        <input type="hidden" name="res_id" value={user?.id} />
      </UniversalModal>
    </div>
  );
};

export const StorageBlog = () => {
  return <Outlet />;
};

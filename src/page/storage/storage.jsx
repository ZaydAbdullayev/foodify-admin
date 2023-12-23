import React, { useState } from "react";
import "./storage.css";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { UniversalModal, UniversalUModal } from "../../components/modal/modal";
import { useSelector, useDispatch } from "react-redux";
import { acActive } from "../../redux/active";
import { Outlet } from "react-router-dom";
import { useGetStoreQuery } from "../../service/store.service";
import { LoadingBtn } from "../../components/loading/loading";
import { acNavStatus } from "../../redux/navbar.status";

export const Storage = () => {
  const user = JSON.parse(localStorage.getItem("user"))?.user || null;
  const [sort, setSort] = useState({ id: null, state: false });
  const [checked, setChecked] = useState(false);
  const acItem = useSelector((state) => state.active);
  const dispatch = useDispatch();
  const { data = [], isLoading } = useGetStoreQuery();
  dispatch(acNavStatus([0, 1, 2, 3]));

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
            <span className="loader_box relative">
              <LoadingBtn />
            </span>
          ) : (
            sortData?.map((item, index) => {
              return (
                <div
                  className={
                    acItem.id === item.id
                      ? "storage_body_item active"
                      : "storage_body_item"
                  }
                  key={item.id}
                  onDoubleClick={() =>
                    dispatch(
                      acActive({
                        id: !acItem.id ? item.id : null,
                        name: !acItem.name ? item.name : "",
                      })
                    )
                  }
                >
                  <label
                    onClick={() =>
                      dispatch(
                        acActive({
                          id: !acItem.id ? item.id : null,
                          name: !acItem.name ? item.name : "",
                        })
                      )
                    }
                  >
                    {checked ? (
                      <input type="checkbox" name="id" checked />
                    ) : acItem.id === item.id ? (
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
      <UniversalUModal type="main" setChecked={setChecked}>
        <p>Taxrirlash</p>
        <input
          type="text"
          name="name"
          defaultValue={acItem.name}
          placeholder="Ombor nomi*"
          required
        />
        <input type="hidden" name="res_id" value={user?.id} />
        <input type="hidden" name="id" value={acItem.id} />
      </UniversalUModal>
    </div>
  );
};

export const Blog = () => {
  return <Outlet />;
};

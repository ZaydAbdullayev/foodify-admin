import React, { useState } from "react";
import { UniversalModal } from "../../../components/modal/modal";
import { UniversalUModal } from "../../../components/modal/modal";
import { useSelector, useDispatch } from "react-redux";
import { acActive } from "../../../redux/active";
import { useGetStoreDepQuery } from "../../../service/dep.service";
import { useGetStoreQuery } from "../../../service/store.service";
import { LoadingBtn } from "../../../components/loading/loading";

import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

export const StorageDep = () => {
  const user = JSON.parse(localStorage.getItem("user"))?.user || null;
  const [sort, setSort] = useState({ id: null, state: false });
  const [checked, setChecked] = useState(false);
  const acItem = useSelector((state) => state.active);
  const dispatch = useDispatch();
  const { data: depData = [], isLoading } = useGetStoreDepQuery();
  const { data: storeData = [] } = useGetStoreQuery();

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
      <div className="storage_header"></div>
      <div className="storage_body">
        <p>Bo'limlar</p>
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
              return (
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
                        name: !acItem.name ? item.name : "",
                        storage: !acItem.storage ? item.storage : "",
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
                          storage: !acItem.storage ? item.storage : "",
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
                  <p>{index + 1}</p>
                  <p style={{ "--data-line-size": "40%" }}>{item.name}</p>
                  <p style={{ "--data-line-size": "40%" }}>{item.dep}</p>
                </div>
              );
            })
          )}
        </div>
      </div>
      <UniversalModal type="dep">
        <p>Bo'lim qo'shish</p>
        <input type="text" name="name" placeholder="Bo'lim nomi*" required />
        <input type="hidden" name="res_id" value={user?.id} />
        <select name="storage">
          <option value="default">Ombor tanlang*</option>
          {storeData?.data?.map((item) => {
            return (
              <option value={item?.name} key={item.id}>
                {item?.name}
              </option>
            );
          })}
        </select>
      </UniversalModal>
      <UniversalUModal type="dep">
        <p>Taxrirlash</p>
        <input
          type="text"
          name="name"
          placeholder="Bo'lim nomi*"
          defaultValue={acItem.name}
          required
        />
        <input type="hidden" name="res_id" value={user?.id} />
        <select name="storage">
          <option value={acItem.storage}>{acItem.storage}</option>
          {storeData?.data?.map((item) => {
            return (
              <option value={item?.name} key={item.id}>
                {item?.name}
              </option>
            );
          })}
        </select>
      </UniversalUModal>
    </div>
  );
};

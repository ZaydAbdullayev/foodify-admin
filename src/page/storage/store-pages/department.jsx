import React, { useState } from "react";
import { UniversalModal } from "../../../components/modal/modal";
import { useSelector, useDispatch } from "react-redux";
import { acActive } from "../../../redux/active";
import { storageD } from "../store-data";

import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

export const StorageDep = () => {
  const [sort, setSort] = useState({ id: null, state: false });
  const [checked, setChecked] = useState(false);
  const acItem = useSelector((state) => state.active);
  const dispatch = useDispatch();

  const sortData = storageD.sort((a, b) => {
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
          {sortData?.map((item) => {
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
                <p>{item.id}</p>
                <p style={{ "--data-line-size": "40%" }}>{item.name}</p>
                <p style={{ "--data-line-size": "40%" }}>{item.dep}</p>
              </div>
            );
          })}
        </div>
      </div>
      <UniversalModal>
        <p>Bo'lim qo'shish</p>
        <input type="text" name="name" placeholder="Bo'lim nomi*" required />
        <select name="department">
          <option value="default">Ombor tanlang*</option>
          {storageD.map((item, index) => {
            return (
              <option value={item.name} key={index}>
                {item.name}
              </option>
            );
          })}
        </select>
      </UniversalModal>
    </div>
  );
};

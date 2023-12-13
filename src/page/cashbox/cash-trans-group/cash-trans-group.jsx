import React, { useState } from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { UniversalUModal } from "../../../components/modal/modal";
import { UniversalModal } from "../../../components/modal/modal";
import { useSelector, useDispatch } from "react-redux";
import { acActive } from "../../../redux/active";
import { useGetStoreQuery } from "../../../service/store.service";
import { LoadingBtn } from "../../../components/loading/loading";

export const TransactionGroups = () => {
  const user = JSON.parse(localStorage.getItem("user"))?.user || null;
  const [sort, setSort] = useState({ id: null, state: false });
  const [checked, setChecked] = useState(false);
  const acItem = useSelector((state) => state.active);
  const dispatch = useDispatch();
  const { data = [], isLoading } = useGetStoreQuery();

  const sortData =
    data?.data &&
    [...data.data].sort((a, b) => {
      if (sort.state) {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

  const headerData = [
    { name: "Nomi", size: "60%" },
    { name: "To'lov turi", size: "34%" },
  ];

  const displayKeys = [
    { name: "name", size: "60%" },
    { name: "name", size: "34%", position: 1 },
  ];

  return (
    <div className="storage_container">
      <div className="storage_header"></div>
      <div className="storage_body">
        <p>O'tkazmalar ro'yxati</p>
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
              <label
                onClick={() => setSort({ id: 1, state: !sort.state })}
                style={{ "--data-line-size": item.size, border: "none" }}
                key={index}
              >
                <p>{item.name}</p>
                {sort.id === 1 && sort.state ? (
                  <RiArrowUpSLine />
                ) : (
                  <RiArrowDownSLine />
                )}
              </label>
            );
          })}
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
                    ) : (
                      <input type="checkbox" name="id" />
                    )}
                  </label>
                  <p>{index + 1}</p>
                  {displayKeys?.map(({ name, size, position }) => (
                    <p
                      key={name}
                      style={{
                        "--data-line-size": size,
                        justifyContent: position
                          ? position === 1
                            ? "center"
                            : "flex-end"
                          : "flex-start",
                      }}
                    >
                      {item[name]}
                    </p>
                  ))}
                </div>
              );
            })
          )}
        </div>
      </div>
      <UniversalModal type="cashbox">
        <p>Kassa qo'shish</p>
        <input type="text" name="name" placeholder="Kassa nomi*" required />
        <select name="payment_type">
          <option value="default">To'lov turini tanlang*</option>
          <option value="1">Naqd</option>
          <option value="2">Plastik</option>
        </select>
        <input type="hidden" name="res_id" value={user?.id} />
      </UniversalModal>
      <UniversalUModal type="cashbox">
        <p>Taxrirlash</p>
        <input
          type="text"
          name="name"
          defaultValue={acItem.name}
          placeholder="Kassa nomi*"
          required
        />
        <select name="payment_type">
          <option value="default">To'lov turini tanlang*</option>
          <option value="1">Naqd</option>
          <option value="2">Plastik</option>
        </select>
        <input type="hidden" name="res_id" value={user?.id} />
        <input type="hidden" name="id" value={acItem.id} />
      </UniversalUModal>
    </div>
  );
};

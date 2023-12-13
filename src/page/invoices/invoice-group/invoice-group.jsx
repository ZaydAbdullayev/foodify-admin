import React, { useState } from "react";
import { UniversalModal } from "../../../components/modal/modal";
import { UniversalUModal } from "../../../components/modal/modal";
import { useSelector, useDispatch } from "react-redux";
import { acActive } from "../../../redux/active";
import { useGetStInvoiceGroupQuery } from "../../../service/invoice-group.service";

import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { LoadingBtn } from "../../../components/loading/loading";

export const InvoicesGroups = () => {
  const user = JSON.parse(localStorage.getItem("user"))?.user || null;
  const [sort, setSort] = useState({ id: null, state: false });
  const [checked, setChecked] = useState(false);
  const acItem = useSelector((state) => state.active);
  const dispatch = useDispatch();
  const { data: groupData = [], isLoading } = useGetStInvoiceGroupQuery();

  const sortData =
    groupData?.data &&
    [...groupData.data].sort((a, b) => {
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
        <p>Guruhlar</p>
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
            style={{ "--data-line-size": "94%" }}
          >
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
            <span>
              <LoadingBtn />
            </span>
          ) : (
            sortData?.map((item, index) => {
              return (
                <div className={"storage_body__box"}>
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
                    <p style={{ "--data-line-size": "94%" }}>{item.name}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      <UniversalModal type="invGr">
        <p>Guruh qo'shish</p>
        <input type="text" name="name" placeholder="Guruh nomi*" required />
        <input type="hidden" name="res_id" value={user?.id} />
      </UniversalModal>
      <UniversalUModal type="invGr">
        <p>Taxrirlash</p>
        <input
          type="text"
          name="name"
          placeholder="Guruh nomi*"
          defaultValue={acItem.name}
          required
        />
        <input type="hidden" name="res_id" value={user?.id} />
        <input type="hidden" name="id" value={acItem?.id} />
      </UniversalUModal>
    </div>
  );
};

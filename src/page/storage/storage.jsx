import React, { useState, useEffect } from "react";
import "./storage.css";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { UniversalModal } from "../../components/modal/modal";
import { useSelector, useDispatch } from "react-redux";
import { acActiveThing, acPassiveThing } from "../../redux/active";
import { Outlet } from "react-router-dom";
import { useGetStoreQuery } from "../../service/store.service";
import { LoadingBtn } from "../../components/loading/loading";
import { acNavStatus } from "../../redux/navbar.status";
import { UniversalFilterBox } from "../../components/filter/filter";
import {
  setAllDocuments,
  setDocuments,
  setRelease,
} from "../../redux/deleteFoods";
import { useNavigate } from "react-router-dom";

export const Storage = () => {
  const user = JSON.parse(localStorage.getItem("user"))?.user || null;
  const [sort, setSort] = useState({ id: null, state: false });
  const [checked, setChecked] = useState(false);
  const acItem = useSelector((state) => state.activeThing);
  const ckddt = useSelector((state) => state.delRouter);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data = [], isLoading } = useGetStoreQuery();
  useEffect(() => {
    dispatch(acNavStatus([0, 1, 2, 3]));
  }, [dispatch]);
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
      <UniversalFilterBox />
      <div className="storage_body">
        <p>
          <span>Omborlar</span>
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
                    ? setRelease("main")
                    : setAllDocuments("main", data?.data)
                );
              }}
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
              const check = ckddt?.main?.some((el) => el.id === item.id);
              return (
                <div
                  className={
                    acItem.id === item.id
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
                  <p style={{ "--data-line-size": "21%" }}>{item.name}</p>
                </div>
              );
            })
          )}
        </div>
      </div>
      <UniversalModal
        type="main"
        setChecked={setChecked}
        title="Ombor qo'shish"
        status={acItem?.id ? false : true}
      >
        <input
          type="text"
          name="name"
          defaultValue={acItem.name}
          placeholder="Ombor nomi*"
          required
        />
        <input type="hidden" name="res_id" value={user?.id} />
        {acItem.id && <input type="hidden" name="id" value={acItem.id} />}
      </UniversalModal>
    </div>
  );
};

export const Blog = () => {
  return <Outlet />;
};

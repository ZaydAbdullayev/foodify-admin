import React, { useState, useEffect, Suspense, lazy } from "react";
import "./storage.css";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { acActiveThing, acPassiveThing } from "../../redux/active";
import { Outlet } from "react-router-dom";
import { LoadingBtn } from "../../components/loading/loading";
import { acNavStatus } from "../../redux/navbar.status";
import { UniversalFilterBox } from "../../components/filter/filter";
import { setDocuments, setRelease } from "../../redux/deleteFoods";
import { setAllDocuments } from "../../redux/deleteFoods";
import { useNavigate } from "react-router-dom";
import { useFetchDataQuery } from "../../service/fetch.service";
const UniversalModal = lazy(() => import("../../components/modal/modal"));

export const Storage = () => {
  const user = JSON.parse(localStorage.getItem("user"))?.user || null;
  const [sort, setSort] = useState({ id: null, state: false });
  const [checked, setChecked] = useState(false);
  const [acItem, setAcItem] = useState();
  const ckddt = useSelector((state) => state.delRouter);
  const res_id = useSelector((state) => state.res_id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data = [], isLoading } = useFetchDataQuery({ url: `get/storage/${res_id}`, tags: ["store"], });
  useEffect(() => {
    dispatch(acNavStatus([0, 1, 2, 3]));
  }, [dispatch]);
  const sortData = data?.data && [...data.data].sort((a, b) => {
    if (sort.state) {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  const actionItem = (item) => {
    dispatch(!acItem?.id ? acActiveThing(item) : acPassiveThing());
    dispatch(setDocuments("main", item));
    navigate(`?page-code=main`);
    setAcItem(item);
  }

  return (
    <div className="storage_container">
      <UniversalFilterBox />
      <div className="storage_body">
        <p>
          <span>Omborlar</span>
        </p>
        <div className="storage_body_item _item-header">
          <label>
            <input
              type="checkbox"
              name="id"
              checked={checked}
              onChange={() => {
                setChecked(!checked);
                dispatch(checked ? setRelease("main") : setAllDocuments("main", data?.data));
              }}
              aria-label="checked this elements"
            />
          </label>
          <p style={{ inlineSize: "var(--univslH)" }}>№</p>
          <label
            onClick={() => setSort({ id: 1, state: !sort.state })}
            aria-label="for sort data and see al info about this product">
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
                    acItem.id === item.id ? "storage_body_item active" : "storage_body_item"}
                  key={item.id}
                  onDoubleClick={() => actionItem(item)}>
                  <label aria-label="checked this elements">
                    <input
                      type="checkbox"
                      name="id"
                      checked={check}
                      onChange={() => actionItem(item)}
                    />
                  </label>
                  <p style={{ inlineSize: "var(--univslH)" }}>{index + 1}</p>
                  <p style={{ "--data-line-size": "21%" }}>{item.name}</p>
                </div>
              );
            })
          )}
        </div>
      </div>
      <Suspense>
        <UniversalModal
          type="main"
          setChecked={setChecked}
          title="Ombor qo'shish"
          status={acItem?.id ? false : true}>
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
      </Suspense>
    </div>
  );
};

export const Blog = () => {
  return <Outlet />;
};

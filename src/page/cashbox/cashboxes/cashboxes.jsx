import React, { useState, lazy, Suspense } from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { acActiveThing } from "../../../redux/active";
import { LoadingBtn } from "../../../components/loading/loading";
import { useFetchDataQuery } from "../../../service/fetch.service";
import { acNavStatus } from "../../../redux/navbar.status";
import { UniversalFilterBox } from "../../../components/filter/filter";
import { setDocuments, setRelease } from "../../../redux/deleteFoods";
import { setAllDocuments } from "../../../redux/deleteFoods";
import { useNavigate } from "react-router-dom";
const UniversalModal = lazy(() => import("../../../components/modal/modal"));

export const Cashboxes = () => {
  const user = JSON.parse(localStorage.getItem("user"))?.user || null;
  const [sort, setSort] = useState({ id: null, state: false });
  const [checked, setChecked] = useState(false);
  const [acItem, setAcItem] = useState();
  const ckddt = useSelector((state) => state.delRouter);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: cashboxData = [], isLoading } = useFetchDataQuery({
    url: `get/cashbox`,
    tags: ["cashbox"],
  });
  React.useEffect(() => {
    dispatch(acNavStatus([0, 1, 2, 3]));
  }, [dispatch]);

  const sortData = cashboxData?.data || [];
  // const sortData = cashboxData?.data && [...(cashboxData?.data || [])]?.sort((a, b) => {
  //   if (sort?.state) {
  //     return a?.name?.localeCompare(b?.name);
  //   } else {
  //     return b?.name?.localeCompare(a?.name);
  //   }
  // });

  const actionItem = (item) => {
    dispatch(acActiveThing(item));
    dispatch(setDocuments("cashbox", { id: item.id, st1_id: item.st1_id }));
    navigate(`?pagecode=cashbox`);
    setAcItem(item);
  };

  return (
    <div className="storage_container">
      <UniversalFilterBox />
      <div className="storage_body">
        <p>
          <span>Kassalar ro'yxati</span>
        </p>
        <div className="storage_body_item _item-header">
          <label aria-label="checked this elements">
            <input
              type="checkbox"
              name="id"
              checked={checked}
              onChange={() => {
                setChecked(!checked);
                dispatch(
                  checked
                    ? setRelease("cashbox")
                    : setAllDocuments("cashbox", cashboxData.data)
                );
              }}
            />
          </label>
          <p style={{ inlineSize: "var(--univslH)" }}>№</p>
          <label
            onClick={() => setSort({ id: 1, state: !sort.state })}
            aria-label="sort data down of top or top of down"
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
            <span className="loader_box relative">
              <LoadingBtn />
            </span>
          ) : (
            sortData?.map((item, index) => {
              const check = ckddt?.cashbox?.some((el) => el?.id === item?.id);
              return (
                <div
                  className={
                    acItem?.id === item.id
                      ? "storage_body_item active"
                      : "storage_body_item"
                  }
                  key={item.id}
                  onDoubleClick={() => actionItem(item)}
                >
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
      {acItem?.id && (
        <Suspense>
          <UniversalModal
            type="cashbox"
            title="Kassa qo'shish"
            status={acItem?.id ? false : true}
          >
            <input
              type="text"
              name="name"
              defaultValue={acItem?.name}
              placeholder="Kassa nomi*"
              required
            />
            <input type="hidden" name="res_id" value={user?.id} />
            {acItem?.id && <input type="hidden" name="id" value={acItem?.id} />}
          </UniversalModal>
        </Suspense>
      )}
    </div>
  );
};

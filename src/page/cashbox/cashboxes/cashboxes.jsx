import React, { useState } from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { UniversalModal } from "../../../components/modal/modal";
import { useSelector, useDispatch } from "react-redux";
import { acActiveThing, acPassiveThing } from "../../../redux/active";
import { LoadingBtn } from "../../../components/loading/loading";
import { useFetchDataQuery } from "../../../service/fetch.service";
import { acNavStatus } from "../../../redux/navbar.status";
import { UniversalFilterBox } from "../../../components/filter/filter";
import { setDocuments, setRelease } from "../../../redux/deleteFoods";
import { setAllDocuments } from "../../../redux/deleteFoods";
import { useNavigate } from "react-router-dom";

export const Cashboxes = () => {
  const user = JSON.parse(localStorage.getItem("user"))?.user || null;
  const [sort, setSort] = useState({ id: null, state: false });
  const [checked, setChecked] = useState(false);
  const acItem = useSelector((state) => state.activeThing);
  const ckddt = useSelector((state) => state.delRouter);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: cashboxData = [], isLoading } = useFetchDataQuery({
    url: `get/cashbox/${user?.id}`,
    tags: ["cashbox"],
  });
  React.useEffect(() => {
    dispatch(acNavStatus([0, 1, 2, 3]));
  }, [dispatch]);

  const sortData =
    cashboxData?.data &&
    [...cashboxData.data].sort((a, b) => {
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
          <span>Kassalar ro'yxati</span>
        </p>
        <div className="storage_body_item _item-header">
          <label aria-label="checked this elements">
            <input
              type="checkbox"
              name="id"
              onClick={() => {
                setChecked(!checked);
                dispatch(
                  checked
                    ? setRelease("cashbox")
                    : setAllDocuments("cashbox", cashboxData.data)
                );
              }}
            />
          </label>
          <p>№</p>
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
                    acItem.id === item.id
                      ? "storage_body_item active"
                      : "storage_body_item"
                  }
                  key={item.id}
                  onDoubleClick={() => {
                    dispatch(
                      !acItem?.id ? acActiveThing(item) : acPassiveThing()
                    );
                    dispatch(setDocuments("cashbox", item));
                    navigate(`?page-code=cashbox`);
                  }}
                >
                  <label
                    aria-label="checked this elements"
                    onClick={() => {
                      dispatch(
                        !acItem?.id ? acActiveThing(item) : acPassiveThing()
                      );
                      dispatch(setDocuments("cashbox", item));
                      navigate(`?page-code=cashbox`);
                    }}
                  >
                    <input type="checkbox" name="id" defaultValue={check} />
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
        type="cashbox"
        title="Kassa qo'shish"
        status={acItem?.id ? false : true}
      >
        <input
          type="text"
          name="name"
          defaultValue={acItem.name}
          placeholder="Kassa nomi*"
          required
        />
        <input type="hidden" name="res_id" value={user?.id} />
        {acItem.id && <input type="hidden" name="id" value={acItem.id} />}
      </UniversalModal>
    </div>
  );
};

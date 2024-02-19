import React, { useState } from "react";
import { UniversalModal } from "../../../components/modal/modal";
import { useSelector, useDispatch } from "react-redux";
import { acActiveThing, acPassiveThing } from "../../../redux/active";
import { useFetchDataQuery } from "../../../service/fetch.service";
import { LoadingBtn } from "../../../components/loading/loading";
import { acNavStatus } from "../../../redux/navbar.status";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";

import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { UniversalFilterBox } from "../../../components/filter/filter";
import { setDocuments, setRelease } from "../../../redux/deleteFoods";
import { setAllDocuments } from "../../../redux/deleteFoods";

import { GoDotFill } from "react-icons/go";

export const InvoicesGroups = () => {
  const user = JSON.parse(localStorage.getItem("user"))?.user || null;
  const [sort, setSort] = useState({ id: null, state: false });
  const [checked, setChecked] = useState(false);
  const [activeIndex, setActiveIndex] = useState(2);
  const acItem = useSelector((state) => state.activeThing);
  const ckddt = useSelector((state) => state.delRouter);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: groupData = [], isLoading } = useFetchDataQuery({
    url: `get/InvoiceGroups/${user?.id}`,
    tags: ["invoice-group"],
  });
  React.useEffect(() => {
    dispatch(acNavStatus([0, 1, 2, 3]));
  }, [dispatch]);

  const sortData =
    groupData?.data &&
    [...groupData.data].sort((a, b) => {
      if (sort.state) {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("LEFT"),
    onSwipedRight: () => handleSwipe("RIGHT"),
    trackMouse: true,
  });

  const handleSwipe = async (direction) => {
    const newIndex = direction === "LEFT" ? activeIndex + 1 : activeIndex - 1;
    await setActiveIndex((newIndex + 3) % 3);
    navigate(
      `/sections/${
        newIndex === 0
          ? "cashbox/transaction-group"
          : newIndex === 1
          ? "groups"
          : "invoice-group"
      }`
    );
  };

  return (
    <div className="storage_container">
      <UniversalFilterBox />
      <div className="storage_body">
        <i>
          <GoDotFill
            onClick={() => navigate("/sections/cashbox/transaction-group")}
            aria-label='target thi link "/sections/cashbox/transaction-group"'
          />
          <GoDotFill
            onClick={() => navigate("/sections/groups")}
            aria-label='target thi link "/sections/groups"'
          />
          <GoDotFill className="active" />
        </i>
        <p {...handlers} className="df-aic-gap">
          <span>
            {"< "} To'lov guruhlari {" >"}
          </span>
        </p>
        <div className="storage_body_item _item-header">
          <label>
            <input
              type="checkbox"
              name="id"
              onClick={() => {
                setChecked(!checked);
                dispatch(
                  checked
                    ? setRelease("invGr")
                    : setAllDocuments("invGr", groupData?.data)
                );
              }}
              aria-label="checked this elements"
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
              const check = ckddt?.invGr?.some((el) => el?.id === item?.id);
              return (
                <div className={"storage_body__box"}>
                  <div
                    className={
                      acItem === item.id
                        ? "storage_body_item active"
                        : "storage_body_item"
                    }
                    key={item.id}
                    onDoubleClick={() => {
                      dispatch(
                        !acItem?.id ? acActiveThing(item) : acPassiveThing()
                      );
                      dispatch(setDocuments("invGr", item));
                      navigate(`?page-code=invGr`);
                    }}
                  >
                    <label
                      onClick={() => {
                        dispatch(
                          !acItem?.id ? acActiveThing(item) : acPassiveThing()
                        );
                        dispatch(setDocuments("invGr", item));
                        navigate(`?page-code=invGr`);
                      }}
                      aria-label="checked this elements"
                    >
                      <input type="checkbox" name="id" defaultChecked={check} />
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
      <UniversalModal
        type="invGr"
        title="Guruh qo'shish"
        status={acItem?.id ? false : true}
      >
        <input
          type="text"
          name="name"
          placeholder="Guruh nomi*"
          defaultValue={acItem.name}
          required
        />
        <input type="hidden" name="res_id" value={user?.id} />
        {acItem.id && <input type="hidden" name="id" value={acItem?.id} />}
      </UniversalModal>
    </div>
  );
};

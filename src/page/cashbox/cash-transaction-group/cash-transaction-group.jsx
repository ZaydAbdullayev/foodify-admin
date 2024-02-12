import React, { useState } from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { UniversalModal } from "../../../components/modal/modal";
import { useSelector, useDispatch } from "react-redux";
import { acActiveThing, acPassiveThing } from "../../../redux/active";
import { LoadingBtn } from "../../../components/loading/loading";
import { useGetCashboxGrQuery } from "../../../service/cashbox-group.service";
import { acNavStatus } from "../../../redux/navbar.status";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";
import { UniversalFilterBox } from "../../../components/filter/filter";
import {
  setAllDocuments,
  setDocuments,
  setRelease,
} from "../../../redux/deleteFoods";
import { GoDotFill } from "react-icons/go";

export const TransactionGroups = () => {
  const user = JSON.parse(localStorage.getItem("user"))?.user || null;
  const [sort, setSort] = useState({ id: null, state: false });
  const [checked, setChecked] = useState(false);
  const [status, setStatus] = useState(false);
  const acItem = useSelector((state) => state.activeThing);
  const ckddt = useSelector((state) => state.delRouter);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data = [], isLoading } = useGetCashboxGrQuery();
  React.useEffect(() => {
    dispatch(acNavStatus([0, 1, 2, 3]));
  }, [dispatch]);

  const sortData =
    data?.data &&
    [...data?.data].sort((a, b) => {
      if (sort.state) {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

  const [activeIndex, setActiveIndex] = useState(0);
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

  const headerData = [
    { name: "Nomi", size: "60%" },
    { name: "To'lov turi", size: "34%" },
  ];

  const displayKeys = [
    { name: "name", size: "60%" },
    { name: "category", size: "34%", position: 1 },
  ];

  return (
    <div className="storage_container">
      <UniversalFilterBox />
      <div className="storage_body">
        <i>
          <GoDotFill className="active" />
          <GoDotFill onClick={() => navigate("/sections/groups")} />
          <GoDotFill onClick={() => navigate("/sections/invoice-group")} />
        </i>
        <p {...handlers} className="df-aic-gap">
          <span>
            {"< "} O'tkazma guruhlari {" >"}
          </span>
        </p>
        <div className="storage_body_item _item-header">
          <label>
            <input
              type="checkbox"
              name="id"
              onClick={() => {
                setChecked(checked ? false : true);
                dispatch(
                  checked
                    ? setRelease("cashboxGr")
                    : setAllDocuments("cashboxGr", data?.data)
                );
              }}
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
              const check = ckddt?.cashboxGr?.some((el) => el.id === item.id);
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
                    dispatch(setDocuments("cashboxGr", item));
                    navigate(`?page-code=cashboxGr`);
                  }}
                >
                  <label
                    onClick={() => {
                      dispatch(
                        !acItem?.id ? acActiveThing(item) : acPassiveThing()
                      );
                      dispatch(setDocuments("cashboxGr", item));
                      navigate(`?page-code=cashboxGr`);
                    }}
                  >
                    <input type="checkbox" name="id" defaultChecked={check} />
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
      <UniversalModal
        type="cashboxGr"
        title={"Kassa qo'shish"}
        status={acItem?.id ? false : true}
      >
        <input type="text" name="name" placeholder="Kassa nomi*" required />
        <select name="category" onChange={(e) => setStatus(e.target.value)}>
          {acItem?.category ? (
            <option value={acItem?.category}>{acItem?.category}</option>
          ) : (
            <option value="default">To'lov turini tanlang*</option>
          )}
          <option value="operating">Operativ</option>
          <option value="finacialy">Moliyaviy</option>
          <option value="invest">Sarmoya</option>
        </select>
        {status === "operating" && (
          <select name="activity_kind">
            {acItem?.activity_kind ? (
              <option value={acItem?.activity_kind}>
                {acItem?.activity_kind}
              </option>
            ) : (
              <option value="default">Faoliyat turi tanlang*</option>
            )}
            <option value="permanent">Doimiy</option>
          </select>
        )}
        <input type="hidden" name="res_id" value={user?.id} />
      </UniversalModal>
    </div>
  );
};

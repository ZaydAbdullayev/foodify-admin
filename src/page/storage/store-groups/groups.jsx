import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetStGroupsQuery } from "../../../service/groups.service";
import { useNavigate } from "react-router-dom";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { useSwipeable } from "react-swipeable";
import { UniversalModal } from "../../../components/modal/modal";
import { acActiveThing, acPassiveThing } from "../../../redux/active";

import { LoadingBtn } from "../../../components/loading/loading";
import { acNavStatus } from "../../../redux/navbar.status";
import { UniversalFilterBox } from "../../../components/filter/filter";
import {
  setAllDocuments,
  setDocuments,
  setRelease,
} from "../../../redux/deleteFoods";
import { GoDotFill } from "react-icons/go";

export const StorageGroups = () => {
  const user = JSON.parse(localStorage.getItem("user"))?.user || null;
  const [sort, setSort] = useState({ id: null, state: false });
  const [checked, setChecked] = useState(false);
  const [showMore, setShowMore] = useState(null);
  const acItem = useSelector((state) => state.activeThing);
  const ckddt = useSelector((state) => state.delRouter);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: groupData = [], isLoading } = useGetStGroupsQuery();
  React.useEffect(() => {
    dispatch(acNavStatus([0, 1, 2, 3]));
  }, [dispatch]);

  const [activeIndex, setActiveIndex] = useState(1);
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
      <UniversalFilterBox />
      <div className="storage_body">
        <i>
          <GoDotFill
            onClick={() => navigate("/sections/cashbox/transaction-group")}
          />
          <GoDotFill className="active" />
          <GoDotFill onClick={() => navigate("/sections/invoice-group")} />
        </i>
        <p {...handlers} className="df-aic-gap">
          <span>
            {"< "} Ingredient guruhlari {" >"}
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
                    ? setRelease("ingGroup")
                    : setAllDocuments("ingGroup", groupData?.data)
                );
              }}
            />
          </label>
          <p>№</p>
          <label
            onClick={() => setSort({ id: 1, state: !sort.state })}
            style={{ "--data-line-size": "60%" }}
          >
            <p>Nomi</p>
            {sort.id === 1 && sort.state ? (
              <RiArrowUpSLine />
            ) : (
              <RiArrowDownSLine />
            )}
          </label>
          <label
            onClick={() => setSort({ id: 1, state: !sort.state })}
            style={{ "--data-line-size": "30%" }}
          >
            <p>Ingredientlar</p>
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
              const check = ckddt?.ingGroup?.find((el) => el.id === item.id);
              return (
                <div
                  className={
                    showMore === item.id
                      ? "storage_body__box active"
                      : "storage_body__box"
                  }
                >
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
                      dispatch(setDocuments("ingGroup", item));
                      navigate(`?page-code=ingGroup`);
                    }}
                  >
                    <label
                      onClick={() => {
                        dispatch(
                          !acItem?.id ? acActiveThing(item) : acPassiveThing()
                        );
                        dispatch(setDocuments("ingGroup", item));
                        navigate(`?page-code=ingGroup`);
                      }}
                    >
                      <input type="checkbox" name="id" defaultChecked={check} />
                    </label>
                    <p>{index + 1}</p>
                    <p
                      style={{ "--data-line-size": "60%", textAlign: "center" }}
                    >
                      {item.name}
                    </p>
                    <p
                      style={{
                        "--data-line-size": "30%",
                        justifyContent: "center",
                      }}
                      onClick={() =>
                        setShowMore(showMore === item.id ? null : item.id)
                      }
                    >
                      <u
                        style={showMore === item.id ? { color: "#787aff" } : {}}
                      >
                        ingredientlar
                      </u>
                    </p>
                  </div>
                  <div className=" storage-body_inner_item">
                    <div className="storage_body_item">
                      <p
                        style={{
                          borderRight: "1px solid #ccc5",
                        }}
                      >
                        №
                      </p>
                      <p
                        style={{
                          "--data-line-size": "25%",
                          borderRight: "1px solid #ccc5",
                        }}
                      >
                        Mahsulot turi
                      </p>
                      <p
                        style={{
                          "--data-line-size": "35%",
                          borderRight: "1px solid #ccc5",
                        }}
                      >
                        Nomi
                      </p>
                      <p
                        style={{
                          "--data-line-size": "35%",
                        }}
                      >
                        O'lchov birligi
                      </p>
                    </div>
                    {item?.data?.map((product, ind) => {
                      return (
                        <div className="storage_body_item inner_item" key={ind}>
                          <p
                            style={{
                              borderRight: "1px solid #ccc5",
                            }}
                          >
                            {ind + 1}
                          </p>
                          <p style={{ "--data-line-size": "25%" }}>
                            {product.name}
                          </p>
                          <p style={{ "--data-line-size": "35%" }}>
                            {product.password}
                          </p>
                          <p style={{ "--data-line-size": "35%" }}>
                            {product.code}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      <UniversalModal
        type="group"
        setChecked={setChecked}
        title="Guruh qo'shish"
        status={acItem.id ? false : true}
      >
        <input
          type="text"
          name="name"
          placeholder="Guruh nomi*"
          defaultValue={acItem?.name}
          required
        />
        <input type="hidden" name="res_id" value={user?.id} />
        {acItem.id && <input type="hidden" name="id" value={acItem?.id} />}
      </UniversalModal>
    </div>
  );
};

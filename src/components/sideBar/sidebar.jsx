import React, { useState } from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { acShrink } from "../../redux/shrink";
import { useLocation } from "react-router-dom";
import { Menu, Menu_customer, Category } from "./menu";

// import { HiChevronRight, HiChevronLeft } from "react-icons/hi";
import { RiMenu2Line, RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import logo from "../../assets/images/logo.png";

export const Sidebar = () => {
  const login = useSelector((state) => state?.permission);
  const isShrinkView = useSelector((state) => state.shrink);
  const dWidth = useSelector((state) => state.dWidth);
  const status = useSelector((state) => state.media);
  // const dispatch = useDispatch();
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [media, setMedia] = useState(false);
  const location = useLocation().pathname;
  const [dFromTop, setDFromTop] = useState(0);

  const handleCategoryClick = (e, c) => {
    setActiveCategoryId((prevCategoryId) =>
      prevCategoryId === c.id ? null : c.id
    );
    findDFromTop(e.target);
  };

  function findDFromTop(element) {
    if (element) {
      const rect = element.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
      const elementWidth = rect.width;
      const elementHeight = rect.height;
      const left = rect.left + scrollLeft + elementWidth / 2;
      const top = rect.top + scrollTop + elementHeight / 2;

      if (dWidth) {
        setDFromTop(left);
      } else {
        setDFromTop(top);
      }
    }

    return null;
  }

  if (!status) {
    setTimeout(() => {
      setMedia(true);
    }, 1000);
  }
  if (status) {
    setTimeout(() => {
      setMedia(false);
    }, 1);
  }

  // const handleSidebarView = () => {
  //   dispatch(acShrink(!acShrink));
  // };

  return (
    <div className={isShrinkView ? "shrink" : "sidebar_container"}>
      <div style={{ borderBottom: "1px solid #eee4" }}>
        {isShrinkView ? (
          <img src={logo} alt="" />
        ) : (
          <div>
            <img src={logo} alt="" />
            Foodify
          </div>
        )}
      </div>
      {/* {media && (
        <div className="shrink_box">
          <h3 onClick={handleSidebarView}>
            {isShrinkView ? <RiMenu2Line /> : "Dashboard"}
          </h3>
          <button onClick={handleSidebarView} type="button">
            {isShrinkView ? <HiChevronRight /> : <HiChevronLeft />}
          </button>
        </div>
      )} */}
      <ul className="menu_box">
        {login?.user?.role === "owner"
          ? Menu.map((item) => {
              return (
                <div key={item?.id}>
                  <Link
                    className={
                      location === item?.path
                        ? "menu_box_item active_menu"
                        : "menu_box_item"
                    }
                    to={item?.path}
                    onClick={() => handleCategoryClick(item?.id)}
                  >
                    <span>{item?.icon}</span> <p>{item?.name}</p>{" "}
                    <i
                      style={
                        item?.list && !isShrinkView ? {} : { display: "none" }
                      }
                    >
                      {activeCategoryId === item?.id ? (
                        <RiArrowDownSLine />
                      ) : (
                        <RiArrowUpSLine />
                      )}
                    </i>
                  </Link>
                  {item?.id === activeCategoryId && (
                    <ul className="inner_menu">
                      {Category.filter(
                        (cat) => cat.id === activeCategoryId
                      ).map((catItem) => (
                        <li key={catItem?.path}>
                          <Link
                            to={`${item?.path}${catItem?.path}`}
                            style={
                              location === `${item?.path}${catItem?.path}`
                                ? { color: "#17b1ea" }
                                : {}
                            }
                          >
                            {isShrinkView ? catItem?.icon : catItem?.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })
          : Menu_customer.map((item) => {
              return (
                <div
                  key={item?.id}
                  className="menu_container"
                  style={item?.permission ? {} : { display: "none" }}
                >
                  <Link
                    className={
                      location.startsWith(item?.path)
                        ? "menu_box_item active_menu"
                        : "menu_box_item"
                    }
                    to={item?.path}
                    onClick={(e) => handleCategoryClick(e, { id: item?.id })}
                  >
                    <span>{item?.icon}</span> <p>{item?.name}</p>
                    {item.id === activeCategoryId && (
                      <ul
                        className="inner_menu"
                        style={{ "--top": `${dFromTop}px` }}
                      >
                        <div className="inner_menu-box">
                          {Category?.filter(
                            (cat) => cat?.id === activeCategoryId
                          ).map((catItem) => (
                            <li
                              key={catItem?.path}
                              className={`inner_menu-item ${
                                location === item?.path ? "active" : ""
                              }`}
                              style={{
                                "--value1": `${catItem?.positions[0]}deg`,
                                "--value2": `${catItem?.positions[1]}deg`,
                                "--value3": `${catItem?.positions[2]}px`,
                              }}
                            >
                              <Link to={`${item?.path}${catItem?.path}`}>
                                {isShrinkView ? (
                                  catItem?.icon
                                ) : (
                                  <>
                                    {catItem?.icon}
                                    {catItem?.name}
                                  </>
                                )}
                              </Link>
                            </li>
                          ))}
                        </div>
                      </ul>
                    )}
                  </Link>
                </div>
              );
            })}
      </ul>
    </div>
  );
};

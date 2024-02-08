import React, { useState, useEffect } from "react";
import "./sidebar.css";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, Menu_customer, Category } from "./menu";

import logo from "../../assets/images/logo.png";

export const Sidebar = () => {
  const login = useSelector((state) => state?.permission);
  const isShrinkView = useSelector((state) => state.shrink);
  const dWidth = useSelector((state) => state.dWidth);
  const side = useSelector((state) => state.side);
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [dFromTop, setDFromTop] = useState(0);
  const location = useLocation().pathname;

  useEffect(() => {
    setActiveCategoryId(null);
  }, [side]);

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

  const sides = login?.user?.role === "owner" ? Menu : Menu_customer;
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
        {sides?.map((item) => {
          return (
            <div
              key={item?.id}
              className="menu_container"
              style={item?.permission ? {} : { display: "none" }}
            >
              <Link
                className={
                  activeCategoryId === item.id || location.startsWith(item.path)
                    ? "menu_box_item active_menu"
                    : "menu_box_item"
                }
                onClick={(e) => handleCategoryClick(e, { id: item?.id })}
              >
                <span>{item?.icon}</span>
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
                            item.id === activeCategoryId ? "active" : ""
                          }`}
                          style={{
                            "--value1": `${catItem?.positions[0]}deg`,
                            "--value2": `${catItem?.positions[1]}deg`,
                            "--value3": `${catItem?.positions[2]}px`,
                          }}
                        >
                          <Link to={`${item?.path}${catItem?.path}`}>
                            {catItem?.icon}
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

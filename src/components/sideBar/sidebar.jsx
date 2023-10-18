import React, { useState } from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { acShrink } from "../../redux/shrink";
import { useLocation } from "react-router-dom";
import { Menu, Menu_customer, Category } from "./menu";

import { HiChevronRight, HiChevronLeft } from "react-icons/hi";
import { RiMenu2Line, RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import logo from "../../assets/images/logo.png";

export const Sidebar = () => {
  const login = JSON.parse(localStorage.getItem("user")) || [];
  const isShrinkView = useSelector((state) => state.shrink);
  const dispatch = useDispatch();
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const location = useLocation().pathname;

  const handleCategoryClick = (categoryId) => {
    setActiveCategoryId((prevCategoryId) =>
      prevCategoryId === categoryId ? null : categoryId
    );
  };

  const handleSidebarView = () => {
    dispatch(acShrink(!acShrink));
  };

  return (
    <div className={isShrinkView ? "shrink" : "sidebar_container"}>
      <div>
        {isShrinkView ? (
          <img src={logo} alt="" />
        ) : (
          <div>
            <img src={logo} alt="" />
            Foodify
          </div>
        )}
      </div>
      <div className="shrink_box">
        <h3 onClick={handleSidebarView}>
          {isShrinkView ? <RiMenu2Line /> : "Dashboard"}
        </h3>
        <button onClick={handleSidebarView} type="button">
          {isShrinkView ? <HiChevronRight /> : <HiChevronLeft />}
        </button>
      </div>
      <ul className="menu_box">
        {login?.user?.role === "owner"
          ? Menu.map((item) => {
              return (
                <div key={item.id}>
                  <Link
                    className={
                      location === item.path
                        ? "menu_box_item active_menu"
                        : "menu_box_item"
                    }
                    to={item.path}
                    onClick={() => handleCategoryClick(item.id)}
                  >
                    <span>{item.icon}</span> <p>{item.name}</p>{" "}
                    <i
                      style={
                        item.list && !isShrinkView ? {} : { display: "none" }
                      }
                    >
                      {activeCategoryId === item.id ? (
                        <RiArrowDownSLine />
                      ) : (
                        <RiArrowUpSLine />
                      )}
                    </i>
                  </Link>
                  {item.id === activeCategoryId && (
                    <ul className="inner_menu">
                      {Category.filter(
                        (cat) => cat.id === activeCategoryId
                      ).map((catItem) => (
                        <li key={catItem.path}>
                          <Link
                            to={`${item.path}${catItem.path}`}
                            style={
                              location === `${item.path}${catItem.path}`
                                ? { color: "#17b1ea" }
                                : {}
                            }
                          >
                            {isShrinkView ? catItem.icon : catItem.name}
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
                  key={item.id}
                  style={item.permission ? {} : { display: "none" }}
                >
                  <Link
                    className={
                      location === item.path
                        ? "menu_box_item active_menu"
                        : "menu_box_item"
                    }
                    to={item.path}
                    onClick={() => handleCategoryClick(item.id)}
                  >
                    <span>{item.icon}</span> <p>{item.name}</p>
                    <i
                      style={
                        item.list && !isShrinkView ? {} : { display: "none" }
                      }
                    >
                      {activeCategoryId === item.id ? (
                        <RiArrowDownSLine />
                      ) : (
                        <RiArrowUpSLine />
                      )}
                    </i>
                  </Link>
                  {item.id === activeCategoryId && (
                    <ul className="inner_menu">
                      {Category.filter(
                        (cat) => cat.id === activeCategoryId
                      ).map((catItem) => (
                        <li key={catItem.path}>
                          <Link
                            to={`${item.path}${catItem.path}`}
                            style={
                              location === `${item.path}${catItem.path}`
                                ? { color: "#17b1ea" }
                                : {}
                            }
                          >
                            {isShrinkView ? catItem.icon : catItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
      </ul>
    </div>
  );
};

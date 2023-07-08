import React, { useState } from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { acShrink } from "../../redux/shrink";
import { useLocation } from "react-router-dom";

import { MdDashboard } from "react-icons/md";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { IoIosRestaurant } from "react-icons/io";
import { AiFillSetting } from "react-icons/ai";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi";
import { RiMenu2Line, RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

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
      <Link to="/">{isShrinkView ? "Y" : "Yandex@Eats"}</Link>
      <div className="shrink_box">
        <h3 onClick={handleSidebarView}>
          {isShrinkView ? <RiMenu2Line /> : "Dashboard Menu"}
        </h3>
        <button onClick={handleSidebarView} type="button">
          {isShrinkView ? <HiChevronRight /> : <HiChevronLeft />}
        </button>
      </div>
      <ul className="menu_box">
        {login.user.role === "owner"
          ? menu.map((item) => {
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
                    <i>
                      {activeCategoryId === item.id ? (
                        <RiArrowDownSLine />
                      ) : (
                        <RiArrowUpSLine />
                      )}
                    </i>
                  </Link>
                  {item.id === activeCategoryId && (
                    <ul className="inner_menu">
                      {category
                        .filter((cat) => cat.id === activeCategoryId)
                        .map((catItem) => (
                          <li key={catItem.path}>
                            <Link
                              to={`${item.path}${catItem.path}`}
                              style={
                                location === `${item.path}${catItem.path}`
                                  ? { color: "#17b1ea" }
                                  : {}
                              }
                            >
                              {catItem.name}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              );
            })
          : menu_customer.map((item) => {
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
                    <span>{item.icon}</span> <p>{item.name}</p> <i></i>
                  </Link>
                  {item.id === activeCategoryId && (
                    <ul className="inner_menu">
                      {category
                        .filter((cat) => cat.id === activeCategoryId)
                        .map((catItem) => (
                          <li key={catItem.path}>
                            <Link
                              to={`${item.path}${catItem.path}`}
                              style={
                                location === `${item.path}${catItem.path}`
                                  ? { color: "#17b1ea" }
                                  : {}
                              }
                            >
                              {catItem.name}
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

const menu = [
  {
    id: "098765",
    path: "/dashboard",
    name: "Dashboard",
    icon: <MdDashboard />,
  },
  {
    id: "0765435",
    path: "/restaurant",
    name: "Restaurants",
    icon: <SiHomeassistantcommunitystore />,
  },
  {
    id: "243567",
    path: "/add/product",
    name: "AddProduct",
    icon: <IoIosRestaurant />,
  },
  {
    id: "765433",
    path: "/settings",
    name: "Settings",
    icon: <AiFillSetting />,
  },
];
const menu_customer = [
  {
    id: "098765",
    path: "/dashboard",
    name: "Dashboard",
    icon: <MdDashboard />,
  },
  {
    id: "243567",
    path: "/add/product",
    name: "Add Product",
    icon: <IoIosRestaurant />,
  },
  {
    id: "765433",
    path: "/settings",
    name: "Settings",
    icon: <AiFillSetting />,
  },
];

const category = [
  {
    id: "0765435",
    name: "Add restoraund",
    path: "/add",
  },
  {
    id: "0765435",
    name: "Restaurant list",
    path: "/list",
  },
  {
    id: "0765435",
    name: "orders",
    path: "/orders",
  },
];

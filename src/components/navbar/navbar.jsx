import React from "react";
import "./navbar.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { acOpenMadal, acCloseModal } from "../../redux/modal";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { acSearch } from "../../redux/search";
import { acOpenUModal, acOpenUModalU } from "../../redux/u-modal";

import { BsSearch } from "react-icons/bs";
import { FaBell } from "react-icons/fa";
import { BiEdit, BiPlus } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { ImStatsBars } from "react-icons/im";
import default_img from "../../assets/images/default-img.png";
import logo from "../../assets/images/logo.png";

export const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user")) || [];
  const department = JSON.parse(localStorage.getItem("department")) || [];
  const modal = useSelector((state) => state.modal);
  const [search, setSearch] = React.useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const name = user?.user?.username?.split("_").join(" ");
  const acItem = useSelector((state) => state.active);

  const openModal = () => {
    dispatch(acOpenMadal());
  };

  const closeModal = () => {
    dispatch(acCloseModal());
  };

  const handleSort = (value) => {
    dispatch(acSearch(value));
  };

  const openUModal = () => {
    dispatch(acOpenUModal());
  };

  const openUModalU = () => {
    dispatch(acOpenUModalU());
  };

  const log_out = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="nav_menu">
        <img src={logo} alt="" />
      </div>
      {location.startsWith("/storage") && (
        <div className="short_hands">
          {!location.startsWith("/storage/report") && (
            <>
              <button onClick={openUModal}>
                <BiPlus />
              </button>
              <button
                style={
                  acItem.id ? {} : { opacity: "0.4", border: "1px solid #ccc6" }
                }
                onClick={openUModalU}
              >
                <BiEdit />
              </button>
            </>
          )}
          <button
            style={
              acItem.id ? {} : { opacity: "0.4", border: "1px solid #ccc6" }
            }
          >
            <MdDelete />
          </button>

          {location.startsWith("/storage/ingredients") && (
            <div className="short-hands_sort__box">
              <label>
                <input
                  type="search"
                  name="groups"
                  placeholder="Guruh'yicha qdirish..."
                  onChange={(e) =>
                    setSearch({ ...search, groups: e.target.value })
                  }
                />
              </label>
              <label>
                <input
                  type="search"
                  name="name"
                  placeholder="Nomi bo'yicha qdirish..."
                  onChange={(e) =>
                    setSearch({ ...search, name: e.target.value })
                  }
                />
              </label>
              <button
                style={
                  search.length
                    ? {}
                    : { opacity: "0.4", border: "1px solid #ccc6" }
                }
              >
                <BsSearch />
              </button>
            </div>
          )}
        </div>
      )}
      {!location.startsWith("/storage") && (
        <form className="search">
          <BsSearch />
          <input
            type="search"
            name="search"
            placeholder="Qidirish..."
            required
            onChange={(e) => handleSort(e.target.value)}
            autoComplete="off"
          />
        </form>
      )}
      <div className="profile">
        {department === "owner" && (
          <span onClick={() => navigate("/statistics")}>
            <ImStatsBars />
          </span>
        )}
        <span>
          <FaBell />
        </span>
        <img
          src={user?.user?.img || default_img}
          alt="user_photo"
          onClick={openModal}
        />
      </div>
      <div
        className={modal ? "modal_box" : "modal_box close_modal"}
        onMouseLeave={closeModal}
      >
        <div className="user">
          <b>{name}</b>
          <figure>
            <img src={user?.user?.img || default_img} alt="user_photo" />
            <button onClick={closeModal}>x</button>
          </figure>
        </div>
        <ul>
          <Link to="/">Ma'lumotlarim</Link>
          <Link to="/">Manzillarim</Link>
          <Link to="/">Buyurtlarim</Link>
          <Link to="/">Bildirishnomalar</Link>
          <li onClick={log_out}>Chiqish</li>
        </ul>
      </div>
    </div>
  );
};

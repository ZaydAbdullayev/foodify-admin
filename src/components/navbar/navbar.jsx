import React from "react";
import "./navbar.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { acOpenMadal, acCloseModal } from "../../redux/modal";
import { Link, useNavigate } from "react-router-dom";
import { acSearch } from "../../redux/search";
import { acMedia } from "../../redux/media";
import { UniversalFilterBox } from "../filter/filter";

import { BsSearch } from "react-icons/bs";
import { FaBell } from "react-icons/fa";
import { ImStatsBars } from "react-icons/im";
import default_img from "../../assets/images/default-img.png";
import logo from "../../assets/images/logo.png";

export const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user")) || [];
  const department = JSON.parse(localStorage.getItem("department")) || [];
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = user?.user?.username?.split("_")?.join(" ");
  const status = useSelector((state) => state.status);
  const media = useSelector((state) => state.media);

  const openModal = () => {
    dispatch(acOpenMadal());
  };

  const closeModal = () => {
    dispatch(acCloseModal());
  };

  const handleSort = (value) => {
    dispatch(acSearch(value));
  };

  const log_out = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div
        className="nav_menu"
        onClick={() => dispatch(acMedia(media ? false : true))}
      >
        <img src={logo} alt="" />
      </div>
      <UniversalFilterBox />
      {status.includes(100) && (
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

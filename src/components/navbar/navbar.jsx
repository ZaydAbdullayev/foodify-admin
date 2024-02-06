import React from "react";
import "./navbar.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { acOpenMadal, acCloseModal } from "../../redux/modal";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { acSearch } from "../../redux/search";
import { acMedia } from "../../redux/media";
import { UniversalFilterBox } from "../filter/filter";
import { acOpenUModal } from "../../redux/u-modal";
import DeleteSelectedElementss from "../../service/delete-elements.service";
import { enqueueSnackbar as es } from "notistack";
import { setRelease } from "../../redux/deleteFoods";

import { BiEdit, BiPlus } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { MdTableBar } from "react-icons/md";
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
  const delDocuments = useSelector((state) => state.delRouter);
  const page_code = useLocation().search.split("=")[1];
  const delData = delDocuments?.[page_code];

  const deleteDocuments = async () => {
    const result = await DeleteSelectedElementss(page_code, delData);
    if (result.status === "success") {
      es({ message: "Muvaffaqiyatli o'chirildi", variant: "success" });
      dispatch(setRelease(page_code));
    } else {
      es({ message: "Xatolik yuz berdi", variant: "error" });
    }
  };

  const openModal = () => {
    dispatch(acOpenMadal());
  };

  const closeModal = () => {
    dispatch(acCloseModal());
  };

  const openUModal = () => {
    dispatch(acOpenUModal());
  };

  const openUModalU = () => {
    dispatch(acOpenUModal());
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
      {status?.includes(0) && (
        <div className="short_hands">
          {status?.includes(1) && (
            <button onClick={openUModal}>
              <BiPlus />
            </button>
          )}
          {status.includes(101) && (
            <button onClick={openUModal}>
              <b>+</b>
              <MdTableBar />{" "}
            </button>
          )}
          {status?.includes(2) && (
            <button
              style={
                delDocuments?.[page_code]?.length === 1
                  ? {}
                  : { opacity: "0.4", border: "1px solid #ccc6" }
              }
              onClick={openUModalU}
            >
              <BiEdit />
            </button>
          )}
          {status?.includes(3) && (
            <button
              style={
                delDocuments?.[page_code]?.length > 0
                  ? {}
                  : { opacity: "0.4", border: "1px solid #ccc6" }
              }
              onClick={() => deleteDocuments()}
            >
              <MdDelete />
            </button>
          )}
          <UniversalFilterBox />
        </div>
      )}

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
        <span onClick={() => navigate("/nothifications")}>
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
          <Link to="/my-receive-orders">Buyurtlarim</Link>
          <Link to="/">Bildirishnomalar</Link>
          <li onClick={log_out}>Chiqish</li>
        </ul>
      </div>
    </div>
  );
};

import React from "react";
import "./navbar.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { acOpenMadal, acCloseModal } from "../../redux/modal";
import { Link, useNavigate } from "react-router-dom";
import { acSearch } from "../../redux/search";
import { acOpenUModal, acOpenUModalU } from "../../redux/u-modal";
import { acGetDate } from "../../redux/search";
import { useGetCashboxQuery } from "../../service/cashbox.service";
import { calculateMonthRange } from "../../service/calc-date.service";
import { getFormattedDate } from "../../service/calc-date.service";
import { calculateWeekRange } from "../../service/calc-date.service";
import { acMedia } from "../../redux/media";

import { BsSearch } from "react-icons/bs";
import { FaBell } from "react-icons/fa";
import { BiEdit, BiPlus } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { ImStatsBars } from "react-icons/im";
import default_img from "../../assets/images/default-img.png";
import logo from "../../assets/images/logo.png";
import { MdTableBar } from "react-icons/md";

export const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user")) || [];
  const department = JSON.parse(localStorage.getItem("department")) || [];
  const modal = useSelector((state) => state.modal);
  const [search, setSearch] = React.useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = user?.user?.username?.split("_")?.join(" ");
  const acItem = useSelector((state) => state.active);
  const acP = useSelector((state) => state.activeThing);
  const searchD = useSelector((state) => state.uSearch);
  const status = useSelector((state) => state.status);
  const media = useSelector((state) => state.media);
  const { data = [] } = useGetCashboxQuery();

  const today = getFormattedDate(0);
  const yesterday = getFormattedDate(1);
  const beforeyesterday = getFormattedDate(2);
  const thisWeek = calculateWeekRange(0);
  const lastWeek = calculateWeekRange(-7);
  const thisMonth = calculateMonthRange(0);
  const lastMonth = calculateMonthRange(-1);
  const thisYear = getFormattedDate(365);

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
    if (acP.id) {
      dispatch(acOpenUModal());
    } else {
      dispatch(acOpenUModalU());
    }
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
          {status?.includes(2) && (
            <button
              style={
                acItem.id || acP?.id
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
                acItem.id || acP?.id
                  ? {}
                  : { opacity: "0.4", border: "1px solid #ccc6" }
              }
            >
              <MdDelete />
            </button>
          )}
          <div className="short-hands_sort__box">
            {status?.includes(5) && (
              <label>
                <input
                  type="search"
                  name="name"
                  placeholder="Nomi bo'yicha qidirish..."
                  onChange={(e) =>
                    setSearch({ ...search, name: e.target.value })
                  }
                />
              </label>
            )}
            {status?.includes(4) && (
              <label>
                <input
                  type="search"
                  name="groups"
                  placeholder="Guruh bo'yicha qidirish..."
                  onChange={(e) =>
                    setSearch({ ...search, groups: e.target.value })
                  }
                />
              </label>
            )}
            {status?.includes(6) && (
              <select>
                <option value={{ start: today }}>Bugun</option>
                <option value={{ start: yesterday }}>Kecha</option>
                <option
                  value={{ start: beforeyesterday, end: beforeyesterday }}
                >
                  Avvalgi kun
                </option>
                <option value={thisWeek}>Bu hafta</option>
                <option value={lastWeek}>O'tgan hafta</option>
                <option value={thisMonth}>Bu oy</option>
                <option value={lastMonth}>O'tgan oy</option>
                <option value={{ start: thisYear }}>Bu yil</option>
              </select>
            )}
            {status?.includes(7) && (
              <>
                <label>
                  <input
                    type="date"
                    name="start"
                    defaultValue={today}
                    onChange={(e) =>
                      dispatch(
                        acGetDate({
                          ...searchD.date,
                          start: e.target.value,
                        })
                      )
                    }
                  />
                </label>
                <label>
                  <input
                    type="date"
                    name="to"
                    defaultValue={today}
                    onChange={(e) =>
                      dispatch(
                        acGetDate({
                          ...searchD.date,
                          end: e.target.value,
                        })
                      )
                    }
                  />
                </label>
              </>
            )}
            {status?.includes(8) && (
              <select
                onChange={(e) =>
                  dispatch(
                    acGetDate({
                      ...searchD,
                      cashier: e.target.value,
                    })
                  )
                }
              >
                <option value="all">Kassa bo'yicha</option>
                {data?.data?.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </select>
            )}
            {status?.includes(9) && (
              <select
                onChange={(e) =>
                  dispatch(
                    acGetDate({
                      ...searchD,
                      cashier: e.target.value,
                    })
                  )
                }
              >
                <option value="all">Ombor bo'yicha</option>
                {data?.data?.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </select>
            )}
            {status?.includes(15) && (
              <button
                style={
                  search.length
                    ? {}
                    : { opacity: "0.4", border: "1px solid #ccc6" }
                }
              >
                <BsSearch />
              </button>
            )}
          </div>
        </div>
      )}
      {status.includes(101) && (
        <span className="add_table_btn">
          <b>+</b>
          <MdTableBar />{" "}
        </span>
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

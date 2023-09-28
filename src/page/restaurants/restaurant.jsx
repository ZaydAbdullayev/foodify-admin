import React, { useState } from "react";
import "./restaurant.css";
import { ClearForm } from "../../service/form.service";
import { ApiService } from "../../service/api.service";

import { MdOutlineAddBusiness } from "react-icons/md";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { enqueueSnackbar as es } from "notistack";
import { AiOutlineCheck } from "react-icons/ai";

export const Restaurant = () => {
  const [files, setFiles] = useState([]);
  const [show, setShow] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const data = Object.fromEntries(formdata.entries());
    data.username = data?.username?.split(" ").join("_");
    const dep_ids = [];
    data.departments?.split(", ").forEach((_, index) => {
      dep_ids.push(`0${index + 1}`);
    });
    data.departments = JSON.stringify(data?.departments?.split(", "));

    ApiService.fetching("add/restaurant", {
      ...data,
      department_ids: JSON.stringify(dep_ids),
    })
      .then((res) => {
        const msg = "Restoran muvoffaqiyatli qo'shildi";
        es(msg, { variant: "success" });
        ClearForm(".add_reastaurant");
        setFiles([]);
      })
      .catch((err) => {                                              
        const msg = "Restoran qo'shishda qandaydir xatolik yuz berdi";
        es(msg, { variant: "error" });
        console.log(err);
      });
  };

  const handleShow = () => {
    setShow(!show);
  };

  const takeImg = (e) => {
    const file = e.target.files[0];
    const img = URL.createObjectURL(file);
    setFiles([img]);
  };

  return (
    <div className="restaurant_box">
      <form className="add_reastaurant" onSubmit={handleSubmit}>
        <label
          style={files.length ? { border: "none" } : {}}
          className="add_img"
        >
          {files.length ? "" : <MdOutlineAddBusiness />}
          <input
            type="file"
            name="img"
            accept="image/*"
            required
            onChange={takeImg}
            id="image"
          />
          {files.length > 0 && (
            <img src={files[0]} alt="Selected" className="selected_image" />
          )}
        </label>
        <input
          type="text"
          name="username"
          placeholder="Restoran nomini kiriting"
          required
        />
        <label className="label">
          <input
            type={show ? "password" : "text"}
            name="password"
            placeholder="Parol kiriting"
            required
            autoComplete="off"
          />
          <span onClick={handleShow} style={show ? {} : { color: "orange" }}>
            {show ? <BsEyeSlash /> : <BsEye />}
          </span>
        </label>
        <input
          type="text"
          name="rating"
          placeholder="Restoranning reytingi"
          required
        />
        <div className="delivery_time">
          <p>Yetkazib berish vaqtini kiriting</p>
          <label>
            <input type="number" name="delivery_time_from" required />
            <p>dan</p>
            <input type="number" name="delivery_time_till" required />
            <p>gacha</p>
          </label>
        </div>
        <div className="delivery_time">
          <p>Qo'shilayotgan joy turi</p>
          <div>
            <label>
              <p>Restaurant</p>
              <input type="radio" name="type" value="Restaurant" required />
            </label>
            <label>
              <p>Shop</p>
              <input type="radio" name="type" value="Shop" required />
            </label>
          </div>
        </div>
        <input type="hidden" name="role" value="restaurant" />
        <input type="text" name="departments" placeholder="Bo'lim qo'shish" />

        <button>
          Add <AiOutlineCheck style={{ marginLeft: "1%" }} />
        </button>
      </form>
    </div>
  );
};

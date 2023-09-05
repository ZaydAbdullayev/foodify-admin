import React, { useState } from "react";
import "./addproduct.css";
import { IoIosRestaurant } from "react-icons/io";
import { useSnackbar } from "notistack";
import { ClearForm } from "../../service/form.service";
import { ApiService } from "../../service/api.service";
import { NumericFormat } from "react-number-format";
import { useNavigate } from "react-router-dom";

export const Addproduct = () => {
  const user = JSON.parse(localStorage.getItem("user") || []);
  const [files, setFiles] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const data = Object.fromEntries(formdata.entries());
    data.price = data?.price?.split(" ").join("");

    ApiService.fetching("add/product", data)
      .then((res) => {
        const msg = "Maxsulot muaffaqiyatli qo'shildi";
        enqueueSnackbar(msg, { variant: "success" });
        ClearForm(".add_product");
        setFiles([]);
        navigate("/product");
      })
      .catch((err) => {
        const msg = "Maxsulot qo'shishda xatolik yuz berdi ";
        enqueueSnackbar(msg, { variant: "error" });
      });
  };

  const takeImg = (e) => {
    const file = e.target.files[0];
    const img = URL.createObjectURL(file);
    setFiles([img]);
  };

  return (
    <div className="product_box">
      <form className="add_product" onSubmit={handleSubmit}>
        <div>
          <label
            style={files.length ? { border: "none" } : {}}
            className="product_img"
          >
            {files.length ? "" : <IoIosRestaurant />}
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
        </div>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Maxsulot nomini kiriting"
            required
          />
          <NumericFormat
            placeholder="Maxsulot narxini kiriting"
            suffix=" sum"
            thousandSeparator=" "
            allowLeadingZeros
            displayType="input"
            name="price"
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Maxsulot haqida tavsif"
          />
          <input
            type="text"
            name="category"
            placeholder="Maxsulot turini kiriting"
            required
          />
          <input
            type="hidden"
            name="restaurant"
            defaultValue={user?.user?.id}
          />
          <input type="submit" value="Qo'shish" />
        </div>
      </form>
    </div>
  );
};

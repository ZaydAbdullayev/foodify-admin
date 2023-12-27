import React, { useState, memo } from "react";
import "./addproduct.css";
import { IoIosRestaurant } from "react-icons/io";
import { enqueueSnackbar as es } from "notistack";
import { ClearForm } from "../../service/form.service";
import { ApiService } from "../../service/api.service";
import { useNavigate } from "react-router-dom";
import { LoadingBtn } from "../loading/loading";

export const Addproduct = memo(() => {
  const [files, setFiles] = useState([]);
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const value = Object.fromEntries(formdata.entries());
    value.img = img;
    setLoading(true);

    ApiService.fetching("add/product", value)
      .then((res) => {
        es("Maxsulot muaffaqiyatli qo'shildi", { variant: "success" });
        ClearForm(".add_product");
        setFiles([]);
        navigate("/product");
        window.location.reload();
      })
      .catch((err) => {
        es("Qo'shishda xatolik yuz berdi", { variant: "error" });
      })
      .finally(() => setLoading(false));
  };

  const takeImg = (e) => {
    const file = e.target.files[0];
    setImg(file);
    const img = URL.createObjectURL(file);
    setFiles([img]);
  };

  return (
    <div className="product_box">
      <form className="add_product" onSubmit={handleSubmit}>
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
        <button className="relative">
          {loading ? <LoadingBtn /> : "Tasdiqlash"}
        </button>
      </form>
    </div>
  );
});

export const ShowProduct = memo(() => {
  return (
    <div className="product_box">
      <div className="product_item">
        <h3>Product name</h3>
        <p>Product description</p>
        <div className="product_price">
          <h4>Price</h4>
          <h4>Price</h4>
        </div>
      </div>
    </div>
  );
});

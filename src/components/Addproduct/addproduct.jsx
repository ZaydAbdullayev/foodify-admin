import React, { useState, memo } from "react";
import "./addproduct.css";
import { IoIosRestaurant } from "react-icons/io";
import { enqueueSnackbar as es } from "notistack";
import { ClearForm } from "../../service/form.service";
import { ApiService } from "../../service/api.service";
import { NumericFormat } from "react-number-format";
import { useNavigate } from "react-router-dom";
import {
  useAddProductMutation,
  useGetDepartmentsQuery,
} from "../../service/product.service";

export const Addproduct = memo(() => {
  const user = JSON.parse(localStorage.getItem("user") || []);
  const [files, setFiles] = useState([]);
  const [img, setImg] = useState(null);
  const [current, setCurrent] = useState(null);
  const navigate = useNavigate();
  const [addProduct] = useAddProductMutation();
  const { data: departments = [] } = useGetDepartmentsQuery(user?.user?.id);
  console.log("user", departments);
  // const departments = JSON?.parse(dep?.innerData || "[]");
  // console.log("dep", departments);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const value = Object.fromEntries(formdata.entries());
    value.price = value?.price?.split(" ")?.join("");
    value.img = img;
    console.log(value);
    // const { error, data } = await addProduct(value);
    // if (error) {
    //   console.error("Sunucu Hata:", error); // Sunucudan gelen hata mesajını görüntüle
    //   es("Qo'shishda xatolik yuz berdi", { variant: "error" });
    // } else if (data) {
    //   es("Maxsulot muaffaqiyatli qo'shildi", { variant: "success" });
    //   ClearForm(".add_product");
    //   setFiles([]);
    //   navigate("/product");
    // } else {
    //   console.log("failed");
    // }
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
      });
  };

  const takeImg = (e) => {
    const file = e.target.files[0];
    setImg(file);
    const img = URL.createObjectURL(file);
    setFiles([img]);
  };

  // const departs = ["somsa", "manti", "lagman", "non"];

  return (
    <div className="product_box">
      <form className="add_product" onSubmit={handleSubmit}>
        <div className="add_paroduct_body">
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
              autoComplete="off"
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
              autoComplete="off"
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
        </div>
        <div className="departments">
          <p>Bo'limlar</p>
          {departments?.innerData?.map((item, index) => {
            return (
              <label
                key={index}
                className={current === item ? "active" : ""}
                onClick={() => setCurrent(item)}
              >
                <span>{item}</span>
                <input type="radio" value={item} name="department" required />
              </label>
            );
          })}
        </div>
      </form>
    </div>
  );
});

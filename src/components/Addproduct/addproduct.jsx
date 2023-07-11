import React, { useState } from "react";
import "./addproduct.css";
import { MdAllInbox } from "react-icons/md";
import { useSnackbar } from "notistack";
import { ClearForm } from "../../service/form.service";
import { ApiService } from "../../service/api.service";

export const Addproduct = () => {
  const [files, setFiles] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const user = JSON.parse(localStorage.getItem("user") || []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const data = Object.fromEntries(formdata.entries());
    console.log(data);

    ApiService.fetching("add/product", data)
      .then((res) => {
        console.log(res.response.message);
        const msg = "Maxsulot muaffaqiyatli qoshildi";
        enqueueSnackbar(msg, { variant: "success" });
        ClearForm(".add_product");
        setFiles([]);
      })
      .catch((err) => {
        const msg = "Maxsulot qoshishda xatolik yuz berdi ";
        enqueueSnackbar(msg, { variant: "error" });
        console.log(err);
        ClearForm(".add_product");
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
            {files.length ? "" : <MdAllInbox />}
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
          <input
            type="number"
            name="review_count"
            placeholder="Maxsulot narxini kiriting"
            required
          />
          <input
            type="text"
            name="text"
            placeholder="Maxsulot haqida tavsif"
            required
          />
          <input
            type="hidden"
            name="restaurant"
            defaultValue={user.user.username}
          />
          <input type="submit" value="Qo'shish" />
        </div>
      </form>
    </div>
  );
};

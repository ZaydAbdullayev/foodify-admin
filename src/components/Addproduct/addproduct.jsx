import React, { useState, memo } from "react";
import "./addproduct.css";
import { IoIosRestaurant } from "react-icons/io";
import { enqueueSnackbar as es } from "notistack";
import { ClearForm } from "../../service/form.service";
import { ApiService } from "../../service/api.service";
import { useNavigate } from "react-router-dom";
import { LoadingBtn } from "../loading/loading";
import { acGetUrl } from "../../redux/u-modal";
import { useDispatch, useSelector } from "react-redux";

export const Addproduct = memo(() => {
  const [files, setFiles] = useState([]);
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const image = useSelector((state) => state.image);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    ApiService.fetching("get/imgUrl", { img: img })
      .then((res) => {
        const img = res?.data?.data;
        es("Rasm muaffaqiyatli qo'shildi", { variant: "success" });
        ClearForm(".add_product");
        setFiles([]);
        setImg(null);
        dispatch(acGetUrl({ st: false, img: img }));
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
    <div className={image.st ? "product_box open" : "product_box"}>
      {image?.type === "view" ? (
        <img src={image?.img} alt="product's images" />
      ) : (
        <form className="add_product" onSubmit={handleSubmit}>
          <label
            style={files.length ? { border: "none" } : {}}
            className="product_img"
            htmlFor="image"
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
          <button
            type="button"
            className="product_box_btn"
            onClick={() => dispatch(acGetUrl({ st: false, img: "" }))}
            aria-label="get out from add picture page"
          >
            Chiqish
          </button>
          <button className="product_box_btn relative">
            {loading ? <LoadingBtn /> : "Tasdiqlash"}
          </button>
        </form>
      )}
    </div>
  );
});

const data = {
  id: "273f5f",
  name: "qaynatma sho'rva",
  category: "sho'rva",
  storage: "oshxona ombori",
  price: "550000",
  res_id: "2899b5",
  prime_cost: "100000",
  profit: "150000",
  markup: "29",
  ingredients:
    '[{"id":"2941f6","name":"kartoshka","unit":"kg","group":"sabzavotlar","res_id":"2899b5","price":100000,"type":"Ingredient","storage_id":null,"amount":"12"},{"id":"5d49b2","name":"hamir","unit":"kg","group":"chuchvaralar","res_id":"2899b5","price":1200,"type":"Ingredient","storage_id":null,"amount":"2"},{"id":"777d2b","name":"sharbat","unit":"l","group":"ichimliklar","res_id":"2899b5","price":"120","type":"Ingredient","storage_id":null,"amount":"2"}]',
  date: "2023-12-15T19:00:00.000Z",
  type: "Food",
};

export const ShowProduct = memo(() => {
  const navigate = useNavigate();
  const ingredientData = JSON.parse(data?.ingredients);
  return (
    <div className="product_box open p_info">
      <div className="product_item">
        <h3>{data.name}</h3>
        <span>Product description</span>
        <div>
          Narxi: <i></i>
          <span>{data.price.replace(/\d(?=(\d{3})+$)/g, "$& ")} so'm</span>
        </div>
        <div>
          Tan Narxi: <i></i>
          <span>{data.prime_cost.replace(/\d(?=(\d{3})+$)/g, "$& ")} so'm</span>
        </div>
        <div>
          Foyda: <i></i>
          <span>{data.profit.replace(/\d(?=(\d{3})+$)/g, "$& ")} so'm</span>
        </div>
        <div>
          Kategoriyasi: <i></i> <span>{data.category}</span>
        </div>
        <div>
          Ombor: <i></i> <span>{data.storage}</span>
        </div>
        <div>
          Ingredientlari:{" "}
          <ol>
            {ingredientData?.map((item) => {
              return (
                <li>
                  {item.name} - {item.amount} <span>{item.unit}</span>
                  {item.price} so'm
                </li>
              );
            })}
          </ol>
        </div>
        <button
          className="product_box_btn"
          onClick={() => navigate("/managment")}
          aria-label="backword all products page"
        >
          Orqaga qaytish
        </button>
      </div>
      <i onClick={() => navigate("/managment")} aria-label="close modal"></i>
    </div>
  );
});

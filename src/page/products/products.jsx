import React, { useState } from "react";
import "./products.css";
import { Link, useLocation } from "react-router-dom";
import { ApiUpdateService } from "../../service/api.service";
import { NumericFormat } from "react-number-format";
import { enqueueSnackbar as es } from "notistack";
import {
  useUpdatePbyIdMutation,
  useDeleteProductMutation,
  useGetAllProductQuery,
} from "../../service/product.service";

import { GoSearch } from "react-icons/go";
import { AiFillDelete } from "react-icons/ai";
import { FaPen, FaCheck } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";

export const Products = () => {
  const user_id = JSON.parse(localStorage.getItem("user"))?.user?.id;
  const { search, pathname } = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [update, setUpdate] = useState(false);
  const [info, setInfo] = useState({});
  const { data: products = [] } = useGetAllProductQuery(user_id);
  const [updatePbyId] = useUpdatePbyIdMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const getUniqueCategories = () => {
    const uniqueCategories = new Set();
    products?.innerData?.forEach((item) => {
      uniqueCategories.add(item.category);
    });
    return Array.from(uniqueCategories);
  };

  const uniqueCategories = getUniqueCategories();
  const category = (search && decodeURIComponent(search.split("=")[1])) || "";

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleUpdate = async (product) => {
    const { data } = await updatePbyId(product);
    if (data) {
      es("Mahsulot malumotlari muvoffaqiyatli o'zgartirildi!", {
        variant: "success",
      });
      setInfo({});
      setUpdate(false);
    }
  };

  const handleDelete = async (id) => {
    const { data } = await deleteProduct(id);
    if (data) {
      const msg = "Mahsulotni O'zgartirishda qandaydir xatolik yuz berdi";
      es(msg, { variant: "error" });
    }
  };

  const updateImg = (product) => {
    console.log(product);
    ApiUpdateService.fetching(`update/productImg/${product.id}`, {
      img: product?.image,
      deleteImg: product.deleteImg,
    })
      .then((res) => {
        const msg = "Mahsulot rasmi muvoffaqiyatli o'zgartirildi!";
        es(msg, { variant: "success" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const updateImg = async (product, imgFile) => {
  //   const { data } = await updatePimgById({
  //     id: product.id,
  //     img: JSON.stringify(imgFile),
  //     deleteImg: product?.img,
  //   });
  //   if (data) {
  //     const msg = "Mahsulot rasmi muvoffaqiyatli o'zgartirildi!";
  //     es(msg, { variant: "success" });
  //   }
  // };

  const filteredProducts = products?.innerData?.filter((product) => {
    const categoryMatches =
      category === "" ||
      product?.category?.toLowerCase().includes(category.toLowerCase());
    const nameMatches = product?.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    return categoryMatches && nameMatches;
  });

  const handleInfoChange = (key, value) => {
    setInfo((prevInfo) => ({ ...prevInfo, [key]: value }));
  };

  return (
    <div className="product_list">
      <div className="search_container">
        <p>Barcha mahsulotlar ro'yxati</p>
        <form className="search_box">
          <button type="button">
            <GoSearch />
          </button>
          <input
            type="search"
            name="foundname"
            placeholder="Qidirish ? "
            value={searchTerm}
            onChange={handleSearch}
          />
        </form>
      </div>
      <div className="search_src">
        <Link to={pathname}>All</Link>
        {uniqueCategories?.map((category) => (
          <Link to={`?q/gr=${encodeURIComponent(category)}`} key={category}>
            {category}
          </Link>
        ))}
      </div>

      <div className="all_products">
        {filteredProducts?.map((product) => (
          <div className="item" key={product.id}>
            <label className="img_box">
              <span className="upload_img">Mahsulot rasmini o'zgartirish</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => updateImg(product, e.target.files[0])}
              />
              <img src={product?.img} alt="foto" />
            </label>
            {update === product?.id ? (
              <>
                <input
                  type="text"
                  defaultValue={product.name}
                  style={{ textTransform: "capitalize" }}
                  autoFocus
                  onChange={(e) => handleInfoChange("name", e.target.value)}
                  autoComplete="off"
                />
                <input
                  type="text"
                  defaultValue={product.description}
                  style={{ flex: "1" }}
                  onChange={(e) =>
                    handleInfoChange("description", e.target.value)
                  }
                  autoComplete="off"
                />
              </>
            ) : (
              <>
                <p className="name">{product.name}</p>
                <p style={{ flex: "1" }}>{product.description}</p>
              </>
            )}

            <NumericFormat
              displayType={update === product?.id ? "input" : "text"}
              defaultValue={product.price}
              thousandSeparator=" "
              suffix=" so'm"
              onChange={(e) =>
                handleInfoChange("price", e.target.value.split(" ").join(""))
              }
            />
            <div className="status">
              <span
                style={
                  product.status === 1
                    ? { background: "#33ff0989" }
                    : { color: "#aaaa" }
                }
                onClick={() => handleUpdate({ id: product.id, status: 1 })}
              >
                active
              </span>
              <span
                style={
                  product.status === 0
                    ? { background: "#d82" }
                    : { color: "#aaaa" }
                }
                onClick={() => handleUpdate({ id: product.id, status: 0 })}
              >
                passive
              </span>
            </div>
            <button className="update_btn">
              {update === product?.id ? (
                <>
                  <span
                    onClick={() => handleUpdate({ ...info, id: product.id })}
                  >
                    <FaCheck />
                  </span>{" "}
                  <span onClick={() => setUpdate(false)}>
                    <ImCancelCircle />
                  </span>
                </>
              ) : (
                <span onClick={() => setUpdate(product.id)}>
                  <FaPen />
                </span>
              )}
            </button>
            <button
              style={{ fontSize: "var(--fs4)", color: "#d82a0c" }}
              onClick={() => handleDelete(product.id)}
            >
              <AiFillDelete />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

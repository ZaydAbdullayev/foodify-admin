import React, { useState } from "react";
import "./products.css";
import { Link, useLocation } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import { enqueueSnackbar as es } from "notistack";
import { useDispatch } from "react-redux";
import { LoadingBtn } from "../../components/loading/loading";
import { acNavStatus } from "../../redux/navbar.status";
import { useNavigate } from "react-router-dom";
import { useGetStProductQuery } from "../../service/s-products.service";
import { useDeleteStProductMutation } from "../../service/s-products.service";
import { useUpdateStProductMutation } from "../../service/s-products.service";
import { useUpdateStProductImageMutation } from "../../service/s-products.service";
import { useGetStCategoryQuery } from "../../service/category.service";

import { GoSearch } from "react-icons/go";
import { AiFillDelete } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import { FaPen, FaCheck } from "react-icons/fa";
import { TbInfoSquareRounded } from "react-icons/tb";

export const Products = () => {
  const { search, pathname } = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [update, setUpdate] = useState(false);
  const [info, setInfo] = useState({});
  // const [detail, setDetail] = useState(false);
  const { data: products = [], isLoading } = useGetStProductQuery();
  const { data: categorys = [] } = useGetStCategoryQuery();
  const [deleteStProduct] = useDeleteStProductMutation();
  const [updateStProduct] = useUpdateStProductMutation();
  const [updateStProductImage] = useUpdateStProductImageMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  React.useEffect(() => {
    dispatch(acNavStatus([100]));
  }, [dispatch]);

  const category = (search && decodeURIComponent(search.split("=")[1])) || "";

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleUpdate = async (product) => {
    const { data } = await updateStProduct(product);
    if (data) {
      es("Mahsulot malumotlari muvoffaqiyatli o'zgartirildi!", {
        variant: "success",
      });
      setInfo({});
      setUpdate(false);
    }
  };

  const handleDelete = async (id) => {
    const { data } = await deleteStProduct(id);
    if (data) {
      const msg = "Mahsulotni O'zgartirishda qandaydir xatolik yuz berdi";
      es(msg, { variant: "error" });
    }
  };

  const updateImg = async (product) => {
    const { data } = await updateStProductImage(product);
    if (data) {
      const msg = "Mahsulot rasmi muvoffaqiyatli o'zgartirildi!";
      es(msg, { variant: "success" });
    }
  };

  const filteredProducts = products?.data?.filter((product) => {
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
        {categorys?.data?.map((category) => (
          <Link
            to={`?q/gr=${encodeURIComponent(category?.name)}`}
            key={category?.id}
          >
            {category?.name}
          </Link>
        ))}
      </div>

      <div className="all_products">
        {isLoading ? (
          <span className="loader_box relative">
            <LoadingBtn />
          </span>
        ) : (
          filteredProducts?.map((product) => (
            <div className="item" key={product.id}>
              <label className="img_box">
                <span className="upload_img">
                  Mahsulot rasmini o'zgartirish
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => updateImg(product, e.target.files[0])}
                />
                <img src={product?.img} alt="foto" />
              </label>
              <div className="_item_info-box">
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
                      onChange={(e) =>
                        handleInfoChange("description", e.target.value)
                      }
                      autoComplete="off"
                    />
                  </>
                ) : (
                  <>
                    <p className="name">{product.name}</p>
                    <p>{product.description}</p>
                  </>
                )}
                <NumericFormat
                  displayType={update === product?.id ? "input" : "text"}
                  defaultValue={product.price}
                  thousandSeparator=" "
                  suffix=" so'm"
                  onChange={(e) =>
                    handleInfoChange(
                      "price",
                      e.target.value.split(" ").join("")
                    )
                  }
                />
              </div>
              <NumericFormat
                className={update === product?.id ? "" : "_count"}
                displayType={update === product?.id ? "input" : "text"}
                style={{
                  background:
                    product?.food_count <= 15 && product?.food_count >= 10
                      ? "#f07167"
                      : product?.food_count < 10
                      ? "#ef233c"
                      : "",
                }}
                defaultValue={product?.food_count || 12}
                onChange={(e) => handleInfoChange("cost_count")}
              />
              <div className="_item_action-box">
                <div className="status">
                  <span
                    style={
                      product.status === 1
                        ? { background: "#33ff09" }
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
                <span
                  style={{
                    color:
                      product?.food_count <= 15 && product?.food_count >= 10
                        ? "#f07167"
                        : product?.food_count < 10
                        ? "#ef233c"
                        : "",
                  }}
                >
                  {product.food_count}x
                </span>
                <div className="update_btn">
                  {update === product?.id ? (
                    <>
                      <span
                        onClick={() =>
                          handleUpdate({ ...info, id: product.id })
                        }
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
                </div>

                <button
                  style={{ fontSize: "var(--fs4)", color: "#d82a0c" }}
                  onClick={() => handleDelete(product.id)}
                >
                  <AiFillDelete />
                </button>

                <button
                  style={{ fontSize: "var(--fs4)", color: "#219ebc" }}
                  onClick={() => navigate(`/more/info/${product.id}`)}
                >
                  <TbInfoSquareRounded />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

import React from "react";
import "./assets/global.css";
import "./assets/root.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./page/home/home";
import { Layout } from "./layout/layout";
import { Sidebar } from "./components/sideBar/sidebar";
import { Restaurant } from "./page/restaurants/restaurant";
import { CheackDepartment, Login } from "./auth/login";
import { Auth } from "./auth/auth";
import { Addproduct } from "./components/Addproduct/addproduct";
import { Products } from "./page/products/products";
import { MakingFoods } from "./page/makingFoods/makingFoods";
import { MakedFoods } from "./page/makedFoods/maked";
import { Statistics } from "./components/statistics/layout.statis";
import { Document } from "./page/document/document";

export const Router = () => {
  const login = JSON.parse(localStorage.getItem("user")) || [];
  const span = document.createElement("span");
  span.classList.add("stm-animate");
  document.body.appendChild(span);

  document.addEventListener("click", function (event) {
    const x = event.clientX;
    const y = event.clientY;
    span.style.top = `${y - 30}px`;
    span.style.left = `${x - 30}px`;
    span.classList.add("active");
  });

  span.addEventListener("animationend", function () {
    span.classList.remove("active");
  });
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="cheack" element={<CheackDepartment />} />
      {login?.user?.role === "owner" ? (
        <Route path="/" element={<Auth />}>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="sidebar" element={<Sidebar />} />
            <Route path="product/add" element={<Addproduct />} />
            <Route path="restaurant/add" element={<Restaurant />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      ) : (
        <Route path="/" element={<Auth />}>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="historical" element={<Document />} />
            <Route path="statistics" element={<Statistics />} />
            <Route path="sidebar" element={<Sidebar />} />
            <Route path="product" element={<Products />} />
            <Route path="product/add" element={<Addproduct />} />
            <Route path="cooking/food" element={<MakingFoods />} />
            <Route path="prepared/food" element={<MakedFoods />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      )}
    </Routes>
  );
};

const NotFound = () => {
  return (
    <>
      <h1>not found</h1>
    </>
  );
};

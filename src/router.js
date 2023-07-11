import React from "react";
import "./assets/global.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./page/home/home";
import { Layout } from "./layout/layout";
import { Sidebar } from "./components/sideBar/sidebar";
import { Restaurant } from "./page/restaurants/restaurant";
import { Login, Signin } from "./auth/login";
import { Auth } from "./auth/auth";
import { Addproduct } from "./components/Addproduct/addproduct";

export const Router = () => {
  const login = JSON.parse(localStorage.getItem("user")) || [];
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signin" element={<Signin />} />
      {login?.user?.role === "owner" ? (
        <Route path="/" element={<Auth />}>
          <Route path="/" element={<Layout />}>
            <Route path="sidebar" element={<Sidebar />} />
            <Route path="dashboard" element={<Home />} />
            <Route path="add/product" element={<Addproduct />} />
            <Route path="restaurant/add" element={<Restaurant />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      ) : (
        <Route path="/" element={<Auth />}>
          <Route path="/" element={<Layout />}>
            <Route path="sidebar" element={<Sidebar />} />
            <Route path="dashboard" element={<Home />} />
            <Route path="add/product" element={<Addproduct />} />
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

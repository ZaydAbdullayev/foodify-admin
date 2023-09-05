import React from "react";
import "./layout..css";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/sideBar/sidebar";
import { useSelector } from "react-redux";
import { Navbar } from "../components/navbar/navbar";
export const Layout = () => {
  const shrinkMod = useSelector((state) => state.shrink);

  return (
    <div className="layout">
      <aside className={shrinkMod ? "short_aside" : "aside"}>
        <Sidebar />
      </aside>
      <main className={shrinkMod ? "long_main" : "main"}>
        <Navbar />
        <Outlet />
      </main>
    </div>
  );
};

import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const Auth = () => {
  const auth = useSelector((state) => state.auth);
  const location = useLocation();

  if (auth) {
    return <Outlet />;
  } else {
    return <Navigate to={{ pathname: "/login", state: { from: location } }} />;
  }
};

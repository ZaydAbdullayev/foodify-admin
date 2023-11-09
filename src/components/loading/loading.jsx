import React, { memo } from "react";
import "./loading.css";
import { BiLoader } from "react-icons/bi";

export const Loading = memo(() => {
  return <div className="loading"></div>;
});

export const LoadingBtn = () => {
  return (
    <div className="loading_btn">
      <BiLoader />
    </div>
  );
};

import React from "react";
import "./loading.css";
import { BiLoader } from "react-icons/bi";


export const LoadingBtn = () => {
  return (
    <div className="loading_btn">
      <BiLoader className="svg_loader" />
    </div>
  );
};

export const LoaderSvg = (props) => {
  return <BiLoader className="svg_loader" style={{ margin: "auto", ...props }} />;
};

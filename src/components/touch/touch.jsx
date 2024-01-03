import React, { useState } from "react";
import "./touch.css";

export const AssistiveTouch = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="menu-container">
      <div
        className={`menu-item main-item ${isOpen ? "open" : ""}`}
        onClick={toggleMenu}
      ></div>
      <div className={`menu-item item-1 ${isOpen ? "open" : ""}`}>1</div>
      <div className={`menu-item item-2 ${isOpen ? "open" : ""}`}>2</div>
      <div className={`menu-item item-3 ${isOpen ? "open" : ""}`}>3</div>
      <div className={`menu-item item-4 ${isOpen ? "open" : ""}`}>4</div>
    </div>
  );
};

import React from "react";

const MenuButton = () => {
  return (
    <label htmlFor="check" className="menuButton" id="menuButton">
      <input id="check" type="checkbox" />
      <span className="top"></span>
      <span className="mid"></span>
      <span className="bot"></span>
    </label>
  );
};

export default MenuButton;

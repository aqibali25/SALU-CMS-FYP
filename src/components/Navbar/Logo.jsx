import React from "react";
import logo from "../../assets/Logo.png";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="logo">
      <img src={logo} alt="Salu logo" />
      <Link to="/" className="name">
        <label htmlFor="name">SHAH ABDUL LATIF UNIVERSITY</label>
        <label>GHOTKI CAMPUS</label>
      </Link>
    </div>
  );
};

export default Logo;

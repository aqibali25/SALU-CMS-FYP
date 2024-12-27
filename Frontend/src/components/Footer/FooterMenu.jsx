import React from "react";
import { Link } from "react-router-dom";

const FooterMenu = () => {
  return (
    <div className="footerMenu">
      <Link to="SALU-CMS-FYP/about">About</Link>
      <Link to="/">Contact us</Link>
      <Link to="/">FAQS</Link>
      <Link to="/">Terms and Conditions</Link>
      <Link to="/">Privacy</Link>
    </div>
  );
};

export default FooterMenu;

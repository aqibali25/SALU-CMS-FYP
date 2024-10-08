import React from "react";
import SocialIcons from "./SocialIcons";
import FooterMenu from "./FooterMenu";
import "../../styles/Footer.css";

const Footer = () => {
  return (
    <footer>
      <SocialIcons />
      <FooterMenu />
      <label htmlFor="copyright" className="copyright">
        Copyright © 2023 - Shah Abdul Latif University - Ghotki Campus
      </label>
    </footer>
  );
};

export default Footer;

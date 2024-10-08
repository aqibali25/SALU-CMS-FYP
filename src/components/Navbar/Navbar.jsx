import React, { useState } from "react";
import Logo from "./Logo";
import NavLinks from "./NavLink";
import "../../styles/Navbar.css";
import ButtonLink from "../Button/ButtonLink";

const Navbar = () => {
  // State to manage the menu's visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinksData = [
    { name: "Home", href: "/", className: "home" },
    { name: "Faculty", href: "/faculty", className: "faculty" },
    { name: "Admission", href: "/admission", className: "admission" },
    { name: "About", href: "/about", className: "about" },
  ];

  return (
    <nav>
      <Logo />
      <div
        className={`navAndSignup ${isMenuOpen ? "open" : ""}`}
        id="navAndSignup"
      >
        <div className="navLinks">
          {/* Pass navLinksData as a prop to NavLinks */}
          {navLinksData.map((link, index) => (
            <NavLinks key={index} link={link} />
          ))}
        </div>
        <div className="loginSignUp">
          {/* Use Link for navigation with correct paths */}
          <ButtonLink to="/login" className="login" text="LOGIN" />
          <ButtonLink to="/signup" className="signup" text="SIGN UP" />
        </div>
      </div>
      <label htmlFor="check" className="menuButton" id="menuButton">
        <input
          id="check"
          type="checkbox"
          checked={isMenuOpen}
          onChange={handleMenuToggle}
        />
        <span className="top"></span>
        <span className="mid"></span>
        <span className="bot"></span>
      </label>
    </nav>
  );
};

export default Navbar;

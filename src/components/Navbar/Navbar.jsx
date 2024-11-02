import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import NavLinks from "./NavLink";
import "../../styles/Navbar.css";
import ButtonLink from "../Button/ButtonLink";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const navLinksData = [
    { name: "Home", href: "SALU-CMS-FYP/", className: "home" },
    { name: "Faculty", href: "SALU-CMS-FYP/faculty", className: "faculty" },
    {
      name: "Admission",
      href: "SALU-CMS-FYP/admission",
      className: "admission",
    },
    { name: "About", href: "SALU-CMS-FYP/about", className: "about" },
  ];

  // Handle the menu toggle
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Update screen width on resize
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Set the width of navAndSignup based on menu state and screen width
  const getNavAndSignupWidth = () => {
    if (screenWidth > 880) {
      return "60%";
    }
    return isMenuOpen ? "100%" : "0%";
  };

  return (
    <nav>
      <Logo />
      <div
        className="navAndSignup"
        id="navAndSignup"
        style={{ width: getNavAndSignupWidth() }}
      >
        <div className="navLinks">
          {/* Pass navLinksData as a prop to NavLinks */}
          {navLinksData.map((link, index) => (
            <NavLinks key={index} link={link} />
          ))}
        </div>
        <div className="buttonContainer">
          {/* Use ButtonLink for login and signup buttons */}
          <ButtonLink
            href="SALU-CMS-FYP/login"
            className="login"
            text="LOGIN"
          />
          <ButtonLink
            href="SALU-CMS-FYP/signup"
            className="signup"
            text="SIGN UP"
          />
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

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Logo from "./Logo";
import NavLinks from "./NavLink";
import "../../styles/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import Profile from "./Profile";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const isLoggedIn = Cookies.get("isLoggedIn"); // Get authentication status from cookies
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      // navigate("/SALU-CMS-FYP/");
    }
  }, []);

  const navLinksData = [
    { name: "Home", href: "SALU-CMS-FYP/", className: "home" },
    { name: "Faculty", href: "SALU-CMS-FYP/faculty", className: "faculty" },
    {
      name: "Admission",
      href: "SALU-CMS-FYP/admissions",
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
          {navLinksData.map((link, index) => (
            <NavLinks key={index} link={link} />
          ))}
        </div>
        <div className="buttonContainer">
          {isLoggedIn ? (
            <Profile />
          ) : (
            <>
              <Link to="SALU-CMS-FYP/login" className="button buttonNotFilled">
                LOGIN
              </Link>
              <Link to="/SALU-CMS-FYP/signup" className="button buttonFilled">
                SIGN UP
              </Link>
            </>
          )}
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

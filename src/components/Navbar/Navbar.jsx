import React, { useState } from "react";
import Logo from "./Logo";
import NavLinks from "./NavLink";
import LoginSignUp from "./LoginSignUpbtn";
import "../../styles/Navbar.css";
import MenuButton from "./MenuButton";

const Navbar = () => {
  // State to manage the menu's visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinksData = [
    { name: "Home", href: "/", className: "home" },
    { name: "Faculty", href: "#", className: "faculty" },
    { name: "Admission", href: "#", className: "admission" },
    { name: "About", href: "#", className: "about" },
  ];

  return (
    <nav>
      <Logo />
      <div
        className={`navAndSignup ${isMenuOpen ? "open" : ""}`}
        id="navAndSignup"
      >
        {" "}
        <div class="navLinks">
          {/* Pass navLinksData as a prop to NavLinks */}
          {navLinksData.map((link, index) => (
            <NavLinks key={index} link={link} />
          ))}
        </div>
        <LoginSignUp />
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

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHome,
  faUser,
  faBell,
  faQuestionCircle,
  faCog,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import "../../styles/FormSideBar.css";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const navigate = useNavigate(); // For programmatic navigation
  const location = useLocation(); // Access the current location object

  useEffect(() => {
    // Update screen width on resize
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const savedActiveIndex = localStorage.getItem("activeIndex");
    if (savedActiveIndex !== null) {
      setActiveIndex(parseInt(savedActiveIndex));
    }

    // Automatically add the collapsed class when the screen size is <= 865px
    if (screenWidth <= 880) {
      setIsCollapsed(true);
    }
  }, [screenWidth]);

  // Set the active index based on the current URL path
  useEffect(() => {
    if (location.pathname === "/SALU-CMS-FYP/admissions") {
      setActiveIndex(0);
    } else if (location.pathname === "/SALU-CMS-FYP/admissions/form") {
      setActiveIndex(1);
    } else if (location.pathname === "/SALU-CMS-FYP/admissions/sittings") {
      setActiveIndex(4);
    }
  }, [location]);

  const toggleSidebar = () => {
    if (screenWidth > 880) {
      setIsCollapsed(!isCollapsed); // Toggle the collapsed class only if screenWidth > 865px
    }
  };

  const handleMenuItemClick = (index) => {
    setActiveIndex(index);
    localStorage.setItem("activeIndex", index);
  };

  const handleLogout = () => {
    localStorage.clear(); // Clear all localStorage items
    navigate("/SALU-CMS-FYP/login"); // Redirect to login page
  };

  return (
    <div
      className={`formConitainer sidebar-container ${
        isCollapsed ? "collapsed" : ""
      }`}
    >
      <div className="menu">
        {/* Menu Icon */}
        <span onClick={toggleSidebar} className="menu-icon">
          <FontAwesomeIcon icon={faBars} size="lg" />
        </span>
        <hr />
        {/* Menu Items */}
        <Link
          to="/SALU-CMS-FYP/admissions"
          className={`menu-item ${activeIndex === 0 ? "active" : ""}`}
          onClick={() => handleMenuItemClick(0)}
        >
          <FontAwesomeIcon icon={faQuestionCircle} size="lg" />
          {!isCollapsed && <span>Instructions</span>}
        </Link>
        <Link
          to="/SALU-CMS-FYP/admissions/form"
          className={`menu-item ${activeIndex === 1 ? "active" : ""}`}
          onClick={() => handleMenuItemClick(1)}
        >
          <FontAwesomeIcon icon={faUser} size="lg" />
          {!isCollapsed && <span>Admission Form</span>}
        </Link>
        <Link
          to="#"
          className={`menu-item ${activeIndex === 2 ? "active" : ""}`}
          onClick={() => handleMenuItemClick(2)}
        >
          <FontAwesomeIcon icon={faBell} size="lg" />
          {!isCollapsed && <span>Notification</span>}
        </Link>
        <Link
          to="#"
          className={`menu-item ${activeIndex === 3 ? "active" : ""}`}
          onClick={() => handleMenuItemClick(3)}
        >
          <FontAwesomeIcon icon={faHome} size="lg" />
          {!isCollapsed && <span>Home</span>}
        </Link>
        <Link
          to="/SALU-CMS-FYP/admissions/sittings"
          className={`menu-item ${activeIndex === 4 ? "active" : ""}`}
          onClick={() => handleMenuItemClick(4)}
        >
          <FontAwesomeIcon icon={faCog} size="lg" />
          {!isCollapsed && <span>Settings</span>}
        </Link>
        <hr />
        {/* Logout Button */}
        <span className="logout-button" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
          {!isCollapsed && <span>Log Out</span>}
        </span>
      </div>
    </div>
  );
};

export default Sidebar;

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faInfoCircle,
  faFileSignature,
  faUniversity,
  faClipboardList,
  faMoneyCheckAlt,
  faBook,
  faFileAlt,
  faCog,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../../styles/FormSideBar.css";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
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

    if (screenWidth <= 880) {
      setIsCollapsed(true);
    }
  }, [screenWidth]);

  useEffect(() => {
    if (location.pathname === "/SALU-CMS-FYP/admissions") {
      setActiveIndex(0);
    } else if (location.pathname === "/SALU-CMS-FYP/admissions/form") {
      setActiveIndex(1);
    } else if (
      location.pathname === "/SALU-CMS-FYP/admissions/eligibility-criteria"
    ) {
      setActiveIndex(2);
    } else if (
      location.pathname === "/SALU-CMS-FYP/admissions/admission-procedure"
    ) {
      setActiveIndex(3);
    } else if (location.pathname === "/SALU-CMS-FYP/admissions/fee-structure") {
      setActiveIndex(4);
    } else if (location.pathname === "/SALU-CMS-FYP/admissions/prospectus") {
      setActiveIndex(5);
    } else if (location.pathname === "/SALU-CMS-FYP/admissions/sample-papers") {
      setActiveIndex(6);
    } else if (location.pathname === "/SALU-CMS-FYP/admissions/settings") {
      setActiveIndex(7);
    }
  }, [location]);

  const toggleSidebar = () => {
    if (screenWidth > 880) {
      setIsCollapsed(!isCollapsed);
    }
  };

  const handleMenuItemClick = (index) => {
    setActiveIndex(index);
    localStorage.setItem("activeIndex", index);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/SALU-CMS-FYP/login");
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
          <FontAwesomeIcon icon={faBars} size="2x" />
        </span>
        <hr />
        {/* Menu Items */}
        <Link
          to="/SALU-CMS-FYP/admissions"
          className={`menu-item ${activeIndex === 0 ? "active" : ""}`}
          onClick={() => handleMenuItemClick(0)}
        >
          <FontAwesomeIcon icon={faInfoCircle} size="lg" />
          {!isCollapsed && <span>Instructions</span>}
        </Link>
        <Link
          to="/SALU-CMS-FYP/admissions/form"
          className={`menu-item ${activeIndex === 1 ? "active" : ""}`}
          onClick={() => handleMenuItemClick(1)}
        >
          <FontAwesomeIcon icon={faFileSignature} size="lg" />
          {!isCollapsed && <span>Application Form</span>}
        </Link>
        <Link
          to="/SALU-CMS-FYP/admissions/eligibility-criteria"
          className={`menu-item ${activeIndex === 2 ? "active" : ""}`}
          onClick={() => handleMenuItemClick(2)}
        >
          <FontAwesomeIcon icon={faUniversity} size="lg" />
          {!isCollapsed && <span>Eligibility Criteria</span>}
        </Link>
        <Link
          to="/SALU-CMS-FYP/admissions/admission-procedure"
          className={`menu-item ${activeIndex === 3 ? "active" : ""}`}
          onClick={() => handleMenuItemClick(3)}
        >
          <FontAwesomeIcon icon={faClipboardList} size="lg" />
          {!isCollapsed && <span>Admission Procedure</span>}
        </Link>
        <Link
          to="/SALU-CMS-FYP/admissions/fee-structure"
          className={`menu-item ${activeIndex === 4 ? "active" : ""}`}
          onClick={() => handleMenuItemClick(4)}
        >
          <FontAwesomeIcon icon={faMoneyCheckAlt} size="lg" />
          {!isCollapsed && <span>Fee Structure</span>}
        </Link>
        <Link
          to="/SALU-CMS-FYP/admissions/prospectus"
          className={`menu-item ${activeIndex === 5 ? "active" : ""}`}
          onClick={() => handleMenuItemClick(5)}
        >
          <FontAwesomeIcon icon={faBook} size="lg" />
          {!isCollapsed && <span>Prospectus</span>}
        </Link>
        <Link
          to="/SALU-CMS-FYP/admissions/sample-papers"
          className={`menu-item ${activeIndex === 6 ? "active" : ""}`}
          onClick={() => handleMenuItemClick(6)}
        >
          <FontAwesomeIcon icon={faFileAlt} size="lg" />
          {!isCollapsed && <span>Sample Papers</span>}
        </Link>
        <Link
          to="/SALU-CMS-FYP/admissions/settings"
          className={`menu-item ${activeIndex === 7 ? "active" : ""}`}
          onClick={() => handleMenuItemClick(7)}
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

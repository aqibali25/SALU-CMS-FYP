import React, { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const ProfileDropdown = () => {
  const [menuActive, setMenuActive] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setMenuActive(false);
    }
  };

  useEffect(() => {
    if (menuActive) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuActive]);

  const handleLogout = () => {
    Cookies.remove("isLoggedIn");
    Cookies.remove("cnic");
    navigate("/SALU-CMS-FYP/login");
  };

  return (
    <>
      <div className="profile" onClick={toggleMenu} ref={dropdownRef}>
        <div className="img-box border d-flex justify-content-center align-items-end">
          <img
            src="https://www.w3schools.com/howto/img_avatar.png"
            alt="User Avatar"
            className="img-fluid"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        <div className={`dropDownMenu ${menuActive ? "active" : ""}`}>
          <div className="menu-header">
            <Link to="/admissions/change-password" className="link">
              <FontAwesomeIcon icon={faCog} />
              Change Password
            </Link>

            <Link to="/login" className="link" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} />
              Log Out
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileDropdown;

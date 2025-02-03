import React, { useState, useEffect, useRef } from "react";
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
            <Link to="/SALU-CMS-FYP/admissions/settings" className="link">
              <FontAwesomeIcon icon={faCog} />
              Settings
            </Link>

            <Link
              to="/SALU-CMS-FYP/login"
              className="link"
              onClick={() => {
                localStorage.removeItem("isLoggedIn");
              }}
            >
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

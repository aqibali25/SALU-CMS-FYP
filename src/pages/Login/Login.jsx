import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // React Router for navigation
import "./Login.css";
import Logo from "../../assets/Logo.png";
import BackgroundImage from "../../assets/Background.jpg";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Set document title for the login page
    document.title = "Login";

    // Check if the user is already logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    // If logged in, redirect to the admission page
    if (isLoggedIn === "true") {
      navigate("/SALU-CMS-FYP/admission");
    }
  }, [navigate]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    // Assume successful login
    localStorage.setItem("isLoggedIn", "true");

    // Redirect to the admission page after login
    navigate("/SALU-CMS-FYP/admission");
  };

  return (
    <>
      <div
        className="login-container"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      >
        <div className="login-form-overlay">
          <div className="login-form-content text-center">
            {/* University Logo */}
            <div className="logo-container mb-3">
              <img
                src={Logo}
                alt="University Logo"
                className="university-logo"
              />
            </div>

            {/* Form Title */}
            <h2 className="text-gray">Welcome to SALU</h2>
            <h3 className="text-warning">Undergraduate Admission System</h3>
            <p className="text-gray">Enter your information below to login.</p>

            {/* Login Form */}
            <form onSubmit={handleLoginSubmit}>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control form-input"
                  placeholder="Enter CNIC"
                  required
                />
              </div>
              <div className="form-group mb-3">
                <input
                  type="password"
                  className="form-control form-input"
                  placeholder="Enter Password"
                  required
                />
              </div>

              <button type="submit" className="btn btn-warning w-100">
                Login
              </button>
            </form>

            {/* Footer */}
            <div className="footer mt-4 text-white">
              <p>RegisCopyright © 2024 SALU.</p>
              <p>Phone: 0243-920126ter</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

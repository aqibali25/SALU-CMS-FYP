import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // React Router for navigation
import "../Login/Login.css";
import Logo from "../../assets/Logo.png";
import BackgroundImage from "../../assets/Background.jpg";

const Signup = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Set the document title for the signup page
    document.title = "Signup";

    // Check if the user is already logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    // If logged in, redirect to the admission page
    if (isLoggedIn === "true") {
      navigate("/SALU-CMS-FYP/admission");
    }
  }, [navigate]);

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    // Assume successful signup
    localStorage.setItem("isLoggedIn", "true");

    // Redirect to the admission page after signup
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
            <h2 className="text-gray">New User Registration</h2>
            <h3 className="text-warning">Kindly Register for Admission</h3>
            <p className="text-gray">
              Fill the form below to create an account.
            </p>

            {/* Signup Form */}
            <form onSubmit={handleSignupSubmit}>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control form-input"
                  placeholder="CNIC"
                  required
                />
              </div>
              <div className="form-group mb-3">
                <input
                  type="password"
                  className="form-control form-input"
                  placeholder="Password"
                  required
                />
              </div>
              <div className="form-group mb-3">
                <input
                  type="password"
                  className="form-control form-input"
                  placeholder="Confirm Password"
                  required
                />
              </div>

              <button type="submit" className="btn btn-warning w-100">
                Register
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

export default Signup;

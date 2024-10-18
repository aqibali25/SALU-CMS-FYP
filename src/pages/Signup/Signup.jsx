import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router for navigation
import "../Login/Login.css";
import Logo from "../../assets/Logo.png";
import BackgroundImage from "../../assets/Background.jpg";

const Signup = () => {
  const navigate = useNavigate();

  // State to store user input (CNIC, password, and confirm password)
  const [signupFormData, setSignupFormData] = useState({
    cnic: "",
    password: "",
    confirmPassword: "",
  });

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

  // Handle input changes and update state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignupFormData((prevData) => ({
      ...prevData,
      [name]: value, // Dynamically update the form field based on its name
    }));
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    // Log the signupFormData object (CNIC, password, confirm password)
    console.log("Signup Form Data:", signupFormData);

    // You could also add password validation here (e.g., matching password and confirmPassword)

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
                  name="cnic" // Name for identification
                  value={signupFormData.cnic} // Access CNIC from signupFormData
                  onChange={handleInputChange} // Update state on input change
                  required
                />
              </div>
              <div className="form-group mb-3">
                <input
                  type="password"
                  className="form-control form-input"
                  placeholder="Password"
                  name="password" // Name for identification
                  value={signupFormData.password} // Access password from signupFormData
                  onChange={handleInputChange} // Update state on input change
                  required
                />
              </div>
              <div className="form-group mb-3">
                <input
                  type="password"
                  className="form-control form-input"
                  placeholder="Confirm Password"
                  name="confirmPassword" // Name for identification
                  value={signupFormData.confirmPassword} // Access confirmPassword from signupFormData
                  onChange={handleInputChange} // Update state on input change
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
              <p>Phone: 0243-920126833</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;

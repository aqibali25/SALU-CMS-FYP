import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Logo from "../../assets/Logo.png";
import BackgroundImage from "../../assets/Background.jpg";

const Login = () => {
  const navigate = useNavigate();

  // State for user input (CNIC and password) stored as an object
  const [loginFormData, setLoginFormData] = useState({
    cnic: "",
    password: "",
  });

  const [isCnicValid, setIsCnicValid] = useState(true); // State to track CNIC validity

  useEffect(() => {
    document.title = "Login";
  }, [navigate]);

  // Handle input changes and update state
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Only allow CNIC to be formatted with numbers and hyphens
    if (name === "cnic") {
      const formattedCnic = formatCnic(value);
      setLoginFormData((prevData) => ({
        ...prevData,
        [name]: formattedCnic,
      }));

      // Check if CNIC format is valid (#####-#######-#)
      const cnicPattern = /^\d{5}-\d{7}-\d{1}$/;
      setIsCnicValid(cnicPattern.test(formattedCnic));
    } else {
      setLoginFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Function to format CNIC while typing
  const formatCnic = (value) => {
    // Remove all non-numeric characters except for hyphen
    const cleanValue = value.replace(/\D/g, "");

    // Format the CNIC as #####-#######-#
    const part1 = cleanValue.substring(0, 5);
    const part2 = cleanValue.substring(5, 12);
    const part3 = cleanValue.substring(12, 13);

    let formatted = part1;
    if (part2) formatted += "-" + part2;
    if (part3) formatted += "-" + part3;

    return formatted;
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    // Validate if CNIC and password match the required values
    if (
      loginFormData.cnic === "45102-1234567-1" &&
      loginFormData.password === "123"
    ) {
      // localStorage.setItem("isLoggedIn", "true");
      // Redirect to the admission page after login
      // navigate("/SALU-CMS-FYP/admissionForm");
    } else {
      alert("Invalid CNIC or password. Please try again.");
      setLoginFormData({ cnic: "", password: "" });
    }

    // Log the loginFormData object (CNIC and password)
    console.log("Login Form Data:", loginFormData);
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
                  placeholder="CNIC (#####-#######-#)"
                  name="cnic" // Name for identification
                  value={loginFormData.cnic} // Access CNIC from loginFormData
                  onChange={handleInputChange} // Update state on input change
                  maxLength={15} // Limit length to match CNIC format
                  style={{
                    border: !isCnicValid ? "2px solid red" : "", // Add red border if CNIC is invalid
                  }}
                  autoComplete="off"
                  required
                />
              </div>

              {/* Display CNIC error if invalid */}
              <span
                className="invalid-feedback"
                style={{
                  color: "red",
                  display: !isCnicValid ? "block" : "none",
                  marginBottom: "10px",
                }}
              >
                {!isCnicValid
                  ? "Invalid CNIC format! Must be #####-#######-#"
                  : ""}
              </span>

              <div className="form-group mb-3">
                <input
                  type="password"
                  className="form-control form-input"
                  placeholder="Enter Password"
                  name="password" // Name for identification
                  value={loginFormData.password} // Access password from loginFormData
                  onChange={handleInputChange} // Update state on input change
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
              <p>Phone: 0243-920126833</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

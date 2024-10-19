import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const [isPasswordMatch, setIsPasswordMatch] = useState(true); // State to track password match
  const [isCnicValid, setIsCnicValid] = useState(true); // State to track CNIC validity
  const [isPasswordStrong, setIsPasswordStrong] = useState(true); // State to track strong password

  useEffect(() => {
    document.title = "Signup";

    const isLoggedIn = localStorage.getItem("isLoggedIn");

    // If logged in, redirect to the admission page
    if (isLoggedIn === "true") {
      navigate("/SALU-CMS-FYP/admission");
    }
  }, [navigate]);

  // Handle input changes and update state
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Only allow CNIC to be formatted with numbers and hyphens
    if (name === "cnic") {
      const formattedCnic = formatCnic(value);
      setSignupFormData((prevData) => ({
        ...prevData,
        [name]: formattedCnic,
      }));

      // Check if CNIC format is valid (#####-#######-#)
      const cnicPattern = /^\d{5}-\d{7}-\d{1}$/;
      setIsCnicValid(cnicPattern.test(formattedCnic));
    } else {
      setSignupFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));

      // If updating password, validate its strength
      if (name === "password") {
        validatePasswordStrength(value);
      }
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

  // Function to validate password strength
  const validatePasswordStrength = (password) => {
    // Regex to check for at least 1 number, 1 special character, 1 uppercase letter, and 8 characters in total
    const passwordPattern =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/;

    setIsPasswordStrong(passwordPattern.test(password));
  };

  // Handle blur event to remove error when user unfocuses the input fields
  const handleInputBlur = (e) => {
    const { name } = e.target;

    // Check password strength when either password or confirm password field is blurred
    if (name === "password" || name === "confirmPassword") {
      validatePasswordStrength(signupFormData.password);
    }

    // Check password match when confirm password is blurred
    if (name === "confirmPassword") {
      setIsPasswordMatch(
        signupFormData.password === signupFormData.confirmPassword
      );
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    // Log the signupFormData object (CNIC, password, confirm password)
    console.log("Signup Form Data:", signupFormData);

    // Check if passwords match
    if (signupFormData.password !== signupFormData.confirmPassword) {
      setIsPasswordMatch(false); // Set state for password mismatch
    } else {
      setIsPasswordMatch(true);

      // Check if CNIC is valid and password is strong
      if (isCnicValid && isPasswordStrong) {
        // Assume successful signup
        localStorage.setItem("isLoggedIn", "true");

        // Redirect to the admission page after signup
        navigate("/SALU-CMS-FYP/admission");
      }
    }
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
                  placeholder="CNIC (#####-#######-#)"
                  name="cnic" // Name for identification
                  value={signupFormData.cnic} // Access CNIC from signupFormData
                  onChange={handleInputChange} // Update state on input change
                  onBlur={handleInputBlur} // Remove error when unfocused
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
                  placeholder="Password"
                  name="password" // Name for identification
                  value={signupFormData.password} // Access password from signupFormData
                  onChange={handleInputChange} // Update state on input change
                  onBlur={handleInputBlur} // Remove error when unfocused
                  style={{
                    border:
                      !isPasswordMatch || !isPasswordStrong
                        ? "2px solid red"
                        : "", // Add red border if passwords don't match or password is weak
                  }}
                  required
                />
              </div>

              {/* Display password strength error */}
              <span
                className="invalid-feedback"
                style={{
                  fontSize: "10px",
                  color: "red",
                  display: !isPasswordStrong ? "block" : "none",
                  marginBottom: "10px",
                }}
              >
                {!isPasswordStrong
                  ? "Password requires 1 number, 1 special character, 1 uppercase letter, and at least 8 characters."
                  : ""}
              </span>

              <div className="form-group mb-3">
                <input
                  type="password"
                  className="form-control form-input"
                  placeholder="Confirm Password"
                  name="confirmPassword" // Name for identification
                  value={signupFormData.confirmPassword} // Access confirmPassword from signupFormData
                  onChange={handleInputChange} // Update state on input change
                  onBlur={handleInputBlur} // Remove error when unfocused
                  style={{
                    border: !isPasswordMatch ? "2px solid red" : "", // Add red border if passwords don't match
                  }}
                  required
                />
              </div>

              {/* Display password mismatch error */}
              <span
                className="invalid-feedback"
                style={{
                  color: "red",
                  display: !isPasswordMatch ? "block" : "none",
                  marginBottom: "10px",
                }}
              >
                {!isPasswordMatch ? "Confirm Password does not match!" : ""}
              </span>

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

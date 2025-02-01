import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Login/Login.css";
import Logo from "../../assets/Logo.png";
import BackgroundImage from "../../assets/Background.jpg";
import LoginMarquee from "../../components/LoginMarquee";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { SignupContext } from "../../contexts/SignupContext"; // Import context

const Signup = () => {
  const navigate = useNavigate();
  const { updateSignupData } = useContext(SignupContext); // Access context to save signup data

  const [signupFormData, setSignupFormData] = useState({
    cnic: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [isCnicValid, setIsCnicValid] = useState(true);
  const [isPasswordStrong, setIsPasswordStrong] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true); // Track email validity

  useEffect(() => {
    document.title = "Signup | SALU Ghotki";

    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      navigate("/SALU-CMS-FYP/admission-form");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "username") {
      const formattedCnic = formatCnic(value);
      setSignupFormData((prevData) => ({
        ...prevData,
        [name]: formattedCnic,
      }));

      const cnicPattern = /^\d{5}-\d{7}-\d{1}$/;
      setIsCnicValid(cnicPattern.test(formattedCnic));
    } else if (name === "email") {
      setSignupFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));

      // Validate email format
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setIsEmailValid(emailPattern.test(value));
    } else {
      setSignupFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));

      if (name === "password") {
        validatePasswordStrength(value);
      }
    }

    // Update context with the latest form data
    updateSignupData({ [name]: value });
  };

  const formatCnic = (value) => {
    const cleanValue = value.replace(/\D/g, "");
    const part1 = cleanValue.substring(0, 5);
    const part2 = cleanValue.substring(5, 12);
    const part3 = cleanValue.substring(12, 13);
    let formatted = part1;
    if (part2) formatted += "-" + part2;
    if (part3) formatted += "-" + part3;
    return formatted;
  };

  const validatePasswordStrength = (password) => {
    const passwordPattern =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/;
    setIsPasswordStrong(passwordPattern.test(password));
  };

  const handleInputBlur = (e) => {
    const { name } = e.target;
    if (name === "password" || name === "confirmPassword") {
      validatePasswordStrength(signupFormData.password);
    }
    if (name === "confirmPassword") {
      setIsPasswordMatch(
        signupFormData.password === signupFormData.confirmPassword
      );
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (!isEmailValid) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupFormData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("isLoggedIn", "true");
        navigate("SALU-CMS-FYP/admissions");
      } else {
        alert(data.message || "Signup failed!");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <div
      className="login-container"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <LoginMarquee />
      <div className="login-form-overlay mt-5">
        <div className="login-form-content text-center">
          <div className="logo-container mb-3">
            <img src={Logo} alt="University Logo" className="university-logo" />
          </div>

          <h2 className="text-gray">New User Registration</h2>
          <h3 className="text-warning">Kindly Register for Admission</h3>
          <p className="text-gray">Fill the form below to create an account.</p>

          <form onSubmit={handleSignupSubmit}>
            {/* CNIC Input */}
            <div className="form-group mb-3">
              <input
                type="text"
                className="noBorderRadius form-control form-input"
                placeholder="CNIC (#####-#######-#)"
                name="username" // Changed to "username"
                value={signupFormData.cnic}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                maxLength={15}
                style={{ border: !isCnicValid ? "2px solid red" : "" }}
                required
              />
            </div>

            {/* Email Input */}
            <div className="form-group mb-3">
              <input
                type="email"
                className="noBorderRadius form-control form-input"
                placeholder="Email Address"
                name="email"
                value={signupFormData.email}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                style={{ border: !isEmailValid ? "2px solid red" : "" }}
                autoComplete="off"
                required
              />
            </div>
            {/* Password Input */}
            <div className="form-group mb-3">
              <input
                type={passwordVisible ? "text" : "password"}
                className="noBorderRadius form-control form-input"
                placeholder="Password"
                name="password"
                value={signupFormData.password}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                style={{
                  border:
                    (signupFormData.password && !isPasswordMatch) ||
                    (signupFormData.password && !isPasswordStrong)
                      ? "2px solid red"
                      : "",
                }}
                required
              />
              <FontAwesomeIcon
                className="text-white"
                icon={passwordVisible ? faEye : faEyeSlash}
                onClick={togglePasswordVisibility}
                style={{
                  position: "absolute",
                  right: "40px",
                  cursor: "pointer",
                }}
              />
            </div>

            {/* Confirm Password Input */}
            <div className="form-group mb-3">
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                className="noBorderRadius form-control form-input"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={signupFormData.confirmPassword}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                style={{
                  border: !isPasswordMatch ? "2px solid red" : "",
                }}
                required
              />
              <FontAwesomeIcon
                className="text-white"
                icon={confirmPasswordVisible ? faEye : faEyeSlash}
                onClick={toggleConfirmPasswordVisibility}
                style={{
                  position: "absolute",
                  right: "40px",
                  cursor: "pointer",
                }}
              />
            </div>

            <div className="buttonContainer w-100">
              <button
                type="submit"
                className="button buttonFilled text-white w-100"
              >
                Register
              </button>
            </div>
          </form>

          <div className="footer mt-4 text-white">
            Already have an account?{" "}
            <Link to={"/SALU-CMS-FYP/login"} style={{ color: "white" }}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

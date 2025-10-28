import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Login/Login.css";
import Logo from "../../assets/Logo.png";
import BackgroundImage from "../../assets/Background.jpg";
import LoginMarquee from "../../components/LoginMarquee";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { SignupContext } from "../../contexts/SignupContext";
import Cookies from "js-cookie";

const Signup = () => {
  const navigate = useNavigate();
  const { updateSignupData } = useContext(SignupContext);

  const [signupFormData, setSignupFormData] = useState({
    cnic: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [isCnicValid, setIsCnicValid] = useState(true);
  const [isPasswordStrong, setIsPasswordStrong] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);

  useEffect(() => {
    document.title = "Signup | SALU Ghotki";
    const isLoggedIn = Cookies.get("isLoggedIn");
    if (isLoggedIn === "true") {
      navigate("/SALU-CMS-FYP/admission-form");
    }
  }, [navigate]);

  // 🟢 Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "cnic") {
      const formattedCnic = formatCnic(value);
      setSignupFormData((prevData) => ({
        ...prevData,
        cnic: formattedCnic,
      }));
      const cnicPattern = /^\d{5}-\d{7}-\d{1}$/;
      setIsCnicValid(cnicPattern.test(formattedCnic));
      updateSignupData({ cnic: formattedCnic });
    } else {
      setSignupFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));

      if (name === "email") {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsEmailValid(emailPattern.test(value));
      }

      if (name === "password") {
        validatePasswordStrength(value);
      }

      updateSignupData({ [name]: value });
    }
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

  // 🟢 Submit Form Data to Backend
  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (!isEmailValid) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3306/api/signup",
        signupFormData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      sessionStorage.setItem("cn", JSON.stringify(signupFormData.cnic));

      if (response.status === 200) {
        Cookies.set("isLoggedIn", "true", { expires: 1 });
        Cookies.set("cnic", signupFormData.cnic, { expires: 1 });
        navigate("/SALU-CMS-FYP/admissions");
      } else {
        alert(response.data.message || "Signup failed!");
      }
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || error.message));
    }
  };

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

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
            {/* Full Name */}
            <div className="form-group mb-3">
              <input
                type="text"
                className="noBorderRadius form-control form-input"
                placeholder="Full Name"
                name="fullName" // ✅ fixed
                value={signupFormData.fullName}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                autoComplete="off"
                required
              />
            </div>

            {/* CNIC */}
            <div className="form-group mb-3">
              <input
                type="text"
                className="noBorderRadius form-control form-input"
                placeholder="CNIC (#####-#######-#)"
                name="cnic"
                value={signupFormData.cnic}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                maxLength={15}
                style={{ border: !isCnicValid ? "2px solid red" : "" }}
                required
              />
            </div>

            {/* Email */}
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

            {/* Password */}
            <div className="form-group mb-3 position-relative">
              <input
                type={passwordVisible ? "text" : "password"}
                className="noBorderRadius form-control form-input"
                placeholder="Password"
                name="password"
                value={signupFormData.password}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                required
              />
              <FontAwesomeIcon
                className="text-white"
                icon={passwordVisible ? faEye : faEyeSlash}
                onClick={() => setPasswordVisible(!passwordVisible)}
                style={{
                  position: "absolute",
                  right: "40px",
                  top: "10px",
                  cursor: "pointer",
                }}
              />
            </div>

            {/* Confirm Password */}
            <div className="form-group mb-3 position-relative">
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                className="noBorderRadius form-control form-input"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={signupFormData.confirmPassword}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                required
              />
              <FontAwesomeIcon
                className="text-white"
                icon={confirmPasswordVisible ? faEye : faEyeSlash}
                onClick={() =>
                  setConfirmPasswordVisible(!confirmPasswordVisible)
                }
                style={{
                  position: "absolute",
                  right: "40px",
                  top: "10px",
                  cursor: "pointer",
                }}
              />
            </div>

            <div className="buttonContainer w-100 mt-3">
              <button
                type="submit"
                className="button buttonFilled text-white w-100"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

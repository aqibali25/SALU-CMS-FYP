import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Login/Login.css";
import Logo from "../../assets/Logo.png";
import BackgroundImage from "../../assets/Background.jpg";
// import { SignupContext } from "../../contexts/SignupContext";

const Signup = () => {
  const navigate = useNavigate();
  // const { setSignupData } = useContext(SignupContext); // Access context to save signup data

  const [signupFormData, setSignupFormData] = useState({
    cnic: "",
    password: "",
    confirmPassword: "",
  });

  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [isCnicValid, setIsCnicValid] = useState(true);
  const [isPasswordStrong, setIsPasswordStrong] = useState(true);

  useEffect(() => {
    document.title = "Signup";

    // const isLoggedIn = localStorage.getItem("isLoggedIn");
    // if (isLoggedIn === "true") {
    //   navigate("/SALU-CMS-FYP/admissionForm");
    // }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "cnic") {
      const formattedCnic = formatCnic(value);
      setSignupFormData((prevData) => ({
        ...prevData,
        [name]: formattedCnic,
      }));

      const cnicPattern = /^\d{5}-\d{7}-\d{1}$/;
      setIsCnicValid(cnicPattern.test(formattedCnic));
    } else {
      setSignupFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));

      if (name === "password") {
        validatePasswordStrength(value);
      }
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

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (signupFormData.password === signupFormData.confirmPassword) {
      if (isCnicValid && isPasswordStrong) {
        setSignupData(signupFormData); // Save form data in context
        localStorage.setItem("isLoggedIn", "true");
        navigate("/SALU-CMS-FYP/admissionForm");
      }
    } else {
      setIsPasswordMatch(false);
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
            <div className="logo-container mb-3">
              <img
                src={Logo}
                alt="University Logo"
                className="university-logo"
              />
            </div>

            <h2 className="text-gray">New User Registration</h2>
            <h3 className="text-warning">Kindly Register for Admission</h3>
            <p className="text-gray">
              Fill the form below to create an account.
            </p>

            <form onSubmit={handleSignupSubmit}>
              {/* CNIC Input */}
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control form-input"
                  placeholder="CNIC (#####-#######-#)"
                  name="cnic"
                  value={signupFormData.cnic}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  maxLength={15}
                  style={{ border: !isCnicValid ? "2px solid red" : "" }}
                  autoComplete="off"
                  required
                />
              </div>
              {/* Error Display */}
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

              {/* Password Input */}
              <div className="form-group mb-3">
                <input
                  type="password"
                  className="form-control form-input"
                  placeholder="Password"
                  name="password"
                  value={signupFormData.password}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  style={{
                    border:
                      !isPasswordMatch || !isPasswordStrong
                        ? "2px solid red"
                        : "",
                  }}
                  required
                />
              </div>
              {/* Error Display */}
              <span
                className="invalid-feedback"
                style={{
                  fontSize: "13px",
                  color: "red",
                  display: !isPasswordStrong ? "block" : "none",
                  marginBottom: "10px",
                }}
              >
                {!isPasswordStrong
                  ? "Password requires 1 number, 1 special character, 1 uppercase letter, and at least 8 characters."
                  : ""}
              </span>

              {/* Confirm Password Input */}
              <div className="form-group mb-3">
                <input
                  type="password"
                  className="form-control form-input"
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
              </div>
              {/* Error Display */}
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

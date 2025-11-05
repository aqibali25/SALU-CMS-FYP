import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const [isLoading, setIsLoading] = useState(false);
  const [fieldTouched, setFieldTouched] = useState({
    fullName: false,
    cnic: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  useEffect(() => {
    document.title = "Signup | SALU Ghotki";
    const isLoggedIn = Cookies.get("isLoggedIn");
    if (isLoggedIn === "true") {
      navigate("/admissions");
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
      const cnicValid = cnicPattern.test(formattedCnic);
      setIsCnicValid(cnicValid);

      updateSignupData({ cnic: formattedCnic });
    } else {
      setSignupFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));

      if (name === "email") {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailValid = emailPattern.test(value);
        setIsEmailValid(emailValid);
      }

      if (name === "password") {
        validatePasswordStrength(value);
      }

      if (name === "confirmPassword") {
        const passwordsMatch = signupFormData.password === value;
        setIsPasswordMatch(passwordsMatch);
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
    const isStrong = passwordPattern.test(password);
    setIsPasswordStrong(isStrong);
    return isStrong;
  };

  const showFieldError = (name, value) => {
    switch (name) {
      case "fullName":
        if (!value.trim()) {
          toast.error("Full name is required", {
            position: "top-center",
            autoClose: 3000,
          });
        }
        break;

      case "cnic":
        if (!isCnicValid && value.length === 15) {
          toast.error("Invalid CNIC format! Must be #####-#######-#", {
            position: "top-center",
            autoClose: 3000,
          });
        }
        break;

      case "email":
        if (!isEmailValid && value.length > 0) {
          toast.error("Please enter a valid email address", {
            position: "top-center",
            autoClose: 3000,
          });
        }
        break;

      case "password":
        if (!isPasswordStrong && value.length > 0) {
          if (value.length < 8) {
            toast.error("Password must be at least 8 characters long", {
              position: "top-center",
              autoClose: 3000,
            });
          } else if (!/(?=.*[A-Z])/.test(value)) {
            toast.error("Password must contain at least one uppercase letter", {
              position: "top-center",
              autoClose: 3000,
            });
          } else if (!/(?=.*[a-z])/.test(value)) {
            toast.error("Password must contain at least one lowercase letter", {
              position: "top-center",
              autoClose: 3000,
            });
          } else if (!/(?=.*[0-9])/.test(value)) {
            toast.error("Password must contain at least one number", {
              position: "top-center",
              autoClose: 3000,
            });
          } else if (!/(?=.*[!@#$%^&*])/.test(value)) {
            toast.error(
              "Password must contain at least one special character (!@#$%^&*)",
              {
                position: "top-center",
                autoClose: 3000,
              }
            );
          }
        }
        break;

      case "confirmPassword":
        if (!isPasswordMatch && value.length > 0) {
          toast.error("Passwords do not match!", {
            position: "top-center",
            autoClose: 3000,
          });
        }
        break;

      default:
        break;
    }
  };

  const handleInputBlur = (e) => {
    const { name, value } = e.target;

    // Mark field as touched
    setFieldTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    // Show error for the specific field
    showFieldError(name, value);
  };

  // 🟢 Validate all fields before submission
  const validateForm = () => {
    const errors = [];

    if (!signupFormData.fullName.trim()) {
      errors.push("Full name is required");
    }

    if (!isCnicValid) {
      errors.push("Invalid CNIC format! Must be #####-#######-#");
    }

    if (!isEmailValid) {
      errors.push("Please enter a valid email address");
    }

    if (!isPasswordStrong) {
      errors.push(
        "Password must be at least 8 characters with uppercase, lowercase, number, and special character"
      );
    }

    if (!isPasswordMatch) {
      errors.push("Passwords do not match");
    }

    return errors;
  };

  // 🟢 Save login credentials (CNIC and Password) for future login
  const saveLoginCredentials = (cnic, password) => {
    try {
      // Save credentials to localStorage for login persistence
      const loginCredentials = {
        cnic: cnic,
        password: password,
        timestamp: new Date().toISOString(),
      };

      localStorage.setItem("userCredentials", JSON.stringify(loginCredentials));

      // Also save to sessionStorage for current session
      sessionStorage.setItem("userCnic", cnic);
      sessionStorage.setItem("userPassword", password);

      console.log("Login credentials saved for CNIC:", cnic);
    } catch (error) {
      console.error("Error saving login credentials:", error);
    }
  };

  // 🟢 Submit Form Data to Backend
  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched
    setFieldTouched({
      fullName: true,
      cnic: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    // Show errors for all fields on submit
    Object.keys(signupFormData).forEach((key) => {
      if (key !== "confirmPassword") {
        showFieldError(key, signupFormData[key]);
      }
    });
    showFieldError("confirmPassword", signupFormData.confirmPassword);

    // Validate all fields
    const formErrors = validateForm();

    if (formErrors.length > 0) {
      formErrors.forEach((error) => {
        toast.error(`${error}`, {
          position: "top-center",
          autoClose: 4000,
        });
      });
      return;
    }

    setIsLoading(true);

    // Show loading toast
    const loadingToast = toast.loading("Creating your account...", {
      position: "top-center",
    });

    try {
      const response = await axios.post(
        "http://localhost:3306/api/signup",
        signupFormData,
        {
          headers: { "Content-Type": "application/json" },
          timeout: 10000,
        }
      );

      // Save CNIC in sessionStorage
      sessionStorage.setItem("cn", JSON.stringify(signupFormData.cnic));

      // 🟢 SAVE LOGIN CREDENTIALS (CNIC AND PASSWORD)
      saveLoginCredentials(signupFormData.cnic, signupFormData.password);

      if (response.status === 200 || response.status === 201) {
        Cookies.set("isLoggedIn", "true", { expires: 1 });
        Cookies.set("cnic", signupFormData.cnic, { expires: 1 });

        // Update loading toast to success
        toast.update(loadingToast, {
          render:
            "Registration successful! Your CNIC and password have been saved for login.",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });

        // Redirect to admissions after successful signup
        setTimeout(() => {
          window.location.href = "/admission.salu-gc/admissions";
        }, 2000);
      } else {
        toast.update(loadingToast, {
          render: `${response.data.message || "Signup failed!"}`,
          type: "error",
          isLoading: false,
          autoClose: 4000,
        });
        setIsLoading(false);
      }
    } catch (error) {
      let errorMessage = "Registration failed!";

      if (error.response) {
        if (error.response.status === 409) {
          errorMessage =
            "CNIC or Email already exists! Please use different credentials.";
        } else if (error.response.status === 400) {
          errorMessage =
            "Invalid data provided. Please check your information.";
        } else {
          errorMessage = `Server error: ${error.response.status}`;
        }
      } else if (error.request) {
        errorMessage =
          "No response from server. Please check your internet connection.";
      } else {
        errorMessage = `${error.message}`;
      }

      toast.update(loadingToast, {
        render: errorMessage,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
      setIsLoading(false);
    }
  };

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  return (
    <>
      {/* Toast Container */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        limit={3}
      />

      <div
        className="login-container"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      >
        <LoginMarquee />
        <div className="login-form-overlay mt-5">
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

            {/* Login Info Box */}
            <div className="alert alert-info text-start small mb-4">
              <strong>🔐 Login Information:</strong>
              <p className="mb-1 mt-2">After registration, you will use:</p>
              <ul className="mb-0">
                <li>
                  <strong>CNIC</strong> as your username
                </li>
                <li>
                  <strong>Password</strong> you create here
                </li>
              </ul>
              <p className="mb-0 mt-2">
                <small>
                  Please remember your CNIC and password for future logins.
                </small>
              </p>
            </div>

            <form onSubmit={handleSignupSubmit}>
              {/* Full Name */}
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="noBorderRadius form-control form-input"
                  placeholder="Full Name *"
                  name="fullName"
                  value={signupFormData.fullName}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  autoComplete="name"
                  required
                  disabled={isLoading}
                  style={{
                    border:
                      fieldTouched.fullName && !signupFormData.fullName.trim()
                        ? "2px solid red"
                        : "",
                    backgroundColor:
                      fieldTouched.fullName && !signupFormData.fullName.trim()
                        ? "#ffe6e6"
                        : "",
                  }}
                />
              </div>

              {/* CNIC - This will be treated as username by browser */}
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="noBorderRadius form-control form-input"
                  placeholder="CNIC (#####-#######-#) *"
                  name="cnic"
                  value={signupFormData.cnic}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  maxLength={15}
                  autoComplete="username"
                  style={{
                    border:
                      fieldTouched.cnic && !isCnicValid ? "2px solid red" : "",
                    backgroundColor:
                      fieldTouched.cnic && !isCnicValid ? "#ffe6e6" : "",
                  }}
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Email - Prevent browser from using this as username */}
              <div className="form-group mb-3">
                <input
                  type="email"
                  className="noBorderRadius form-control form-input"
                  placeholder="Email Address *"
                  name="email"
                  value={signupFormData.email}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  autoComplete="email"
                  style={{
                    border:
                      fieldTouched.email && !isEmailValid
                        ? "2px solid red"
                        : "",
                    backgroundColor:
                      fieldTouched.email && !isEmailValid ? "#ffe6e6" : "",
                  }}
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Password */}
              <div className="form-group mb-3 position-relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  className="noBorderRadius form-control form-input"
                  placeholder="Password *"
                  name="password"
                  value={signupFormData.password}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  autoComplete="new-password"
                  style={{
                    border:
                      fieldTouched.password && !isPasswordStrong
                        ? "2px solid red"
                        : "",
                    backgroundColor:
                      fieldTouched.password && !isPasswordStrong
                        ? "#ffe6e6"
                        : "",
                  }}
                  required
                  disabled={isLoading}
                />
                <FontAwesomeIcon
                  className="text-white"
                  icon={passwordVisible ? faEye : faEyeSlash}
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  style={{
                    position: "absolute",
                    right: "40px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    zIndex: 10,
                  }}
                />
              </div>

              {/* Confirm Password */}
              <div className="form-group mb-3 position-relative">
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  className="noBorderRadius form-control form-input"
                  placeholder="Confirm Password *"
                  name="confirmPassword"
                  value={signupFormData.confirmPassword}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  autoComplete="new-password"
                  style={{
                    border:
                      fieldTouched.confirmPassword && !isPasswordMatch
                        ? "2px solid red"
                        : "",
                    backgroundColor:
                      fieldTouched.confirmPassword && !isPasswordMatch
                        ? "#ffe6e6"
                        : "",
                  }}
                  required
                  disabled={isLoading}
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
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    zIndex: 10,
                  }}
                />
              </div>

              {/* Password Requirements Info */}
              <div className="text-white small text-start mb-3">
                <strong>Password must contain:</strong>
                <ul className="small mb-0 mt-1">
                  <li>At least 8 characters</li>
                  <li>One uppercase letter</li>
                  <li>One lowercase letter</li>
                  <li>One number</li>
                  <li>One special character (!@#$%^&*)</li>
                </ul>
              </div>

              <div className="buttonContainer w-100 mt-3">
                <button
                  type="submit"
                  className="button buttonFilled text-white w-100"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Registering...
                    </>
                  ) : (
                    "Register"
                  )}
                </button>
              </div>

              <div className="footer mt-4 text-white">
                Already have an account?{" "}
                <Link to={"/login"} style={{ color: "white" }}>
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;

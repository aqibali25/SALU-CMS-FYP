import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import Logo from "../../assets/Logo.png";
import BackgroundImage from "../../assets/Background.jpg";
import LoginMarquee from "../../components/LoginMarquee";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import ForgotPassword from "../../components/ForgotPassword";

const Login = () => {
  const navigate = useNavigate();
  const [resetPassword, setResetPassword] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [loginFormData, setLoginFormData] = useState({
    cnic: "",
    password: "",
  });

  const [isCnicValid, setIsCnicValid] = useState(true);
  const [fieldTouched, setFieldTouched] = useState({
    cnic: false,
    password: false,
  });

  useEffect(() => {
    document.title = "Login | SALU Ghotki";

    // Check if the user is logged in using cookies
    const isLoggedIn = Cookies.get("isLoggedIn");
    if (isLoggedIn === "true") {
      navigate("/admissions");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "cnic") {
      const formattedCnic = formatCnic(value);
      setLoginFormData((prevData) => ({
        ...prevData,
        [name]: formattedCnic,
      }));

      const cnicPattern = /^\d{5}-\d{7}-\d{1}$/;
      const cnicValid = cnicPattern.test(formattedCnic);
      setIsCnicValid(cnicValid);
    } else {
      setLoginFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
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

  const showFieldError = (name, value) => {
    switch (name) {
      case "cnic":
        if (!isCnicValid && value.length === 15) {
          toast.error("Invalid CNIC format! Must be #####-#######-#", {
            position: "top-center",
            autoClose: 3000,
          });
        }
        break;

      case "password":
        if (!value.trim()) {
          toast.error("Password is required", {
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

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched
    setFieldTouched({
      cnic: true,
      password: true,
    });

    // Show errors for all fields on submit
    Object.keys(loginFormData).forEach((key) => {
      showFieldError(key, loginFormData[key]);
    });

    // Validate form
    if (!isCnicValid) {
      toast.error("Invalid CNIC format! Must be #####-#######-#", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    if (!loginFormData.password.trim()) {
      toast.error("Password is required", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    setIsLoading(true);

    // Show loading toast
    const loadingToast = toast.loading("Logging in...", {
      position: "top-center",
    });

    // Test credentials
    if (
      loginFormData.cnic === "45102-2473066-7" &&
      loginFormData.password === "123aqibalikalwar1@A"
    ) {
      try {
        Cookies.set("isLoggedIn", "true", { expires: 1 });
        Cookies.set("cnic", loginFormData.cnic, { expires: 1 });

        // Update loading toast to success
        toast.update(loadingToast, {
          render: "Login successful! Redirecting...",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });

        // Add a small delay to show the success message then refresh and redirect
        setTimeout(() => {
          window.location.href = "/admissions";
        }, 1500);
      } catch (error) {
        console.error("Error setting cookies:", error);
        toast.update(loadingToast, {
          render: "An error occurred during login.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        setIsLoading(false);
      }
    } else {
      try {
        const response = await fetch("http://localhost:3306/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginFormData),
        });

        if (response.ok) {
          Cookies.set("isLoggedIn", "true", { expires: 1 });
          Cookies.set("cnic", loginFormData.cnic, { expires: 1 });

          // Update loading toast to success
          toast.update(loadingToast, {
            render: "Login successful! Redirecting...",
            type: "success",
            isLoading: false,
            autoClose: 2000,
          });

          // Add a small delay to show the success message then refresh and redirect
          setTimeout(() => {
            window.location.href = "/admission.salu-gc/admissions";
          }, 1500);
        } else {
          const errorData = await response.json().catch(() => ({}));
          const errorMessage = errorData.message || "Invalid credentials";

          toast.update(loadingToast, {
            render: `Login failed: ${errorMessage}`,
            type: "error",
            isLoading: false,
            autoClose: 4000,
          });

          setLoginFormData({ cnic: "", password: "" });
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error logging in:", error);

        let errorMessage = "An error occurred. Please try again.";
        if (error.name === "TypeError" && error.message.includes("fetch")) {
          errorMessage = "Network error. Please check your connection.";
        }

        toast.update(loadingToast, {
          render: `${errorMessage}`,
          type: "error",
          isLoading: false,
          autoClose: 4000,
        });

        setIsLoading(false);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleForgotPassword = () => {
    setResetPassword(true);
  };

  const handleCloseResetPassword = () => {
    setResetPassword(false);
  };

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
        {resetPassword && (
          <ForgotPassword onOverlayClick={handleCloseResetPassword} />
        )}
        <LoginMarquee />
        <div className="login-form-overlay mt-5">
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
                  className="noBorderRadius form-control form-input"
                  placeholder="CNIC (#####-#######-#)"
                  name="cnic"
                  value={loginFormData.cnic}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  maxLength={15}
                  style={{
                    border:
                      fieldTouched.cnic && !isCnicValid ? "2px solid red" : "",
                    backgroundColor:
                      fieldTouched.cnic && !isCnicValid ? "#ffe6e6" : "",
                  }}
                  autoComplete="off"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="form-group mb-3 position-relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  className="noBorderRadius form-control form-input"
                  placeholder="Enter Password"
                  name="password"
                  value={loginFormData.password}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  style={{
                    border:
                      fieldTouched.password && !loginFormData.password.trim()
                        ? "2px solid red"
                        : "",
                    backgroundColor:
                      fieldTouched.password && !loginFormData.password.trim()
                        ? "#ffe6e6"
                        : "",
                  }}
                  required
                  disabled={isLoading}
                />
                <FontAwesomeIcon
                  className="text-white"
                  icon={passwordVisible ? faEye : faEyeSlash}
                  onClick={togglePasswordVisibility}
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

              <a
                className="forgotPassowrd"
                onClick={handleForgotPassword}
                style={{ cursor: "pointer" }}
              >
                Forgot Password
              </a>

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
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </form>

            {/* Footer */}
            <div className="footer mt-4 text-white">
              Don't have an account?{" "}
              <Link to={"/signup"} style={{ color: "white" }}>
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

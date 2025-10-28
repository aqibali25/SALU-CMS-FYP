import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import js-cookie
import "./Login.css";
import Logo from "../../assets/Logo.png";
import BackgroundImage from "../../assets/Background.jpg";
import LoginMarquee from "../../components/LoginMarquee";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import ForgotPassword from "../../components/ForgotPassword";

const Login = () => {
  const navigate = useNavigate();
  const [resetPassword, seResetPassword] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [loginFormData, setLoginFormData] = useState({
    cnic: "",
    password: "",
  });

  const [isCnicValid, setIsCnicValid] = useState(true);

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
      setIsCnicValid(cnicPattern.test(formattedCnic));
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

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (
      loginFormData.cnic === "45102-2473066-7" &&
      loginFormData.password === "123aqibalikalwar1@A"
    ) {
      Cookies.set("isLoggedIn", "true", { expires: 1 }); // Save login status in cookies (1-day expiration)
      Cookies.set("cnic", loginFormData.cnic, { expires: 1 }); // Save CNIC in cookies
      navigate("/admissions");
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
          navigate("/admissions");
        } else {
          alert("Invalid Credentials.");
          setLoginFormData({ cnic: "", password: "" });
        }
      } catch (error) {
        console.error("Error logging in:", error);
        alert("An error occurred. Please try again.");
      }
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleForgotPassword = () => {
    seResetPassword(true);
  };
  const handleCloseResetPassword = () => {
    seResetPassword(false);
  };
  return (
    <>
      <div
        className="login-container"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      >
        {resetPassword && (
          <ForgotPassword onOverlayClick={handleCloseResetPassword} />
        )}
        <LoginMarquee></LoginMarquee>
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
                  type={passwordVisible ? "text" : "password"}
                  className="noBorderRadius form-control form-input"
                  placeholder="Enter Password"
                  name="password" // Name for identification
                  value={loginFormData.password} // Access password from loginFormData
                  onChange={handleInputChange} // Update state on input change
                  required
                />
                <FontAwesomeIcon
                  className="text-white"
                  icon={passwordVisible ? faEye : faEyeSlash} // Show 'eye' for visible, 'eye-slash' for hidden
                  onClick={togglePasswordVisibility}
                  style={{
                    position: "absolute",
                    right: "40px",
                    cursor: "pointer",
                  }}
                />
              </div>
              <a
                htmlFor="forgotPassword"
                className="forgotPassowrd"
                onClick={handleForgotPassword}
              >
                Forgot Password
              </a>
              <div className="buttonContainer w-100 mt-3">
                <button
                  type="submit"
                  className="button buttonFilled text-white w-100"
                >
                  Login
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

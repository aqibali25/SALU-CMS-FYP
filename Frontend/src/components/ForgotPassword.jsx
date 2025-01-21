import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = ({ onOverlayClick }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/SALU-CMS-FYP/login");
    onOverlayClick();
    console.log("Email submitted: ", email);
  };

  // Step 4: Update email state on input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <div
        className="overlay"
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100vw",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: "998",
        }}
        onClick={onOverlayClick}
      ></div>
      <form
        onSubmit={handleSubmit} // Step 2: Attach handleSubmit to form
        className="buttonContainer d-flex justify-content-center align-items-center flex-column gap-3"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "rgba(255, 255, 255, 0.16)", // Slight transparency
          backdropFilter: "blur(5px)", // Apply blur effect
          zIndex: "999",
          minWidth: "300px",
          width: "30%",
          minHeight: "200px",
          padding: "20px",
          borderRadius: "5px",
          boxShadow:
            "10px 10px 20px rgba(0, 0, 0, 0.2),10px 10px 20px rgba(0, 0, 0, 0.2),10px 10px 20px rgba(0, 0, 0, 0.2),10px 10px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        <input
          type="email"
          placeholder="Enter your email"
          required
          value={email} // Step 5: Bind input value to state
          onChange={handleEmailChange} // Step 4: Update state on change
          style={{
            width: "100%",
            border: "3px solid grey",
            outline: "none",
            padding: "8px",
            color: "black",
          }}
          onFocus={(e) => (e.target.style.border = "3px solid #E5B300")}
          onBlur={(e) => (e.target.style.border = "3px solid grey")}
        />
        <button type="submit" className="button buttonFilled text-white">
          Reset
        </button>
      </form>
    </>
  );
};

export default ForgotPassword;

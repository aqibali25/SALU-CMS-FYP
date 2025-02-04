import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons"; // Import the specific icon

const BackButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="back-button"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        backgroundColor: "#e5b300",
        color: "white",
        border: "none",
        borderRadius: "8px",
        padding: "0.5rem 1rem",
        cursor: "pointer",
      }}
    >
      <FontAwesomeIcon icon={faAngleLeft} /> {/* Use the imported icon here */}
      <span>Back</span>
    </button>
  );
};

export default BackButton;

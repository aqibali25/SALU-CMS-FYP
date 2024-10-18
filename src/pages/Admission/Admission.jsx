import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // React Router for navigation
import "./Admission.css";

const Admission = () => {
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    // Set the document title to "Admission"
    document.title = "Admission";

    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    // If not logged in, redirect to the login page
    if (isLoggedIn !== "true") {
      navigate("/SALU-CMS-FYP/login");
    }
  }, [navigate]);

  return (
    <section className="admission">
      <h1>Admission</h1>
      {/* Add your content for the admission page here */}
    </section>
  );
};

export default Admission;

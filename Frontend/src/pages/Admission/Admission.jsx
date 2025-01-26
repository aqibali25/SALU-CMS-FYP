import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom"; // React Router for navigation

import "./Admission.css";

import FormHeaderCard from "../../components/AdmissionComp/FormHeaderCard";
import FormSideBar from "../../components/AdmissionComp/FormSideBar";

const Admission = () => {
  // const { signupData } = useContext(SignupContext); // Access signup data from context
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Admission | SALU Ghotki";

    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    // // If not logged in, redirect to the login page
    if (isLoggedIn !== "true") {
      navigate("/SALU-CMS-FYP/login");
    }
  }, [navigate]);

  return (
    <section className="admissionSection">
      <FormSideBar />
      <div className="admissionform">
        <Outlet></Outlet>
      </div>
    </section>
  );
};

export default Admission;

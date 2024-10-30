import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // React Router for navigation
import "./Admission.css";
import FormHeaderCard from "../../components/AdmissionComp/FormHeaderCard";
import FormSideBar from "../../components/AdmissionComp/FormSideBar";
import FormStatusCards from "../../components/AdmissionComp/FormStatusCards";
// import AdmissionStatusCard from "../../components/AdmissionComp/AdmissionStatusCard";
// import { FaGraduationCap, FaUser, FaTrophy, FaPencilAlt } from "react-icons/fa";
// const statusItems = [
//   {
//     title: "Program Of Study",
//     icon: <FaGraduationCap size={30} />,
//     status: "Pending",
//   },
//   {
//     title: "Personal Information",
//     icon: <FaUser size={30} />,
//     status: "Pending",
//   },
//   {
//     title: "Father / Guardian Information",
//     icon: <FaUser size={30} />,
//     status: "Pending",
//   },
//   { title: "Academic Record", icon: <FaTrophy size={30} />, status: "Pending" },
// ];

const Admission = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Admission";

    // Check if the user is logged in
    // const isLoggedIn = localStorage.getItem("isLoggedIn");

    // If not logged in, redirect to the login page
    // if (isLoggedIn !== "true") {
    //   navigate("/SALU-CMS-FYP/login");
    // }
  }, [navigate]);

  return (
    <section className="admissionSection">
      <FormSideBar />
      <div className="admissionform">
        <FormHeaderCard />
        <FormStatusCards />
      </div>
    </section>
  );
};

export default Admission;

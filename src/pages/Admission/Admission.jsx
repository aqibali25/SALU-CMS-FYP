import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // React Router for navigation

import "./Admission.css";

import FormHeaderCard from "../../components/AdmissionComp/FormHeaderCard";
import FormSideBar from "../../components/AdmissionComp/FormSideBar";
import FormStatusCards from "../../components/AdmissionComp/FormStatusCards";

import {
  FaGraduationCap,
  FaUser,
  FaTrophy,
  FaUsers,
  FaImage,
} from "react-icons/fa";

const statusItems = [
  {
    title: "Program Of Study",
    icon: <FaGraduationCap size={50} color="#717070" />,
    status: "Pending",
  },
  {
    title: "Personal Information",
    icon: <FaUser size={50} color="#717070" />,
    status: "Pending",
  },
  {
    title: "Father / Guardian Information",
    icon: <FaUsers size={50} color="#717070" />,
    status: "Pending",
  },
  {
    title: "Academic Record",
    icon: <FaTrophy size={50} color="#717070" />,
    status: "Pending",
  },
  {
    title: "Photograph And Document",
    icon: <FaImage size={50} color="#717070" />,
    status: "Pending",
  },
];

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
        <FormStatusCards statusItems={statusItems} />
      </div>
    </section>
  );
};

export default Admission;

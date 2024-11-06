import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom"; // React Router for navigation

import "./Admission.css";

import FormHeaderCard from "../../components/AdmissionComp/FormHeaderCard";
import FormSideBar from "../../components/AdmissionComp/FormSideBar";
import FormStatusCards from "../../components/AdmissionComp/FormStatusCards";
import ProgramSelectionForm from "../../components/AdmissionComp/FormComponents/ProgramSelectionForm ";

import {
  FaGraduationCap,
  FaUser,
  FaTrophy,
  FaUsers,
  FaImage,
} from "react-icons/fa";
import PersonalInfo from "../../components/AdmissionComp/FormComponents/PersonalInfo";
import FatherInfo from "../../components/AdmissionComp/FormComponents/FatherInfo";

const statusItems = [
  {
    title: "Program Of Study",
    icon: <FaGraduationCap size={50} color="#929292" />,
    status: "Pending",
    bgColor: "#929292",
  },
  {
    title: "Personal Information",
    icon: <FaUser size={50} color="#929292" />,
    status: "Pending",
    bgColor: "#929292", //#E9B82B
  },
  {
    title: "Father / Guardian Information",
    icon: <FaUsers size={50} color="#929292" />,
    status: "Pending",
    bgColor: "#929292",
  },
  {
    title: "Academic Record",
    icon: <FaTrophy size={50} color="#929292" />,
    status: "Pending",
    bgColor: "#929292",
  },
  {
    title: "Photograph And Document",
    icon: <FaImage size={50} color="#929292" />,
    status: "Pending",
    bgColor: "#929292",
  },
];

const Admission = () => {
  // const { signupData } = useContext(SignupContext); // Access signup data from context
  const navigate = useNavigate();
  const percentage = 0;

  useEffect(() => {
    document.title = "Admission | SALU Ghotki";

    // Check if the user is logged in
    // const isLoggedIn = localStorage.getItem("isLoggedIn");

    // // If not logged in, redirect to the login page
    // if (isLoggedIn !== "true") {
    //   navigate("/SALU-CMS-FYP/login");
    // }
  }, [navigate]);

  return (
    <section className="admissionSection">
      <FormSideBar />
      <div className="admissionform">
        <FormHeaderCard percentage={percentage} />
        {/* <FormStatusCards statusItems={statusItems} /> */}
        <ProgramSelectionForm></ProgramSelectionForm>
        <PersonalInfo></PersonalInfo>
        <FatherInfo></FatherInfo>
      </div>
    </section>
  );
};

export default Admission;

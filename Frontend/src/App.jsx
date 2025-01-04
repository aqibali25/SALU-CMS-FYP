import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home.jsx";
import Faculty from "./pages/Faculty/Faculty.jsx";
import Admission from "./pages/Admission/Admission.jsx";
import About from "./pages/About/About.jsx";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import Footer from "./components/Footer/Footer.jsx";
import "./App.css";
import ProgramSelectionForm from "./components/AdmissionComp/FormComponents/ProgramSelectionForm.jsx";
import PersonalInfo from "./components/AdmissionComp/FormComponents/PersonalInfo.jsx";
import FormStatusCards from "./components/AdmissionComp/FormStatusCards.jsx";
import FatherInfo from "./components/AdmissionComp/FormComponents/FatherInfo.jsx";
import AcademicRecord from "./components/AdmissionComp/FormComponents/AcademicRecord.jsx";
import PhotographAndDocument from "./components/AdmissionComp/FormComponents/PhotographAndDocument.jsx";

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

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="SALU-CMS-FYP/" element={<Home />} />
        <Route path="SALU-CMS-FYP/faculty" element={<Faculty />} />
        <Route path="SALU-CMS-FYP/admission-form" element={<Admission />}>
          <Route
            index
            element={<FormStatusCards statusItems={statusItems} />}
          ></Route>
          <Route
            path="program-of-study"
            element={<ProgramSelectionForm />}
          ></Route>
          <Route path="personal-information" element={<PersonalInfo />}></Route>
          <Route path="father-information" element={<FatherInfo />}></Route>
          <Route path="academic-record" element={<AcademicRecord />} />
          <Route
            path="photograph-and-document"
            element={<PhotographAndDocument />}
          />
        </Route>
        <Route path="SALU-CMS-FYP/about" element={<About />} />
        <Route path="SALU-CMS-FYP/login" element={<Login />} />
        <Route path="SALU-CMS-FYP/signup" element={<Signup />} />
      </Routes>
      <Footer></Footer>
    </Router>
  );
};

export default App;

import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home.jsx";
import Faculty from "./pages/Faculty/Faculty.jsx";
import Admission from "./pages/Admission/Admission.jsx";
import About from "./pages/About/About.jsx";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import Footer from "./components/Footer/Footer.jsx";
import "./App.css";

// Import components and forms
import ProgramSelectionForm from "./components/AdmissionComp/FormComponents/ProgramSelectionForm.jsx";
import PersonalInfo from "./components/AdmissionComp/FormComponents/PersonalInfo.jsx";
import FormStatusCards from "./components/AdmissionComp/FormStatusCards.jsx";
import FatherAndGuardianInfo from "./components/AdmissionComp/FormComponents/FatherAndGuardianInfo.jsx";
import AcademicRecord from "./components/AdmissionComp/FormComponents/AcademicRecord.jsx";
import PhotographAndDocument from "./components/AdmissionComp/FormComponents/PhotographAndDocument.jsx";

import Loader from "./components/Loaders/Loader.jsx";

// Import context providers
import { FormStatusProvider } from "./contexts/AdmissionFormContext.jsx";
import { SignupContextProvider } from "./contexts/SignupContext.jsx";

// Import other components and forms
import FormHeaderCard from "./components/AdmissionComp/FormHeaderCard.jsx";
import AdmissionGuide from "./components/AdmissionComp/otherAdmissionComp/AdmissionGuide.jsx";
import EligibilityCriteria from "./components/AdmissionComp/otherAdmissionComp/EligibilityCriteria.jsx";
import AdmissionProcedure from "./components/AdmissionComp/otherAdmissionComp/AdmissionProcedure.jsx";
import FeeStructure from "./components/AdmissionComp/otherAdmissionComp/FeeStructure.jsx";
import Prospectus from "./components/AdmissionComp/otherAdmissionComp/Prospectus.jsx";
import SamplePapers from "./components/AdmissionComp/otherAdmissionComp/SamplePapers.jsx";
import ChangePassword from "./components/AdmissionComp/otherAdmissionComp/ChangePassword.jsx";

const FormLayout = () => (
  <>
    <FormHeaderCard />
    <Outlet />
  </>
);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => setIsLoading(false);

    // Check when all images and resources are fully loaded
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <FormStatusProvider>
      <SignupContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/admissions" element={<Admission />}>
            <Route index element={<AdmissionGuide />} />
            <Route path="form" element={<FormLayout />}>
              <Route index element={<FormStatusCards />} />
              <Route
                path="program-of-study"
                element={<ProgramSelectionForm />}
              />
              <Route path="personal-information" element={<PersonalInfo />} />
              <Route
                path="father-and-guardian-information"
                element={<FatherAndGuardianInfo />}
              />
              <Route
                path="academic-record-intermediate"
                element={<AcademicRecord title="Intermediate" />}
              />
              <Route
                path="academic-record-matric"
                element={<AcademicRecord title="Matriculation" />}
              />
              <Route
                path="photograph-and-document"
                element={<PhotographAndDocument />}
              />
            </Route>
            <Route
              path="eligibility-criteria"
              element={<EligibilityCriteria />}
            />
            <Route
              path="admission-procedure"
              element={<AdmissionProcedure />}
            />
            <Route path="fee-structure" element={<FeeStructure />} />
            <Route path="prospectus" element={<Prospectus />} />
            <Route path="sample-papers" element={<SamplePapers />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>

        <Footer />
      </SignupContextProvider>
    </FormStatusProvider>
  );
};

export default App;

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
import ProgramSelectionForm from "./components/AdmissionComp/FormComponents/ProgramSelectionForm.jsx";
import PersonalInfo from "./components/AdmissionComp/FormComponents/PersonalInfo.jsx";
import FormStatusCards from "./components/AdmissionComp/FormStatusCards.jsx";
import FatherInfo from "./components/AdmissionComp/FormComponents/FatherInfo.jsx";
import AcademicRecord from "./components/AdmissionComp/FormComponents/AcademicRecord.jsx";
import PhotographAndDocument from "./components/AdmissionComp/FormComponents/PhotographAndDocument.jsx";
import Loader from "./components/Loaders/Loader.jsx";
// import GuardianInfo from "./components/AdmissionComp/FormComponents/GuardianInfo.jsx";
import { FormStatusProvider } from "./contexts/AdmissionFormContext.jsx";
import { SignupContextProvider } from "./contexts/SignupContext.jsx";
import FormHeaderCard from "./components/AdmissionComp/FormHeaderCard.jsx";
import AdmissionGuide from "./components/AdmissionComp/FormComponents/AdmissionGuide.jsx";

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
        <Router>
          <Navbar />
          <Routes>
            <Route path="SALU-CMS-FYP/" element={<Home />} />
            <Route path="SALU-CMS-FYP/faculty" element={<Faculty />} />

            <Route path="SALU-CMS-FYP/admissions" element={<Admission />}>
              <Route index element={<AdmissionGuide />} />
              <Route path="form" element={<FormLayout />}>
                <Route index element={<FormStatusCards />} />
                <Route
                  path="program-of-study"
                  element={<ProgramSelectionForm />}
                />
                <Route path="personal-information" element={<PersonalInfo />} />
                <Route
                  path="father-information"
                  element={<FatherInfo title={"father"} />}
                />
                <Route
                  path="guardian-information"
                  element={<FatherInfo title={"guardian"} />}
                />
                <Route
                  path="academic-record-intermediate"
                  element={<AcademicRecord title={"Intermediate"} />}
                />
                <Route
                  path="academic-record-matric"
                  element={<AcademicRecord title={"Matriculation"} />}
                />
                <Route
                  path="photograph-and-document"
                  element={<PhotographAndDocument />}
                />
              </Route>
            </Route>

            <Route path="SALU-CMS-FYP/about" element={<About />} />
            <Route path="SALU-CMS-FYP/login" element={<Login />} />
            <Route path="SALU-CMS-FYP/signup" element={<Signup />} />
          </Routes>
          <Footer />
        </Router>
      </SignupContextProvider>
    </FormStatusProvider>
  );
};

export default App;

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

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="SALU-CMS-FYP/" element={<Home />} />
        <Route path="SALU-CMS-FYP/faculty" element={<Faculty />} />
        <Route path="SALU-CMS-FYP/admissionForm" element={<Admission />} />
        <Route path="SALU-CMS-FYP/about" element={<About />} />
        <Route path="SALU-CMS-FYP/login" element={<Login />} />
        <Route path="SALU-CMS-FYP/signup" element={<Signup />} />
      </Routes>
      <Footer></Footer>
    </Router>
  );
};

export default App;

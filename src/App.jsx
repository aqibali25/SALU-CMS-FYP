import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home.jsx";
import Faculty from "./pages/Faculty/Faculty.jsx";
import Admission from "./pages/Admission/Admission.jsx";
import About from "./pages/About/About.jsx";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Loader from "./components/Loader/Loader.jsx";
import "./App.css";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const images = Array.from(document.images); // Get all images on the page
    let loadedImages = 0;

    const checkAllLoaded = () => {
      loadedImages++;
      if (loadedImages === images.length) {
        setLoading(false);
      }
    };

    if (images.length > 0) {
      images.forEach((img) => {
        if (img.complete) {
          checkAllLoaded(); // Already loaded images
        } else {
          img.addEventListener("load", checkAllLoaded);
          img.addEventListener("error", checkAllLoaded);
        }
      });
    } else {
      // No images present; stop loading immediately
      setLoading(false);
    }

    // Fallback: Ensure loading stops even if some events aren't captured
    const fallbackTimeout = setTimeout(() => {
      setLoading(false);
    }, 5000); // Adjust this timeout to match your expected load time

    return () => {
      // Cleanup listeners
      images.forEach((img) => {
        img.removeEventListener("load", checkAllLoaded);
        img.removeEventListener("error", checkAllLoaded);
      });
      clearTimeout(fallbackTimeout);
    };
  }, []);

  // Show the loader while loading is true
  if (loading) {
    return <Loader />;
  }

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
      <Footer />
    </Router>
  );
};

export default App;

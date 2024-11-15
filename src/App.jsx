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
    const handleLoad = () => setLoading(false); // Set loading to false when content is loaded

    const images = document.querySelectorAll("img");
    let imagesLoaded = 0;

    const checkAllLoaded = () => {
      imagesLoaded++;
      if (imagesLoaded === images.length) {
        handleLoad();
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        checkAllLoaded(); // Count already loaded images
      } else {
        img.addEventListener("load", checkAllLoaded);
        img.addEventListener("error", checkAllLoaded); // Handle load errors
      }
    });

    // Fallback: Ensure loader hides even if there are no images
    if (images.length === 0) {
      handleLoad();
    }

    // Cleanup event listeners
    return () => {
      images.forEach((img) => {
        img.removeEventListener("load", checkAllLoaded);
        img.removeEventListener("error", checkAllLoaded);
      });
    };
  }, []);

  if (loading) {
    return <Loader />; // Show the loader while loading is true
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

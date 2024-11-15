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
    // Use a timeout fallback to avoid infinite loading
    const fallbackTimer = setTimeout(() => {
      console.log("Fallback timer triggered, hiding loader");
      setLoading(false);
    }, 800); // Fallback hides the loader after 800ms

    // Select all images on the page after a slight delay to ensure they are rendered
    setTimeout(() => {
      const images = document.querySelectorAll("img");
      let imagesLoaded = 0;

      console.log(`Found ${images.length} images`);

      const handleImageLoad = () => {
        imagesLoaded++;
        console.log(`Image loaded: ${imagesLoaded}/${images.length}`);
        if (imagesLoaded === images.length) {
          clearTimeout(fallbackTimer); // Clear the fallback timer
          setLoading(false);
        }
      };

      images.forEach((img) => {
        if (img.complete) {
          handleImageLoad(); // Image already loaded
        } else {
          img.addEventListener("load", handleImageLoad);
          img.addEventListener("error", handleImageLoad); // Handles image load errors
        }
      });

      return () => {
        images.forEach((img) => {
          img.removeEventListener("load", handleImageLoad);
          img.removeEventListener("error", handleImageLoad);
        });
      };
    }, 800); // Delay to ensure images are in DOM
  }, []);

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

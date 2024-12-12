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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadImagesAndIcons = () => {
      const images = document.getElementsByTagName("img");
      const icons = document.getElementsByTagName("i");

      const imagePromises = Array.from(images).map((img) => {
        return new Promise((resolve) => {
          if (img.complete) {
            resolve();
          } else {
            img.onload = () => resolve();
            img.onerror = () => resolve();
          }
        });
      });

      const iconPromises = Array.from(icons).map((icon) => {
        return new Promise((resolve) => {
          if (document.fonts.status === "loaded") {
            resolve();
          } else {
            document.fonts.ready.then(() => resolve());
          }
        });
      });

      Promise.all([...imagePromises, ...iconPromises])
        .then(() => {
          setIsLoading(false);
        })
        .catch(() => {
          // If there's any error, still stop loading
          setIsLoading(false);
        });
    };

    // Call immediately instead of waiting for load event
    loadImagesAndIcons();

    // Cleanup
    return () => {
      setIsLoading(false);
    };
  }, []);

  if (isLoading) {
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
      <Footer></Footer>
    </Router>
  );
};

export default App;

import React, { useEffect } from "react";
import Login from "../Login/Login";
import "./Admission.css";

const Admission = () => {
  useEffect(() => {
    // Set the document title to "Admission"
    document.title = "Admission";
  }, []);

  return (
    <section className="admission">
      <h1>Admission</h1>
    </section>
  );
};

export default Admission;

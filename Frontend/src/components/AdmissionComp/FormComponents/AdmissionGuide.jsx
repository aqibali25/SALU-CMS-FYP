import React from "react";
import { Link } from "react-router-dom";

const AdmissionGuide = () => {
  return (
    <div className="formConitainer d-flex flex-column justify-content-center align-items-center gap-4 float-end col-md-12 mx-auto p-4 h-100">
      <h1>Admission Form Guide Here</h1>
      <div className="buttonContainer">
        <Link
          to="/SALU-CMS-FYP/admissions/form"
          className="button buttonFilled"
        >
          Form
        </Link>
      </div>
    </div>
  );
};

export default AdmissionGuide;

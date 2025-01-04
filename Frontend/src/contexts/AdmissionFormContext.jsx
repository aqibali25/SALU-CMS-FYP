import React, { createContext, useContext, useState } from "react";

const AdmissionFormContext = createContext();

export const useAdmissionForm = () => {
  return useContext(AdmissionFormContext);
};

export const AdmissionFormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    programSelection: {},
    personalInfo: {},
    fatherInfo: {},
  });

  const updateFormData = (section, data) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: data,
    }));
  };

  const submitSectionData = async (section) => {
    try {
      // Simulate a POST request
      const response = await fetch("http://localhost:5000/api/admission-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ section, data: formData[section] }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Data submitted successfully:", result);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <AdmissionFormContext.Provider
      value={{ formData, updateFormData, submitSectionData }}
    >
      {children}
    </AdmissionFormContext.Provider>
  );
};

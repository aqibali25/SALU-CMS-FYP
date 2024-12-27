// src/contexts/AdmissionFormContext.js
import React, { createContext, useContext, useState } from "react";

// Create the AdmissionForm context
const AdmissionFormContext = createContext();

// Create the provider component
export const AdmissionFormProvider = ({ children }) => {
  // Program selection data
  const [programSelection, setProgramSelection] = useState({
    firstChoice: "",
    secondChoice: "",
    thirdChoice: "",
  });

  const handleProgramChoiceChange = (choice, selectedValue) => {
    setProgramSelection((prevChoices) => ({
      ...prevChoices,
      [choice]: selectedValue,
    }));
  };

  // Placeholder for additional sections (tables) in the admission form
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    religion: "",
    bloodGroup: "",
    disability: "",
    nativeLanguage: "",
    cnic: "",
  });

  const updatePersonalInfo = (newInfo) => {
    setPersonalInfo((prevInfo) => ({
      ...prevInfo,
      ...newInfo,
    }));
  };

  // Add other form sections similarly as you share them

  return (
    <AdmissionFormContext.Provider
      value={{
        programSelection,
        handleProgramChoiceChange,
        personalInfo,
        updatePersonalInfo,
        // Include other form sections here as needed
      }}
    >
      {children}
    </AdmissionFormContext.Provider>
  );
};

// Custom hook to use AdmissionFormContext
export const useAdmissionForm = () => useContext(AdmissionFormContext);

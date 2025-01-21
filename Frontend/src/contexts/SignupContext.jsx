// src/contexts/SignupContext.jsx
import React, { createContext, useState } from "react";

// Create the context
export const SignupContext = createContext();

// The provider component
export const SignupContextProvider = ({ children }) => {
  const [signupData, setSignupData] = useState({
    cnic: "",
    password: "",
    confirmPassword: "",
  });

  // Update signup data with a partial object
  const updateSignupData = (updatedFields) => {
    setSignupData((prevData) => ({
      ...prevData,
      ...updatedFields,
    }));
  };

  return (
    <SignupContext.Provider value={{ signupData, updateSignupData }}>
      {children}
    </SignupContext.Provider>
  );
};

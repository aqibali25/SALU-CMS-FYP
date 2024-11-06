// src/contexts/SignupContext.js
import React, { createContext, useState } from "react";

export const SignupContext = createContext();

export const SignupProvider = ({ children }) => {
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

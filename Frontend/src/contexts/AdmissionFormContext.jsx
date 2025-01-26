import React, { createContext, useContext, useState, useEffect } from "react";
import {
  FaGraduationCap,
  FaUser,
  FaTrophy,
  FaUsers,
  FaImage,
} from "react-icons/fa";

const FormStatusContext = createContext();

export const FormStatusProvider = ({ children }) => {
  const [formStatus, setFormStatus] = useState({
    percentage: 0,
    forms: {
      programOfStudy: "Pending",
      personalInformation: "Pending",
      fatherGuardianInformation: "Pending",
      academicRecord: "Pending",
      photographAndDocument: "Pending",
    },
  });

  // Predefined weights for each form
  const formWeights = {
    programOfStudy: 13,
    personalInformation: 15,
    fatherGuardianInformation: 25,
    academicRecord: 23,
    photographAndDocument: 24,
  };

  // Simulated fetch function to get initial data from the database
  const fetchFormStatusFromDB = async () => {
    const dataFromDB = await Promise.resolve({
      percentage: 0,
      forms: {
        programOfStudy: "Pending",
        personalInformation: "Pending",
        fatherGuardianInformation: "Pending",
        academicRecord: "Pending",
        photographAndDocument: "Pending",
      },
    });

    setFormStatus(dataFromDB);
  };

  // Initialize formStatus from the database on component mount
  useEffect(() => {
    fetchFormStatusFromDB();
  }, []);

  const updateFormStatus = async (formName, status) => {
    setFormStatus((prev) => {
      const updatedForms = { ...prev.forms, [formName]: status };

      // Calculate the percentage based on completed forms and their weights
      const completedPercentage = Object.entries(updatedForms).reduce(
        (total, [name, currentStatus]) => {
          return currentStatus === "Completed"
            ? total + formWeights[name]
            : total;
        },
        0
      );

      const percentage = parseFloat(completedPercentage.toFixed(1)); // Limit to 1 decimal place

      // Simulated save function to update the database
      saveFormStatusToDB({ forms: updatedForms, percentage });

      return { forms: updatedForms, percentage };
    });
  };

  // Simulated save function to update the database
  const saveFormStatusToDB = async (data) => {
    // Replace this with an API call to save data to your backend
    await Promise.resolve(data);
  };

  const statusItems = [
    {
      title: "Program Of Study",
      icon: <FaGraduationCap size={50} color="#929292" />,
      status: formStatus.forms.programOfStudy,
      bgColor:
        formStatus.forms.programOfStudy === "Completed" ? "#E9B82B" : "#929292",
      url: "program-of-study",
    },
    {
      title: "Personal Information",
      icon: <FaUser size={50} color="#929292" />,
      status: formStatus.forms.personalInformation,
      bgColor:
        formStatus.forms.personalInformation === "Completed"
          ? "#E9B82B"
          : "#929292",
      url: "personal-information",
    },
    {
      title: "Father / Guardian Information",
      icon: <FaUsers size={50} color="#929292" />,
      status: formStatus.forms.fatherGuardianInformation,
      bgColor:
        formStatus.forms.fatherGuardianInformation === "Completed"
          ? "#E9B82B"
          : "#929292",
      url: "father-information",
    },
    {
      title: "Academic Record",
      icon: <FaTrophy size={50} color="#929292" />,
      status: formStatus.forms.academicRecord,
      bgColor:
        formStatus.forms.academicRecord === "Completed" ? "#E9B82B" : "#929292",
      url: "academic-record-intermediate",
    },
    {
      title: "Photograph And Document",
      icon: <FaImage size={50} color="#929292" />,
      status: formStatus.forms.photographAndDocument,
      bgColor:
        formStatus.forms.photographAndDocument === "Completed"
          ? "#E9B82B"
          : "#929292",
      url: "photograph-and-document",
    },
  ];

  return (
    <FormStatusContext.Provider
      value={{ formStatus, updateFormStatus, statusItems }}
    >
      {children}
    </FormStatusContext.Provider>
  );
};

export const useFormStatus = () => {
  const context = useContext(FormStatusContext);
  if (!context) {
    throw new Error("useFormStatus must be used within a FormStatusProvider");
  }
  return context;
};

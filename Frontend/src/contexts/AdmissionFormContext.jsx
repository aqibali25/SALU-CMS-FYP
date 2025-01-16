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

  // Simulated fetch function to get initial data from the database
  const fetchFormStatusFromDB = async () => {
    // Replace this mock data with an API call to your backend
    const dataFromDB = await Promise.resolve({
      percentage: 60,
      forms: {
        programOfStudy: "Completed",
        personalInformation: "Completed",
        fatherGuardianInformation: "Pending",
        academicRecord: "Pending",
        photographAndDocument: "Completed",
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
      const completedForms = Object.values(updatedForms).filter(
        (status) => status === "Completed"
      ).length;
      const percentage =
        (completedForms / Object.keys(updatedForms).length) * 100;

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
    },
    {
      title: "Personal Information",
      icon: <FaUser size={50} color="#929292" />,
      status: formStatus.forms.personalInformation,
      bgColor:
        formStatus.forms.personalInformation === "Completed"
          ? "#E9B82B"
          : "#929292",
    },
    {
      title: "Father / Guardian Information",
      icon: <FaUsers size={50} color="#929292" />,
      status: formStatus.forms.fatherGuardianInformation,
      bgColor:
        formStatus.forms.fatherGuardianInformation === "Completed"
          ? "#E9B82B"
          : "#929292",
    },
    {
      title: "Academic Record",
      icon: <FaTrophy size={50} color="#929292" />,
      status: formStatus.forms.academicRecord,
      bgColor:
        formStatus.forms.academicRecord === "Completed" ? "#E9B82B" : "#929292",
    },
    {
      title: "Photograph And Document",
      icon: <FaImage size={50} color="#929292" />,
      status: formStatus.forms.photographAndDocument,
      bgColor:
        formStatus.forms.photographAndDocument === "Completed"
          ? "#E9B82B"
          : "#929292",
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

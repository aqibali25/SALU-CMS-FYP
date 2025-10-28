import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
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

  const formWeights = {
    programOfStudy: 13,
    personalInformation: 15,
    fatherGuardianInformation: 25,
    academicRecord: 23,
    photographAndDocument: 24,
  };

  useEffect(() => {
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
    fetchFormStatusFromDB();
  }, []);

  const saveFormStatusToDB = async (data) => {
    await Promise.resolve(data);
  };

  // ✅ Use useCallback to prevent function recreation
  const updateFormStatus = useCallback(async (formName, status) => {
    setFormStatus((prev) => {
      const updatedForms = { ...prev.forms, [formName]: status };
      const completedPercentage = Object.entries(updatedForms).reduce(
        (total, [name, currentStatus]) =>
          currentStatus === "Completed" ? total + formWeights[name] : total,
        0
      );

      const percentage = parseFloat(completedPercentage.toFixed(1));
      saveFormStatusToDB({ forms: updatedForms, percentage });
      return { forms: updatedForms, percentage };
    });
  }, []); // ← empty deps → stable reference

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
      url: "father-and-guardian-information",
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

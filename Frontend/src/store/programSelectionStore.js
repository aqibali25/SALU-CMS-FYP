import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useFormStatus } from "../contexts/AdmissionFormContext"; // Adjust path as needed

const useProgramSelectionStore = create((set, get) => ({
  // State
  programOptions: [],
  choices: {
    appliedDepartment: "",
    firstChoice: "",
    secondChoice: "",
    thirdChoice: "",
  },
  loading: true,
  cnic: Cookies.get("cnic"),
  hasFetched: false,

  // Actions
  fetchProgramOptions: async () => {
    const { hasFetched } = get();
    if (hasFetched) return;

    try {
      const response = await axios.get("http://localhost:3306/api/departments");
      const options = response.data.map((dept) => ({
        value: dept.department_name.trim(),
        label: dept.department_name.trim(),
      }));
      set({ programOptions: options });
      return options;
    } catch (error) {
      console.error("Error fetching program options:", error);
      return [];
    }
  },

  fetchUserProgramChoices: async () => {
    const { programOptions, cnic } = get();
    if (programOptions.length === 0) return;

    try {
      const response = await axios.get(
        `http://localhost:3306/api/getProgramSelection/${cnic}`
      );
      const programChoices = response.data;

      if (programChoices) {
        set({
          choices: {
            appliedDepartment: programOptions.some(
              (opt) =>
                opt.value === (programChoices.applied_department || "").trim()
            )
              ? (programChoices.applied_department || "").trim()
              : "",
            firstChoice: programOptions.some(
              (opt) => opt.value === (programChoices.first_choice || "").trim()
            )
              ? (programChoices.first_choice || "").trim()
              : "",
            secondChoice: programOptions.some(
              (opt) => opt.value === (programChoices.second_choice || "").trim()
            )
              ? (programChoices.second_choice || "").trim()
              : "",
            thirdChoice: programOptions.some(
              (opt) => opt.value === (programChoices.third_choice || "").trim()
            )
              ? (programChoices.third_choice || "").trim()
              : "",
          },
          hasFetched: true,
          loading: false,
        });
        return true; // Indicate successful fetch
      }
    } catch (error) {
      console.error("Error fetching user's program choices:", error);
      return false;
    }
  },

  initializeData: async () => {
    const { hasFetched, fetchProgramOptions, fetchUserProgramChoices } = get();
    if (hasFetched) return false;

    const options = await fetchProgramOptions();
    if (options.length > 0) {
      return await fetchUserProgramChoices();
    }
    return false;
  },

  updateChoice: (choice, value) => {
    set((state) => ({
      choices: {
        ...state.choices,
        [choice]: value,
      },
    }));
  },

  submitForm: async () => {
    const { cnic, choices } = get();
    try {
      await axios.post(
        "http://localhost:3306/api/saveProgramSelection",
        { ...choices, cnic },
        { headers: { "Content-Type": "application/json" } }
      );
      return true;
    } catch (error) {
      console.error("Error saving data:", error);
      return false;
    }
  },
}));

// Custom initialization hook with status updating
export const useInitializeProgramSelection = () => {
  const initializeData = useProgramSelectionStore(
    (state) => state.initializeData
  );
  const { updateFormStatus } = useFormStatus();

  useEffect(() => {
    const initialize = async () => {
      const dataFetched = await initializeData();
      if (dataFetched) {
        updateFormStatus("programOfStudy", "Completed");
      }
    };
    initialize();
  }, [initializeData, updateFormStatus]);
};

export default useProgramSelectionStore;

import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const useProgramSelectionStore = create((set, get) => ({
  programOptions: [],
  choices: {
    appliedDepartment: "",
    firstChoice: "",
    secondChoice: "",
    shift: "",
  },
  loading: true,
  cnic: Cookies.get("cnic"),
  hasFetched: false,
  fetchAttempts: 0,
  maxFetchAttempts: 2,
  error: null,
  shiftOptions: [],

  // Fetch available departments
  fetchProgramOptions: async () => {
    const { hasFetched } = get();
    if (hasFetched) return;

    try {
      set({ loading: true, error: null });
      const response = await axios.get("http://localhost:3306/api/departments");
      const options = response.data.map((dept) => ({
        value: dept.department_name.trim(),
        label: dept.department_name.trim(),
      }));
      set({ programOptions: options });
      return options;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to load program options";
      console.error("Error fetching program options:", error);
      set({ programOptions: [], loading: false, error: errorMessage });
      toast.error(`Error: ${errorMessage}`);
      return [];
    }
  },

  // Fetch shift options from admission schedule with status "Open"
  fetchShiftOptions: async () => {
    try {
      const response = await axios.get(
        "http://localhost:3306/api/admission-schedule"
      );
      const admissionSchedules = response.data.data || response.data;

      // Filter schedules with status "Open" and get unique shifts
      const openShifts = admissionSchedules
        .filter((schedule) => schedule.status === "Open")
        .map((schedule) => schedule.Shift)
        .filter((shift) => shift && shift.trim() !== "")
        .filter((shift, index, array) => array.indexOf(shift) === index)
        .map((shift) => ({
          value: shift, // Keep original case from database
          label: shift.charAt(0).toUpperCase() + shift.slice(1).toLowerCase(),
        }));

      set({ shiftOptions: openShifts });
      return openShifts;
    } catch (error) {
      console.error("Error fetching shift options:", error);
      const defaultShifts = [
        { value: "Morning", label: "Morning" },
        { value: "Evening", label: "Evening" },
      ];
      set({ shiftOptions: defaultShifts });
      return defaultShifts;
    }
  },

  // Fetch saved program selection (if any)
  fetchUserProgramChoices: async () => {
    const { programOptions, cnic, fetchAttempts, shiftOptions } = get();
    if (programOptions.length === 0) return false;

    try {
      const response = await axios.get(
        `http://localhost:3306/api/getProgramSelection/${cnic}`
      );
      const programChoices = response.data;

      if (programChoices) {
        // Get the saved shift from database
        const savedShift = programChoices.shift || "";

        // Check if saved shift exists in current shift options
        const isValidShift = shiftOptions.some(
          (option) => option.value === savedShift
        );

        // Set the shift to the exact value from database, or empty string if not valid
        const shiftToSet = isValidShift ? savedShift : "";

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
            shift: shiftToSet,
          },
          hasFetched: true,
          loading: false,
          error: null,
        });

        return true;
      }
      return false;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.warn("No existing program data found for this CNIC.");
        set({ hasFetched: true, loading: false, error: null });
        return false;
      }

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to load program choices";
      console.error("Error fetching user's program choices:", error);
      set({ hasFetched: true, loading: false, error: errorMessage });

      if (get().fetchAttempts >= get().maxFetchAttempts) {
        toast.error(`Error: ${errorMessage}`);
      }
      return false;
    }
  },

  // Initialize all data (programs + shifts + saved choices if any)
  initializeData: async () => {
    const {
      hasFetched,
      fetchAttempts,
      maxFetchAttempts,
      fetchProgramOptions,
      fetchShiftOptions,
      fetchUserProgramChoices,
    } = get();

    if (hasFetched || fetchAttempts >= maxFetchAttempts) {
      set({ loading: false });
      return { dataFetched: false, hasExistingData: false };
    }

    try {
      set({ fetchAttempts: fetchAttempts + 1 });

      // Fetch shift options FIRST, then program options
      const shifts = await fetchShiftOptions();
      const options = await fetchProgramOptions();

      if (options.length > 0) {
        const hasExistingData = await fetchUserProgramChoices();
        return { dataFetched: true, hasExistingData };
      } else {
        set({ loading: false });
        return { dataFetched: true, hasExistingData: false };
      }
    } catch (error) {
      set({ loading: false });
      return { dataFetched: false, hasExistingData: false };
    }
  },

  // Reset fetch state
  resetFetchState: () =>
    set({
      hasFetched: false,
      fetchAttempts: 0,
    }),

  updateChoice: (choice, value) => {
    set((state) => ({
      choices: { ...state.choices, [choice]: value },
    }));
  },

  submitForm: async (modifiedChoices = null) => {
    const { cnic, choices, shiftOptions } = get();

    const choicesToSubmit = modifiedChoices || choices;

    // Check if selected shift is valid
    const isValidShift = shiftOptions.some(
      (option) => option.value === choicesToSubmit.shift
    );

    if (
      !choicesToSubmit.appliedDepartment ||
      !choicesToSubmit.firstChoice ||
      !choicesToSubmit.secondChoice ||
      !choicesToSubmit.shift ||
      !isValidShift
    ) {
      toast.error("Please select all required fields with valid options");
      return false;
    }

    try {
      set({ loading: true, error: null });

      const dataToSend = {
        ...choicesToSubmit,
        cnic,
      };

      await axios.post(
        "http://localhost:3306/api/saveProgramSelection",
        dataToSend,
        {
          headers: { "Content-Type": "application/json" },
          timeout: 7000,
        }
      );

      set({ loading: false });
      toast.success("Program selection saved successfully!");
      return true;
    } catch (error) {
      let errorMessage = "Failed to save program selection";

      if (error.response) {
        errorMessage =
          error.response.data?.message ||
          `Server error: ${error.response.status}`;
      } else if (error.request) {
        errorMessage = "No response from server. Please check your connection.";
      } else {
        errorMessage = error.message;
      }

      console.error("Error saving data:", error);
      set({ loading: false, error: errorMessage });
      toast.error(errorMessage);
      return false;
    }
  },

  // Clear errors
  clearError: () => set({ error: null }),
}));

export default useProgramSelectionStore;

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
    thirdChoice: "",
  },
  loading: true,
  cnic: Cookies.get("cnic"),
  hasFetched: false,
  fetchAttempts: 0, // Track fetch attempts
  maxFetchAttempts: 2, // Maximum allowed attempts
  error: null,

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

  // Fetch saved program selection (if any)
  fetchUserProgramChoices: async () => {
    const { programOptions, cnic, fetchAttempts } = get();
    if (programOptions.length === 0) return false;

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
          error: null,
        });

        // Only show success toast on first successful fetch
        if (fetchAttempts === 0) {
          toast.success("Program selection loaded successfully!");
        }
        return true; // Data was successfully fetched
      }
      return false; // No program choices data
    } catch (error) {
      // ✅ Handle 404 gracefully (no existing data)
      if (error.response && error.response.status === 404) {
        console.warn("No existing program data found for this CNIC.");
        set({ hasFetched: true, loading: false, error: null });
        return false; // No data found
      }

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to load program choices";
      console.error("Error fetching user's program choices:", error);
      set({ hasFetched: true, loading: false, error: errorMessage });

      // Only show error toast on last attempt
      if (get().fetchAttempts >= get().maxFetchAttempts) {
        toast.error(`Error: ${errorMessage}`);
      }
      return false; // Error occurred
    }
  },

  // Initialize all data (programs + saved choices if any)
  initializeData: async () => {
    const {
      hasFetched,
      fetchAttempts,
      maxFetchAttempts,
      fetchProgramOptions,
      fetchUserProgramChoices,
    } = get();

    // Stop if already fetched or exceeded max attempts
    if (hasFetched || fetchAttempts >= maxFetchAttempts) {
      set({ loading: false });
      return { dataFetched: false, hasExistingData: false };
    }

    try {
      set({ fetchAttempts: fetchAttempts + 1 });
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

  // Reset fetch state (useful if you need to refetch)
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

  submitForm: async () => {
    const { cnic, choices } = get();

    // Validation
    if (!choices.appliedDepartment || !choices.firstChoice) {
      toast.error("Please select at least Applied Department and First Choice");
      return false;
    }

    try {
      set({ loading: true, error: null });

      await axios.post(
        "http://localhost:3306/api/saveProgramSelection",
        { ...choices, cnic },
        {
          headers: { "Content-Type": "application/json" },
          timeout: 7000,
        }
      );

      set({ loading: false });
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

// ✅ Custom initialization hook with form status update - ONLY when data exists
export const useInitializeProgramSelection = () => {
  const initializeData = useProgramSelectionStore(
    (state) => state.initializeData
  );
  const hasFetched = useProgramSelectionStore((state) => state.hasFetched);
  const { updateFormStatus } = useFormStatus();

  useEffect(() => {
    // Only initialize if not already fetched
    if (!hasFetched) {
      const initialize = async () => {
        const { dataFetched, hasExistingData } = await initializeData();
        console.log(dataFetched + hasExistingData);

        // Only update status to "Completed" if we actually fetched existing data
        if (dataFetched && hasExistingData) {
          updateFormStatus("programOfStudy", "Completed");
        }
      };
      initialize();
    }
  }, [initializeData, updateFormStatus, hasFetched]);
};

export default useProgramSelectionStore;

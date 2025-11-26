import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const useFatherGuardianStore = create((set, get) => ({
  // State
  formData: {
    father: {
      name: "",
      cnic: "",
      mobileNumber: "",
      occupation: "",
    },
    guardian: {
      name: "",
      cnic: "",
      mobileNumber: "",
      occupation: "",
    },
  },

  loading: true,
  hasFetched: false,
  fetchAttempts: 0, // Track fetch attempts
  maxFetchAttempts: 2, // Maximum allowed attempts
  error: null,
  sameAsFather: false,

  // Fetch Father & Guardian Info
  fetchFatherGuardianInfo: async () => {
    const { hasFetched, fetchAttempts, maxFetchAttempts } = get();
    const cnic = Cookies.get("cnic");

    // Stop if already fetched, no CNIC, or exceeded max attempts
    if (hasFetched || !cnic || fetchAttempts >= maxFetchAttempts) {
      set({ loading: false });
      return false;
    }

    try {
      set({ loading: true, error: null, fetchAttempts: fetchAttempts + 1 });

      const response = await axios.get(
        `http://localhost:3306/api/getFatherGuardianInfo/${cnic}`
      );

      if (response.status === 200 && response.data) {
        set({
          formData: {
            father: {
              name: response.data.fatherData?.name || "",
              cnic: response.data.fatherData?.cnic_number || "",
              mobileNumber: response.data.fatherData?.mobile_number || "",
              occupation: response.data.fatherData?.occupation || "",
            },
            guardian: {
              name: response.data.guardianData?.name || "",
              cnic: response.data.guardianData?.cnic_number || "",
              mobileNumber: response.data.guardianData?.mobile_number || "",
              occupation: response.data.guardianData?.occupation || "",
            },
          },
          hasFetched: true,
          loading: false,
          error: null,
        });

        return true;
      }

      set({ loading: false });
      return false;
    } catch (err) {
      // Handle 404 gracefully (no existing data)
      if (err.response && err.response.status === 404) {
        console.warn("No existing father/guardian data found for this CNIC.");
        set({
          hasFetched: true,
          loading: false,
          error: null,
        });
        return false;
      }

      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to load father & guardian information";

      set({
        loading: false,
        error: errorMessage,
      });

      // Only show error toast on last attempt
      if (get().fetchAttempts >= maxFetchAttempts) {
        toast.error(`Error: ${errorMessage}`);
      }
      return false;
    }
  },

  // Reset fetch state (useful if you need to refetch)
  resetFetchState: () =>
    set({
      hasFetched: false,
      fetchAttempts: 0,
    }),

  // Update Field
  updateField: (section, field, value) => {
    const { sameAsFather, formData } = get();

    set((state) => ({
      formData: {
        ...state.formData,
        [section]: {
          ...state.formData[section],
          [field]: value,
        },
        ...(sameAsFather && section === "father"
          ? {
              guardian: {
                ...formData.father,
                [field]: value,
              },
            }
          : {}),
      },
    }));
  },

  // Handle checkbox
  toggleSameAsFather: () => {
    const { sameAsFather, formData } = get();

    const newValue = !sameAsFather;

    set({
      sameAsFather: newValue,
      formData: {
        ...formData,
        guardian: newValue
          ? { ...formData.father }
          : { name: "", cnic: "", mobileNumber: "", occupation: "" },
      },
    });
  },

  // Save Form
  submitForm: async () => {
    const { formData } = get();
    const cnic = Cookies.get("cnic");

    // Validation
    if (
      !formData.father.name ||
      !formData.father.cnic ||
      !formData.father.mobileNumber
    ) {
      toast.error(
        "Please fill in all required fields for Father's Information"
      );
      return false;
    }

    if (
      !formData.guardian.name ||
      !formData.guardian.cnic ||
      !formData.guardian.mobileNumber
    ) {
      toast.error(
        "Please fill in all required fields for Guardian's Information"
      );
      return false;
    }

    const requestData = {
      cnic,
      fatherData: formData.father,
      guardianData: formData.guardian,
    };

    try {
      set({ loading: true, error: null });

      const response = await axios.post(
        "http://localhost:3306/api/saveFatherGuardianInfo",
        requestData,
        {
          headers: { "Content-Type": "application/json" },
          timeout: 10000,
        }
      );

      const success = response.status >= 200 && response.status < 300;

      if (success) {
        set({ loading: false });
        return true;
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      let errorMessage = "Failed to save father & guardian information";

      if (error.response) {
        errorMessage =
          error.response.data?.message ||
          `Server error: ${error.response.status}`;
      } else if (error.request) {
        errorMessage = "No response from server. Please check your connection.";
      } else {
        errorMessage = error.message;
      }

      console.error("Save Error:", error);
      set({
        loading: false,
        error: errorMessage,
      });

      toast.error(errorMessage);
      return false;
    }
  },

  // Clear errors
  clearError: () => set({ error: null }),
}));

export default useFatherGuardianStore;

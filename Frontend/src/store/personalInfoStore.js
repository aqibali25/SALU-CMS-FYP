import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const usePersonalInfoStore = create((set, get) => ({
  // State
  formData: {
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    cnic: Cookies.get("cnic") || "",
    religion: "",
    nativeLanguage: "",
    bloodGroup: "",
    disability: "",
    disabilityDescription: "",
    province: "",
    city: "",
    postalAddress: "",
    permanentAddress: "",
  },
  loading: true,
  hasFetched: false,
  fetchAttempts: 0, // Track fetch attempts
  maxFetchAttempts: 2, // Maximum allowed attempts
  error: null,

  // Static options
  staticData: {
    religions: ["Islam", "Hinduism", "Christianity", "Sikhism"],
    nativeLanguages: ["Sindhi", "Urdu", "English"],
    bloodGroups: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  },

  // Actions
  fetchPersonalInfo: async () => {
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
        `http://localhost:3306/api/getPersonalInfo/${cnic}`
      );

      if (response.status === 200 && response.data) {
        const userData = response.data;
        let formattedDOB = userData.dob
          ? new Date(userData.dob).toISOString().split("T")[0]
          : "";

        set({
          formData: {
            firstName: userData.first_name || "",
            lastName: userData.last_name || "",
            gender: userData.gender || "",
            dob: formattedDOB,
            cnic: cnic,
            religion: userData.religion || "",
            nativeLanguage: userData.native_language || "",
            bloodGroup: userData.blood_group || "",
            disability: userData.disability || "",
            disabilityDescription: userData.disability_description || "",
            province: userData.province || "",
            city: userData.city || "",
            postalAddress: userData.postal_address || "",
            permanentAddress: userData.permanent_address || "",
          },
          hasFetched: true,
          loading: false,
          error: null,
        });

        // Only show success toast on first successful fetch
        if (fetchAttempts === 0) {
          toast.success("Personal information loaded successfully!");
        }
        return true;
      }

      set({ loading: false });
      return false;
    } catch (error) {
      // Handle 404 gracefully (no existing data)
      if (error.response && error.response.status === 404) {
        console.warn("No existing personal information found for this CNIC.");
        set({
          hasFetched: true,
          loading: false,
          error: null,
        });
        return false;
      }

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to load personal information";

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

  updateField: (field, value) => {
    set((state) => ({
      formData: {
        ...state.formData,
        [field]: value,
        ...(field === "disability" && value !== "Yes"
          ? { disabilityDescription: "" }
          : {}),
      },
    }));
  },

  submitForm: async () => {
    const { formData } = get();
    const cnic = Cookies.get("cnic");

    // Validation
    const requiredFields = [
      "firstName",
      "lastName",
      "gender",
      "dob",
      "religion",
      "nativeLanguage",
    ];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      toast.error(`Please fill in all required fields`);
      return false;
    }

    try {
      set({ loading: true, error: null });

      const response = await axios.post(
        "http://localhost:3306/api/savePersonalInfo",
        { ...formData, cnic },
        {
          headers: { "Content-Type": "application/json" },
          timeout: 7000,
        }
      );

      // Check for successful response
      const success = response.status >= 200 && response.status < 300;

      if (success) {
        set({ loading: false });
        return true;
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      let errorMessage = "Failed to save personal information";

      if (error.response) {
        // Server responded with error status
        errorMessage =
          error.response.data?.message ||
          `Server error: ${error.response.status}`;
      } else if (error.request) {
        // Request made but no response received
        errorMessage = "No response from server. Please check your connection.";
      } else {
        // Something else happened
        errorMessage = error.message;
      }

      set({
        loading: false,
        error: errorMessage,
      });

      toast.error(errorMessage);
      return false;
    }
  },

  // Reset form data
  resetForm: () => {
    set({
      formData: {
        firstName: "",
        lastName: "",
        gender: "",
        dob: "",
        cnic: Cookies.get("cnic") || "",
        religion: "",
        nativeLanguage: "",
        bloodGroup: "",
        disability: "",
        disabilityDescription: "",
        province: "",
        city: "",
        postalAddress: "",
        permanentAddress: "",
      },
      error: null,
    });
  },

  // Clear errors
  clearError: () => set({ error: null }),
}));

export default usePersonalInfoStore;

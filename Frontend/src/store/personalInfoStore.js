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
    form_fee_status: "Unpaid",
    admission_year: "",
  },
  loading: true,
  hasFetched: false,
  fetchAttempts: 0,
  maxFetchAttempts: 2,
  error: null,

  // Static options
  staticData: {
    religions: ["Islam", "Hinduism", "Christianity", "Sikhism"],
    nativeLanguages: ["Sindhi", "Urdu", "English"],
    bloodGroups: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  },

  // Get admission year based on user's selected shift
  getAdmissionYearForShift: async () => {
    try {
      const cnic = Cookies.get("cnic");
      if (!cnic) return "";

      // Fetch user's program selection to get the selected shift
      const programResponse = await axios.get(
        `http://localhost:3306/api/getProgramSelection/${cnic}`
      );

      if (programResponse.data && programResponse.data.shift) {
        const userShift = programResponse.data.shift;

        // Fetch admission schedules
        const admissionResponse = await axios.get(
          "http://localhost:3306/api/admission-schedule"
        );
        const admissionSchedules =
          admissionResponse.data.data || admissionResponse.data;

        // Find the admission schedule that matches the user's shift and has status "Open"
        const matchingSchedule = admissionSchedules.find(
          (schedule) =>
            schedule.Shift === userShift && schedule.status === "Open"
        );

        if (matchingSchedule && matchingSchedule.admission_year) {
          return matchingSchedule.admission_year.toString();
        }
      }

      return "";
    } catch (error) {
      console.error("Error fetching admission year for shift:", error);
      return "";
    }
  },

  // Actions
  fetchPersonalInfo: async () => {
    const {
      hasFetched,
      fetchAttempts,
      maxFetchAttempts,
      getAdmissionYearForShift,
    } = get();
    const cnic = Cookies.get("cnic");

    // Stop if already fetched, no CNIC, or exceeded max attempts
    if (hasFetched || !cnic || fetchAttempts >= maxFetchAttempts) {
      set({ loading: false });
      return false;
    }

    try {
      set({ loading: true, error: null, fetchAttempts: fetchAttempts + 1 });

      // Get admission year first
      const admissionYear = await getAdmissionYearForShift();

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
            form_fee_status: userData.form_fee_status || "Unpaid",
            admission_year: userData.admission_year || admission_year || "",
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

        // Get admission year even for new users
        const admissionYear = await getAdmissionYearForShift();

        set({
          formData: {
            ...get().formData,
            admission_year: admissionYear,
          },
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
    const { formData, getAdmissionYearForShift } = get();
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

      // Ensure admission_year is set before submitting
      let finalFormData = { ...formData };
      if (!finalFormData.admission_year) {
        const admissionYear = await getAdmissionYearForShift();
        finalFormData.admission_year = admissionYear;
      }

      const response = await axios.post(
        "http://localhost:3306/api/savePersonalInfo",
        { ...finalFormData, cnic },
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
        errorMessage =
          error.response.data?.message ||
          `Server error: ${error.response.status}`;
      } else if (error.request) {
        errorMessage = "No response from server. Please check your connection.";
      } else {
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
        form_fee_status: "Unpaid",
        admission_year: "",
      },
      error: null,
    });
  },

  // Clear errors
  clearError: () => set({ error: null }),

  // Method to update admission year (can be called externally if needed)
  updateAdmissionYear: async () => {
    const admissionYear = await get().getAdmissionYearForShift();
    if (admissionYear) {
      set((state) => ({
        formData: {
          ...state.formData,
          admission_year: admissionYear,
        },
      }));
      return admissionYear;
    }
    return "";
  },
}));

export default usePersonalInfoStore;

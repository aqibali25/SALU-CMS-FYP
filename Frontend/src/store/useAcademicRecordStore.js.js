import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { boards, educationGroups } from "./BoardsData";

const useAcademicRecordStore = create((set, get) => ({
  // ===== STATE =====
  academicData: {
    intermediate: {
      group: "",
      degreeYear: "",
      seatNo: "",
      institutionName: "",
      board: "",
      totalMarks: "",
      marksObtained: "",
      percentage: "",
    },
    matriculation: {
      group: "",
      degreeYear: "",
      seatNo: "",
      institutionName: "",
      board: "",
      totalMarks: "",
      marksObtained: "",
      percentage: "",
    },
  },

  loading: true,
  hasFetched: false,
  fetchAttempts: 0, // Track fetch attempts
  maxFetchAttempts: 2, // Maximum allowed attempts
  error: null,

  // ===== Static Data =====
  boards: boards,

  educationGroups: {
    matriculation: educationGroups.matriculation,
    intermediate: educationGroups.intermediate,
  },

  // ===== ACTIONS =====

  // Fetch data with attempt tracking
  fetchAcademicRecord: async () => {
    const { hasFetched, fetchAttempts, maxFetchAttempts } = get();
    const cnic = Cookies.get("cnic");

    // Stop if already fetched, no CNIC, or exceeded max attempts
    if (hasFetched || !cnic || fetchAttempts >= maxFetchAttempts) {
      set({ loading: false });
      return false;
    }

    try {
      set({ loading: true, error: null, fetchAttempts: fetchAttempts + 1 });

      const res = await axios.get(
        `http://localhost:3306/api/getAcademicRecord/${cnic}`
      );

      if (res.status === 200 && res.data) {
        const format = (data) => ({
          group: data?.group_name || "",
          degreeYear: data?.degree_year || "",
          seatNo: data?.seat_no || "",
          institutionName: data?.institution_name || "",
          board: data?.board || "",
          totalMarks: data?.total_marks || "",
          marksObtained: data?.marks_obtained || "",
          percentage: data?.percentage || "",
        });

        set({
          academicData: {
            intermediate: format(res.data.intermediate),
            matriculation: format(res.data.matriculation),
          },
          loading: false,
          hasFetched: true,
          error: null,
        });

        return true;
      }

      set({ loading: false });
      return false;
    } catch (e) {
      // Handle 404 gracefully (no existing data)
      if (e.response && e.response.status === 404) {
        console.warn("No existing academic records found for this CNIC.");
        set({
          hasFetched: true,
          loading: false,
          error: null,
        });
        return false;
      }

      const errorMessage =
        e.response?.data?.message ||
        e.message ||
        "Failed to load academic records";

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

  updateField: (category, field, value) => {
    set((state) => {
      const updatedCategory = {
        ...state.academicData[category],
        [field]: value,
      };

      // auto calculate %
      const total = parseFloat(updatedCategory.totalMarks);
      const obtained = parseFloat(updatedCategory.marksObtained);

      if (!isNaN(total) && !isNaN(obtained) && total > 0) {
        updatedCategory.percentage =
          ((obtained / total) * 100).toFixed(2) + "%";
      } else {
        updatedCategory.percentage = "";
      }

      return {
        academicData: {
          ...state.academicData,
          [category]: updatedCategory,
        },
      };
    });
  },

  submitAcademicRecord: async () => {
    const { academicData } = get();
    const cnic = Cookies.get("cnic");

    // Validation
    const requiredFields = [
      "group",
      "degreeYear",
      "seatNo",
      "institutionName",
      "board",
      "totalMarks",
      "marksObtained",
    ];

    for (const category of ["matriculation", "intermediate"]) {
      const categoryData = academicData[category];
      const missingFields = requiredFields.filter(
        (field) => !categoryData[field]
      );

      if (missingFields.length > 0) {
        toast.error(
          `Please fill in all required fields for ${
            category === "matriculation" ? "Matriculation" : "Intermediate"
          }`
        );
        return false;
      }

      // Validate marks
      const totalMarks = parseFloat(categoryData.totalMarks);
      const marksObtained = parseFloat(categoryData.marksObtained);

      if (isNaN(totalMarks) || isNaN(marksObtained)) {
        toast.error(
          `Please enter valid numbers for marks in ${
            category === "matriculation" ? "Matriculation" : "Intermediate"
          }`
        );
        return false;
      }

      if (marksObtained > totalMarks) {
        toast.error(
          `Marks obtained cannot be greater than total marks in ${
            category === "matriculation" ? "Matriculation" : "Intermediate"
          }`
        );
        return false;
      }
    }

    try {
      set({ loading: true, error: null });

      const res = await axios.post(
        "http://localhost:3306/api/saveAcademicRecord",
        { cnic, ...academicData },
        {
          headers: { "Content-Type": "application/json" },
          timeout: 10000,
        }
      );

      const success = res.status >= 200 && res.status < 300;

      if (success) {
        set({ loading: false });
        return true;
      } else {
        throw new Error(`Unexpected response status: ${res.status}`);
      }
    } catch (e) {
      let errorMessage = "Failed to save academic records";

      if (e.response) {
        errorMessage =
          e.response.data?.message || `Server error: ${e.response.status}`;
      } else if (e.request) {
        errorMessage = "No response from server. Please check your connection.";
      } else {
        errorMessage = e.message;
      }

      console.error("Save Error:", e);
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

export default useAcademicRecordStore;

import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";
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
  error: null,

  // ===== Static Data =====
  boards: boards,

  educationGroups: {
    matriculation: educationGroups.matriculation,
    intermediate: educationGroups.intermediate,
  },

  // ===== ACTIONS =====

  // Fetch data (only once)
  fetchAcademicRecord: async () => {
    const { hasFetched } = get();
    const cnic = Cookies.get("cnic");

    if (hasFetched || !cnic) return false;

    try {
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
      return false;
    } catch (e) {
      set({ loading: false, error: e.message });
      return false;
    }
  },

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

    try {
      const res = await axios.post(
        "http://localhost:3306/api/saveAcademicRecord",
        { cnic, ...academicData },
        { headers: { "Content-Type": "application/json" } }
      );

      return res.status === 200;
    } catch (e) {
      console.error("Save Error:", e);
      return false;
    }
  },
}));

export default useAcademicRecordStore;

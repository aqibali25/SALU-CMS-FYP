import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";

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
  boards: [
    { value: "BISE Abbottabad", label: "BISE Abbottabad" },
    { value: "BISE AJK Mirpur", label: "BISE AJK Mirpur" },
    { value: "BISE Bahawalpur", label: "BISE Bahawalpur" },
    { value: "BISE Bannu", label: "BISE Bannu" },
    { value: "BISE Dera Ghazi Khan", label: "BISE Dera Ghazi Khan" },
    { value: "BISE DI Khan", label: "BISE DI Khan" },
    { value: "FBISE", label: "FBISE (Federal Board)" },
    { value: "BISE Faisalabad", label: "BISE Faisalabad" },
    { value: "BISE Gujranwala", label: "BISE Gujranwala" },
    { value: "BISE Hyderabad", label: "BISE Hyderabad" },
    { value: "BISE Karachi", label: "BISE Karachi" },
    { value: "BISE Kohat", label: "BISE Kohat" },
    { value: "BISE Khuzdar", label: "BISE Khuzdar" },
    { value: "BISE Lahore", label: "BISE Lahore" },
    { value: "BISE Larkana", label: "BISE Larkana" },
    { value: "BISE Malakand", label: "BISE Malakand" },
    { value: "BISE Mardan", label: "BISE Mardan" },
    { value: "BISE Mirpurkhas", label: "BISE Mirpurkhas" },
    { value: "BISE Multan", label: "BISE Multan" },
    { value: "BISE Peshawar", label: "BISE Peshawar" },
    { value: "BISE Quetta", label: "BISE Quetta" },
    { value: "BISE Rawalpindi", label: "BISE Rawalpindi" },
    { value: "BISE Sahiwal", label: "BISE Sahiwal" },
    { value: "BISE Sargodha", label: "BISE Sargodha" },
    {
      value: "BISE Shaheed Benazirabad",
      label: "BISE Shaheed Benazirabad (Nawabshah)",
    },
    { value: "BISE Sukkur", label: "BISE Sukkur" },
    { value: "BISE Swat", label: "BISE Swat" },
    { value: "BISE Turbat", label: "BISE Turbat" },
  ],

  educationGroups: {
    matriculation: [
      "Science (Biology Group)",
      "Science (Computer Science Group)",
      "General Science",
      "Humanities (Arts)",
      "Technical",
    ],
    intermediate: [
      "Pre-Medical",
      "Pre-Engineering",
      "ICS (Intermediate in Computer Science)",
      "Commerce (I.Com)",
      "General Science",
      "Humanities (FA - Fine Arts, Social Sciences)",
      "Home Economics",
    ],
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

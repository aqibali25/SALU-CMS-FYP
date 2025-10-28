import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";

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
  error: null,

  // Static options
  staticData: {
    religions: ["Islam", "Hinduism", "Christianity", "Sikhism"],
    nativeLanguages: ["Sindhi", "Urdu", "English"],
    bloodGroups: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  },

  // Actions
  fetchPersonalInfo: async () => {
    const { hasFetched } = get();
    const cnic = Cookies.get("cnic");

    if (hasFetched || !cnic) return false;

    try {
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
        return true;
      }
      return false;
    } catch (error) {
      set({ loading: false, error: error.message });
      return false;
    }
  },

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

    try {
      const response = await axios.post(
        "http://localhost:3306/api/savePersonalInfo",
        { ...formData, cnic },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.status === 200;
    } catch (error) {
      console.error("Save Error:", error);
      return false;
    }
  },
}));

export default usePersonalInfoStore;

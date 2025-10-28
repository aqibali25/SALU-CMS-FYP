import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";

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
  error: null,
  sameAsFather: false,

  // Fetch Father & Guardian Info
  fetchFatherGuardianInfo: async () => {
    const { hasFetched } = get();
    const cnic = Cookies.get("cnic");

    if (hasFetched || !cnic) return false;

    try {
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
      set({ loading: false, error: err.message });
      return false;
    }
  },

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

    const requestData = {
      cnic,
      fatherData: formData.father,
      guardianData: formData.guardian,
    };

    try {
      const response = await axios.post(
        "http://localhost:3306/api/saveFatherGuardianInfo",
        requestData,
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

export default useFatherGuardianStore;

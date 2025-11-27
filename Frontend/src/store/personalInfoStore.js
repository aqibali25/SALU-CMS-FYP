import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const usePersonalInfoStore = create((set, get) => ({
  // State
  formData: {
    firstName: "",
    lastName: "",
    surname: "",
    email: "",
    gender: "",
    dob: "",
    cnic: Cookies.get("cnic") || "",
    phoneNumber: "",
    religion: "",
    nativeLanguage: "",
    bloodGroup: "",
    disability: "",
    disabilityDescription: "" || null,
    province: "",
    city: "",
    domicileDistrict: "",
    postalAddress: "",
    permanentAddress: "",
    areYouEmployed: "",
    selfFinance: "",
    hostel: "",
    transport: "",
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

      const programResponse = await axios.get(
        `http://localhost:3306/api/getProgramSelection/${cnic}`
      );

      if (programResponse.data && programResponse.data.shift) {
        const userShift = programResponse.data.shift;

        const admissionResponse = await axios.get(
          "http://localhost:3306/api/admission-schedule"
        );
        const admissionSchedules =
          admissionResponse.data.data || admissionResponse.data;

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

    if (hasFetched || !cnic || fetchAttempts >= maxFetchAttempts) {
      set({ loading: false });
      return false;
    }

    try {
      set({ loading: true, error: null, fetchAttempts: fetchAttempts + 1 });

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
            surname: userData.surname || "",
            email: userData.email || "",
            gender: userData.gender || "",
            dob: formattedDOB,
            cnic: cnic,
            phoneNumber: userData.phone_no || "", // Add this line
            religion: userData.religion || "",
            nativeLanguage: userData.native_language || "",
            bloodGroup: userData.blood_group || "",
            disability: userData.disability || "",
            disabilityDescription: userData.disability_description || "",
            province: userData.province || "",
            city: userData.city || "",
            domicileDistrict: userData.domicile_district || "",
            postalAddress: userData.postal_address || "",
            permanentAddress: userData.permanent_address || "",
            areYouEmployed: userData.are_you_employed || "",
            selfFinance: userData.self_finance || "",
            hostel: userData.hostel || "",
            transport: userData.transport || "",
            form_fee_status: userData.form_fee_status || "Unpaid",
            admission_year: userData.admission_year || admissionYear || "",
          },
          hasFetched: true,
          loading: false,
          error: null,
        });
        return true;
      }
      set({ loading: false });
      return false;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.warn("No existing personal information found for this CNIC.");

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

      if (get().fetchAttempts >= maxFetchAttempts) {
        toast.error(`Error: ${errorMessage}`);
      }
      return false;
    }
  },

  // Reset fetch state
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
      "surname",
      "email",
      "gender",
      "dob",
      "religion",
      "nativeLanguage",
      "disability",
      "areYouEmployed",
      "selfFinance",
      "hostel",
      "transport",
      "domicileDistrict",
    ];

    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      toast.error(
        `Please fill in all required fields: ${missingFields.join(", ")}`
      );
      return false;
    }

    // Additional validation for disability description
    if (formData.disability === "Yes" && !formData.disabilityDescription) {
      toast.error("Please provide disability description");
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

      // Convert frontend camelCase to backend snake_case
      const backendFormData = {
        cnic: finalFormData.cnic,
        first_name: finalFormData.firstName,
        last_name: finalFormData.lastName,
        surname: finalFormData.surname,
        email: finalFormData.email,
        gender: finalFormData.gender,
        dob: finalFormData.dob,
        phone_no: finalFormData.phoneNumber, // Add this line
        religion: finalFormData.religion,
        native_language: finalFormData.nativeLanguage,
        blood_group: finalFormData.bloodGroup,
        disability: finalFormData.disability,
        disability_description: finalFormData.disabilityDescription,
        province: finalFormData.province,
        city: finalFormData.city,
        domicile_district: finalFormData.domicileDistrict,
        postal_address: finalFormData.postalAddress,
        permanent_address: finalFormData.permanentAddress,
        are_you_employed: finalFormData.areYouEmployed,
        self_finance: finalFormData.selfFinance,
        hostel: finalFormData.hostel,
        transport: finalFormData.transport,
        form_fee_status: finalFormData.form_fee_status,
        admission_year: finalFormData.admission_year,
      };

      console.log("Sending to backend:", backendFormData);

      const response = await axios.post(
        "http://localhost:3306/api/savePersonalInfo",
        backendFormData,
        {
          headers: { "Content-Type": "application/json" },
          timeout: 7000,
        }
      );

      // Check for successful response
      const success = response.status >= 200 && response.status < 300;

      if (success) {
        set({ loading: false });
        toast.success("Personal information saved successfully!");
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

        // Show specific missing fields if provided by backend
        if (error.response.data?.missingFields) {
          errorMessage += `. Missing: ${error.response.data.missingFields.join(
            ", "
          )}`;
        }
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

  resetForm: () => {
    set({
      formData: {
        firstName: "",
        lastName: "",
        surname: "",
        email: "",
        gender: "",
        dob: "",
        cnic: Cookies.get("cnic") || "",
        phoneNumber: "", // Add this line
        religion: "",
        nativeLanguage: "",
        bloodGroup: "",
        disability: "",
        disabilityDescription: "",
        province: "",
        city: "",
        domicileDistrict: "",
        postalAddress: "",
        permanentAddress: "",
        areYouEmployed: "",
        selfFinance: "",
        hostel: "",
        transport: "",
        form_fee_status: "Unpaid",
        admission_year: "",
      },
      error: null,
    });
  },

  // Clear errors
  clearError: () => set({ error: null }),

  // Method to update admission year
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

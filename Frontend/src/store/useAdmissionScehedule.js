// useAdmissionSchedule.js
import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = "http://localhost:3306/api";

const useAdmissionSchedule = create((set, get) => ({
  admissionSchedules: [],

  fetchAdmissionSchedules: async () => {
    try {
      // Check if we already have data to avoid duplicate calls
      const currentData = get().admissionSchedules;
      if (currentData.length > 0) {
        return currentData;
      }

      const response = await axios.get(`${API_BASE_URL}/admission-schedule`);

      // Make sure we're accessing the data correctly
      const data = response.data.data || response.data;

      set({ admissionSchedules: data });
      return data;
    } catch (error) {
      console.error("Error fetching admission schedules:", error);
      throw error;
    }
  },
}));

// Export only the data array
export const getAdmissionSchedules = () =>
  useAdmissionSchedule.getState().admissionSchedules;

export default useAdmissionSchedule;

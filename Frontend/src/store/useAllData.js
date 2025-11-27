// useAllData.js
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const useAllData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cnic, setCnic] = useState(Cookies.get("cnic") || null);

  const getAllData = useCallback(
    async (cnic = null) => {
      setCnic(cnic);
      setLoading(true);
      setError(null);

      try {
        const userCnic = cnic || Cookies.get("cnic");

        if (!userCnic) {
          setError("CNIC not found in cookies");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `http://localhost:3306/api/all-data/${userCnic}`
        );

        if (response.data && response.data.success !== false) {
          setData(response.data);
        } else {
          setError("No data received from server");
          toast.error("❌ No data available for this CNIC");
        }
      } catch (err) {
        console.error("🚨 Error fetching data:", err);
        const errorMessage =
          err.response?.data?.message || err.message || "Failed to fetch data";
        setError(errorMessage);
        toast.error(`❌ ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    },
    [cnic]
  );

  return {
    data,
    loading,
    error,
    getAllData,
    refetch: getAllData,
  };
};

export default useAllData;

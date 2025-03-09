import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/ProgramSelectionForm.css";
import axios from "axios";
import { useFormStatus } from "../../../contexts/AdmissionFormContext";
import SkeletonLoader from "../SkeletonLoader";
import Cookies from "js-cookie";

const ProgramSelectionForm = () => {
  const [programOptions, setProgramOptions] = useState([]);
  const [choices, setChoices] = useState({
    appliedDepartment: "",
    firstChoice: "",
    secondChoice: "",
    thirdChoice: "",
  });
  const [loading, setLoading] = useState(true);
  const cnic = Cookies.get("cnic");

  const navigate = useNavigate();
  const { updateFormStatus } = useFormStatus();

  // Fetch program options
  useEffect(() => {
    const fetchProgramOptions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3306/api/departments"
        );
        const options = response.data.map((dept) => ({
          value: dept.department_name.trim(), // Trim spaces for consistency
          label: dept.department_name.trim(),
        }));
        setProgramOptions(options);
        console.log("Program Options:", options);
      } catch (error) {
        console.error("Error fetching program options:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProgramOptions();
  }, []);

  useEffect(() => {
    if (programOptions.length === 0) return; // Ensure options are loaded first

    const fetchUserProgramChoices = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3306/api/getProgramSelection/${cnic}`
        );
        const programChoices = response.data;

        console.log("Fetched Program Choices:", programChoices);

        if (programChoices) {
          updateFormStatus("programOfStudy", "Completed");

          setChoices({
            appliedDepartment: programOptions.some(
              (opt) =>
                opt.value === (programChoices.applied_department || "").trim()
            )
              ? (programChoices.applied_department || "").trim()
              : "",
            firstChoice: programOptions.some(
              (opt) => opt.value === (programChoices.first_choice || "").trim()
            )
              ? (programChoices.first_choice || "").trim()
              : "",
            secondChoice: programOptions.some(
              (opt) => opt.value === (programChoices.second_choice || "").trim()
            )
              ? (programChoices.second_choice || "").trim()
              : "",
            thirdChoice: programOptions.some(
              (opt) => opt.value === (programChoices.third_choice || "").trim()
            )
              ? (programChoices.third_choice || "").trim()
              : "",
          });
        }
      } catch (error) {
        console.error("Error fetching user's program choices:", error);
      }
    };

    fetchUserProgramChoices();
  }, [programOptions]); // Runs only when programOptions are available
  // Runs only when programOptions are available

  // Prevents loading state from persisting too long
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(programOptions.length === 0);
    }, 800);
    return () => clearTimeout(timer);
  }, [programOptions]);

  // Handle dropdown selection change
  const handleChoiceChange = (choice, selectedValue) => {
    setChoices((prevChoices) => ({
      ...prevChoices,
      [choice]: selectedValue,
    }));
  };

  // Filters out already selected choices, except the current one
  const getFilteredOptions = (excludedChoices, currentKey) => {
    return programOptions.filter(
      (option) =>
        !excludedChoices.includes(option.value) ||
        option.value === choices[currentKey]
    );
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cnic) {
      console.error("CNIC not found in sessionStorage!");
      return;
    }

    try {
      await axios.post(
        "http://localhost:3306/api/saveProgramSelection",
        { ...choices, cnic },
        { headers: { "Content-Type": "application/json" } }
      );
      updateFormStatus("programOfStudy", "Completed");
      console.log("Form Data Sent:", { ...choices, cnic });
      navigate("/SALU-CMS-FYP/admissions/form");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <div
      className="margin-left-70 program-selection-form formConitainer p-4"
      style={{ minHeight: "200px" }}
    >
      <h4>Program of Study</h4>
      <form onSubmit={handleSubmit}>
        {loading && <SkeletonLoader />}
        {!loading && (
          <div className="formContainer">
            {[
              {
                key: "appliedDepartment",
                label: "Applied Department",
                required: true,
              },
              { key: "firstChoice", label: "First Choice", required: true },
              { key: "secondChoice", label: "Second Choice", required: false },
              { key: "thirdChoice", label: "Third Choice", required: false },
            ].map(({ key, label, required }) => (
              <div key={key} className="inputContainer">
                <label htmlFor={key}>
                  {required && <span className="required">*</span>}
                  {label}:
                </label>
                <select
                  id={key}
                  value={choices[key]}
                  onChange={(e) => handleChoiceChange(key, e.target.value)}
                  required={required}
                >
                  <option value="">
                    {key === "appliedDepartment"
                      ? "[Select an Option]"
                      : "Select a Program"}
                  </option>
                  {getFilteredOptions(
                    Object.values(choices).filter((c) => c !== choices[key]),
                    key
                  ).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}
        <div className="buttonContainer d-flex justify-content-end mt-4 float-end">
          <button type="submit" className="button buttonFilled">
            Save & Proceed
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProgramSelectionForm;

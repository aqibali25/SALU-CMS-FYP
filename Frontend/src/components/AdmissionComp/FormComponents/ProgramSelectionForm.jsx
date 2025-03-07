import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/ProgramSelectionForm.css";
import axios from "axios";
import { useFormStatus } from "../../../contexts/AdmissionFormContext";
import SkeletonLoader from "../SkeletonLoader";

const ProgramSelectionForm = () => {
  const [programOptions, setProgramOptions] = useState([]);
  const [choices, setChoices] = useState({
    appliedDepartment: "",
    firstChoice: "",
    secondChoice: "",
    thirdChoice: "",
  });
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { updateFormStatus, statusItems } = useFormStatus();

  // Fetch program options from backend
  useEffect(() => {
    const fetchProgramOptions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3306/api/departments"
        );
        const options = response.data.map((dept) => ({
          value: dept.department_name,
          label: dept.department_name,
        }));
        setProgramOptions(options);
        console.log("Program Options:", options);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProgramOptions();
  }, []);

  // Prevents loading state from persisting too long
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(programOptions.length === 0);
    }, 800);
    return () => clearTimeout(timer);
  }, [programOptions]);

  // Handles dropdown selection
  const handleChoiceChange = (choice, selectedValue) => {
    setChoices((prevChoices) => ({
      ...prevChoices,
      [choice]: selectedValue,
    }));
  };

  // Filters out selected choices to prevent duplicate selection
  const getFilteredOptions = (excludedChoices) => {
    return programOptions.filter(
      (option) => !excludedChoices.includes(option.value)
    );
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!choices.appliedDepartment || !choices.firstChoice) {
      alert("Please select both an Applied Department and a First Choice.");
      return;
    }
    try {
      await axios.post(
        "http://localhost:3306/api/saveProgramSelection",
        choices
      );
      updateFormStatus("programOfStudy", "Completed");
      console.log("Form Data Sent:", choices);
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
                  <option value="" disabled>
                    {key === "appliedDepartment"
                      ? "[Select an Option]"
                      : "Select a Program"}
                  </option>
                  {getFilteredOptions(
                    Object.values(choices).filter((c) => c !== choices[key])
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

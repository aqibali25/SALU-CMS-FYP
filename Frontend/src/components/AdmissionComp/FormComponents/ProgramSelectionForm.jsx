import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/ProgramSelectionForm.css";
import { useFormStatus } from "../../../contexts/AdmissionFormContext";
import SkeletonLoader from "../SkeletonLoader";
import useProgramSelectionStore from "../../../store/programSelectionStore";

const ProgramSelectionForm = () => {
  const navigate = useNavigate();
  const { updateFormStatus } = useFormStatus();

  // Get state and actions from store
  const {
    programOptions,
    choices,
    loading,
    initializeData,
    updateChoice,
    submitForm,
  } = useProgramSelectionStore();

  // Initialize data and update status immediately when fetched
  useEffect(() => {
    const checkData = async () => {
      const dataFetched = await initializeData();
      if (dataFetched) {
        updateFormStatus("programOfStudy", "Completed");
      }
    };
    checkData();
  }, [initializeData, updateFormStatus]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await submitForm();
    if (success) {
      updateFormStatus("programOfStudy", "Completed");
      navigate("/SALU-CMS-FYP/admissions/form");
    }
  };

  // Filters out already selected choices, except the current one
  const getFilteredOptions = (excludedChoices, currentKey) => {
    return programOptions.filter(
      (option) =>
        !excludedChoices.includes(option.value) ||
        option.value === choices[currentKey]
    );
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
                  onChange={(e) => updateChoice(key, e.target.value)}
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

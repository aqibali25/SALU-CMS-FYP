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
    error,
    hasFetched,
    shiftOptions,
    initializeData,
    updateChoice,
    submitForm,
  } = useProgramSelectionStore();
  console.log(choices);
  // Initialize data when component mounts - only if not already fetched
  useEffect(() => {
    if (!hasFetched) {
      initializeData();
    }
  }, [initializeData, hasFetched]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await submitForm(choices);

    if (success) {
      updateFormStatus("programOfStudy", "Completed");
      navigate("/admissions/form", {
        state: { fromProgramSelection: true },
      });
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

      {/* Error Display */}
      {error && (
        <div className="alert alert-danger" role="alert">
          <strong>Error:</strong> {error}
        </div>
      )}

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
              { key: "secondChoice", label: "Second Choice", required: true },
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

            {/* Shift dropdown */}
            <div className="inputContainer">
              <label htmlFor="shift">
                <span className="required">*</span>Shift:
              </label>
              <select
                id="shift"
                value={choices.shift}
                onChange={(e) => updateChoice("shift", e.target.value)}
                required={true}
              >
                <option value="" disabled>
                  Select a Shift
                </option>
                {shiftOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
        <div className="buttonContainer d-flex justify-content-end mt-4 float-end">
          <button
            type="submit"
            className="button buttonFilled"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save & Proceed"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProgramSelectionForm;

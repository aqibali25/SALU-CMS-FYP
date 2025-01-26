import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../../../styles/./ProgramSelectionForm.css";
import axios from "axios";
import { use } from "react";
import { useFormStatus } from "../../../contexts/AdmissionFormContext";
import SkeletonLoader from "../SkeletonLoader";

const ProgramSelectionForm = () => {
  const [programOptions, setProgramOptions] = useState([
    { value: "Computer Science", label: "Computer Science" },
    { value: "Business Adminstration", label: "Business Adminstration" },
    {
      value: "English Litrature and Languagistics",
      label: "English Litrature and Languagistics",
    },
  ]);
  const [choices, setChoices] = useState({
    firstChoice: "",
    secondChoice: "",
    thirdChoice: "",
  });
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate(); // Initialize the navigate function

  // useEffect(() => {
  //   const fetchProgramOptions = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:5000/api/departments"
  //       );
  //       const options = response.data;
  //       setProgramOptions(options);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchProgramOptions();
  // }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(programOptions.length === 0);
    }, 800);

    return () => clearTimeout(timer);
  }, [programOptions]);

  const handleChoiceChange = (choice, selectedValue) => {
    setChoices((prevChoices) => ({
      ...prevChoices,
      [choice]: selectedValue,
    }));
  };

  const getFilteredOptions = (excludedChoices) => {
    return programOptions.filter(
      (option) => !excludedChoices.includes(option.value)
    );
  };

  const { updateFormStatus, statusItems } = useFormStatus();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form from reloading the page

    // Update the form status
    updateFormStatus("programOfStudy", "Completed");
    console.log(statusItems);

    // Log the selected choices
    console.log("Form Data:", choices);

    // Redirect user to /SALU-CMS-FYP/admission-form
    navigate("/SALU-CMS-FYP/admissions/form");
  };

  return (
    <div
      className="program-selection-form formConitainer p-4"
      style={{ minHeight: "200px" }}
    >
      <h4>Program of Study</h4>

      <form onSubmit={handleSubmit}>
        {loading && <SkeletonLoader />}
        {!loading && (
          <div className="formContainer">
            <div className="inputContainer">
              <label htmlFor="firstChoice">
                <span className="required">*</span> First Choice:
              </label>
              <select
                id="firstChoice"
                value={choices.firstChoice}
                onChange={(e) =>
                  handleChoiceChange("firstChoice", e.target.value)
                }
                required
              >
                <option value="" disabled>
                  [Select an Option]
                </option>
                {getFilteredOptions([
                  choices.secondChoice,
                  choices.thirdChoice,
                ]).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="inputContainer">
              <label htmlFor="secondChoice">Second Choice:</label>
              <select
                id="secondChoice"
                value={choices.secondChoice}
                onChange={(e) =>
                  handleChoiceChange("secondChoice", e.target.value)
                }
              >
                <option value="">Select a Program</option>
                {getFilteredOptions([
                  choices.firstChoice,
                  choices.thirdChoice,
                ]).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="inputContainer">
              <label htmlFor="thirdChoice">Third Choice:</label>
              <select
                id="thirdChoice"
                value={choices.thirdChoice}
                onChange={(e) =>
                  handleChoiceChange("thirdChoice", e.target.value)
                }
              >
                <option value="">Select a Program</option>
                {getFilteredOptions([
                  choices.firstChoice,
                  choices.secondChoice,
                ]).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
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

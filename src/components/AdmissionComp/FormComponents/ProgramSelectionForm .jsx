import { useState } from "react";
import "../../../styles/./ProgramSelectionForm.css";

const ProgramSelectionForm = () => {
  const programOptions = [
    { value: "Computer Science", label: "Computer Science" },
    { value: "Business Administration", label: "Business Administration" },
    {
      value: "English Languages & Literature",
      label: "English Languages & Literature",
    },
  ];

  const [choices, setChoices] = useState({
    firstChoice: "",
    secondChoice: "",
    thirdChoice: "",
  });

  const handleChoiceChange = (choice, selectedValue) => {
    setChoices((prevChoices) => ({
      ...prevChoices,
      [choice]: selectedValue,
    }));
  };

  // Filter options for each dropdown based on other selections
  const getFilteredOptions = (excludedChoices) => {
    return programOptions.filter(
      (option) => !excludedChoices.includes(option.value)
    );
  };

  return (
    <div className="program-selection-form formConitainer p-4">
      <h4>Program of Study</h4>
      <form>
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
        <div className="buttonContainer d-flex justify-content-end mt-4 float-end">
          <button className="button buttonFilled">Save & Proceed</button>
        </div>
      </form>
    </div>
  );
};

export default ProgramSelectionForm;

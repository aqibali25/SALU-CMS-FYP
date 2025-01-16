import React, { useState, useEffect } from "react";
import SkeletonLoader from "../SkeletonLoader";
import CnicInput from "../CNICInput.jsx";
import ProvinceCitySelector from "../ProvinceCitySelector";
import InputContainer from "../InputContainer.jsx";
import { useFormStatus } from "../../../contexts/AdmissionFormContext.jsx"; // Import the context hook
import { useNavigate } from "react-router-dom";

const GuardianInfo = () => {
  const [sameAsFather, setSameAsFather] = useState(false);
  const [formData, setFormData] = useState({});
  const { updateFormStatus } = useFormStatus();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800); // Simulate loading
    return () => clearTimeout(timer);
  }, []);

  const handleCheckboxChange = (e) => {
    setSameAsFather(e.target.checked);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleProvinceChange = (province) => {
    setFormData((prevData) => ({
      ...prevData,
      province,
    }));
  };

  const handleCityChange = (city) => {
    setFormData((prevData) => ({
      ...prevData,
      city,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const submittedData = sameAsFather
      ? { message: "Guardian is same as Father" }
      : formData;

    console.log("Submitted Guardian Info:", submittedData);

    updateFormStatus("fatherGuardianInformation", "Completed");
    navigate("/SALU-CMS-FYP/admission-form");
  };

  // Determine input count for SkeletonLoader
  const inputCount = sameAsFather ? 0 : 6;

  return (
    <div className="program-selection-form formConitainer p-4">
      <h4>Guardian Information</h4>
      {loading ? (
        <SkeletonLoader length={inputCount} />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="formContainer">
            <div className="checkInput">
              <input
                type="checkbox"
                id="sameAsFather"
                checked={sameAsFather}
                style={{ cursor: "pointer" }}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="sameAsFather" style={{ cursor: "pointer" }}>
                Same as father
              </label>
            </div>

            {/* Conditionally hide the inputs if the checkbox is checked */}
            {!sameAsFather && (
              <>
                <InputContainer
                  htmlFor="guardianName"
                  title="Guardian Name"
                  required={true}
                  inputType="text"
                  autoComplete="off"
                  onChange={handleInputChange}
                />
                <div className="inputContainer">
                  <label htmlFor="guardianCnic">
                    <span className="required">*</span>Guardian's CNIC:
                  </label>
                  <CnicInput
                    label="Guardian CNIC"
                    id="guardianCnic"
                    required
                    onChange={handleInputChange}
                  />
                </div>
                <InputContainer
                  htmlFor="guardianMobileNumber"
                  title="Guardian's Mobile No"
                  required={true}
                  inputType="text"
                  autoComplete="off"
                  onChange={handleInputChange}
                />
                <ProvinceCitySelector
                  onProvinceChange={handleProvinceChange}
                  onCityChange={handleCityChange}
                />
                <InputContainer
                  htmlFor="address"
                  title="Address"
                  required={true}
                  inputType="text"
                  autoComplete="off"
                  onChange={handleInputChange}
                />
                <InputContainer
                  htmlFor="occupation"
                  title="Occupation"
                  required={false}
                  inputType="text"
                  autoComplete="off"
                  onChange={handleInputChange}
                />
              </>
            )}
          </div>

          <div className="buttonContainer d-flex justify-content-end mt-4 float-end">
            <button type="submit" className="button buttonFilled">
              Save & Proceed
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default GuardianInfo;

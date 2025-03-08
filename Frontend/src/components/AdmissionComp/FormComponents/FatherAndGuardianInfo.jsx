import React, { useState, useEffect } from "react";
import SkeletonLoader from "../SkeletonLoader.jsx";
import CnicInput from "../CNICInput.jsx";
import InputContainer from "../InputContainer.jsx";
import { useNavigate } from "react-router-dom";
import { useFormStatus } from "../../../contexts/AdmissionFormContext.jsx";

const FatherAndGuardianInfo = () => {
  const [fatherData, setFatherData] = useState({
    name: "",
    cnic: "",
    mobileNumber: "",
    occupation: "",
  });

  const [guardianData, setGuardianData] = useState({
    name: "",
    cnic: "",
    mobileNumber: "",
    occupation: "",
  });

  const [loading, setLoading] = useState(true);
  const [sameAsFather, setSameAsFather] = useState(false);
  const navigate = useNavigate();
  const { updateFormStatus } = useFormStatus();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleFatherChange = (e) => {
    const { id, value } = e.target;
    setFatherData((prev) => ({ ...prev, [id]: value }));

    if (sameAsFather) {
      setGuardianData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleGuardianChange = (e) => {
    if (!sameAsFather) {
      const { id, value } = e.target;
      setGuardianData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setSameAsFather(checked);

    if (checked) {
      setGuardianData({ ...fatherData });
    } else {
      setGuardianData({ name: "", cnic: "", mobileNumber: "", occupation: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Father Data", fatherData);
    console.log("Guardian Data", guardianData);

    // Ensure form status is updated before navigation
    updateFormStatus("fatherGuardianInformation", "Completed");

    // Small delay to ensure state updates before navigation
    setTimeout(() => {
      navigate("/SALU-CMS-FYP/admissions/form");
    }, 100);
  };

  return (
    <div className="margin-left-70 formConitainer p-4">
      <h4>Father & Guardian Information</h4>
      <form onSubmit={handleSubmit}>
        {loading ? (
          <SkeletonLoader length={6} />
        ) : (
          <div className="formContainer">
            {/* Father Information */}
            <h5>Father's Information</h5>
            <InputContainer
              htmlFor="name"
              title="Father's Name"
              required={true}
              inputType="text"
              autoComplete="off"
              value={fatherData.name}
              onChange={handleFatherChange}
            />
            <div className="inputContainer">
              <label htmlFor="cnic">
                <span className="required">*</span>Father's CNIC:
              </label>
              <CnicInput
                id="cnic"
                required
                value={fatherData.cnic}
                onChange={handleFatherChange}
              />
            </div>
            <InputContainer
              htmlFor="mobileNumber"
              title="Father's Mobile No"
              required={true}
              inputType="text"
              autoComplete="off"
              value={fatherData.mobileNumber}
              onChange={handleFatherChange}
            />
            <InputContainer
              htmlFor="occupation"
              title="Father's Occupation"
              required={false}
              inputType="text"
              autoComplete="off"
              value={fatherData.occupation}
              onChange={handleFatherChange}
            />

            <hr />

            {/* Guardian Information */}
            <h5>Guardian's Information</h5>
            <div className="checkInputContainer">
              <input
                type="checkbox"
                id="sameAsFather"
                checked={sameAsFather}
                onChange={handleCheckboxChange}
                style={{ width: "15px", height: "15px" }}
              />
              <label htmlFor="sameAsFather" className="ms-2">
                Same as Father
              </label>
            </div>
            <InputContainer
              htmlFor="name"
              title="Guardian's Name"
              required={true}
              inputType="text"
              autoComplete="off"
              value={guardianData.name}
              onChange={handleGuardianChange}
              readOnly={sameAsFather}
            />
            <div className="inputContainer">
              <label htmlFor="cnic">
                <span className="required">*</span>Guardian's CNIC:
              </label>
              <CnicInput
                id="cnic"
                required
                value={guardianData.cnic}
                onChange={handleGuardianChange}
                readOnly={sameAsFather}
              />
            </div>
            <InputContainer
              htmlFor="mobileNumber"
              title="Guardian's Mobile No"
              required={true}
              inputType="text"
              autoComplete="off"
              value={guardianData.mobileNumber}
              onChange={handleGuardianChange}
              readOnly={sameAsFather}
            />
            <InputContainer
              htmlFor="occupation"
              title="Guardian's Occupation"
              required={false}
              inputType="text"
              autoComplete="off"
              value={guardianData.occupation}
              onChange={handleGuardianChange}
              readOnly={sameAsFather}
            />
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

export default FatherAndGuardianInfo;

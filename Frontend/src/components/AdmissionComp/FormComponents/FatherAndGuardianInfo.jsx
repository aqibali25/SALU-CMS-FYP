import React, { useState, useEffect } from "react";
import SkeletonLoader from "../SkeletonLoader.jsx";
import CnicInput from "../CNICInput.jsx";
import InputContainer from "../InputContainer.jsx";
import { useNavigate } from "react-router-dom";

const FatherAndGuardianInfo = ({ updateFormStatus, redirectPath }) => {
  const [formData, setFormData] = useState({
    fatherName: "",
    fatherCnic: "",
    fatherMobileNumber: "",
    fatherOccupation: "",
    guardianName: "",
    guardianCnic: "",
    guardianMobileNumber: "",
    guardianOccupation: "",
  });

  const [loading, setLoading] = useState(true);
  const [sameAsFather, setSameAsFather] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setSameAsFather(checked);

    if (checked) {
      setFormData((prev) => ({
        ...prev,
        guardianName: prev.fatherName,
        guardianCnic: prev.fatherCnic,
        guardianMobileNumber: prev.fatherMobileNumber,
        guardianOccupation: prev.fatherOccupation,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        guardianName: "",
        guardianCnic: "",
        guardianMobileNumber: "",
        guardianOccupation: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFormStatus("fatherGuardianInformation", "Completed");

    console.log("Father & Guardian Info", formData);
    navigate(redirectPath);
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
              htmlFor="fatherName"
              title="Father's Name"
              required={true}
              inputType="text"
              autoComplete="off"
              value={formData.fatherName}
              onChange={handleChange}
            />
            <div className="inputContainer">
              <label htmlFor="fatherCnic">
                <span className="required">*</span>Father's CNIC:
              </label>
              <CnicInput
                id="fatherCnic"
                required
                value={formData.fatherCnic}
                onChange={handleChange}
              />
            </div>
            <InputContainer
              htmlFor="fatherMobileNumber"
              title="Father's Mobile No"
              required={true}
              inputType="text"
              autoComplete="off"
              value={formData.fatherMobileNumber}
              onChange={handleChange}
            />
            <InputContainer
              htmlFor="fatherOccupation"
              title="Father's Occupation"
              required={false}
              inputType="text"
              autoComplete="off"
              value={formData.fatherOccupation}
              onChange={handleChange}
            />

            <hr />

            {/* Guardian Information */}
            <h5>Guardian's Information</h5>
            <div className="inputContainer">
              <input
                type="checkbox"
                id="sameAsFather"
                checked={sameAsFather}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="sameAsFather" className="ms-2">
                Same as Father
              </label>
            </div>
            <InputContainer
              htmlFor="guardianName"
              title="Guardian's Name"
              required={true}
              inputType="text"
              autoComplete="off"
              value={formData.guardianName}
              onChange={handleChange}
              readOnly={sameAsFather}
            />
            <div className="inputContainer">
              <label htmlFor="guardianCnic">
                <span className="required">*</span>Guardian's CNIC:
              </label>
              <CnicInput
                id="guardianCnic"
                required
                value={formData.guardianCnic}
                onChange={handleChange}
                readOnly={sameAsFather}
              />
            </div>
            <InputContainer
              htmlFor="guardianMobileNumber"
              title="Guardian's Mobile No"
              required={true}
              inputType="text"
              autoComplete="off"
              value={formData.guardianMobileNumber}
              onChange={handleChange}
              readOnly={sameAsFather}
            />
            <InputContainer
              htmlFor="guardianOccupation"
              title="Guardian's Occupation"
              required={false}
              inputType="text"
              autoComplete="off"
              value={formData.guardianOccupation}
              onChange={handleChange}
              readOnly={sameAsFather}
            />
          </div>
        )}

        <hr />
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

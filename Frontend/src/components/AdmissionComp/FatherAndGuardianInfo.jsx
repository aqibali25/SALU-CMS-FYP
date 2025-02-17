import React, { useState, useEffect } from "react";
import SkeletonLoader from "./SkeletonLoader";
import CnicInput from "./CNICInput.jsx";
import ProvinceCitySelector from "./ProvinceCitySelector";
import InputContainer from "./InputContainer";
import { useNavigate } from "react-router-dom";

const FatherAndGuardianInfo = ({ title, updateFormStatus, redirectPath }) => {
  const [formData, setFormData] = useState({
    name: "",
    cnic: "",
    mobileNumber: "",
    province: "",
    city: "",
    address: "",
    occupation: "",
  });

  const [loading, setLoading] = useState(true);
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

  const handleProvinceChange = (province) => {
    setFormData((prev) => ({
      ...prev,
      province,
    }));
  };

  const handleCityChange = (city) => {
    setFormData((prev) => ({
      ...prev,
      city,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    title === "Guardian" &&
      updateFormStatus("fatherGuardianInformation", "Completed");

    console.log(`${title} Info`, formData);
    navigate(redirectPath);
  };

  return (
    <div className="margin-left-70 formConitainer p-4">
      <h4>{title} Information</h4>
      <form onSubmit={handleSubmit}>
        {loading ? (
          <SkeletonLoader length={6} />
        ) : (
          <div className="formContainer">
            <InputContainer
              htmlFor="name"
              title={`${title}'s Name`}
              required={true}
              inputType="text"
              autoComplete="off"
              value={formData.name}
              onChange={handleChange}
            />
            <div className="inputContainer">
              <label htmlFor="cnic">
                <span className="required">*</span>
                {title}'s CNIC:
              </label>
              <CnicInput
                id="cnic"
                required
                value={formData.cnic}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <InputContainer
              htmlFor="mobileNumber"
              title={`${title}'s Mobile No`}
              required={true}
              inputType="text"
              autoComplete="off"
              value={formData.mobileNumber}
              onChange={handleChange}
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
              value={formData.address}
              onChange={handleChange}
            />
            <InputContainer
              htmlFor="occupation"
              title={`${title}'s Occupation`}
              required={false}
              inputType="text"
              autoComplete="off"
              value={formData.occupation}
              onChange={handleChange}
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

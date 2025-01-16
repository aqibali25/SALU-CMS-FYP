import React, { useState } from "react";
import SkeletonLoader from "../SkeletonLoader";
import CnicInput from "../CNICInput.jsx";
import ProvinceCitySelector from "../ProvinceCitySelector";
import InputContainer from "../InputContainer";
import { useNavigate } from "react-router-dom";

const FatherInfo = () => {
  const [formData, setFormData] = useState({
    fatherName: "",
    fatherCnic: "",
    fatherMobileNumber: "",
    province: "",
    city: "",
    address: "",
    fatherOccupation: null,
  });

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
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
    console.log("fatherInfo", formData);
    navigate("/SALU-CMS-FYP/admission-form/guardian-info");
  };

  return (
    <div className="program-selection-form formConitainer p-4">
      <h4>Father Information</h4>

      <form onSubmit={handleSubmit}>
        {loading ? (
          <SkeletonLoader length={6} />
        ) : (
          <div className="formContainer">
            <InputContainer
              htmlFor="fatherName"
              title="Father Name"
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
                onChange={(e) => handleChange(e)}
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
              htmlFor="fatherOccupation"
              title="Occupation"
              required={false}
              inputType="text"
              autoComplete="off"
              value={formData.fatherOccupation}
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

export default FatherInfo;

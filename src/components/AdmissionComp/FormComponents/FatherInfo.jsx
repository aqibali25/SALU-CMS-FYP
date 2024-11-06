import React, { useState } from "react";
import CnicInput from "./CNICInput.jsx";
import ProvinceCitySelector from "./ProvinceCitySelector";

const FatherInfo = () => {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  return (
    <div className="program-selection-form formConitainer p-4">
      <h4>Father/Guardian Information</h4>
      <form>
        <div className="formContainer">
          <div className="inputContainer">
            <label htmlFor="fatherName">
              <span className="required">*</span>Father Name:
            </label>
            <input type="text" id="fatherName" required autoComplete="off" />
          </div>
          <div className="inputContainer">
            <label htmlFor="fatherCnic">
              <span className="required">*</span>Father's CNIC:
            </label>
            <CnicInput label="Father CNIC" id="fatherCnic" required />
          </div>
          <div className="inputContainer">
            <label htmlFor="fatherMobileNumber">
              <span className="required">*</span>Father's Mobile No:
            </label>
            <input
              type="text"
              id="fatherMobileNumber"
              required
              autoComplete="off"
            />
          </div>
          <ProvinceCitySelector
            onProvinceChange={setSelectedProvince}
            onCityChange={setSelectedCity}
          />
          <div className="inputContainer">
            <label htmlFor="address">
              <span className="required">*</span>Address:
            </label>
            <input type="text" id="address" required autoComplete="off" />
          </div>
          <div className="inputContainer">
            <label htmlFor="fatherOccupation">Occupation:</label>
            <input type="text" id="fatherOccupation" autoComplete="off" />
          </div>
        </div>
        <div className="buttonContainer d-flex justify-content-end mt-4 float-end">
          <button className="button buttonFilled">Save & Proceed</button>
        </div>
      </form>
    </div>
  );
};

export default FatherInfo;

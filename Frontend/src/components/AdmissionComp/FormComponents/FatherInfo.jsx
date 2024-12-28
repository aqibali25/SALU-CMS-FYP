import React, { useState } from "react";
import CnicInput from "./CNICInput.jsx";
import ProvinceCitySelector from "./ProvinceCitySelector";
import InputContainer from "../InputContainer";

const FatherInfo = () => {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  return (
    <div className="program-selection-form formConitainer p-4">
      <h4>Father/Guardian Information</h4>
      <form>
        <div className="formContainer">
          <InputContainer
            htmlFor="fatherName"
            title="Father Name"
            required={true}
            inputType="text"
            autoComplete="off"
          />
          <div className="inputContainer">
            <label htmlFor="fatherCnic">
              <span className="required">*</span>Father's CNIC:
            </label>
            <CnicInput label="Father CNIC" id="fatherCnic" required />
          </div>
          <InputContainer
            htmlFor="fatherMobileNumber"
            title="Father's Mobile No"
            required={true}
            inputType="text"
            autoComplete="off"
          />
          <ProvinceCitySelector
            onProvinceChange={setSelectedProvince}
            onCityChange={setSelectedCity}
          />
          <InputContainer
            htmlFor="address"
            title="Address"
            required={true}
            inputType="text"
            autoComplete="off"
          />
          <InputContainer
            htmlFor="fatherOccupation"
            title="Occupation"
            required={false}
            inputType="text"
            autoComplete="off"
          />
        </div>
        <div className="buttonContainer d-flex justify-content-end mt-4 float-end">
          <button className="button buttonFilled">Save & Proceed</button>
        </div>
      </form>
    </div>
  );
};

export default FatherInfo;

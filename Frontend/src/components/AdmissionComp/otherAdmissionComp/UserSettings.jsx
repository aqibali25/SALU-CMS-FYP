import React, { useState } from "react";
import InputContainer from "../InputContainer";

const UserSettings = () => {
  // State to store form input values
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Handler to update the form state
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add form validation or API call logic here
    if (formData.newPassword !== formData.confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }

    console.log("Form submitted", formData);
    alert("Password changed successfully!");
  };

  return (
    <div className="formConitainer col-md-12 p-4">
      <h4>Settings</h4>
      <form
        className="formContainer formInnerContainer pb-5 position-relative"
        onSubmit={handleSubmit}
      >
        <InputContainer
          width="51.5%"
          inputType="password"
          title="Current Password"
          htmlFor="currentPassword"
          value={formData.currentPassword}
          onChange={handleInputChange}
          required
        />
        <InputContainer
          width="51.5%"
          inputType="password"
          title="New Password"
          htmlFor="newPassword"
          value={formData.newPassword}
          onChange={handleInputChange}
          required
        />
        <InputContainer
          width="51.5%"
          inputType="password"
          title="Confirm Password"
          htmlFor="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
        />
        <div className="buttonContainer w-100 d-flex justify-content-end">
          <button type="submit" className="button buttonFilled">
            Change
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserSettings;

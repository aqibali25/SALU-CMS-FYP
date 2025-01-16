import { useState, useEffect } from "react";
import DateOfBirth from "../DateOfBirth";
import CnicInput from "../CNICInput.jsx";
import InputContainer from "../InputContainer";
import { useFormStatus } from "../../../contexts/AdmissionFormContext.jsx";
import { useNavigate } from "react-router-dom";
import SkeletonLoader from "../SkeletonLoader";

const PersonalInfo = () => {
  const [loading, setLoading] = useState(true); // State for loading
  const { updateFormStatus } = useFormStatus(); // Call useFormStatus to access its properties
  const navigate = useNavigate(); // Define navigate for redirection

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after a delay
    }, 800);

    return () => clearTimeout(timer); // Clear timeout to avoid memory leaks
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form from reloading the page
    // Update the form status
    updateFormStatus("personalInformation", "Completed");
    // Redirect user to /SALU-CMS-FYP/admission-form
    navigate("/SALU-CMS-FYP/admission-form");
  };

  return (
    <div className="formConitainer p-4">
      <h4>Personal Information</h4>
      <form onSubmit={handleSubmit}>
        {loading && <SkeletonLoader length={9} />} {/* Pass length as 9 */}
        {!loading && (
          <div className="formContainer">
            <InputContainer
              htmlFor="firstName"
              title="First Name"
              required={true}
              inputType="text"
            />
            <InputContainer
              htmlFor="lastName"
              title="Last Name"
              required={true}
              inputType="text"
            />
            <div className="inputContainer">
              <label htmlFor="gender">
                <span className="required">*</span>Gender:
              </label>
              <select name="Gender" id="gender" className="col-6">
                <option value="" disabled selected>
                  [Select an Option]
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="inputContainer">
              <label htmlFor="dob-month">
                <span className="required">* </span>Date of Birth:
              </label>
              <DateOfBirth />
            </div>
            <div className="inputContainer">
              <label htmlFor="cnic">
                <span className="required">*</span>CNIC:
              </label>
              <CnicInput
                label="CNIC"
                id="cnic"
                value="45102-2473066-7"
                readonly={"true"}
                required
              />
            </div>
            <InputContainer
              htmlFor="religion"
              title="Religion"
              required={true}
              inputType="text"
            />
            <div className="inputContainer">
              <label htmlFor="disability">
                <span className="required">*</span>Disability:
              </label>
              <select name="Disability" id="disability" className="col-6">
                <option value="" disabled selected>
                  [Select an Option]
                </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <InputContainer
              htmlFor="nativeLanguage"
              title="Native Language"
              required={true}
              inputType="text"
            />
            <InputContainer
              htmlFor="bloodGroup"
              title="Blood Group"
              required={false}
              inputType="text"
            />
          </div>
        )}
        <div className="buttonContainer d-flex justify-content-end mt-4 float-end">
          <button className="button buttonFilled">Save & Proceed</button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfo;

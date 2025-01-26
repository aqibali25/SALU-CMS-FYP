import { useState, useEffect } from "react";
import DateOfBirth from "../DateOfBirth";
import CnicInput from "../CNICInput.jsx";
import InputContainer from "../InputContainer";
import { useFormStatus } from "../../../contexts/AdmissionFormContext.jsx";
import { useNavigate } from "react-router-dom";
import SkeletonLoader from "../SkeletonLoader";

const PersonalInfo = () => {
  const [loading, setLoading] = useState(true); // State for loading
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    cnic: "45102-2473066-7",
    religion: "",
    disability: "",
    nativeLanguage: "",
    bloodGroup: null,
  }); // Initialize state with empty values

  const { updateFormStatus } = useFormStatus(); // Call useFormStatus to access its properties
  const navigate = useNavigate(); // Define navigate for redirection

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after a delay
    }, 800);

    return () => clearTimeout(timer); // Clear timeout to avoid memory leaks
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target; // Get id and value of the input
    setFormData((prevData) => ({
      ...prevData,
      [id]: value, // Update the corresponding field in the form data
    }));
  };

  const handleSelectChange = (e) => {
    const { id, value } = e.target; // Get id and value of the select element
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form from reloading the page

    console.log("Submitted Personal Info:", formData); // Log the form data for testing

    // Update the form status
    updateFormStatus("personalInformation", "Completed");
    navigate("/SALU-CMS-FYP/admissions/form");
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
              value={formData.firstName}
              onChange={handleInputChange}
            />
            <InputContainer
              htmlFor="lastName"
              title="Last Name"
              required={true}
              inputType="text"
              value={formData.lastName}
              onChange={handleInputChange}
            />
            <div className="inputContainer">
              <label htmlFor="gender">
                <span className="required">*</span>Gender:
              </label>
              <select
                id="gender"
                className="col-6"
                value={formData.gender}
                onChange={handleSelectChange}
              >
                <option value="" disabled>
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
              <DateOfBirth
                value={formData.dob}
                onChange={(dob) =>
                  setFormData((prevData) => ({ ...prevData, dob }))
                }
              />
            </div>
            <div className="inputContainer">
              <label htmlFor="cnic">
                <span className="required">*</span>CNIC:
              </label>
              <CnicInput
                id="cnic"
                value={formData.cnic}
                readonly={"true"}
                required
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    cnic: e.target.value,
                  }))
                }
              />
            </div>
            <InputContainer
              htmlFor="religion"
              title="Religion"
              required={true}
              inputType="text"
              value={formData.religion}
              onChange={handleInputChange}
            />
            <div className="inputContainer">
              <label htmlFor="disability">
                <span className="required">*</span>Disability:
              </label>
              <select
                id="disability"
                className="col-6"
                value={formData.disability}
                onChange={handleSelectChange}
              >
                <option value="" disabled>
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
              value={formData.nativeLanguage}
              onChange={handleInputChange}
            />
            <InputContainer
              htmlFor="bloodGroup"
              title="Blood Group"
              required={false}
              inputType="text"
              value={formData.bloodGroup}
              onChange={handleInputChange}
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

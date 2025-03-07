import { useState, useEffect } from "react";
import CnicInput from "../CNICInput.jsx";
import InputContainer from "../InputContainer";
import { useFormStatus } from "../../../contexts/AdmissionFormContext.jsx";
import { useNavigate } from "react-router-dom";
import SkeletonLoader from "../SkeletonLoader";
import ProvinceCitySelector from "../ProvinceCitySelector.jsx";

const PersonalInfo = () => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    cnic: "45102-2473066-7",
    religion: "",
    disability: "",
    disabilityDescription: "",
    nativeLanguage: "",
    bloodGroup: "",
    province: "",
    city: "",
    postalAddress: "",
    permanentAddress: "",
  });

  const religions = ["Islam", "Hinduism", "Christianity", "Sikhism"];
  const nativeLanguages = ["Sindhi", "Urdu", "English"];
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const { updateFormStatus } = useFormStatus();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSelectChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
      disabilityDescription:
        id === "disability" && value !== "Yes"
          ? ""
          : prevData.disabilityDescription,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Final Submitted Personal Info:", formData);
    updateFormStatus("personalInformation", "Completed");
    navigate("/SALU-CMS-FYP/admissions/form");
  };

  return (
    <div className="margin-left-70 formConitainer p-4">
      <h4>Personal Information</h4>
      <form onSubmit={handleSubmit}>
        {loading && <SkeletonLoader length={9} />}
        {!loading && (
          <div className="formContainer">
            <InputContainer
              htmlFor="firstName"
              title="First Name"
              required
              inputType="text"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            <InputContainer
              htmlFor="lastName"
              title="Last Name"
              required
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

            <InputContainer
              htmlFor="dob"
              title="Date of Birth"
              required
              inputType="date"
              value={formData.dob}
              onChange={handleInputChange}
            />

            <div className="inputContainer">
              <label htmlFor="cnic">
                <span className="required">*</span>CNIC:
              </label>
              <CnicInput
                id="cnic"
                value={formData.cnic}
                readOnly
                required
                onChange={handleInputChange}
              />
            </div>

            <div className="inputContainer">
              <label htmlFor="religion">
                <span className="required">*</span>Religion:
              </label>
              <select
                id="religion"
                className="col-6"
                value={formData.religion}
                onChange={handleSelectChange}
              >
                <option value="" disabled>
                  [Select an Option]
                </option>
                {religions.map((religion, index) => (
                  <option key={index} value={religion}>
                    {religion}
                  </option>
                ))}
              </select>
            </div>

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

            {formData.disability === "Yes" && (
              <InputContainer
                htmlFor="disabilityDescription"
                title="Disability Details"
                required
                inputType="text"
                value={formData.disabilityDescription}
                onChange={handleInputChange}
              />
            )}

            <div className="inputContainer">
              <label htmlFor="nativeLanguage">
                <span className="required">*</span>Native Language:
              </label>
              <select
                id="nativeLanguage"
                className="col-6"
                value={formData.nativeLanguage}
                onChange={handleSelectChange}
              >
                <option value="" disabled>
                  [Select an Option]
                </option>
                {nativeLanguages.map((lang, index) => (
                  <option key={index} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            <div className="inputContainer">
              <label htmlFor="bloodGroup">Blood Group:</label>
              <select
                id="bloodGroup"
                className="col-6"
                value={formData.bloodGroup}
                onChange={handleSelectChange}
              >
                <option value="" disabled>
                  [Select an Option]
                </option>
                {bloodGroups.map((group, index) => (
                  <option key={index} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>

            <ProvinceCitySelector
              onProvinceChange={(province) =>
                setFormData((prev) => ({ ...prev, province }))
              }
              onCityChange={(city) =>
                setFormData((prev) => ({ ...prev, city }))
              }
            />

            <InputContainer
              htmlFor="postalAddress"
              title="Postal Address"
              required
              inputType="text"
              value={formData.postalAddress}
              onChange={handleInputChange}
            />
            <InputContainer
              htmlFor="permanentAddress"
              title="Permanent Address"
              required
              inputType="text"
              value={formData.permanentAddress}
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

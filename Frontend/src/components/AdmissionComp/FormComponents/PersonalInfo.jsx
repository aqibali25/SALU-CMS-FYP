import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormStatus } from "../../../contexts/AdmissionFormContext";
import usePersonalInfoStore from "../../../store/personalInfoStore";
import CnicInput from "../CNICInput.jsx";
import InputContainer from "../InputContainer";
import SkeletonLoader from "../SkeletonLoader";
import ProvinceCitySelector from "../ProvinceCitySelector.jsx";
import Cookies from "js-cookie";

const PersonalInfo = () => {
  const navigate = useNavigate();
  const { updateFormStatus } = useFormStatus();

  const {
    formData,
    loading,
    hasFetched, // Add this to check if data is already fetched
    staticData: { religions, nativeLanguages, bloodGroups },
    updateField,
    submitForm,
    fetchPersonalInfo,
    error,
  } = usePersonalInfoStore();

  const handleInputChange = (e) => updateField(e.target.id, e.target.value);
  const handleSelectChange = (e) => updateField(e.target.id, e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await submitForm();
    if (success) {
      updateFormStatus("personalInformation", "Completed");
      // Navigate with state to indicate successful submission
      navigate("/admissions/form", {
        state: { fromPersonalInfo: true },
      });
    }
  };

  useEffect(() => {
    // Only fetch if not already fetched
    if (!hasFetched) {
      fetchPersonalInfo();
    }
  }, [fetchPersonalInfo, hasFetched]); // Add hasFetched to dependency array

  return (
    <div className="margin-left-70 formConitainer p-4">
      <h4>Personal Information</h4>

      {/* Error Display */}
      {error && (
        <div className="alert alert-danger" role="alert">
          <strong>Error:</strong> {error}
        </div>
      )}

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

            {/* Gender Select */}
            <div className="inputContainer">
              <label htmlFor="gender">
                <span className="required">*</span>Gender:
              </label>
              <select
                id="gender"
                className="col-6"
                value={formData.gender}
                onChange={handleSelectChange}
                required
              >
                <option value="" disabled>
                  [Select an Option]
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Date of Birth */}
            <InputContainer
              htmlFor="dob"
              title="Date of Birth"
              required
              inputType="date"
              value={formData.dob}
              onChange={handleInputChange}
            />

            {/* CNIC Input */}
            <div className="inputContainer">
              <label htmlFor="cnic">
                <span className="required">*</span>CNIC:
              </label>
              <CnicInput
                id="cnic"
                value={Cookies.get("cnic")}
                readonly={true}
                required
                onChange={handleInputChange}
              />
            </div>

            {/* Religion Select */}
            <div className="inputContainer">
              <label htmlFor="religion">
                <span className="required">*</span>Religion:
              </label>
              <select
                id="religion"
                className="col-6"
                value={formData.religion}
                onChange={handleSelectChange}
                required
              >
                <option value="" disabled>
                  [Select an Option]
                </option>
                {religions.map((religion) => (
                  <option key={religion} value={religion}>
                    {religion}
                  </option>
                ))}
              </select>
            </div>

            {/* Native Language Select */}
            <div className="inputContainer">
              <label htmlFor="nativeLanguage">
                <span className="required">*</span>Native Language:
              </label>
              <select
                id="nativeLanguage"
                className="col-6"
                value={formData.nativeLanguage}
                onChange={handleSelectChange}
                required
              >
                <option value="" disabled>
                  [Select an Option]
                </option>
                {nativeLanguages.map((language) => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </select>
            </div>

            {/* Blood Group Select */}
            <div className="inputContainer">
              <label htmlFor="bloodGroup">Blood Group:</label>
              <select
                id="bloodGroup"
                className="col-6"
                value={formData.bloodGroup}
                onChange={handleSelectChange}
              >
                <option value="">[Select if known]</option>
                {bloodGroups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>

            {/* Province/City Selector */}
            <ProvinceCitySelector
              initialProvince={formData.province}
              initialCity={formData.city}
              onProvinceChange={(province) => updateField("province", province)}
              onCityChange={(city) => updateField("city", city)}
            />

            {/* Address Fields */}
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
          <button
            type="submit"
            className="button buttonFilled"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save & Proceed"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfo;

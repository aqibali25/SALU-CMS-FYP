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
  const user = JSON.parse(localStorage.getItem("userData"));

  const {
    formData,
    loading,
    hasFetched,
    staticData: { religions, nativeLanguages, bloodGroups },
    updateField,
    submitForm,
    fetchPersonalInfo,
    error,
  } = usePersonalInfoStore();

  formData.email = user?.EMAIL;

  const handleInputChange = (e) => updateField(e.target.id, e.target.value);
  const handleSelectChange = (e) => updateField(e.target.id, e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await submitForm();
    if (success) {
      updateFormStatus("personalInformation", "Completed");
      navigate("/admissions/form", {
        state: { fromPersonalInfo: true },
      });
    }
  };

  useEffect(() => {
    if (!hasFetched) {
      fetchPersonalInfo();
    }
  }, [fetchPersonalInfo, hasFetched]);

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
        {loading && <SkeletonLoader length={13} />}{" "}
        {/* Increased length for new fields */}
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

            {/* New: Surname */}
            <InputContainer
              htmlFor="surname"
              title="Surname"
              required
              inputType="text"
              value={formData.surname}
              onChange={handleInputChange}
            />

            {/* New: Email */}
            <InputContainer
              htmlFor="email"
              title="Email"
              required
              inputType="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled
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

            {/* Phone Number Input */}
            <InputContainer
              htmlFor="phoneNumber"
              title="Phone Number"
              required
              inputType="number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              pattern="[0-9]{11}"
              maxLength="11"
              placeholder="03XXXXXXXXX"
            />

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

            {/* Disability Select */}
            <div className="inputContainer">
              <label htmlFor="disability">
                <span className="required">*</span>Disability:
              </label>
              <select
                id="disability"
                className="col-6"
                value={formData.disability}
                onChange={handleSelectChange}
                required
              >
                <option value="" disabled>
                  [Select an Option]
                </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* Disability Description - Conditionally Rendered */}
            {formData.disability === "Yes" && (
              <InputContainer
                htmlFor="disabilityDescription"
                title="Disability Description"
                required={formData.disability === "Yes" ? true : false}
                inputType="text"
                value={formData.disabilityDescription}
                onChange={handleInputChange}
              />
            )}

            {/* Province/City Selector */}
            <ProvinceCitySelector
              initialProvince={formData.province}
              initialCity={formData.city}
              onProvinceChange={(province) => updateField("province", province)}
              onCityChange={(city) => updateField("city", city)}
            />

            {/* New: Domicile District */}
            <InputContainer
              htmlFor="domicileDistrict"
              title="Domicile District"
              required
              inputType="text"
              value={formData.domicileDistrict}
              onChange={handleInputChange}
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

            {/* New: Employment Status */}
            <div className="inputContainer">
              <label htmlFor="areYouEmployed">
                <span className="required">*</span>Are You Employed?
              </label>
              <select
                id="areYouEmployed"
                className="col-6"
                value={formData.areYouEmployed}
                onChange={handleSelectChange}
                required
              >
                <option value="" disabled>
                  [Select an Option]
                </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* New: Self Finance */}
            <div className="inputContainer">
              <label htmlFor="selfFinance">
                <span className="required">*</span>Self Finance?
              </label>
              <select
                id="selfFinance"
                className="col-6"
                value={formData.selfFinance}
                onChange={handleSelectChange}
                required
              >
                <option value="" disabled>
                  [Select an Option]
                </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* New: Hostel Required */}
            <div className="inputContainer">
              <label htmlFor="hostel">
                <span className="required">*</span>Require Hostel?
              </label>
              <select
                id="hostel"
                className="col-6"
                value={formData.hostel}
                onChange={handleSelectChange}
                required
              >
                <option value="" disabled>
                  [Select an Option]
                </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* New: Transport Required */}
            <div className="inputContainer">
              <label htmlFor="transport">
                <span className="required">*</span>Require Transport?
              </label>
              <select
                id="transport"
                className="col-6"
                value={formData.transport}
                onChange={handleSelectChange}
                required
              >
                <option value="" disabled>
                  [Select an Option]
                </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
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

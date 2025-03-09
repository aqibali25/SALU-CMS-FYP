import { useState, useEffect } from "react";
import axios from "axios";
import CnicInput from "../CNICInput.jsx";
import InputContainer from "../InputContainer";
import { useFormStatus } from "../../../contexts/AdmissionFormContext.jsx";
import { useNavigate } from "react-router-dom";
import SkeletonLoader from "../SkeletonLoader";
import ProvinceCitySelector from "../ProvinceCitySelector.jsx";
import Cookies from "js-cookie";

const PersonalInfo = () => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    cnic: Cookies.get("cnic") || "", // Get CNIC from cookies
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
  const cnic = Cookies.get("cnic"); // Ensure CNIC is set

  // Fetch user data if available
  useEffect(() => {
    const fetchPersonalInfo = async () => {
      if (!cnic) {
        console.error("CNIC not found!");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:3306/api/getPersonalInfo/${cnic}`
        );

        const userData = response.data;
        console.log(userData);
        if (userData) {
          updateFormStatus("personalInformation", "Completed");
          let formattedDOB = "";
          if (userData.dob) {
            const date = new Date(userData.dob);
            if (!isNaN(date.getTime())) {
              const year = date.getFullYear();
              const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Ensure two-digit month
              const day = date.getDate().toString().padStart(2, "0"); // Ensure two-digit day
              formattedDOB = `${year}-${month}-${day}`; // Format as YYYY-MM-DD
            }
          }

          setFormData((prevData) => ({
            ...prevData,
            firstName: userData.first_name || "",
            lastName: userData.last_name || "",
            gender: userData.gender || "",
            dob: formattedDOB, // Set formatted DOB (YYYY-MM-DD)
            religion: userData.religion || "",
            disability: userData.disability || "",
            disabilityDescription: userData.disability_description || "",
            nativeLanguage: userData.native_language || "",
            bloodGroup: userData.blood_group || "",
            province: userData.province || "",
            city: userData.city || "",
            postalAddress: userData.postal_address || "",
            permanentAddress: userData.permanent_address || "",
          }));
        }
      } catch (error) {
        console.error("Error fetching personal info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPersonalInfo();
  }, [cnic]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  // Handle select changes
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cnic) {
      console.error("CNIC is missing!");
      return;
    }

    try {
      await axios.post("http://localhost:3306/api/savePersonalInfo", formData, {
        headers: { "Content-Type": "application/json" },
      });
      updateFormStatus("personalInformation", "Completed");
      console.log("Personal Info Submitted:", formData);
      navigate("/SALU-CMS-FYP/admissions/form");
    } catch (error) {
      console.error("Error saving personal info:", error);
    }
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

            <ProvinceCitySelector
              initialProvince={formData.province}
              initialCity={formData.city}
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
          <button type="submit" className="button buttonFilled">
            Save & Proceed
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfo;

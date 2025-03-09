import React, { useState, useEffect } from "react";
import axios from "axios";
import SkeletonLoader from "../SkeletonLoader.jsx";
import CnicInput from "../CNICInput.jsx";
import InputContainer from "../InputContainer.jsx";
import { useNavigate } from "react-router-dom";
import { useFormStatus } from "../../../contexts/AdmissionFormContext.jsx";
import Cookies from "js-cookie";

const FatherAndGuardianInfo = () => {
  const [formData, setFormData] = useState({
    father: {
      name: "",
      cnic: "",
      mobileNumber: "",
      occupation: "",
    },
    guardian: {
      name: "",
      cnic: "",
      mobileNumber: "",
      occupation: "",
    },
  });

  const [loading, setLoading] = useState(true);
  const [sameAsFather, setSameAsFather] = useState(false);
  const navigate = useNavigate();
  const { updateFormStatus } = useFormStatus();
  const cnic = Cookies.get("cnic");

  useEffect(() => {
    const fetchFatherAndGuardianInfo = async () => {
      if (!cnic) return; // Prevent API call if CNIC is missing

      try {
        const response = await axios.get(
          `http://localhost:3306/api/getFatherGuardianInfo/${cnic}`
        );
        console.log("Response:", response.data);

        if (response.data) {
          updateFormStatus("fatherGuardianInformation", "Completed");

          setFormData((prev) => ({
            father: {
              name: response.data.fatherData?.name || "",
              cnic: response.data.fatherData?.cnic_number || "", // Set CNIC to cnic_number
              mobileNumber: response.data.fatherData?.mobile_number || "",
              occupation: response.data.fatherData?.occupation || "",
            },
            guardian: {
              name: response.data.guardianData?.name || "",
              cnic: response.data.guardianData?.cnic_number || "", // Set CNIC to cnic_number
              mobileNumber: response.data.guardianData?.mobile_number || "",
              occupation: response.data.guardianData?.occupation || "",
            },
          }));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFatherAndGuardianInfo();
  }, [cnic]);

  const handleChange = (section, e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [id]: value,
      },
    }));

    if (sameAsFather && section === "father") {
      setFormData((prev) => ({
        ...prev,
        guardian: { ...prev.father, [id]: value },
      }));
    }
  };

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setSameAsFather(checked);
    setFormData((prev) => ({
      ...prev,
      guardian: checked
        ? { ...prev.father }
        : { name: "", cnic: "", mobileNumber: "", occupation: "" },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestData = {
      cnic, // Root CNIC
      fatherData: {
        name: formData.father.name,
        cnic: formData.father.cnic,
        mobileNumber: formData.father.mobileNumber,
        occupation: formData.father.occupation,
      },
      guardianData: {
        name: formData.guardian.name,
        cnic: formData.guardian.cnic,
        mobileNumber: formData.guardian.mobileNumber,
        occupation: formData.guardian.occupation,
      },
    };

    console.log("Form Data:", requestData);

    axios
      .post("http://localhost:3306/api/saveFatherGuardianInfo", requestData)
      .then((response) => {
        console.log("Data saved successfully:", response.data);
        updateFormStatus("fatherGuardianInformation", "Completed");
        setTimeout(() => {
          navigate("/SALU-CMS-FYP/admissions/form");
        }, 100);
      })
      .catch((error) => console.error("Error saving data:", error));
  };

  return (
    <div className="margin-left-70 formConitainer p-4">
      <h4>Father & Guardian Information</h4>
      <form onSubmit={handleSubmit}>
        {loading ? (
          <SkeletonLoader length={6} />
        ) : (
          <div className="formContainer">
            {/* Father Information */}
            <h5>Father's Information</h5>
            <InputContainer
              htmlFor="name"
              title="Father's Name"
              required
              value={formData.father.name}
              onChange={(e) => handleChange("father", e)}
            />
            <div className="inputContainer">
              <label htmlFor="cnic">
                {" "}
                <span className="required">*</span>Father's CNIC:{" "}
              </label>
              <CnicInput
                id="cnic"
                required
                value={formData.father.cnic}
                onChange={(e) => handleChange("father", e)}
              />
            </div>
            <InputContainer
              htmlFor="mobileNumber"
              title="Father's Mobile No"
              required
              value={formData.father.mobileNumber}
              onChange={(e) => handleChange("father", e)}
            />
            <InputContainer
              htmlFor="occupation"
              title="Father's Occupation"
              value={formData.father.occupation}
              onChange={(e) => handleChange("father", e)}
            />
            <hr />

            {/* Guardian Information */}
            <h5>Guardian's Information</h5>
            <div className="checkInputContainer">
              <input
                type="checkbox"
                id="sameAsFather"
                checked={sameAsFather}
                onChange={handleCheckboxChange}
                style={{ width: "15px", height: "15px" }}
              />
              <label htmlFor="sameAsFather" className="ms-2">
                {" "}
                Same as Father{" "}
              </label>
            </div>
            <InputContainer
              htmlFor="name"
              title="Guardian's Name"
              required
              value={formData.guardian.name}
              onChange={(e) => handleChange("guardian", e)}
              readOnly={sameAsFather}
            />
            <div className="inputContainer">
              <label htmlFor="cnic">
                {" "}
                <span className="required">*</span>Guardian's CNIC:{" "}
              </label>
              <CnicInput
                id="cnic"
                required
                value={formData.guardian.cnic}
                onChange={(e) => handleChange("guardian", e)}
                readOnly={sameAsFather}
              />
            </div>
            <InputContainer
              htmlFor="mobileNumber"
              title="Guardian's Mobile No"
              required
              value={formData.guardian.mobileNumber}
              onChange={(e) => handleChange("guardian", e)}
              readOnly={sameAsFather}
            />
            <InputContainer
              htmlFor="occupation"
              title="Guardian's Occupation"
              value={formData.guardian.occupation}
              onChange={(e) => handleChange("guardian", e)}
              readOnly={sameAsFather}
            />
          </div>
        )}
        <div className="buttonContainer d-flex justify-content-end mt-4 float-end">
          <button type="submit" className="button buttonFilled">
            {" "}
            Save & Proceed{" "}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FatherAndGuardianInfo;

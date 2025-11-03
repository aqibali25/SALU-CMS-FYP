import React, { useEffect } from "react";
import SkeletonLoader from "../SkeletonLoader.jsx";
import CnicInput from "../CNICInput.jsx";
import InputContainer from "../InputContainer.jsx";
import { useNavigate } from "react-router-dom";
import { useFormStatus } from "../../../contexts/AdmissionFormContext.jsx";
import Cookies from "js-cookie";
import useFatherGuardianStore from "../../../store/fatherGuardianStore";

const FatherAndGuardianInfo = () => {
  const navigate = useNavigate();
  const { updateFormStatus } = useFormStatus();

  const {
    formData,
    loading,
    sameAsFather,
    fetchFatherGuardianInfo,
    updateField,
    toggleSameAsFather,
    submitForm,
  } = useFatherGuardianStore();

  const cnic = Cookies.get("cnic");

  useEffect(() => {
    fetchFatherGuardianInfo();
  }, [fetchFatherGuardianInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await submitForm();
    if (success) {
      updateFormStatus("fatherGuardianInformation", "Completed");
      navigate("/admissions/form");
    }
  };

  return (
    <div className="margin-left-70 formConitainer p-4">
      <h4>Father & Guardian Information</h4>
      <form onSubmit={handleSubmit}>
        {loading ? (
          <SkeletonLoader length={6} />
        ) : (
          <div className="formContainer">
            {/* Father */}
            <h5>Father's Information</h5>

            <InputContainer
              htmlFor="name"
              title="Father's Name"
              required
              value={formData.father.name}
              onChange={(e) =>
                updateField("father", e.target.id, e.target.value)
              }
            />

            <div className="inputContainer">
              <label htmlFor="cnic">
                <span className="required">*</span>Father's CNIC:
              </label>
              <CnicInput
                id="cnic"
                required
                value={formData.father.cnic}
                onChange={(e) =>
                  updateField("father", e.target.id, e.target.value)
                }
              />
            </div>

            <InputContainer
              htmlFor="mobileNumber"
              title="Father's Mobile No"
              required
              value={formData.father.mobileNumber}
              onChange={(e) =>
                updateField("father", e.target.id, e.target.value)
              }
            />
            <InputContainer
              htmlFor="occupation"
              title="Father's Occupation"
              value={formData.father.occupation}
              onChange={(e) =>
                updateField("father", e.target.id, e.target.value)
              }
            />

            <hr />

            {/* Guardian */}
            <h5>Guardian's Information</h5>

            <div className="checkInputContainer">
              <input
                type="checkbox"
                checked={sameAsFather}
                onChange={toggleSameAsFather}
                style={{ width: "15px", height: "15px" }}
              />
              <label className="ms-2">Same as Father</label>
            </div>

            <InputContainer
              htmlFor="name"
              title="Guardian's Name"
              required
              value={formData.guardian.name}
              onChange={(e) =>
                updateField("guardian", e.target.id, e.target.value)
              }
              readOnly={sameAsFather}
            />

            <div className="inputContainer">
              <label htmlFor="cnic">
                <span className="required">*</span>Guardian's CNIC:
              </label>
              <CnicInput
                id="cnic"
                required
                value={formData.guardian.cnic}
                onChange={(e) =>
                  updateField("guardian", e.target.id, e.target.value)
                }
                readOnly={sameAsFather}
              />
            </div>

            <InputContainer
              htmlFor="mobileNumber"
              title="Guardian's Mobile No"
              required
              value={formData.guardian.mobileNumber}
              onChange={(e) =>
                updateField("guardian", e.target.id, e.target.value)
              }
              readOnly={sameAsFather}
            />
            <InputContainer
              htmlFor="occupation"
              title="Guardian's Occupation"
              value={formData.guardian.occupation}
              onChange={(e) =>
                updateField("guardian", e.target.id, e.target.value)
              }
              readOnly={sameAsFather}
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

export default FatherAndGuardianInfo;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SkeletonLoader from "../SkeletonLoader";
import InputContainer from "../InputContainer";
import { useFormStatus } from "../../../contexts/AdmissionFormContext";
import useAcademicRecordStore from "../../../store/useAcademicRecordStore.js";

const AcademicRecord = () => {
  const navigate = useNavigate();
  const { updateFormStatus } = useFormStatus();

  const {
    academicData,
    loading,
    boards,
    educationGroups,
    fetchAcademicRecord,
    updateField,
    submitAcademicRecord,
  } = useAcademicRecordStore();

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1949 },
    (_, i) => currentYear - i
  );

  const handleChange = (e, category) => {
    updateField(category, e.target.id, e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ok = await submitAcademicRecord();
    if (ok) {
      updateFormStatus("academicRecord", "Completed");
      navigate("/admissions/form");
    }
  };

  useEffect(() => {
    fetchAcademicRecord();
  }, [fetchAcademicRecord]);

  const categories = [
    { key: "intermediate", title: "Degree Information (Intermediate)" },
    { key: "matriculation", title: "Degree Information (Matriculation)" },
  ];

  return (
    <div className="margin-left-70 formConitainer p-4">
      <form onSubmit={handleSubmit}>
        {loading ? (
          <SkeletonLoader length={16} />
        ) : (
          categories.map(({ key, title }) => (
            <div key={key}>
              <h4>{title}</h4>
              <div className="formContainer">
                {/* Group */}
                <div className="inputContainer">
                  <label htmlFor="group">
                    <span className="required">*</span>Group:
                  </label>
                  <select
                    id="group"
                    className="col-6"
                    value={academicData[key].group}
                    onChange={(e) => handleChange(e, key)}
                    required
                  >
                    <option value="" disabled>
                      [Select an Option]
                    </option>
                    {educationGroups[key].map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Degree Year */}
                <div className="inputContainer">
                  <label htmlFor="degreeYear">
                    <span className="required">*</span>Degree Year:
                  </label>
                  <select
                    id="degreeYear"
                    className="col-6"
                    value={academicData[key].degreeYear}
                    onChange={(e) => handleChange(e, key)}
                    required
                  >
                    <option value="" disabled>
                      [Select an Option]
                    </option>
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>

                <InputContainer
                  htmlFor="seatNo"
                  title="Seat No"
                  required
                  inputType="text"
                  value={academicData[key].seatNo}
                  onChange={(e) => handleChange(e, key)}
                />

                <InputContainer
                  htmlFor="institutionName"
                  title={
                    key === "matriculation" ? "School Name" : "College Name"
                  }
                  required
                  inputType="text"
                  value={academicData[key].institutionName}
                  onChange={(e) => handleChange(e, key)}
                />

                {/* Board */}
                <div className="inputContainer">
                  <label htmlFor="board">
                    <span className="required">*</span>Board:
                  </label>
                  <select
                    id="board"
                    className="col-6"
                    value={academicData[key].board}
                    onChange={(e) => handleChange(e, key)}
                    required
                  >
                    <option value="" disabled>
                      [Select an Option]
                    </option>
                    {boards.map((b) => (
                      <option key={b.value} value={b.value}>
                        {b.label}
                      </option>
                    ))}
                  </select>
                </div>

                <InputContainer
                  htmlFor="totalMarks"
                  title="Total Marks"
                  required
                  inputType="text"
                  value={academicData[key].totalMarks}
                  onChange={(e) => handleChange(e, key)}
                />

                <InputContainer
                  htmlFor="marksObtained"
                  title="Marks Obtained"
                  required
                  inputType="text"
                  value={academicData[key].marksObtained}
                  onChange={(e) => handleChange(e, key)}
                />

                <InputContainer
                  htmlFor="percentage"
                  title="Percentage"
                  required
                  inputType="text"
                  readOnly
                  value={academicData[key].percentage}
                />
              </div>

              {key === "intermediate" && <hr className="my-5" />}
            </div>
          ))
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

export default AcademicRecord;

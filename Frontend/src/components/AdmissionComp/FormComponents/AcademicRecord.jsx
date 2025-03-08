import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SkeletonLoader from "../SkeletonLoader";
import InputContainer from "../InputContainer";
import { useFormStatus } from "../../../contexts/AdmissionFormContext";
import { boards, educationGroups } from "../../../contexts/BoardsData";

const AcademicRecord = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1949 },
    (_, i) => currentYear - i
  );

  const [academicData, setAcademicData] = useState({
    intermediate: {
      group: "",
      degreeYear: "",
      seatNo: "",
      institutionName: "",
      board: "",
      totalMarks: "",
      marksObtained: "",
      percentage: "",
    },
    matriculation: {
      group: "",
      degreeYear: "",
      seatNo: "",
      institutionName: "",
      board: "",
      totalMarks: "",
      marksObtained: "",
      percentage: "",
    },
  });

  const navigate = useNavigate();
  const { updateFormStatus } = useFormStatus();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const calculatePercentage = (category) => {
    const { totalMarks, marksObtained } = academicData[category];
    if (totalMarks && marksObtained) {
      const total = parseFloat(totalMarks);
      const obtained = parseFloat(marksObtained);
      if (!isNaN(total) && !isNaN(obtained) && total > 0) {
        setAcademicData((prev) => ({
          ...prev,
          [category]: {
            ...prev[category],
            percentage: ((obtained / total) * 100).toFixed(2) + "%",
          },
        }));
      } else {
        setAcademicData((prev) => ({
          ...prev,
          [category]: { ...prev[category], percentage: "" },
        }));
      }
    } else {
      setAcademicData((prev) => ({
        ...prev,
        [category]: { ...prev[category], percentage: "" },
      }));
    }
  };

  useEffect(() => {
    calculatePercentage("intermediate");
  }, [
    academicData.intermediate.totalMarks,
    academicData.intermediate.marksObtained,
  ]);

  useEffect(() => {
    calculatePercentage("matriculation");
  }, [
    academicData.matriculation.totalMarks,
    academicData.matriculation.marksObtained,
  ]);

  const handleChange = (e, category) => {
    const { id, value } = e.target;
    setAcademicData((prev) => ({
      ...prev,
      [category]: { ...prev[category], [id]: value },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Academic Data Submitted:", academicData);
    updateFormStatus("academicRecord", "Completed");
    navigate("/SALU-CMS-FYP/admissions/form");
  };

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
                {/* Group Selection */}
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
                    {educationGroups[key].map((group) => (
                      <option key={group} value={group}>
                        {group}
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
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>

                <InputContainer
                  htmlFor="seatNo"
                  title="Seat No"
                  required={true}
                  inputType="text"
                  value={academicData[key].seatNo}
                  onChange={(e) => handleChange(e, key)}
                />

                <InputContainer
                  htmlFor="institutionName"
                  title={
                    key === "matriculation" ? "School Name" : "College Name"
                  }
                  required={true}
                  inputType="text"
                  value={academicData[key].institutionName}
                  onChange={(e) => handleChange(e, key)}
                />

                {/* Board Selection */}
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
                    {boards.map((board) => (
                      <option key={board.value} value={board.value}>
                        {board.label}
                      </option>
                    ))}
                  </select>
                </div>

                <InputContainer
                  htmlFor="totalMarks"
                  title="Total Marks"
                  required={true}
                  inputType="text"
                  value={academicData[key].totalMarks}
                  onChange={(e) => handleChange(e, key)}
                />

                <InputContainer
                  htmlFor="marksObtained"
                  title="Marks Obtained"
                  required={true}
                  inputType="text"
                  value={academicData[key].marksObtained}
                  onChange={(e) => handleChange(e, key)}
                />

                <InputContainer
                  htmlFor="percentage"
                  title="Percentage"
                  required={true}
                  inputType="text"
                  readOnly={true}
                  value={academicData[key].percentage}
                />
              </div>
              {key === "intermediate" && <hr className="my-5" />}
            </div>
          ))
        )}
        <div className="buttonContainer d-flex justify-content-end mt-4 float-end">
          <button className="button buttonFilled" type="submit">
            Save & Proceed
          </button>
        </div>
      </form>
    </div>
  );
};

export default AcademicRecord;

import React from "react";
import FatherAndGuardianInfo from "../FatherAndGuardianInfo";
import { useFormStatus } from "../../../contexts/AdmissionFormContext";

const FatherInfo = () => {
  const { updateFormStatus } = useFormStatus();

  return (
    <FatherAndGuardianInfo
      title="Father"
      redirectPath="/SALU-CMS-FYP/admissions/form/guardian-information"
    />
  );
};

export default FatherInfo;

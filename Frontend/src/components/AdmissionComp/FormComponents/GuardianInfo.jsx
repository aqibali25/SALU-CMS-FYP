import React from "react";
import FatherAndGuardianInfo from "../FatherAndGuardianInfo";
import { useFormStatus } from "../../../contexts/AdmissionFormContext";

const GuardianInfo = () => {
  const { updateFormStatus } = useFormStatus();

  return (
    <FatherAndGuardianInfo
      title="Guardian"
      updateFormStatus={updateFormStatus}
      redirectPath="/SALU-CMS-FYP/admissions/form"
    />
  );
};

export default GuardianInfo;

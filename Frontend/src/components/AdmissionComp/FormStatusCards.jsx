import "../../styles/FormStatusCards.css";
import FormStatusCard from "./FormStatusCard";
import { useFormStatus } from "../../contexts/AdmissionFormContext";

const FormStatusCards = () => {
  const { statusItems } = useFormStatus();

  return (
    <div className=" margin-left-70 formStatusCards d-flex flex-column gap-4 justify-content-center align-items-center">
      {statusItems.map((statusItem, index) => (
        <FormStatusCard key={index} {...statusItem} />
      ))}
    </div>
  );
};

export default FormStatusCards;

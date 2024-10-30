import "../../styles/FormStatusCards.css";
import FormStatusCard from "./FormStatusCard";

const FormStatusCards = ({ statusItems }) => {
  return (
    <div className="formStatusCards d-flex flex-column gap-4 justify-content-center align-items-center">
      {statusItems.map((statusItem, index) => (
        <FormStatusCard key={index} {...statusItem} />
      ))}
    </div>
  );
};

export default FormStatusCards;

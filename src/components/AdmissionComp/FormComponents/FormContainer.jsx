import ButtonLink from "../../Button/ButtonLink";

const FormContainer = ({ children, Heading }) => {
  return (
    <div className="program-selection-form formConitainer p-4">
      <h4>{Heading}</h4>
      <form>
        {children}
        <div className="buttonContainer d-flex justify-content-end mt-4 float-end">
          <ButtonLink
            text={"Save & Proceed"}
            className={"signup"}
            href={"SALU-CMS-FYP/admission"}
          ></ButtonLink>
        </div>
      </form>
    </div>
  );
};

export default FormContainer;

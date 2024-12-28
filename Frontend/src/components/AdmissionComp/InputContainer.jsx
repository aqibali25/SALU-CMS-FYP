const InputContainer = ({
  htmlFor,
  required,
  inputType = "text",
  title,
  readOnly,
  value,
}) => {
  return (
    <div className="inputContainer">
      <label htmlFor={htmlFor}>
        {required && <span className="required">*</span>}
        {title}:
      </label>
      <input
        value={value}
        type={inputType}
        id={htmlFor}
        required={required}
        readOnly={readOnly}
      />
    </div>
  );
};

export default InputContainer;

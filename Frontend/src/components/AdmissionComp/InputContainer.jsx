const InputContainer = ({
  htmlFor,
  required,
  inputType = "text",
  title,
  readOnly,
  value,
  onChange,
  placeholder = "",
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
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputContainer;

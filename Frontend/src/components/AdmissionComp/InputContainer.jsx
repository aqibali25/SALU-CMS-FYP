import { forwardRef } from "react";

const InputContainer = forwardRef(
  (
    {
      htmlFor,
      required,
      inputType = "text",
      title,
      readOnly,
      value,
      onChange,
      placeholder = "",
      disabled,
      width = "70%",
    },
    ref
  ) => {
    return (
      <div className="inputContainer">
        <label htmlFor={htmlFor}>
          {required && <span className="required">*</span>}
          {title}:
        </label>
        <input
          style={{ width: width }}
          ref={ref} // Attach the ref here
          value={value}
          type={inputType}
          id={htmlFor}
          required={required}
          readOnly={readOnly}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
        />
      </div>
    );
  }
);

export default InputContainer;

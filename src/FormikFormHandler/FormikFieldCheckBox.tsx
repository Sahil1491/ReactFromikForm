import React from "react";
import { useField } from "formik";
import FormikFieldErrorHandler from "./FormikFormErrorHandler";


interface FormikFieldCheckboxProps {
  label?: string;
  className?: string;
  name: string;
  disabled?: boolean;
  readOnly?: boolean;
}

const FormikFieldCheckbox: React.FC<FormikFieldCheckboxProps> = ({
  label,
  className,
  name,
  disabled = false,
  readOnly = false,
}) => {
  const [field, meta, helpers] = useField(name);
  const errorClass = meta.touched && meta.error ? "error" : "";

  return (
    <div className="form-group">
      <div className="checkbox-wrapper">
        <input
          {...field}
          type="checkbox"
          id={name}
          className={`${className || ""} ${errorClass}`}
          disabled={disabled}
          readOnly={readOnly}
          checked={field.value}
          onChange={(e) => helpers.setValue(e.target.checked)}
        />
      
      </div>

      {/* Used to display errors */}
      <FormikFieldErrorHandler name={name} />
    </div>
  );
};

export default FormikFieldCheckbox;

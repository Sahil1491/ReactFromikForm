/*
   The component handles input validation based on allowed and forbidden characters. It
  prevents unwanted characters and spaces based on the provided configuration. Additionally,
  it supports numeric input with custom key press handling to restrict input to numeric values only.
 
 The component also integrates `FormikFieldErrorHandler` to display validation errors related
 to the field.
 */

 
import React, { useState } from "react";
import { useField } from "formik";
import FormikFieldErrorHandler from "./FormikFormErrorHandler";


interface FormikFieldInputProps {
    type: string;
    label?: string;
    placeholder?: string;
    className?: string;
    name: string;
    disabled?: boolean;
    readOnly?: boolean;
    spaceAllowed?: boolean;
    validcharacter?: Array<string>;
    invalidcharacter?: Array<string>;
}

const FormikFieldInput: React.FC<FormikFieldInputProps> = ({
    type,
    label,
    placeholder,
    className,
    name,
    disabled = false,
    readOnly = false,
    spaceAllowed = true,
    validcharacter = [],
    invalidcharacter = [],
}) => {
    const [field, meta, helpers] = useField(name);
    const [value, setValue] = useState<string>(field.value || "");

    const errorClass = meta.touched && meta.error ? "error" : "";

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const keyCode = event.keyCode || event.which;
        const keyValue = String.fromCharCode(keyCode);

        if (!/^\d+(\.\d+)?$/.test(keyValue)) {
            event.preventDefault();
        }
    };

    let forbiddenChars = [
        "?", ">", "<", "'", '"', ":", ";", ",", "+", "-", "(", ")", "*", "&", "^",
        "%", "$", "#", "{", "[", "]", "}", "|", "/", "\\", "=", "_", "!", "~",
        "`", ".", "@"
    ];

    forbiddenChars = forbiddenChars.concat(invalidcharacter);
    const allowedChars = forbiddenChars.filter(char => !validcharacter.includes(char));

    return (
        <div className="form-group">
            {label && <label htmlFor={name}>{label}</label>}
            <input
                {...field}
                type={type}
                id={name}
                placeholder={placeholder}
                className={`${className || ""} ${errorClass}`}
                disabled={disabled}
                readOnly={readOnly}
                value={value}
                onChange={(event) => {
                    const inputValue = event.target.value;
                    if (type === "number") {
                        if (/^\d*\.?\d*$/.test(inputValue)) {
                            setValue(inputValue);
                            helpers.setValue(inputValue);
                        }
                    } else {
                        if (
                            (spaceAllowed || !inputValue.includes(' ')) &&
                            !allowedChars.some(char => inputValue.includes(char))
                        ) {
                            setValue(inputValue);
                            helpers.setValue(inputValue);
                        }
                    }
                }}
                onKeyPress={type === "number" ? handleKeyPress : undefined}
            />
            <FormikFieldErrorHandler name={name} />
        </div>
    );
};

export default FormikFieldInput;

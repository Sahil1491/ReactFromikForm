import React, { useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import { Modal, Button } from "react-bootstrap";
import MyFormValidationSchema from '../../../FormValidation/validationschema';
import './SignUpModal.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import FormikFieldInput from "../../../FormikFormHandler/FormikFormInput";

interface Address {
  city: string;
  state: string;
  phoneNumber: string;
}

interface MyFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  addresses: Address[];
}

interface SignUpFormProps {
  initialValues: MyFormValues;
  onClose: () => void;
  onSave: (values: MyFormValues) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ initialValues, onClose, onSave }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const onSubmit = (values: MyFormValues, { resetForm }: { resetForm: () => void }) => {
    onSave(values);

    setTimeout(() => {
      resetForm();
      onClose();
    }, 1000);
  };

  return (
    <Modal show onHide={onClose} centered>
      <Modal.Header closeButton className="modal-header-custom">
        <Modal.Title className="modal-title">Sign Up</Modal.Title>
        <button type="button" className="close cross-button" onClick={onClose}></button>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={MyFormValidationSchema}
          onSubmit={onSubmit}
        >
          {({ values }) => (
            <Form id="signup-form" className="my-form">
              <div className="form-group">
                <Field
                  name="name"
                  type="text"
                  label="Name"
                  as={FormikFieldInput}
                />
              </div>

              <div className="form-group">
                <Field
                  name="email"
                  type="email"
                  label="Email"
                  invalidcharacter={[" "]}
                  validcharacter={[
                    "-",
                    "_",
                    "[",
                    "]",
                    "(",
                    ")",
                    ":",
                    "#",
                    "@",
                    ".",
                  ]}
                  as={FormikFieldInput}
                />
              </div>

              <div className="form-group password-field">
                <div className="password-wrapper">
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    invalidcharacter={[" "]}
                    validcharacter={[
                      "~",
                      "`",
                      "!",
                      "@",
                      "#",
                      "$",
                      "%",
                      "^",
                      "&",
                      "*",
                      "(",
                      ")",
                      "_",
                      "-",
                      "+",
                      "=",
                      "{",
                      "[",
                      "}",
                      "]",
                      "|",
                      "\\",
                      ":",
                      ";",
                      "'",
                      '"',
                      "<",
                      ",",
                      ">",
                      ".",
                      "?",
                      "/",
                    ]}
                    label="Password"
                    as={FormikFieldInput}
                    className="password-input"
                  />
                  <button
                    type="button"
                    className="eye-icon"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="form-group password-field">
                <div className="password-wrapper">
                  <Field
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    label="Confirm Password"
                    invalidcharacter={[" "]}
                    validcharacter={[
                      "~",
                      "`",
                      "!",
                      "@",
                      "#",
                      "$",
                      "%",
                      "^",
                      "&",
                      "*",
                      "(",
                      ")",
                      "_",
                      "-",
                      "+",
                      "=",
                      "{",
                      "[",
                      "}",
                      "]",
                      "|",
                      "\\",
                      ":",
                      ";",
                      "'",
                      '"',
                      "<",
                      ",",
                      ">",
                      ".",
                      "?",
                      "/",
                    ]}
                    as={FormikFieldInput}
                    className="password-input"
                  />
                  <button
                    type="button"
                    className="eye-icon"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <FieldArray name="addresses">
                {({ push, remove }) => (
                  <div>
                    {values.addresses.map((_, index) => (
                      <div key={index} className="address-group">
                        <h5>
                      {index === 0 ? 'Current Address' : index === 1 ? 'Permanent Address' : `Address ${index + 1}`}
                    </h5>
                        <div className="form-group">
                          <Field
                            name={`addresses.${index}.city`}
                            type="text"
                            label="City"
                            as={FormikFieldInput}
                          />
                        </div>

                        <div className="form-group">
                          <Field
                            name={`addresses.${index}.state`}
                            type="text"
                            label="State"
                            as={FormikFieldInput}
                          />
                        </div>

                        <div className="form-group">
                          <Field
                            name={`addresses.${index}.phoneNumber`}
                            type="text"
                            label="Phone Number"
                            as={FormikFieldInput}
                          />
                        </div>

                        <div className="address-buttons-wrapper">
                          <button
                            type="button"
                            className="remove-button"
                            onClick={() => remove(index)}
                          >
                            Remove Address
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="form-group">
                      <button
                        type="button"
                        className="add-button"
                        onClick={() => push({ city: '', state: '', phoneNumber: '' })}
                      >
                        Add Address
                      </button>
                    </div>
                  </div>
                )}
              </FieldArray>
              <div className="modal-footer">
                <Button variant="secondary" onClick={onClose}>Cancel</Button>
                <Button type="submit" variant="primary">Save</Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default SignUpForm;

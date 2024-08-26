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
  agreeToTerms: boolean; // New field for the checkbox
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
    console.log("Form values on submit:", values);
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
          validateOnChange={true}
          validateOnBlur={true}
        >
          {() => (
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
                  label="Email"
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
                      "",
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
                    invalidcharacter={[" "]}
                    validcharacter={[
                      "~",
                      "",
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
                    label="Confirm Password"
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
                {() => (
                  <div>
                    <div className="address-group">
                      <h5>Current Address</h5>
                      <div className="form-group">
                        <Field
                          name="addresses[0].city"
                          type="text"
                          label="City"
                          as={FormikFieldInput}
                        />
                      </div>

                      <div className="form-group">
                        <Field
                          name="addresses[0].state"
                          type="text"
                          label="State"
                          as={FormikFieldInput}
                        />
                      </div>

                      <div className="form-group">
                        <Field
                          name="addresses[0].phoneNumber"
                          type="text"
                          label="Phone Number"
                          as={FormikFieldInput}
                        />
                      </div>
                    </div>

                    <div className="address-group">
                      <h5>Permanent Address</h5>
                      <div className="form-group">
                        <Field
                          name="addresses[1].city"
                          type="text"
                          label="City"
                          as={FormikFieldInput}
                        />
                      </div>

                      <div className="form-group">
                        <Field
                          name="addresses[1].state"
                          type="text"
                          label="State"
                          as={FormikFieldInput}
                        />
                      </div>

                      <div className="form-group">
                        <Field
                          name="addresses[1].phoneNumber"
                          type="text"
                          label="Phone Number"
                          as={FormikFieldInput}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </FieldArray>

              <div className="form-group agree-to-terms-wrapper">
                <Field
                  name="agreeToTerms"
                  type="checkbox"
                  id="agreeToTerms"
                  as={FormikFieldInput}
                />
                <span>I agree terms and condition</span>
              </div>

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

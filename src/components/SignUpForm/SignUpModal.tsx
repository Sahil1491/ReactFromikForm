import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { Modal, Button } from "react-bootstrap";
import MyFormValidationSchema from '../../FormValidation/validationschema';
import './SignUpModal.css';

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
        <Modal.Title>Sign Up</Modal.Title>
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
                <label htmlFor="name">Name</label>
                <Field type="text" id="name" name="name" />
                <ErrorMessage name="name" component="div" className="error" />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field type="email" id="email" name="email" />
                <ErrorMessage name="email" component="div" className="error" />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field type="password" id="password" name="password" />
                <ErrorMessage name="password" component="div" className="error" />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <Field type="password" id="confirmPassword" name="confirmPassword" />
                <ErrorMessage name="confirmPassword" component="div" className="error" />
              </div>

              <FieldArray name="addresses">
                {({ push, remove }) => (
                  <div>
                    {values.addresses.map((_, index) => (
                      <div key={index} className="address-group">
                        <h5>{index === 0 ? "Current Address" : `Address ${index + 1}`}</h5>
                        <div className="form-group">
                          <label htmlFor={`addresses.${index}.city`}>City</label>
                          <Field
                            type="text"
                            id={`addresses.${index}.city`}
                            name={`addresses.${index}.city`}
                          />
                          <ErrorMessage name={`addresses.${index}.city`} component="div" className="error" />
                        </div>

                        <div className="form-group">
                          <label htmlFor={`addresses.${index}.state`}>State</label>
                          <Field
                            type="text"
                            id={`addresses.${index}.state`}
                            name={`addresses.${index}.state`}
                          />
                          <ErrorMessage name={`addresses.${index}.state`} component="div" className="error" />
                        </div>

                        <div className="form-group">
                          <label htmlFor={`addresses.${index}.phoneNumber`}>Phone Number</label>
                          <Field
                            type="text"
                            id={`addresses.${index}.phoneNumber`}
                            name={`addresses.${index}.phoneNumber`}
                          />
                          <ErrorMessage name={`addresses.${index}.phoneNumber`} component="div" className="error" />
                        </div>

                        <div className="form-group">
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
            </Form>
          )}
        </Formik>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" form="signup-form">
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SignUpForm;

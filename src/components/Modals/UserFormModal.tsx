/*

This component is our form modal of signup and edit modal 
*/


import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, FieldArray, useFormikContext } from 'formik';
import { Button, Modal } from 'react-bootstrap';
import MyFormValidationSchema from '../../FormValidation/validationschema';
import './UserModal.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import FormikFieldInput from '../../FormikFormHandler/FormikFormInput';
import Draggable from 'react-draggable';
import ModalDialog from 'react-bootstrap/ModalDialog';

// DraggableModalDialog component
const DraggableModalDialog: React.FC<any> = (props) => {
  return (
    <Draggable handle=".modal-header">
      <ModalDialog {...props} />
    </Draggable>
  );
};

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
  isSameAddress: boolean;
}

interface UserFormModalProps {
  user?: {
    name: string;
    email: string;
    password?: string;
    confirmPassword?: string;
    addresses: Address[];
  };
  onClose: () => void;
  onSave: (values: MyFormValues) => void;
  modalTitle: string;
  showPasswordFields: boolean;
}

const UserFormModal: React.FC<UserFormModalProps> = ({ user, onClose, onSave, modalTitle }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isEditMode = Boolean(user);

  const initialValues: MyFormValues = {
    name: user?.name || '',
    email: user?.email || '',
    password: user?.password || '',
    confirmPassword: user?.confirmPassword || '',
    addresses: user?.addresses || [{ city: '', state: '', phoneNumber: '' }, { city: '', state: '', phoneNumber: '' }],
    isSameAddress: user?.addresses[0].city === user?.addresses[1].city &&
                   user?.addresses[0].state === user?.addresses[1].state &&
                   user?.addresses[0].phoneNumber === user?.addresses[1].phoneNumber,
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const FormObserver: React.FC = () => {
    const { values, setFieldValue } = useFormikContext<MyFormValues>();

    useEffect(() => {
      if (values.isSameAddress) {
        setFieldValue("addresses[1].city", values.addresses[0].city);
        setFieldValue("addresses[1].state", values.addresses[0].state);
        setFieldValue("addresses[1].phoneNumber", values.addresses[0].phoneNumber);
      }
    }, [values.isSameAddress, values.addresses]);

    return null;
  };

  const onSubmit = (values: MyFormValues, { resetForm }: { resetForm: () => void }) => {
    
    console.log("Form values on submit:", values);
    onSave(values);
    

    setTimeout(() => {
      resetForm();
      onClose();
    }, 1000);
  };

  return (
    <Modal
      dialogAs={DraggableModalDialog}
      show
      onHide={onClose}
      enforceFocus={false}
      backdrop="static"
    >
      <Modal.Header closeButton className="modal-header-custom">
        <Modal.Title className="modal-title">{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={MyFormValidationSchema}
          onSubmit={onSubmit}
        >
          {({ values,setFieldValue }) => (
            <Form id="user-form" className="my-form">
            {/* use formobserver inside the form field*/}
              <FormObserver />

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
                    "-", "_", "[", "]", "(", ")", ":", "#", "@", ".",
                  ]}
                  label="Email"
                  as={FormikFieldInput}
                />
              </div>

              {!isEditMode && (
                <>
                  <div className="form-group password-field">
                    <div className="password-wrapper">
                      <Field
                        name="password"
                        type={showPassword ? "text" : "password"}
                        invalidcharacter={[" "]}
                        validcharacter={[
                          "~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "{", "[", "}", "]", "|", "\\", ":", ";", "'", '"', "<", ",", ">", ".", "?", "/",
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
                          "~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "{", "[", "}", "]", "|", "\\", ":", ";", "'", '"', "<", ",", ">", ".", "?", "/",
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
                </>
              )}

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

                    <div className="form-group checkbox-group">
                      <Field
                        name="isSameAddress"
                        type="checkbox"
                        id="isSameAddress"
                      />
                      <label htmlFor="isSameAddress">
                        Is Permanent Address Same as Current Address?
                      </label>
                    </div>

                    <div className="address-group">
                      <h5>Permanent Address</h5>
                      <div className="form-group">
                        <Field
                          name="addresses[1].city"
                          type="text"
                          label="City"
                          as={FormikFieldInput}
                          disabled={values.isSameAddress}
                        />
                      </div>

                      <div className="form-group">
                        <Field
                          name="addresses[1].state"
                          type="text"
                          label="State"
                          as={FormikFieldInput}
                          disabled={values.isSameAddress}
                        />
                      </div>

                      <div className="form-group">
                        <Field
                          name="addresses[1].phoneNumber"
                          type="text"
                          label="Phone Number"
                          as={FormikFieldInput}
                          disabled={values.isSameAddress}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </FieldArray>

              <div className="modal-footer">
                <Button variant="secondary" onClick={onClose}>Cancel</Button>
                <Button type="submit" variant="primary">{isEditMode ? 'Update' : 'Save'}</Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default UserFormModal;

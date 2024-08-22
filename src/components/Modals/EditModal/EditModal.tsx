import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Modal, Button } from 'react-bootstrap';
import MyFormValidationSchema from '../../../FormValidation/validationschema';
import './EditModal.css';

interface Address {
  city: string;
  state: string;
  phoneNumber: string;
}

interface EditModalProps {
  user: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    addresses: Address[];
  };
  onClose: () => void;
  onSave: (updatedData: any) => void;
}

const EditModal: React.FC<EditModalProps> = ({ user, onClose, onSave }) => {
  const initialValues = {
    name: user.name,
    email: user.email,
    password: user.password,
    confirmPassword: user.confirmPassword,
    addresses: user.addresses,
  };

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update User and Addresses</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={MyFormValidationSchema}
          onSubmit={(values) => {
            onSave(values);
          }}
        >
          {() => (
            <Form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <Field type="text" id="name" name="name" className="form-control" />
                <ErrorMessage name="name" component="div" className="error" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field type="email" id="email" name="email" className="form-control" />
                <ErrorMessage name="email" component="div" className="error" />
              </div>

              {/* Display all existing addresses */}
              {initialValues.addresses.length > 0 ? (
                initialValues.addresses.map((address, index) => (
                  <div key={index} className="address-group">
                     <h5>
                      {index === 0 ? 'Current Address' : index === 1 ? 'Permanent Address' : `Address ${index + 1}`}
                    </h5>
                    <div className="form-group">
                      <label htmlFor={`addresses[${index}].city`}>City</label>
                      <Field
                        type="text"
                        id={`addresses[${index}].city`}
                        name={`addresses[${index}].city`}
                        className="form-control"
                        placeholder="City"
                      />
                      <ErrorMessage
                        name={`addresses[${index}].city`}
                        component="div"
                        className="error"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor={`addresses[${index}].state`}>State</label>
                      <Field
                        type="text"
                        id={`addresses[${index}].state`}
                        name={`addresses[${index}].state`}
                        className="form-control"
                        placeholder="State"
                      />
                      <ErrorMessage
                        name={`addresses[${index}].state`}
                        component="div"
                        className="error"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor={`addresses[${index}].phoneNumber`}>Phone Number</label>
                      <Field
                        type="text"
                        id={`addresses[${index}].phoneNumber`}
                        name={`addresses[${index}].phoneNumber`}
                        className="form-control"
                        placeholder="Phone Number"
                      />
                      <ErrorMessage
                        name={`addresses[${index}].phoneNumber`}
                        component="div"
                        className="error"
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p>No addresses available</p>
              )}

              <div className="modal-footer">
                <Button variant="secondary" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Save
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default EditModal;

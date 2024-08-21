import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Modal, Button } from 'react-bootstrap';
import MyFormValidationSchema from '../../FormValidation/validationschema';
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
  address: Address;
  onClose: () => void;
  onSave: (updatedData: any) => void;
}

const EditModal: React.FC<EditModalProps> = ({ user, address, onClose, onSave }) => {
  const initialValues = {
    name: user.name,
    email: user.email,
    password: user.password,
    confirmPassword: user.confirmPassword,
    addresses: [{ city: address.city, state: address.state, phoneNumber: address.phoneNumber }],
  };

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update User and Address</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={MyFormValidationSchema}
          onSubmit={(values) => {
            const updatedData = {
              ...values,
              addresses: values.addresses.map((addr: any) => ({
                city: addr.city,
                state: addr.state,
                phoneNumber: addr.phoneNumber,
              })),
            };
            onSave(updatedData);
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
           
              <div className="form-group">
                <label htmlFor="city">City</label>
                <Field type="text" id="city" name="addresses[0].city" className="form-control" />
                <ErrorMessage name="addresses[0].city" component="div" className="error" />
              </div>
              <div className="form-group">
                <label htmlFor="state">State</label>
                <Field type="text" id="state" name="addresses[0].state" className="form-control" />
                <ErrorMessage name="addresses[0].state" component="div" className="error" />
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <Field type="text" id="phoneNumber" name="addresses[0].phoneNumber" className="form-control" />
                <ErrorMessage name="addresses[0].phoneNumber" component="div" className="error" />
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

export default EditModal;

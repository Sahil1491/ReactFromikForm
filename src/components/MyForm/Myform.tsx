import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import MyFormValidationSchema from '../../FormValidation/validationschema';
import './Myform.css';
import SignUpImg2 from '../../Assests/SignUpImg2.jpeg';
import { FaTable } from 'react-icons/fa';

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

const initialValues: MyFormValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  addresses: [{ city: '', state: '', phoneNumber: '' }],
};

const MyForm: React.FC = () => {
  const navigate = useNavigate();

  const onSubmit = (values: MyFormValues, { resetForm }: { resetForm: () => void }) => {
    const storedData = localStorage.getItem('formData');
    let existingData: MyFormValues[] = [];
  
    if (storedData) {
      try {
        existingData = JSON.parse(storedData);
        if (!Array.isArray(existingData)) {
          existingData = [];
        }
      } catch (error) {
        existingData = [];
      }
    }
    existingData.push(values);
  
    localStorage.setItem('formData', JSON.stringify(existingData));
  

    setTimeout(() => {
      resetForm();
    }, 1000);
  };
  

  const handleIconClick = () => {
    navigate('/form-data');
  };

  return (
    <div className="form-container">
      <div className="image-section"><img src={SignUpImg2} alt="Sign Up" /></div>
      <div className="form-section">
        <h2 className="signup-heading">Sign Up</h2>
        <div className="icon-section">
          <FaTable onClick={handleIconClick} className="table-icon" title="View Form Data" />
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={MyFormValidationSchema}
          onSubmit={onSubmit}
        >
          {({ values }) => (
            <Form className="my-form">
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
                  <div className="form-group">
                    <label>Addresses</label>
                    {values.addresses.map((_, index) => (
                      <div key={index} className="address-group">
                        <Field
                          name={`addresses[${index}].city`}
                          placeholder="City"
                        />
                        <ErrorMessage
                          name={`addresses[${index}].city`}
                          component="div"
                          className="error"
                        />
                        <Field
                          name={`addresses[${index}].state`}
                          placeholder="State"
                        />
                        <ErrorMessage
                          name={`addresses[${index}].state`}
                          component="div"
                          className="error"
                        />
                        <div className="phone-number-group">
                          <Field
                            name={`addresses[${index}].phoneNumber`}
                            placeholder="Phone Number"
                          />
                          <ErrorMessage
                            name={`addresses[${index}].phoneNumber`}
                            component="div"
                            className="error"
                          />
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="remove-btn"
                          >
                            -
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => push({ city: '', state: '', phoneNumber: '' })}
                      className="add-btn"
                    >
                      Add Address
                    </button>
                  </div>
                )}
              </FieldArray>

              <button type="submit" className="submit-btn">Register</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default MyForm;

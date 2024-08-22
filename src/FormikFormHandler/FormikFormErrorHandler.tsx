/**
 * `FormikFieldErrorHandler` is a React component used to display validation error messages
 * for a specific field in a Formik form. It utilizes Formik's `ErrorMessage` component
 * to retrieve and render error messages related to the field specified by the `name` prop.
 */



import React from "react";
import { ErrorMessage } from "formik";

interface FormikFieldErrorHandlerProps {
  name: string;
}

const FormikFieldErrorHandler: React.FC<FormikFieldErrorHandlerProps> = ({ name }) => (
  <ErrorMessage name={name}>
    {msg => <div className="error">{msg}</div>}
  </ErrorMessage>
);

export default FormikFieldErrorHandler;

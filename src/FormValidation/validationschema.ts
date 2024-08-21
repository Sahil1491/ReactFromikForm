import * as Yup from 'yup';

const MyFormValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], "Passwords must match")
    .required("Confirm Password is required"),
  addresses: Yup.array().of(
    Yup.object({
      city: Yup.string()
        .min(2, "City must contain at least 2 words")
        .required("City is required"),
      state: Yup.string()
        .min(2, "State must have at least 2 characters")
        .required("State is required"),
      phoneNumber: Yup.string()
        .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
        .required("Phone number is required"),
    })
  ),
});

export default MyFormValidationSchema;

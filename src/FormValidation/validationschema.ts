import * as Yup from 'yup';

const MyFormValidationSchema = Yup.object({
  name: Yup.string().required("Name is required")
  .min(3,"Name must have atleast 3 characters")
  .max(20,"Name only have max 20 characters"),
  email: Yup.string()  .matches(
    /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([一-龠ぁ-ゔァ-ヴー々〆〤a-zA-Z\-0-9]+\.)+[一-龠ぁ-ゔァ-ヴー々〆〤a-zA-Z]{2,}))$/,
    "invalid_login_id")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Password must contain at least one capital letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[@$!%*?&#]/, "Password must contain at least one special character")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], "Passwords must match")
    .required("Confirm Password is required"),
  addresses: Yup.array()
    .of(
      Yup.object({
        city: Yup.string()
          .min(5, "City must contain at least 5 characters")
          .max(25, "City must contain no more than 25 characters")
          .required("City is required"),
        state: Yup.string()
          .min(5, "State must have at least 5 characters")
          .max(25, "State must contain no more than 25 characters")
          .required("State is required"),
        phoneNumber: Yup.string()
          .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
          .required("Phone number is required"),
      })
    )
    .length(2, "You must provide exactly two addresses"),
  agreeToTerms: Yup.boolean()
    .oneOf([true], "You must agree to the terms and conditions")
    .required("You must agree to the terms and conditions"),
});

export default MyFormValidationSchema;

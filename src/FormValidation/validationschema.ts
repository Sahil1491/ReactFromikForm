import * as Yup from 'yup';

const MyFormValidationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name must have at least 3 characters")
    .max(20, "Name can only have a maximum of 20 characters"),

  email: Yup.string()
    .matches(
      /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([一-龠ぁ-ゔァ-ヴー々〆〤a-zA-Z\-0-9]+\.)+[一-龠ぁ-ゔァ-ヴー々〆〤a-zA-Z]{2,}))$/,
      "Invalid email address"
    )
    .required("Email is required"),

  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),

  addresses: Yup.array()
    .of(
      Yup.object().shape({
        city: Yup.string().required('City is required'),
        state: Yup.string().required('State is required'),
        phoneNumber: Yup.string().required('Phone Number is required'),
      })
    )
    .required(),

  isSameAddress: Yup.boolean(),
}).test('sameAddress', function (values) {
    const { isSameAddress, addresses } = values;
    
    // If the checkbox is unchecked, the permanent address fields must be filled
    if (!isSameAddress) {
      const permanentAddress = addresses[1];
      if (!permanentAddress.city || !permanentAddress.state || !permanentAddress.phoneNumber) {
        return this.createError({
          path: 'addresses[1]',
          message: 'Please provide permanent address details if different from current address',
        });
      }
    }
    return true;
  });

export default MyFormValidationSchema;

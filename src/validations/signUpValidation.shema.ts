import * as yup from 'yup';

export const signUpSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required('Name is required')
    .matches(/^[A-Z][a-z]*$/, {
      message: 'The first letter of the name must be capitalized',
    }),
  email: yup
    .string()
    .lowercase()
    .trim()
    .required('Email is required')
    .email('Invalid email format'),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*\d)(?=.*[@$#№:;^!%*?&*()_+,."'`~/|])[\p{L}\d@$!%*?&*()_+."']/u,
      'Password must have at least one letter, one digit, one special character',
    )
    .min(8, 'Password must be at least 8 characters long'),
  confirmPassword: yup
    .string()
    .required('Password is required')
    .oneOf([yup.ref('password')], 'Passwords does not match'),
});

export type SignUpFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

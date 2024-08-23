import * as yup from 'yup';

export const signInSchema = yup.object().shape({
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
});

export type signInFormData = {
  email: string;
  password: string;
};

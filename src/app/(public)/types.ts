import * as Yup from 'yup';

// import { passwordStrength } from 'check-password-strength'

export enum AUTH_FORM_FIELDS {
  EMAIL = 'email',
  PASSWORD = 'password',
}

export const weakPasswordErrorMsg = 'This password is not strong enough!';

export const CredentialsFormSchema = Yup.object().shape({
  email: Yup.string().email('A valid email is required').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

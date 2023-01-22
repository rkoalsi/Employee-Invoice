import { object, string } from 'yup';

export const SIGNUP_VERIFICATION_SCHEMA = object({
  name: string().required('Email is required'),
  organizationId: string().required('Organization Id is required'),
  email: string().email().required('Email is required'),
  designation: string().required('Designation is required'),
  password: string().required('Password is required'),
});

export const SIGNIN_VERIFICATION_SCHEMA = object({
  email: string().email().required('Email is required'),
  password: string().required('Password is required'),
});

export const EMPLOYEE_VERIFICATION_SCHEMA = object({
  email: string().email().required(),
  password: string().required(),
});

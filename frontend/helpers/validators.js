import { object, string } from 'yup';

export const SIGNUP_VERIFICATION_SCHEMA = object({
  name: string().required(),
  organizationId: string().required(),
  email: string().email().required(),
  designation: string().required(),
  password: string().required(),
});

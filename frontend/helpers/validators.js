import { number, object, string } from 'yup';
import * as yup from 'yup';
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
  email: string().email().required('Email is required'),
  role: string().required('Role is required'),
  password: string().required('Password is required'),
});

export const ESTIMATE_VERIFICATION_SCHEMA = object({
  customer: yup.lazy((value) => {
    switch (typeof value) {
      case 'object':
        return yup.object().required(); // schema for object
      case 'string':
        return yup.string().min(5).required('Number of customers is required'); // schema for string
      default:
        return yup.mixed(); // here you can decide what is the default
    }
  }),
  products: yup
    .array(
      yup.object({
        product: yup.lazy((value) => {
          switch (typeof value) {
            case 'object':
              return yup.object().required(); // schema for object
            case 'string':
              return yup.string().required(); // schema for string
            default:
              return yup.mixed(); // here you can decide what is the default
          }
        }),
        amount: yup.number().required(),
      })
    )
    .min(1)
    .required(),
  total: number().required(),
});
export const CUSTOMER_VERIFICATION_SCHEMA = object({
  name: string().required('Name is required'),
  shop: string().required('Shop name is required'),
  gstin: string().required('GSTIN number is required'),
  phone: number().required(),
});
export const PRODUCT_VERIFICATION_SCHEMA = object({
  name: string().required('Name is required'),
  sku: string().required('SKU is required'),
  gst: string().required('GST number is required'),
  price: string().required('Price is required'),
  hsn: string().required('HSN is required'),
  stock: number().required('Stock is required'),
});

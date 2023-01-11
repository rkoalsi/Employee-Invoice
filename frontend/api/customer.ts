import axios from 'axios';

const base = process.env.url;

export const createCustomer = (body: any) =>
  axios.post(`${base}/customer`, body);

export const getCustomers = (query: string) =>
  axios.get(`${base}/customers?organizationId=${query}`);

export const getCustomer = (body: any) => axios.get(`${base}/customer`, body);

export const deleteCustomer = (query: any) =>
  axios.delete(`${base}/customer?id=${query}`);

export const updateCustomer = (body: any) =>
  axios.patch(`${base}/customer`, body);

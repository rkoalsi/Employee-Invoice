import axios from 'axios';

const base = process.env.url;

export const createEmployee = (body: any) =>
  axios.post(`${base}/employee`, body);

export const getEmployees = (query: string) =>
  axios.get(`${base}/employees?organizationId=${query}`);

export const getEmployeesData = (query: string) =>
  axios.get(`${base}/employee-data?organizationId=${query}`);

export const getEmployee = (body: any) => axios.get(`${base}/employee`, body);

export const deleteEmployee = (query: any) =>
  axios.delete(`${base}/employee?id=${query}`);

export const updateEmployee = (body: any) =>
  axios.patch(`${base}/employee`, body);

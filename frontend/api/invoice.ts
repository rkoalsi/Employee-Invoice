import axios from 'axios';

const base = process.env.url;

export const createInvoice = (body: any) => axios.post(`${base}/invoice`, body);

export const getInvoices = (query: string) =>
  axios.get(`${base}/invoices?organizationId=${query}`);

export const getInvoice = (body: any) => axios.get(`${base}/invoice`, body);

export const deleteInvoice = (body: any) =>
  axios.delete(`${base}/invoice`, body);

export const updateInvoice = (body: any) =>
  axios.patch(`${base}/invoice`, body);

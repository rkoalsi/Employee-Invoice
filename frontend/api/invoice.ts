import axios from 'axios';

const base = process.env.url;

export const createInvoice = (body: any) => axios.post(`${base}/invoice`, body);

export const sendInvoiceEmail = (body: any) =>
  axios.post(`${base}/email-invoice`, body);

export const getInvoices = (query: string) =>
  axios.get(`${base}/invoices?organizationId=${query}`);

export const getInvoicesData = (query: string) =>
  axios.get(`${base}/invoice-data?organizationId=${query}`);

export const getInvoice = (body: any) => axios.get(`${base}/invoice`, body);

export const deleteInvoice = (query: string) =>
  axios.delete(`${base}/invoice?id=${query}`);

export const updateInvoice = (body: any) =>
  axios.patch(`${base}/invoice`, body);

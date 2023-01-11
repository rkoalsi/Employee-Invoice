import axios from 'axios';

const base = process.env.url;

export const createSalesOrder = (body: any) =>
  axios.post(`${base}/sales-order`, body);

export const getSalesOrders = (query: string) =>
  axios.get(`${base}/sales-orders?organizationId=${query}`);

export const getSalesOrder = (body: any) =>
  axios.get(`${base}/sales-order`, body);

export const deleteSalesOrder = (body: any) =>
  axios.delete(`${base}/sales-order`, body);

export const updateSalesOrder = (body: any) =>
  axios.patch(`${base}/sales-order`, body);

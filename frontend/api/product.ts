import axios from 'axios';

const base = process.env.url;

export const createProduct = (body: any) => axios.post(`${base}/product`, body);

export const getProducts = (query: string) =>
  axios.get(`${base}/products?organizationId=${query}`);

export const getProduct = (body: any) => axios.get(`${base}/product`, body);

export const deleteProduct = (query: string) =>
  axios.delete(`${base}/product?id=${query}`);

export const updateProduct = (body: any) =>
  axios.patch(`${base}/product`, body);

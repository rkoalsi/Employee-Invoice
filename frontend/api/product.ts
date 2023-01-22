import axios from 'axios';

const base = process.env.url;

export const createProduct = (body: any) => axios.post(`${base}/product`, body);

export const getProducts = (query: string) =>
  axios.get(`${base}/products?organizationId=${query}`);

export const getProduct = (query: string) =>
  axios.get(`${base}/product?id=${query}`);

export const deleteProduct = (query: string) =>
  axios.delete(`${base}/product?id=${query}`);

export const updateProduct = (body: any) =>
  axios.patch(`${base}/product`, body);

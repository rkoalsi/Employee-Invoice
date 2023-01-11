import axios from 'axios';

const base = process.env.url;

export const createEstimate = (body: any) =>
  axios.post(`${base}/estimate`, body);

export const getEstimates = (query: string) =>
  axios.get(`${base}/estimates?organizationId=${query}`);

export const getEstimate = (body: any) => axios.get(`${base}/estimate`, body);

export const deleteEstimate = (body: any) =>
  axios.delete(`${base}/estimate`, body);

export const updateEstimate = (body: any) =>
  axios.patch(`${base}/estimate`, body);

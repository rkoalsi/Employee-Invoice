import axios from 'axios';

const base = process.env.url;

export const createEstimate = (body: any) =>
  axios.post(`${base}/estimate`, body);

export const getEstimates = (query: string) =>
  axios.get(`${base}/estimates?organizationId=${query}`);
export const getEstimatesData = (query: string) =>
  axios.get(`${base}/estimate-data?organizationId=${query}`);
export const getEstimate = (body: any) => axios.get(`${base}/estimate`, body);

export const deleteEstimate = (query: string) =>
  axios.delete(`${base}/estimate?id=${query}`);

export const updateEstimate = (body: any) =>
  axios.patch(`${base}/estimate`, body);

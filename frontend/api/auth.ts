import axios from 'axios';

const base = process.env.url;

export const login = (body: any) => axios.post(`${base}/login`, body);
export const register = (body: any) => axios.post(`${base}/register`, body);
export const resetPassword = (body: any) =>
  axios.post(`${base}/reset-password`, body);

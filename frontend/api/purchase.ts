import axios from 'axios';

const base = process.env.url;

export const createPurchase = (body: any) =>
  axios.post(`${base}/purchase`, body);

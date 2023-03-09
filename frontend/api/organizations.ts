import axios from 'axios';

const base = process.env.url;

export const getOrganizations = () => axios.get(`${base}/organizations`);

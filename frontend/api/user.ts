import axios from 'axios';

const base = process.env.url;

export const getUserByOrganization = (query: string) =>
  axios.get(`${base}/userOrg?organizationId=${query}`);

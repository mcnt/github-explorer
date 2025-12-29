import axios from 'axios';
import { getToken } from '../utils/auth';

const rawBaseUrl = import.meta.env.VITE_API_URL as string | undefined;
const baseURL = rawBaseUrl ? rawBaseUrl.replace(/\/+$/, '') : '';

export const api = axios.create({
  baseURL,
});

api.interceptors.request.use(config => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

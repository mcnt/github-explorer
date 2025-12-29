import { api } from './api';

export async function login(email: string, password: string) {
  const { data } = await api.post('/api/auth/login', { email, password });
  return data;
}

export async function register(name: string, email: string, password: string) {
  const { data } = await api.post('/api/auth/register', { name, email, password });
  return data;
}

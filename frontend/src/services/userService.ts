import { api } from './api';

export function listUsers() {
  return api.get('/api/users');
}

export function createUser(payload: any) {
  return api.post('/api/users', payload);
}

export function deleteUser(id: number) {
  return api.delete(`/api/users/${id}`);
}

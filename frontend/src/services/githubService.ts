import { api } from './api';

export async function getGithubUser(username: string) {
  return api.get(`/api/github/users/${username}`);
}

export async function getGithubRepos(username: string) {
  return api.get(`/api/github/users/${username}/repos`);
}

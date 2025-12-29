import axios from 'axios';
import { AppError } from '../errors/AppError';

const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 5000
});

export async function getUser(username: string) {
  if (!username) {
    throw new AppError('Informe um username do GitHub para pesquisar.', 400);
  }

  try {
    const { data } = await githubApi.get(`/users/${username}`);
    return data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new AppError('Usuário não encontrado no GitHub. Verifique o username e tente novamente.', 404);
    }

    throw new AppError('Não foi possível acessar o GitHub no momento. Tente novamente em instantes.', 503);
  }
}

export async function getRepos(username: string) {
  if (!username) {
    throw new AppError('Informe um username do GitHub para listar repositórios.', 400);
  }

  try {
    const { data } = await githubApi.get(`/users/${username}/repos`);

    if (!Array.isArray(data)) {
      throw new AppError('Resposta inválida do GitHub ao listar repositórios. Tente novamente.', 502);
    }
    
    return data.map(repo => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      language: repo.language,
      stars: repo.stargazers_count,
      url: repo.html_url
    }));
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new AppError('Usuário não encontrado no GitHub. Verifique o username e tente novamente.', 404);
    }

    if (error.code === 'ECONNABORTED') {
      throw new AppError('O GitHub demorou para responder. Tente novamente.', 504);
    }

    throw new AppError('Não foi possível acessar o GitHub no momento. Tente novamente em instantes.', 503);
  }
}

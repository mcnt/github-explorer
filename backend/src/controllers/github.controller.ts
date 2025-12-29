import { NextFunction, Request, Response } from 'express';
import * as githubService from '../services/github.service';

export async function getGithubUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await githubService.getUser(req.params.username);
    res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function getGithubRepos(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const repos = await githubService.getRepos(req.params.username);
    res.json(repos);
  } catch (err) {
    next(err);
  }
}

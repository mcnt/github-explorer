import { NextFunction, Request, Response } from 'express';
import * as userService from '../services/user.service';

export async function getUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await userService.listUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const userIdToDelete = Number(req.params.id);
    const loggedUserId = req.user.id;

    await userService.deleteUser(userIdToDelete, loggedUserId);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

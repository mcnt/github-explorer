import { NextFunction, Request, Response } from 'express';
import { authenticate, registerUser } from '../services/auth.service';

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await authenticate(req.body.email, req.body.password);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await registerUser(req.body.name, req.body.email, req.body.password);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

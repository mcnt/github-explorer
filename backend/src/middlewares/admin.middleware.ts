import { Request, Response, NextFunction } from 'express';

export function adminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Acesso negado. Apenas administradores podem acessar este recurso.' });
  }

  next();
}

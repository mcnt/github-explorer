import prisma from '../database/prisma';
import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import { AppError } from '../errors/AppError';

const jwtSecret = process.env.JWT_SECRET as jwt.Secret;
const jwtOptions: SignOptions = {
  expiresIn: (process.env.JWT_EXPIRES_IN || '1d') as SignOptions['expiresIn']
};

export async function registerUser(name: string, email: string, password: string) {
  if (!name || !email || !password) {
    throw new AppError('Preencha nome, email e senha.', 400);
  }

  const emailExists = await prisma.user.findUnique({ where: { email } });

  if (emailExists) {
    throw new AppError('Este email já está cadastrado. Faça login ou use outro email.', 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: 'user'
    }
  });

  const token = jwt.sign(
    { id: user.id, role: user.role },
    jwtSecret,
    jwtOptions
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      role: user.role
    }
  };
}

export async function authenticate(email: string, password: string) {
  if (!email || !password) {
    throw new AppError('Informe email e senha.', 400);
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new AppError('Email ou senha inválidos.', 401);
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    throw new AppError('Email ou senha inválidos.', 401);
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    jwtSecret,
    jwtOptions
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      role: user.role
    }
  };
}

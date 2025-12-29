import prisma from '../database/prisma';
import bcrypt from 'bcrypt';
import { AppError } from '../errors/AppError';

type Role = 'admin' | 'user';

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  role: Role;
}

export async function listUsers() {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true
    }
  });
}

export async function createUser(data: CreateUserDTO) {
  const { name, email, password, role } = data;

  if (!name || !email || !password || !role) {
    throw new AppError('Preencha nome, email, senha e tipo de usuário.', 400);
  }

  const emailExists = await prisma.user.findUnique({
    where: { email }
  });

  if (emailExists) {
    throw new AppError('Este email já está cadastrado. Use outro email.', 409);
  }


  const allowedRoles: Role[] = ['admin', 'user'];

  if (!allowedRoles.includes(role as Role)) {
    throw new AppError('Tipo de usuário inválido.', 400);
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true
    }
  });

  return user;
}

export async function deleteUser(
  userIdToDelete: number,
  loggedUserId: number
) {
  if (!userIdToDelete) {
    throw new AppError('Usuário inválido.', 400);
  }

  if (userIdToDelete === loggedUserId) {
    throw new AppError('Você não pode excluir sua própria conta.', 403);
  }

  const user = await prisma.user.findUnique({
    where: { id: userIdToDelete }
  });

  if (!user) {
    throw new AppError('Usuário não encontrado.', 404);
  }
  if (user.role === 'admin') {
    const adminCount = await prisma.user.count({
      where: { role: 'admin' }
    });

    if (adminCount <= 1) {
      throw new AppError(
        'Não é possível excluir o último usuário admin.',
        403
      );
    }
  }

  await prisma.user.delete({
    where: { id: userIdToDelete }
  });
}

import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();


export async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL!;
  const password = process.env.ADMIN_PASSWORD!;
  const name = process.env.ADMIN_NAME || 'Admin';

  const adminExists = await prisma.user.findUnique({
    where: { email },
  });

  if (adminExists) {
    console.log('✅ Admin já existe');
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: 'admin',
    },
  });

  console.log('🚀 Admin criado com sucesso');
}

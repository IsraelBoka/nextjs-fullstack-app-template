import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { hashPassword } from '../../../lib/auth';
const prisma = new PrismaClient

async function handler(req:NextApiRequest, res:NextApiResponse) {
  if (req.method !== 'POST') {
    return;
  }
  const data = req.body;
  const { email, password } = data;
  if (
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message:
        'Invalid input - password should also be at least 7 characters long.',
    });
    return;
  }

  // prisma check if user with given email already exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  // return error if user already exists
  if (existingUser) {
    res.status(422).json({ message: 'email déjà utilisé' });
    return;
  }

  // hash password
  const hashedPassword = await hashPassword(password);
  console.log(hashedPassword)
  // prisma insert user into database
  const result = await prisma.user.create({
    data: {
      email: email,
      password: hashedPassword,
    },
  });

  // return success message
  res.status(201).json({ message: 'Created user!' });
}

export default handler;

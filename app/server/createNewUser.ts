import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

export default async function createNewUser(email: string, password: string) {
  const prisma = new PrismaClient();

  const user = await prisma.user.create({
    data: {
      email: email,
      encryptedPassword: await bcrypt.hash(password, 10),
    },
  });

  return user;
}

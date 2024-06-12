import bcrypt from "bcrypt";
import client from "./client";

export default async function createNewUser(email: string, password: string) {

  const user = await client.user.create({
    data: {
      email: email,
      encryptedPassword: await bcrypt.hash(password, 10),
    },
  });

  return user;
}

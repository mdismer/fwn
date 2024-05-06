import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { sessionStorage } from "~/services/session.server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

type User = {
  email: string;
  id: string;
};

async function login(email?: string, password?: string) {
  const prisma = new PrismaClient();
  if (!email || !password) {
    throw new Error("No password or email provided");
  }

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("No user found");
  }

  console.log(user);

  const passwordMatches = await bcrypt.compare(
    password,
    user.encryptedPassword
  );

  if (!passwordMatches) {
    throw new Error("Wrong password");
  }

  return { email: user.email, id: user.id };
}

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export const authenticator = new Authenticator<User>(sessionStorage);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get("email");
    const password = form.get("password");
    const user = await login(email?.toString(), password?.toString());
    // the type of this user must match the type you pass to the Authenticator
    // the strategy will automatically inherit the type if you instantiate
    // directly inside the `use` method
    return user;
  }),
  // each strategy has a name and can be changed to use another one
  // same strategy multiple times, especially useful for the OAuth2 strategy.
  "user-pass"
);

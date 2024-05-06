import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import classes from "./login.module.css";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, redirect } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

// First we create our UI with the form doing a POST and the inputs with the
// names we are going to use in the strategy
export default function Screen() {
  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already have an account?{" "}
        <Anchor size="sm" component={Link} to="/login">
          Login
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Form method="post">
          <TextInput
            label="Email"
            placeholder="you@mantine.dev"
            name="email"
            type="email"
            required
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            name="password"
          />
          <Group justify="center" mt="lg">
            <Anchor component={Link} size="sm" to="/forgot-password">
              Forgot password?
            </Anchor>
          </Group>
          <Button type="submit" fullWidth mt="xl">
            Sign up
          </Button>
        </Form>
      </Paper>
    </Container>
  );
}

// Second, we need to export an action function, here we will use the
// `authenticator.authenticate method`
export async function action({ request }: ActionFunctionArgs) {
  // we call the method with the name of the strategy we want to use and the
  // request object, optionally we pass an object with the URLs we want the user
  // to be redirected to after a success or a failure

  const formData = await request.formData();

  const email = formData.get("email");
  const password = formData.get("password");

  const prisma = new PrismaClient();

  console.log(password, email);

  await prisma.user.create({
    data: {
      email: email?.toString() ?? "",
      encryptedPassword: await bcrypt.hash(password?.toString() ?? "", 10),
    },
  });

  return redirect('/login')
}

// Finally, we can export a loader function where we check if the user is
// authenticated with `authenticator.isAuthenticated` and redirect to the
// dashboard if it is or return null if it's not
export async function loader({ request }: LoaderFunctionArgs) {
  // If the user is already authenticated redirect to /dashboard directly
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/dashboard",
  });
}

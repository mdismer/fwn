import {
  Button,
  Container,
  Group,
  Paper,
  TextInput,
  Title,
} from "@mantine/core";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { Form } from "@remix-run/react";
import client from "~/server/client";
import { authenticator } from "~/services/auth.server";

export function loader({ request }: LoaderFunctionArgs) {
  return authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
}

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();

  const name = form.get("name")?.toString() ?? "";

  const user = await authenticator.isAuthenticated(request);

  const campaign =  await client.campaign.create({
    data: {
      name,
      ownerId: user?.id ?? '',
    },
  });

  return redirect(`/campaigns/${campaign.id}/dashboard`);
}

export default function Screen() {
  return (
    <Container size={420} my={40}>
      <Title>Create a new Campaign</Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Form method="POST">
          <TextInput name="name" label="Name" required />
          <Group justify="center" mt="lg">
            <Button type="submit">Create</Button>
          </Group>
        </Form>
      </Paper>
    </Container>
  );
}

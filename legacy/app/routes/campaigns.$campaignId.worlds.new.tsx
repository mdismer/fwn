import { Button, Paper, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { useSubmit } from "@remix-run/react";
import client from "~/server/client";

type WorldForm = {
  name: string;
};

export async function action({ request, params }: ActionFunctionArgs) {
  const form = await request.formData();

  const name = form.get('name')?.toString() ?? ''
  const campaignId  = params.campaignId as string

  await client.world.create({
    data: {
      name,
      campaignId
    }
  })

  return redirect(`/campaigns/${campaignId}/worlds`)
}

export default function Screen() {
  const submit = useSubmit();

  const form = useForm<WorldForm>({
    mode: "controlled",
    initialValues: {
      name: "",
    },
  });

  return (
    <>
      <Title>New World</Title>
      <Paper>
        <form
          onSubmit={form.onSubmit((values) =>
            submit(values, { method: "POST" })
          )}
        >
          <TextInput label="Name" name="name" {...form.getInputProps("name")} />
          <Button type="submit">Create</Button>
        </form>
      </Paper>
    </>
  );
}

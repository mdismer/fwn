import { Button, Container, Stack, Title } from "@mantine/core";
import { JSONContent } from "@tiptap/react";
import { useForm } from "@mantine/form";

import { useLoaderData, useSubmit } from "@remix-run/react";
import { ActionFunctionArgs, LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";
import client from "~/server/client";
import FactionBaseData, { statMap } from "~/components/factions/forms/FactionBaseData";
import { FactionForm } from "~/types/FactionForm";
import { FormEvent, useState } from "react";
import { FactionAssetList } from "~/components/factions/forms/FactionAssetsList";

type LoaderData = {
  worlds: {
    name: string;
    id: string;
  }[];
};

export async function loader({ request, params }: LoaderFunctionArgs) {
  const user = authenticator.isAuthenticated(request);
  if (!user) {
    return redirect("/login");
  }

  const worlds = await client.world.findMany({
    where: {
      campaignId: params.campaignId,
    },
    select: {
      id: true,
      name: true,
    },
  });

  const responseData: LoaderData = { worlds };

  return json(responseData);
}

export async function action({request, params}: ActionFunctionArgs) {
  const form = await request.formData()
  form.forEach((value, key) => {
    console.log(key, value)
  })
  return null 
}

export default function Screen() {
  const defaultContent: JSONContent = { content: [], type: "doc" };
  const submit = useSubmit()
  const data = useLoaderData<LoaderData>();
  const [step, setStep] = useState(1)
  const form = useForm<FactionForm>({
    mode: "controlled",
    initialValues: {
      name: "",
      description: defaultContent,
      size: "Minor",
      cunning: statMap["Minor"][0],
      force: statMap["Minor"][1],
      wealth: statMap["Minor"][2],
      goal: "",
      assets: []
    },
  });

  function handleNext(values: FactionForm) {
    if (step === 1) {
      setStep(2)
    } else if (step === 2) {
    
        submit(values, { method: "POST" })
    
    }
  }

  return (
    <Container size="lg">
      <Title>New Faction</Title>
      <form
          onSubmit={form.onSubmit((values) => handleNext(values))}
      >
      {step === 1 && <FactionBaseData form={form} defaultWorlds={data.worlds} /> }
      {step === 2 && <FactionAssetList assets={form.values.assets} /> }
      <Stack>
        {step > 1 && <Button onClick={() => setStep((current) => current - 1)}>Back</Button>}
        <Button type="submit">Next</Button>
      </Stack>
      </form>
    </Container>
  );
}

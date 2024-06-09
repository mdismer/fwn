import { Button, Container, Stack, Title } from "@mantine/core";
import { JSONContent } from "@tiptap/react";
import { useForm } from "@mantine/form";

import { useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";
import client from "~/server/client";
import FactionBaseData, { statMap } from "~/components/factions/forms/FactionBaseData";
import { FactionForm } from "~/types/FactionForm";
import { useState } from "react";
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

export default function Screen() {
  const defaultContent: JSONContent = { content: [], type: "doc" };
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

  function handleNext() {
    if (step === 1) {
      setStep(2)
    }
  }

  return (
    <Container size="lg">
      <Title>New Faction</Title>
      {step === 1 && <FactionBaseData form={form} defaultWorlds={data.worlds} /> }
      {step === 2 && <FactionAssetList assets={form.values.assets} /> }
      <Stack>
        {step > 1 && <Button onClick={() => setStep((current) => current - 1)}>Back</Button>}
        <Button onClick={handleNext}>Next</Button>
      </Stack>
    </Container>
  );
}

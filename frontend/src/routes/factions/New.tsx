import { gql, useMutation } from "@apollo/client";
import { Container, Stack, Title, Button } from "@mantine/core";
import { JSONContent } from "@tiptap/react";
import {useForm, zodResolver} from "@mantine/form";
import { useState } from "react";
import { FactionForm } from "~/types/FactionForm.ts";
import FactionBaseData, {
} from "~/component/factions/forms/FactionBaseData.tsx";
import { FactionAssetList } from "~/component/factions/FactionAssetList.tsx";
import { useParams } from "react-router-dom";
import statMap from "~/util/factions/statMap.ts";
import {z} from "zod";

const CREATE_FACTION = gql(`
mutation createFaction(
  $campaignId: ID!
  $name: String!
  $description: String
  $force: Int!
  $wealth: Int!
  $cunning: Int!
  $maxHp: Int!
  $worldId: ID!
) {
  factionCreate(
    input: {
      clientMutationId: "createFaction"
      factionInput: {
        force: $force
        name: $name
        description: $description
        wealth: $wealth
        cunning: $cunning
        maxHp: $maxHp
        campaignId: $campaignId
        worldId: $worldId
      }
    }
  ) {
    faction {
      id
    }
  }
}`);

const defaultContent: JSONContent = { content: [], type: "doc" };

const schema = z.object({
  assets: z.array(z.object({})),
  cunning: z.coerce.number(),
  name: z.string().min(1).max(255),
  description: z.object({}),
  goal: z.string(),
  force: z.coerce.number(),
  size: z.string(),
  wealth: z.coerce.number(),
  homeWorld: z.string()
})

export default function NewFaction() {
  const [createFaction] = useMutation(CREATE_FACTION);
  const { campaignId } = useParams<{ campaignId: string }>();
  const [step, setStep] = useState(1);
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
      assets: [],
    },
    validate: zodResolver(schema),
  });

  async function handleNext(values: FactionForm) {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      await createFaction({
        variables: values,
      });
    }
  }

  return (
    <Container size="lg">
      <Title>New Faction</Title>
      <form onSubmit={form.onSubmit((values) => handleNext(values))}>
        {step === 1 && (
          <FactionBaseData form={form} campaignId={campaignId ?? ""} />
        )}
        {step === 2 && <FactionAssetList assets={form.values.assets} />}
        <Stack>
          {step > 1 && (
            <Button onClick={() => setStep((current) => current - 1)}>
              Back
            </Button>
          )}
          <Button type="submit">Next</Button>
        </Stack>
      </form>
    </Container>
  );
}

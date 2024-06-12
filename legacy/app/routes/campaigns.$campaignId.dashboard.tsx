import { Anchor, Container, Paper } from "@mantine/core";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import client from "~/server/client";

export async function loader({ params }: LoaderFunctionArgs) {
  const { campaignId } = params;

  const factionCount = await client.faction.count({
    where: {
      campaignId,
    },
  });

  return json({ hasFactions: factionCount > 0, campaignId });
}

export default function Screen() {
  const { hasFactions, campaignId } = useLoaderData<{
    hasFactions: boolean;
    campaignId: string;
  }>();

  return (
    <Container>
      {!hasFactions && (
        <Paper mt={20}>
          To start create your first{" "}
          <Anchor component={Link} to={`/campaigns/${campaignId}/factions/new`}>
            {" "}
            faction
          </Anchor>
        </Paper>
      )}
    </Container>
  );
}

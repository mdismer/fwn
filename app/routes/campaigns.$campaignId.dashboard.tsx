import { Anchor, Container, Paper } from "@mantine/core";
import { PrismaClient } from "@prisma/client";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

export async function loader({ params }: LoaderFunctionArgs) {
  const { campaignId } = params;

  const prisma = new PrismaClient();

  const factionCount = await prisma.faction.count({
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

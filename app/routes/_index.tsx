import { Anchor, Container, Stack, Title } from "@mantine/core";
import { PrismaClient } from "@prisma/client";
import {
  json,
  redirect,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request);

  if (!user) {
    return redirect("/login");
  }

  const prisma = new PrismaClient();

  const campaigns = await prisma.campaign.findMany({
    where: {
      ownerId: user.id,
    },
    select: {
      id: true,
      name: true,
    },
  });

  if (campaigns.length === 0) {
    return redirect("/campaigns/new");
  }

  if (campaigns.length === 1) {
    return redirect(`/campaigns/${campaigns[0].id}/dashboard`);
  }

  return json(campaigns);
}

export default function Index() {
  const data = useLoaderData<Array<{ id: string; name: string }>>();

  return (
    <Container>
      <Title>Select Campaign</Title>
      <Stack>
        {data.map((c) => (
          <Anchor key={c.id} component={Link} to={`/campaigns/${c.id}/dashboard`}>
            {c.name}
          </Anchor>
        ))}
      </Stack>
    </Container>
  );
}

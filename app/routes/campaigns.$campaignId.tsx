import { Outlet, useLoaderData } from "@remix-run/react";
import { useDisclosure } from "@mantine/hooks";
import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";
import Navbar from "~/components/Navbar";
import { AppShell, Burger } from "@mantine/core";
import client from "~/server/client";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request);

  if (!user) {
    return redirect("/login");
  }

  const { campaignId } = params;

  const campaign = await client.campaign.findUnique({
    where: {
      id: campaignId,
      ownerId: user?.id,
    },
  });

  if (!campaign) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }

  return json(campaign);
}

export default function Screen() {
  const [opened, { toggle }] = useDisclosure();
  const data = useLoaderData<{ id: string }>();

  const baseUrl = `/campaigns/${data.id}`;

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 80,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <div>Logo</div>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Navbar baseUrl={baseUrl} />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

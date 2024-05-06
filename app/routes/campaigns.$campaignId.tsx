import { Center, Stack, Tooltip, UnstyledButton, rem } from "@mantine/core";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import {
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconCalendarStats,
  IconUser,
  IconSettings,
  IconLogout,
  IconSwitchHorizontal,
} from "@tabler/icons-react";

import classes from "./CampaignLayout.module.css";
import { useState } from "react";
import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";
import { PrismaClient } from "@prisma/client";

interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  active?: boolean;
  to: string;
}

function NavbarLink({ icon: Icon, label, active, to }: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        component={Link}
        to={to}
        className={classes.link}
        data-active={active || undefined}
      >
        <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request);

  if (!user) {
    return redirect("/login");
  }

  const { campaignId } = params;

  const prisma = new PrismaClient();

  const campaign = await prisma.campaign.findUnique({
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
  const data = useLoaderData<{ id: string }>();

  const baseUrl = `/campaigns/${data.id}/dashboard`;

  const mockdata = [
    { icon: IconHome2, label: "Home", to: baseUrl },
    {
      icon: IconDeviceDesktopAnalytics,
      label: "Factions",
      to: `${baseUrl}/factions`,
    },
    { icon: IconCalendarStats, label: "Worlds", to: `${baseUrl}/worlds` },
    { icon: IconUser, label: "Account", to: "/account" },
  ];

  const links = mockdata.map((link) => (
    <NavbarLink {...link} key={link.label} to={link.to} />
  ));

  return (
    <div className={classes.root}>
      <nav className={classes.navbar}>
        <Center></Center>

        <div className={classes.navbarMain}>
          <Stack justify="center" gap={0}>
            {links}
          </Stack>
        </div>

        <Stack justify="center" gap={0}>
          <NavbarLink
            icon={IconSwitchHorizontal}
            label="Change account"
            to="/switch-account"
          />
          <NavbarLink icon={IconLogout} label="Logout" to="/logout" />
        </Stack>
      </nav>
      <Outlet />
    </div>
  );
}

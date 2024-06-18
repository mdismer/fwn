import { Center, Stack, Tooltip, UnstyledButton, rem } from "@mantine/core";
import {
  IconCalendarStats,
  IconDeviceDesktopAnalytics,
  IconHome2,
  IconLogout,
  IconSwitchHorizontal,
  IconUser,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import classes from "./Navbar.module.css";
import { useKeycloak } from "@react-keycloak/web";

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

type Props = { baseUrl: string };

export default function Navbar({ baseUrl }: Props) {
    const {keycloak} = useKeycloak()
  const mockdata = [
    { icon: IconHome2, label: "Home", to: `${baseUrl}/dashboard` },
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
        <Tooltip
          label="Logout"
          position="right"
          transitionProps={{ duration: 0 }}
        >
          <UnstyledButton
            className={classes.link}
            onClick={() =>keycloak.logout()}
          >
            <IconLogout style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
          </UnstyledButton>
        </Tooltip>
      </Stack>
    </nav>
  );
}

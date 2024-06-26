import { AppShell, Burger, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet, useParams } from "react-router-dom";
import Navbar from "../component/Navbar";
import { useKeycloak } from "@react-keycloak/web";

export default function Root() {
  const { campaignId } = useParams();
  const [opened, { toggle }] = useDisclosure();
  const baseUrl = `/campaigns/${campaignId}`;

  const { keycloak, initialized } = useKeycloak();

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
        {keycloak.authenticated && <Navbar baseUrl={baseUrl} />}
      </AppShell.Navbar>
      {initialized && (
        <AppShell.Main>
          {!keycloak.authenticated && (
            <Button onClick={() => keycloak.login()}>Login</Button>
          )}
          {keycloak.authenticated && <Outlet />}
        </AppShell.Main>
      )}
    </AppShell>
  );
}

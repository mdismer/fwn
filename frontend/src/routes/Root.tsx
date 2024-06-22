import {AppShell, Burger, Button} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {Navigate, Outlet, useParams} from "react-router-dom";
import Navbar from "../component/Navbar";
import {useKeycloak} from "@react-keycloak/web";
import {useQuery} from "@apollo/client";
import {gql} from "../__generated__";

const getCampaigns = gql(`
  query GetCampaigns {
  campaigns {
    id
    name
  }
}

`)

export default function Root() {
    const {campaignId} = useParams();
    const [opened, {toggle}] = useDisclosure();
    const baseUrl = `/campaigns/${campaignId}`;

    const {keycloak, initialized} = useKeycloak();
    const {data, loading} = useQuery(getCampaigns, {initialFetchPolicy: 'no-cache'})
    

    if (loading ||!data) {
        return <div>Loading</div>
    }

    if (data.campaigns.length === 0) {
        return <Navigate to="/campaigns/new"/>
    }

    if (data.campaigns.length === 1) {
        return <Navigate to={`/campaigns/${data.campaigns[0].id}`} />
    }

    return (
        <AppShell
            header={{height: 60}}
            navbar={{
                width: 80,
                breakpoint: "sm",
                collapsed: {mobile: !opened},
            }}
            padding="md"
        >
            <AppShell.Header>
                <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm"/>
                <div>Logo</div>
            </AppShell.Header>
            <AppShell.Navbar p="md">
                {keycloak.authenticated && <Navbar baseUrl={baseUrl}/>}
            </AppShell.Navbar>
            {initialized && (
                <AppShell.Main>
                    {!keycloak.authenticated && (
                        <Button onClick={() => keycloak.login()}>Login</Button>
                    )}
                    {keycloak.authenticated && <Outlet/>}
                </AppShell.Main>
            )}
        </AppShell>
    );
}

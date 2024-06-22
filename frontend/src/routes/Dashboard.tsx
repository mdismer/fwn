import {Anchor, Container, Paper} from "@mantine/core";
import {gql} from "../__generated__";
import {useQuery} from "@apollo/client";
import {Link, useParams} from "react-router-dom";

const LOAD_FACTIONS = gql(`
query loadFactions($campaignId: ID!) {
  factions(campaignId: $campaignId) {
    id
    name
  }
}
`)

export default function Dashboard() {
    const {campaignId} = useParams()

    const {data, loading} = useQuery(LOAD_FACTIONS)

    if (loading ||!data) {
        return <div>Loading....</div>
    }

    const hasFactions = data.factions.length > 0

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

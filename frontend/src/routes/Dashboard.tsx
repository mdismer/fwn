import { Anchor, Container, Paper } from "@mantine/core";
import { Link, useParams } from "react-router-dom";

export default function Dashboard() {
  const { campaignId } = useParams<{ campaignId: string }>();

  const loading = true;
  const data: unknown[] = [];

  if (loading || !data) {
    return <div>Loading....</div>;
  }

  const hasFactions = data.length > 0;

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

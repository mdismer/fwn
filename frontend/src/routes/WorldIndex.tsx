import { Container, Title, Table, Button } from "@mantine/core";
import { Link, useParams } from "react-router-dom";

export default function WorldIndex() {
  const { campaignId } = useParams();

  const worlds: any[] = [];

  return (
    <Container>
      <Title>World</Title>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Td colSpan={2}>Name</Table.Td>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {worlds.map((world) => (
            <Table.Tr key={world.id}>
              <Table.Td>{world.name}</Table.Td>
              <Table.Td></Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      <Button component={Link} to={`/campaigns/${campaignId}/worlds/new`}>
        New Wolrd
      </Button>
    </Container>
  );
}

import { Button, Container, Table, Title } from "@mantine/core";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import client from "~/server/client";

type WorldDto ={
    id: string;
    name: string;
}

export async function loader({ params }: LoaderFunctionArgs) {
  const { campaignId } = params;

  const worlds = await client.world.findMany({
    where: {
      campaignId,
    },
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: "desc",
    },
  });

  return json({
    campaignId,
    worlds
  })
}

export default function Screen() {
    const {campaignId, worlds} = useLoaderData<{campaignId: string, worlds: WorldDto[]}>()

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
                    {worlds.map((world)=> (
                        <Table.Tr key={world.id}>
                            <Table.Td>{world.name}</Table.Td>
                            <Table.Td></Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
            <Button component={Link} to={`/campaigns/${campaignId}/worlds/new`}>New Wolrd</Button>
        </Container>
    )
}

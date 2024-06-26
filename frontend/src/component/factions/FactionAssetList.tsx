import { Table } from "@mantine/core";
import { AssetDto } from "~/types/FactionForm";

export type Props = {
  assets: AssetDto[];
};

export function FactionAssetList({ assets }: Props) {
  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Name</Table.Th>
          <Table.Th colSpan={2}>World</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {assets.map((asset) => (
          <Table.Tr key={asset.id}>
            <Table.Td>{asset.type}</Table.Td>
            <Table.Td>{asset.world.name}</Table.Td>
            <Table.Td></Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}

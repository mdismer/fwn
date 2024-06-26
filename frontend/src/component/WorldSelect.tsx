import { useMutation, useQuery } from "@apollo/client";
import { Combobox, Input, InputBase, useCombobox } from "@mantine/core";
import { useCallback, useState } from "react";
import { gql } from "~/__generated__";

const GET_WORLDS = gql(`
query GetWorlds($campaignId: ID!) {
  worlds(campaignId: $campaignId) {
    id
    name
  }
}
`);

const CREATE_WORLD = gql(`
mutation CreateWorld($campaignId: ID!, $name: String!) {
  worldCreate(
    input: {
      clientMutationId: "CreateWorld"
      input: { campaignId: $campaignId, name: $name }
    }
  ) {
    world {
      id
      name
    }
  }
}

`);

type Props = {
  label: string;
  value?: string;
  onChange: (value: string) => void;
  campaignId: string;
};

export default function WorldSelect({
  onChange,
  value,
  label,
  campaignId,
}: Props) {
  const { data, loading } = useQuery(GET_WORLDS, { variables: { campaignId } });
  const [createWorld] = useMutation(CREATE_WORLD, {
    update(cache, { data: addWorld }) {
      cache.modify({
        fields: {
          worlds(existingWorlds = []) {
            const newWorldReg = cache.writeFragment({
              data: addWorld?.worldCreate?.world,
              fragment: gql(`
                          fragment NewWorld on World {
                          id
                          name
                          }
                          `),
            });
            return [...existingWorlds, newWorldReg];
          },
        },
      });
    },
  });

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [search, setSearch] = useState("");

  const handleOptionSubmit = useCallback(
    async (val: string) => {
      if (val === "$create") {
        const result = await createWorld({ variables: { campaignId, name: search } });
        if (result.data?.worldCreate?.world) {
            onChange(result.data.worldCreate.world.id);
        }
      } else {
        onChange(val);
        const world = data?.worlds?.find((w) => w.id === val)
        setSearch(world?.name ?? '');
      }

      combobox.closeDropdown();
    },
    [campaignId, combobox, createWorld, data?.worlds, onChange, search],
  );

  if (loading || !data) {
    return <div>Loading</div>;
  }

  const exactOptionMatch = data.worlds.some((item) => item.name === search);
  const filteredOptions = exactOptionMatch
    ? data.worlds
    : data.worlds.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase().trim()),
      );

  const options = filteredOptions.map((item) => (
    <Combobox.Option value={item.id} key={item.id}>
      {item.name}
    </Combobox.Option>
  ));

  const selectedOption = data.worlds.find(w => w.id === value)

  return (
    <Input.Wrapper>
      <Input.Label>{label}</Input.Label>
      <Combobox
        store={combobox}
        withinPortal={false}
        onOptionSubmit={handleOptionSubmit}
      >
        <Combobox.Target>
          <InputBase
              component="button"
              type="button"
            rightSection={<Combobox.Chevron />}
            value={search}
            onChange={(event) => {
              combobox.openDropdown();
              combobox.updateSelectedOptionIndex();
              setSearch(event.currentTarget.value);
            }}
            onClick={() => combobox.openDropdown()}
            onFocus={() => combobox.openDropdown()}
            onBlur={() => {
              combobox.closeDropdown();
              setSearch(value || "");
            }}
            rightSectionPointerEvents="none"
          >
              {selectedOption ? (
                  selectedOption.name
              ) : (
                  <Input.Placeholder>Pick value</Input.Placeholder>
              )}
          </InputBase>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>
            {options}
            {!exactOptionMatch && search.trim().length > 0 && (
              <Combobox.Option value="$create">
                + Create {search}
              </Combobox.Option>
            )}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </Input.Wrapper>
  );
}

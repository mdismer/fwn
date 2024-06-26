import { Combobox, Input, InputBase, useCombobox } from "@mantine/core";
import { useCallback, useState } from "react";

const defaultGoals = [
  "Military Conquest",
  "Commercial Expansion",
  "Intelligence Coup",
  "Planetary Seizure",
  "Expand Influence",
  "Blood the Enemy",
  "Peaceable Kingdom",
  "Destroy the Foe",
  "Inside Enemy Territory",
  "Invincible Valor",
  "Wealth of Worlds",
];

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

export default function GoalSelect({ label, value, onChange }: Props) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const [data, setData] = useState(
    defaultGoals.sort((a, b) => a.localeCompare(b)),
  );
  const [search, setSearch] = useState("");

  const exactOptionMatch = data.some((item) => item === search);
  const filteredOptions = exactOptionMatch
    ? data
    : data.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase().trim()),
      );

  const options = filteredOptions.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  const handleOptionSubmit = useCallback(
    (val: string) => {
      if (val === "$create") {
        setData((current) => [...current, search]);
        onChange(search);
      } else {
        onChange(val);
        setSearch(val);
      }

      combobox.closeDropdown();
    },
    [combobox, onChange, search],
  );

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
            placeholder="Search value"
            rightSectionPointerEvents="none"
          />
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

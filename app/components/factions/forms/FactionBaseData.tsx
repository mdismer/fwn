import {
  Paper,
  TextInput,
  Select,
  Grid,
  Input,
  Combobox,
  InputBase,
  useCombobox,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { JSONContent } from "@tiptap/react";
import { useState } from "react";
import GoalSelect from "~/components/GoalSelect";
import TextEditor from "~/components/TextEditor";
import { FactionForm, FactionSize } from "~/types/FactionForm";

type Props = {
  form: UseFormReturnType<FactionForm, (values: FactionForm) => FactionForm>;
  defaultWorlds: Array<{ id: string; name: string }>;
};

const sizes: FactionSize[] = ["Minor", "Major", "Regional Hegemon"];

export const statMap: Record<FactionSize, string[]> = {
  Minor: ["4", "3", "1"],
  Major: ["6", "5", "2"],
  "Regional Hegemon": ["8", "7", "4"],
};

const defaultContent: JSONContent = {};

export default function FactionBaseData({ form, defaultWorlds }: Props) {
  const [search, setSearch] = useState("");
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [worlds, setWorlds] = useState(() => [...defaultWorlds]);

  const exactOptionMatch = worlds.some((item) => item.name === search);
  const filteredOptions = exactOptionMatch
    ? worlds
    : worlds.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase().trim())
      );

  const options = filteredOptions.map((world) => (
    <Combobox.Option key={world.id} value={world.id}>
      {world.name}
    </Combobox.Option>
  ));

  function handleSizeChanged(value: string | null) {
    if (value) {
      const [force, cunning, wealth] = statMap[value as FactionSize];
      form.setFieldValue("force", force);
      form.setFieldValue("cunning", cunning);
      form.setFieldValue("wealth", wealth);
    }
    form.setFieldValue("size", value as FactionSize);
  }

  function handleForceChange(value: string | null) {
    if (value) {
      const stats = statMap[form.values.size];
      const [cunning, wealth] = stats.filter((item) => item !== value);
      form.setFieldValue("cunning", cunning);
      form.setFieldValue("wealth", wealth);
      form.setFieldValue("force", value);
    }
  }

  return (
    <Paper>
      <TextInput label="Name" name="name" {...form.getInputProps("name")} />
      <Select
        label="Size"
        data={sizes}
        onChange={handleSizeChanged}
        value={form.values.size}
      />
      <Grid>
        <Grid.Col span={4}>
          <Select
            data={statMap[form.values.size]}
            label="Force"
            name="force"
            value={form.values.force}
            onChange={handleForceChange}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <Select
            data={statMap[form.values.size].filter(
              (item) => item !== form.values.force
            )}
            label="Cunning"
            {...form.getInputProps("cunning")}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <Select
            data={statMap[form.values.size].filter(
              (item) =>
                item !== form.values.force && item !== form.values.cunning
            )}
            label="Wealth"
            {...form.getInputProps("wealth")}
          />
        </Grid.Col>
      </Grid>
      <Input.Wrapper label="Homeworld">
        <Combobox
          store={combobox}
          withinPortal={false}
          onOptionSubmit={(val) => {
            if (val === "$create") {
              const newWorld = { id: "", name: search };

              setWorlds((current) => [
                ...current.filter((w) => w.id !== ""),
                newWorld,
              ]);
              form.setFieldValue("homeWorld", newWorld);
            } else {
              const world = worlds.find((w) => w.id === val);
              form.setFieldValue("homeWorld", world);
              setSearch(val);
            }

            combobox.closeDropdown();
          }}
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
                setSearch(form.values.homeWorld?.name || "");
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

      <GoalSelect
        label="Goal"
        value={form.values.goal}
        onChange={(goal) => form.setFieldValue("goal", goal)}
      />

      <TextEditor
        content={defaultContent}
        onChange={(value) => form.setFieldValue("description", value)}
      />
    </Paper>
  );
}

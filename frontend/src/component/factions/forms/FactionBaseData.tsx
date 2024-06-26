import { Paper, TextInput, Select, Grid } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { JSONContent } from "@tiptap/react";
import GoalSelect from "~/component/GoalSelect.tsx";
import TextEditor from "~/component/TextEditor.tsx";
import { FactionForm, FactionSize } from "~/types/FactionForm.ts";
import WorldSelect from "~/component/WorldSelect.tsx";

type Props = {
  form: UseFormReturnType<FactionForm, (values: FactionForm) => FactionForm>;
  campaignId: string;
};

const sizes: FactionSize[] = ["Minor", "Major", "Regional Hegemon"];

export const statMap: Record<FactionSize, string[]> = {
  Minor: ["4", "3", "1"],
  Major: ["6", "5", "2"],
  "Regional Hegemon": ["8", "7", "4"],
};

const defaultContent: JSONContent = {};

export default function FactionBaseData({ form, campaignId }: Props) {
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
              (item) => item !== form.values.force,
            )}
            label="Cunning"
            {...form.getInputProps("cunning")}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <Select
            data={statMap[form.values.size].filter(
              (item) =>
                item !== form.values.force && item !== form.values.cunning,
            )}
            label="Wealth"
            {...form.getInputProps("wealth")}
          />
        </Grid.Col>
      </Grid>
      <WorldSelect
        campaignId={campaignId}
        label="Homeworld"
        onChange={(goal) => form.setFieldValue("homeWorld", goal)}
        value={form.values.homeWorld}
      />

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

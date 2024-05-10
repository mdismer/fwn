import { Combobox, useCombobox } from "@mantine/core";

export default function GoalSelect() {
  const combobox = useCombobox();

  return <Combobox store={combobox}></Combobox>;
}

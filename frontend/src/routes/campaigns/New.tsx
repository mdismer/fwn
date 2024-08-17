import {
  Container,
  Title,
  Paper,
  TextInput,
  Group,
  Button,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import useCampaignAPI from "~/hooks/useCampaignApi";

const schema = z.object({
  name: z.string().min(2, { message: "Name should have at least 2 letters" }),
});

export default function NewCampaign() {
  const api = useCampaignAPI()
  const navigate = useNavigate()
  const form = useForm({
    mode: "controlled",
    initialValues: {
      name: "",
    },
    validate: zodResolver(schema),
  });

  async function handleSubmit(values: typeof form.values) {
    await api.campaignsCreate({name: values.name})
    navigate("/");
  }

  return (
    <Container size={420} my={40}>
      <Title>Create a new Campaign</Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            name="name"
            label="Name"
            required
            {...form.getInputProps("name")}
          />
          <Group justify="center" mt="lg">
            <Button type="submit">Create</Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}

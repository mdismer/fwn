import {
  Combobox,
  Container,
  Grid,
  Input,
  InputBase,
  Paper,
  Select,
  TextInput,
  Title,
  useCombobox,
} from "@mantine/core";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { JSONContent, useEditor } from "@tiptap/react";
import { useForm } from "@mantine/form";

import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";
import { PrismaClient } from "@prisma/client";

type FactionSize = "Minor" | "Major" | "Regional Hegemon";

type FactionForm = {
  name: string;
  size: FactionSize;
  description: JSONContent;
  wealth: string;
  cunning: string;
  force: string;
  homeWorld?: {
    name: string;
    id: string;
  };
};

const sizes: FactionSize[] = ["Minor", "Major", "Regional Hegemon"];

const statMap: Record<FactionSize, string[]> = {
  Minor: ["4", "3", "1"],
  Major: ["6", "5", "2"],
  "Regional Hegemon": ["8", "7", "4"],
};

type LoaderData = {
  worlds: {
    name: string;
    id: string;
  }[];
};

export async function loader({ request, params }: LoaderFunctionArgs) {
  const user = authenticator.isAuthenticated(request);
  if (!user) {
    return redirect("/login");
  }

  const prisma = new PrismaClient();

  const worlds = await prisma.world.findMany({
    where: {
      campaignId: params.campaignId,
    },
    select: {
      id: true,
      name: true,
    },
  });

  const responseData: LoaderData = { worlds };

  return json(responseData);
}

export default function Screen() {
  const defaultContent: JSONContent = { content: [], type: "doc" };
  const data = useLoaderData<LoaderData>();
  const [search, setSearch] = useState("");
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [worlds, setWorlds] = useState(() => [...data.worlds]);

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

  const form = useForm<FactionForm>({
    mode: "controlled",
    initialValues: {
      name: "",
      description: defaultContent,
      size: "Minor",
      cunning: statMap["Minor"][0],
      force: statMap["Minor"][1],
      wealth: statMap["Minor"][2],
    },
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: defaultContent,
    onUpdate: () => {
      form.setFieldValue("description", editor?.getJSON() ?? {});
    },
  });

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
    <Container size="lg">
      <Title>New Faction</Title>
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

        <RichTextEditor mt={8} editor={editor}>
          <RichTextEditor.Toolbar sticky stickyOffset={60}>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Bold />
              <RichTextEditor.Italic />
              <RichTextEditor.Underline />
              <RichTextEditor.Strikethrough />
              <RichTextEditor.ClearFormatting />
              <RichTextEditor.Highlight />
              <RichTextEditor.Code />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.H1 />
              <RichTextEditor.H2 />
              <RichTextEditor.H3 />
              <RichTextEditor.H4 />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Blockquote />
              <RichTextEditor.Hr />
              <RichTextEditor.BulletList />
              <RichTextEditor.OrderedList />
              <RichTextEditor.Subscript />
              <RichTextEditor.Superscript />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Link />
              <RichTextEditor.Unlink />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.AlignLeft />
              <RichTextEditor.AlignCenter />
              <RichTextEditor.AlignJustify />
              <RichTextEditor.AlignRight />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Undo />
              <RichTextEditor.Redo />
            </RichTextEditor.ControlsGroup>
          </RichTextEditor.Toolbar>

          <RichTextEditor.Content style={{ minHeight: "400px" }} />
        </RichTextEditor>
      </Paper>
    </Container>
  );
}

import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable, createCookieSessionStorage, redirect, json } from "@remix-run/node";
import { RemixServer, Link, Outlet, Meta, Links, ScrollRestoration, Scripts, useRouteError, useLoaderData, Form, redirect as redirect$1 } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { Container, Title, Text, Group, Button, ColorSchemeScript, MantineProvider, useCombobox, Combobox, Input, InputBase, Paper, TextInput, Select, Grid, Anchor, Center, Stack, Tooltip, UnstyledButton, rem, AppShell, Burger, PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState, useCallback, createElement } from "react";
import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { Link as Link$1, RichTextEditor } from "@mantine/tiptap";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import SubScript from "@tiptap/extension-subscript";
import Highlight from "@tiptap/extension-highlight";
import { useDisclosure } from "@mantine/hooks";
import { IconSwitchHorizontal, IconLogout, IconHome2, IconDeviceDesktopAnalytics, IconCalendarStats, IconUser } from "@tabler/icons-react";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
function Illustration(props) {
  return /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 362 145", ...props, children: /* @__PURE__ */ jsx(
    "path",
    {
      fill: "currentColor",
      d: "M62.6 142c-2.133 0-3.2-1.067-3.2-3.2V118h-56c-2 0-3-1-3-3V92.8c0-1.333.4-2.733 1.2-4.2L58.2 4c.8-1.333 2.067-2 3.8-2h28c2 0 3 1 3 3v85.4h11.2c.933 0 1.733.333 2.4 1 .667.533 1 1.267 1 2.2v21.2c0 .933-.333 1.733-1 2.4-.667.533-1.467.8-2.4.8H93v20.8c0 2.133-1.067 3.2-3.2 3.2H62.6zM33 90.4h26.4V51.2L33 90.4zM181.67 144.6c-7.333 0-14.333-1.333-21-4-6.666-2.667-12.866-6.733-18.6-12.2-5.733-5.467-10.266-13-13.6-22.6-3.333-9.6-5-20.667-5-33.2 0-12.533 1.667-23.6 5-33.2 3.334-9.6 7.867-17.133 13.6-22.6 5.734-5.467 11.934-9.533 18.6-12.2 6.667-2.8 13.667-4.2 21-4.2 7.467 0 14.534 1.4 21.2 4.2 6.667 2.667 12.8 6.733 18.4 12.2 5.734 5.467 10.267 13 13.6 22.6 3.334 9.6 5 20.667 5 33.2 0 12.533-1.666 23.6-5 33.2-3.333 9.6-7.866 17.133-13.6 22.6-5.6 5.467-11.733 9.533-18.4 12.2-6.666 2.667-13.733 4-21.2 4zm0-31c9.067 0 15.6-3.733 19.6-11.2 4.134-7.6 6.2-17.533 6.2-29.8s-2.066-22.2-6.2-29.8c-4.133-7.6-10.666-11.4-19.6-11.4-8.933 0-15.466 3.8-19.6 11.4-4 7.6-6 17.533-6 29.8s2 22.2 6 29.8c4.134 7.467 10.667 11.2 19.6 11.2zM316.116 142c-2.134 0-3.2-1.067-3.2-3.2V118h-56c-2 0-3-1-3-3V92.8c0-1.333.4-2.733 1.2-4.2l56.6-84.6c.8-1.333 2.066-2 3.8-2h28c2 0 3 1 3 3v85.4h11.2c.933 0 1.733.333 2.4 1 .666.533 1 1.267 1 2.2v21.2c0 .933-.334 1.733-1 2.4-.667.533-1.467.8-2.4.8h-11.2v20.8c0 2.133-1.067 3.2-3.2 3.2h-27.2zm-29.6-51.6h26.4V51.2l-26.4 39.2z"
    }
  ) });
}
const root = "_root_1yq18_1";
const inner = "_inner_1yq18_6";
const image = "_image_1yq18_10";
const content = "_content_1yq18_17";
const title = "_title_1yq18_27";
const description = "_description_1yq18_40";
const classes = {
  root,
  inner,
  image,
  content,
  title,
  description
};
function NothingFoundBackground() {
  return /* @__PURE__ */ jsx(Container, { className: classes.root, children: /* @__PURE__ */ jsxs("div", { className: classes.inner, children: [
    /* @__PURE__ */ jsx(Illustration, { className: classes.image }),
    /* @__PURE__ */ jsxs("div", { className: classes.content, children: [
      /* @__PURE__ */ jsx(Title, { className: classes.title, children: "Nothing to see here" }),
      /* @__PURE__ */ jsx(Text, { c: "dimmed", size: "lg", ta: "center", className: classes.description, children: "Page you are trying to open does not exist. You may have mistyped the address, or the page has been moved to another URL. If you think this is an error contact support." }),
      /* @__PURE__ */ jsx(Group, { justify: "center", children: /* @__PURE__ */ jsx(Button, { component: Link, to: "/", size: "md", children: "Take me back to home page" }) })
    ] })
  ] }) });
}
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {}),
      /* @__PURE__ */ jsx(ColorSchemeScript, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx(MantineProvider, { children }),
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
}
function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  if ("status" in error) {
    if (error.status === 404) {
      return /* @__PURE__ */ jsx(NothingFoundBackground, {});
    }
  }
  return /* @__PURE__ */ jsx("div", { children: "Unknown Error" });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: App
}, Symbol.toStringTag, { value: "Module" }));
const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session",
    // use any name you want here
    sameSite: "lax",
    // this helps with CSRF
    path: "/",
    // remember to add this so the cookie will work in all routes
    httpOnly: true,
    // for security reasons, make this cookie http only
    secrets: ["s3cr3t"],
    // replace this with an actual secret
    secure: process.env.NODE_ENV === "production"
    // enable this in prod only
  }
});
const client = new PrismaClient();
async function login(email, password) {
  if (!email || !password) {
    throw new Error("No password or email provided");
  }
  const user = await client.user.findFirst({
    where: {
      email
    }
  });
  if (!user) {
    throw new Error("No user found");
  }
  console.log(user);
  const passwordMatches = await bcrypt.compare(
    password,
    user.encryptedPassword
  );
  if (!passwordMatches) {
    throw new Error("Wrong password");
  }
  return { email: user.email, id: user.id };
}
const authenticator = new Authenticator(sessionStorage);
authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get("email");
    const password = form.get("password");
    const user = await login(email == null ? void 0 : email.toString(), password == null ? void 0 : password.toString());
    return user;
  }),
  // each strategy has a name and can be changed to use another one
  // same strategy multiple times, especially useful for the OAuth2 strategy.
  "user-pass"
);
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
  "Wealth of Worlds"
];
function GoalSelect({ label, value, onChange }) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption()
  });
  const [data, setData] = useState(
    defaultGoals.sort((a, b) => a.localeCompare(b))
  );
  const [search, setSearch] = useState("");
  const exactOptionMatch = data.some((item) => item === search);
  const filteredOptions = exactOptionMatch ? data : data.filter(
    (item) => item.toLowerCase().includes(search.toLowerCase().trim())
  );
  const options = filteredOptions.map((item) => /* @__PURE__ */ jsx(Combobox.Option, { value: item, children: item }, item));
  const handleOptionSubmit = useCallback(
    (val) => {
      if (val === "$create") {
        setData((current) => [...current, search]);
        onChange(search);
      } else {
        onChange(val);
        setSearch(val);
      }
      combobox.closeDropdown();
    },
    [combobox, onChange, search]
  );
  return /* @__PURE__ */ jsxs(Input.Wrapper, { children: [
    /* @__PURE__ */ jsx(Input.Label, { children: label }),
    /* @__PURE__ */ jsxs(
      Combobox,
      {
        store: combobox,
        withinPortal: false,
        onOptionSubmit: handleOptionSubmit,
        children: [
          /* @__PURE__ */ jsx(Combobox.Target, { children: /* @__PURE__ */ jsx(
            InputBase,
            {
              rightSection: /* @__PURE__ */ jsx(Combobox.Chevron, {}),
              value: search,
              onChange: (event) => {
                combobox.openDropdown();
                combobox.updateSelectedOptionIndex();
                setSearch(event.currentTarget.value);
              },
              onClick: () => combobox.openDropdown(),
              onFocus: () => combobox.openDropdown(),
              onBlur: () => {
                combobox.closeDropdown();
                setSearch(value || "");
              },
              placeholder: "Search value",
              rightSectionPointerEvents: "none"
            }
          ) }),
          /* @__PURE__ */ jsx(Combobox.Dropdown, { children: /* @__PURE__ */ jsxs(Combobox.Options, { children: [
            options,
            !exactOptionMatch && search.trim().length > 0 && /* @__PURE__ */ jsxs(Combobox.Option, { value: "$create", children: [
              "+ Create ",
              search
            ] })
          ] }) })
        ]
      }
    )
  ] });
}
function TextEditor({ onChange, content: content2 }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link$1,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] })
    ],
    content: content2,
    onUpdate: () => {
      onChange((editor == null ? void 0 : editor.getJSON()) ?? {});
    }
  });
  return /* @__PURE__ */ jsxs(RichTextEditor, { mt: 8, editor, children: [
    /* @__PURE__ */ jsxs(RichTextEditor.Toolbar, { sticky: true, stickyOffset: 60, children: [
      /* @__PURE__ */ jsxs(RichTextEditor.ControlsGroup, { children: [
        /* @__PURE__ */ jsx(RichTextEditor.Bold, {}),
        /* @__PURE__ */ jsx(RichTextEditor.Italic, {}),
        /* @__PURE__ */ jsx(RichTextEditor.Underline, {}),
        /* @__PURE__ */ jsx(RichTextEditor.Strikethrough, {}),
        /* @__PURE__ */ jsx(RichTextEditor.ClearFormatting, {}),
        /* @__PURE__ */ jsx(RichTextEditor.Highlight, {}),
        /* @__PURE__ */ jsx(RichTextEditor.Code, {})
      ] }),
      /* @__PURE__ */ jsxs(RichTextEditor.ControlsGroup, { children: [
        /* @__PURE__ */ jsx(RichTextEditor.H1, {}),
        /* @__PURE__ */ jsx(RichTextEditor.H2, {}),
        /* @__PURE__ */ jsx(RichTextEditor.H3, {}),
        /* @__PURE__ */ jsx(RichTextEditor.H4, {})
      ] }),
      /* @__PURE__ */ jsxs(RichTextEditor.ControlsGroup, { children: [
        /* @__PURE__ */ jsx(RichTextEditor.Blockquote, {}),
        /* @__PURE__ */ jsx(RichTextEditor.Hr, {}),
        /* @__PURE__ */ jsx(RichTextEditor.BulletList, {}),
        /* @__PURE__ */ jsx(RichTextEditor.OrderedList, {}),
        /* @__PURE__ */ jsx(RichTextEditor.Subscript, {}),
        /* @__PURE__ */ jsx(RichTextEditor.Superscript, {})
      ] }),
      /* @__PURE__ */ jsxs(RichTextEditor.ControlsGroup, { children: [
        /* @__PURE__ */ jsx(RichTextEditor.Link, {}),
        /* @__PURE__ */ jsx(RichTextEditor.Unlink, {})
      ] }),
      /* @__PURE__ */ jsxs(RichTextEditor.ControlsGroup, { children: [
        /* @__PURE__ */ jsx(RichTextEditor.AlignLeft, {}),
        /* @__PURE__ */ jsx(RichTextEditor.AlignCenter, {}),
        /* @__PURE__ */ jsx(RichTextEditor.AlignJustify, {}),
        /* @__PURE__ */ jsx(RichTextEditor.AlignRight, {})
      ] }),
      /* @__PURE__ */ jsxs(RichTextEditor.ControlsGroup, { children: [
        /* @__PURE__ */ jsx(RichTextEditor.Undo, {}),
        /* @__PURE__ */ jsx(RichTextEditor.Redo, {})
      ] })
    ] }),
    /* @__PURE__ */ jsx(RichTextEditor.Content, { style: { minHeight: "400px" } })
  ] });
}
const sizes = ["Minor", "Major", "Regional Hegemon"];
const statMap = {
  Minor: ["4", "3", "1"],
  Major: ["6", "5", "2"],
  "Regional Hegemon": ["8", "7", "4"]
};
async function loader$6({ request, params }) {
  const user = authenticator.isAuthenticated(request);
  if (!user) {
    return redirect("/login");
  }
  const worlds = await client.world.findMany({
    where: {
      campaignId: params.campaignId
    },
    select: {
      id: true,
      name: true
    }
  });
  const responseData = { worlds };
  return json(responseData);
}
function Screen$5() {
  const defaultContent = { content: [], type: "doc" };
  const data = useLoaderData();
  const [search, setSearch] = useState("");
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption()
  });
  const [worlds, setWorlds] = useState(() => [...data.worlds]);
  const exactOptionMatch = worlds.some((item) => item.name === search);
  const filteredOptions = exactOptionMatch ? worlds : worlds.filter(
    (item) => item.name.toLowerCase().includes(search.toLowerCase().trim())
  );
  const options = filteredOptions.map((world) => /* @__PURE__ */ jsx(Combobox.Option, { value: world.id, children: world.name }, world.id));
  const form = useForm({
    mode: "controlled",
    initialValues: {
      name: "",
      description: defaultContent,
      size: "Minor",
      cunning: statMap["Minor"][0],
      force: statMap["Minor"][1],
      wealth: statMap["Minor"][2],
      goal: ""
    }
  });
  function handleSizeChanged(value) {
    if (value) {
      const [force, cunning, wealth] = statMap[value];
      form.setFieldValue("force", force);
      form.setFieldValue("cunning", cunning);
      form.setFieldValue("wealth", wealth);
    }
    form.setFieldValue("size", value);
  }
  function handleForceChange(value) {
    if (value) {
      const stats = statMap[form.values.size];
      const [cunning, wealth] = stats.filter((item) => item !== value);
      form.setFieldValue("cunning", cunning);
      form.setFieldValue("wealth", wealth);
      form.setFieldValue("force", value);
    }
  }
  return /* @__PURE__ */ jsxs(Container, { size: "lg", children: [
    /* @__PURE__ */ jsx(Title, { children: "New Faction" }),
    /* @__PURE__ */ jsxs(Paper, { children: [
      /* @__PURE__ */ jsx(TextInput, { label: "Name", name: "name", ...form.getInputProps("name") }),
      /* @__PURE__ */ jsx(
        Select,
        {
          label: "Size",
          data: sizes,
          onChange: handleSizeChanged,
          value: form.values.size
        }
      ),
      /* @__PURE__ */ jsxs(Grid, { children: [
        /* @__PURE__ */ jsx(Grid.Col, { span: 4, children: /* @__PURE__ */ jsx(
          Select,
          {
            data: statMap[form.values.size],
            label: "Force",
            name: "force",
            value: form.values.force,
            onChange: handleForceChange
          }
        ) }),
        /* @__PURE__ */ jsx(Grid.Col, { span: 4, children: /* @__PURE__ */ jsx(
          Select,
          {
            data: statMap[form.values.size].filter(
              (item) => item !== form.values.force
            ),
            label: "Cunning",
            ...form.getInputProps("cunning")
          }
        ) }),
        /* @__PURE__ */ jsx(Grid.Col, { span: 4, children: /* @__PURE__ */ jsx(
          Select,
          {
            data: statMap[form.values.size].filter(
              (item) => item !== form.values.force && item !== form.values.cunning
            ),
            label: "Wealth",
            ...form.getInputProps("wealth")
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx(Input.Wrapper, { label: "Homeworld", children: /* @__PURE__ */ jsxs(
        Combobox,
        {
          store: combobox,
          withinPortal: false,
          onOptionSubmit: (val) => {
            if (val === "$create") {
              const newWorld = { id: "", name: search };
              setWorlds((current) => [
                ...current.filter((w) => w.id !== ""),
                newWorld
              ]);
              form.setFieldValue("homeWorld", newWorld);
            } else {
              const world = worlds.find((w) => w.id === val);
              form.setFieldValue("homeWorld", world);
              setSearch(val);
            }
            combobox.closeDropdown();
          },
          children: [
            /* @__PURE__ */ jsx(Combobox.Target, { children: /* @__PURE__ */ jsx(
              InputBase,
              {
                rightSection: /* @__PURE__ */ jsx(Combobox.Chevron, {}),
                value: search,
                onChange: (event) => {
                  combobox.openDropdown();
                  combobox.updateSelectedOptionIndex();
                  setSearch(event.currentTarget.value);
                },
                onClick: () => combobox.openDropdown(),
                onFocus: () => combobox.openDropdown(),
                onBlur: () => {
                  var _a;
                  combobox.closeDropdown();
                  setSearch(((_a = form.values.homeWorld) == null ? void 0 : _a.name) || "");
                },
                placeholder: "Search value",
                rightSectionPointerEvents: "none"
              }
            ) }),
            /* @__PURE__ */ jsx(Combobox.Dropdown, { children: /* @__PURE__ */ jsxs(Combobox.Options, { children: [
              options,
              !exactOptionMatch && search.trim().length > 0 && /* @__PURE__ */ jsxs(Combobox.Option, { value: "$create", children: [
                "+ Create ",
                search
              ] })
            ] }) })
          ]
        }
      ) }),
      /* @__PURE__ */ jsx(
        GoalSelect,
        {
          label: "Goal",
          value: form.values.goal,
          onChange: (goal) => form.setFieldValue("goal", goal)
        }
      ),
      /* @__PURE__ */ jsx(
        TextEditor,
        {
          content: defaultContent,
          onChange: (value) => form.setFieldValue("description", value)
        }
      )
    ] })
  ] });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Screen$5,
  loader: loader$6
}, Symbol.toStringTag, { value: "Module" }));
async function loader$5({ params }) {
  const { campaignId } = params;
  const factionCount = await client.faction.count({
    where: {
      campaignId
    }
  });
  return json({ hasFactions: factionCount > 0, campaignId });
}
function Screen$4() {
  const { hasFactions, campaignId } = useLoaderData();
  return /* @__PURE__ */ jsx(Container, { children: !hasFactions && /* @__PURE__ */ jsxs(Paper, { mt: 20, children: [
    "To start create your first",
    " ",
    /* @__PURE__ */ jsxs(Anchor, { component: Link, to: `/campaigns/${campaignId}/factions/new`, children: [
      " ",
      "faction"
    ] })
  ] }) });
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Screen$4,
  loader: loader$5
}, Symbol.toStringTag, { value: "Module" }));
function NavbarLink({ icon: Icon, label, active, to }) {
  return /* @__PURE__ */ jsx(Tooltip, { label, position: "right", transitionProps: { duration: 0 }, children: /* @__PURE__ */ jsx(
    UnstyledButton,
    {
      component: Link,
      to,
      className: "link",
      "data-active": active || void 0,
      children: /* @__PURE__ */ jsx(Icon, { style: { width: rem(20), height: rem(20) }, stroke: 1.5 })
    }
  ) });
}
function Navbar({ baseUrl }) {
  const mockdata = [
    { icon: IconHome2, label: "Home", to: baseUrl },
    {
      icon: IconDeviceDesktopAnalytics,
      label: "Factions",
      to: `${baseUrl}/factions`
    },
    { icon: IconCalendarStats, label: "Worlds", to: `${baseUrl}/worlds` },
    { icon: IconUser, label: "Account", to: "/account" }
  ];
  const links = mockdata.map((link) => /* @__PURE__ */ createElement(NavbarLink, { ...link, key: link.label, to: link.to }));
  return /* @__PURE__ */ jsxs("nav", { children: [
    /* @__PURE__ */ jsx(Center, {}),
    /* @__PURE__ */ jsx("div", { className: "navbarMain", children: /* @__PURE__ */ jsx(Stack, { justify: "center", gap: 0, children: links }) }),
    /* @__PURE__ */ jsxs(Stack, { justify: "center", gap: 0, children: [
      /* @__PURE__ */ jsx(
        NavbarLink,
        {
          icon: IconSwitchHorizontal,
          label: "Change account",
          to: "/switch-account"
        }
      ),
      /* @__PURE__ */ jsx(NavbarLink, { icon: IconLogout, label: "Logout", to: "/logout" })
    ] })
  ] });
}
async function loader$4({ request, params }) {
  const user = await authenticator.isAuthenticated(request);
  if (!user) {
    return redirect("/login");
  }
  const { campaignId } = params;
  const campaign = await client.campaign.findUnique({
    where: {
      id: campaignId,
      ownerId: user == null ? void 0 : user.id
    }
  });
  if (!campaign) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found"
    });
  }
  return json(campaign);
}
function Screen$3() {
  const [opened, { toggle }] = useDisclosure();
  const data = useLoaderData();
  const baseUrl = `/campaigns/${data.id}/dashboard`;
  return /* @__PURE__ */ jsxs(
    AppShell,
    {
      header: { height: 60 },
      navbar: {
        width: 80,
        breakpoint: "sm",
        collapsed: { mobile: !opened }
      },
      padding: "md",
      children: [
        /* @__PURE__ */ jsxs(AppShell.Header, { children: [
          /* @__PURE__ */ jsx(Burger, { opened, onClick: toggle, hiddenFrom: "sm", size: "sm" }),
          /* @__PURE__ */ jsx("div", { children: "Logo" })
        ] }),
        /* @__PURE__ */ jsx(AppShell.Navbar, { p: "md", children: /* @__PURE__ */ jsx(Navbar, { baseUrl }) }),
        /* @__PURE__ */ jsx(AppShell.Main, { children: /* @__PURE__ */ jsx(Outlet, {}) })
      ]
    }
  );
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Screen$3,
  loader: loader$4
}, Symbol.toStringTag, { value: "Module" }));
function loader$3({ request }) {
  return authenticator.isAuthenticated(request, {
    failureRedirect: "/login"
  });
}
async function action$2({ request }) {
  var _a;
  const form = await request.formData();
  const name = ((_a = form.get("name")) == null ? void 0 : _a.toString()) ?? "";
  const user = await authenticator.isAuthenticated(request);
  const campaign = await client.campaign.create({
    data: {
      name,
      ownerId: (user == null ? void 0 : user.id) ?? ""
    }
  });
  return redirect(`/campaigns/${campaign.id}/dashboard`);
}
function Screen$2() {
  return /* @__PURE__ */ jsxs(Container, { size: 420, my: 40, children: [
    /* @__PURE__ */ jsx(Title, { children: "Create a new Campaign" }),
    /* @__PURE__ */ jsx(Paper, { withBorder: true, shadow: "md", p: 30, mt: 30, radius: "md", children: /* @__PURE__ */ jsxs(Form, { method: "POST", children: [
      /* @__PURE__ */ jsx(TextInput, { name: "name", label: "Name", required: true }),
      /* @__PURE__ */ jsx(Group, { justify: "center", mt: "lg", children: /* @__PURE__ */ jsx(Button, { type: "submit", children: "Create" }) })
    ] }) })
  ] });
}
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$2,
  default: Screen$2,
  loader: loader$3
}, Symbol.toStringTag, { value: "Module" }));
const meta = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" }
  ];
};
async function loader$2({ request }) {
  const user = await authenticator.isAuthenticated(request);
  if (!user) {
    return redirect("/login");
  }
  const campaigns = await client.campaign.findMany({
    where: {
      ownerId: user.id
    },
    select: {
      id: true,
      name: true
    }
  });
  if (campaigns.length === 0) {
    return redirect("/campaigns/new");
  }
  if (campaigns.length === 1) {
    return redirect(`/campaigns/${campaigns[0].id}/dashboard`);
  }
  return json(campaigns);
}
function Index() {
  const data = useLoaderData();
  return /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsx(Title, { children: "Select Campaign" }),
    /* @__PURE__ */ jsx(Stack, { children: data.map((c) => /* @__PURE__ */ jsx(Anchor, { component: Link, to: `/campaigns/${c.id}/dashboard`, children: c.name }, c.id)) })
  ] });
}
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  loader: loader$2,
  meta
}, Symbol.toStringTag, { value: "Module" }));
async function createNewUser(email, password) {
  const user = await client.user.create({
    data: {
      email,
      encryptedPassword: await bcrypt.hash(password, 10)
    }
  });
  return user;
}
function Screen$1() {
  return /* @__PURE__ */ jsxs(Container, { size: 420, my: 40, children: [
    /* @__PURE__ */ jsx(Title, { ta: "center", className: "title", children: "Welcome!" }),
    /* @__PURE__ */ jsxs(Text, { c: "dimmed", size: "sm", ta: "center", mt: 5, children: [
      "Already have an account?",
      " ",
      /* @__PURE__ */ jsx(Anchor, { size: "sm", component: Link, to: "/login", children: "Login" })
    ] }),
    /* @__PURE__ */ jsx(Paper, { withBorder: true, shadow: "md", p: 30, mt: 30, radius: "md", children: /* @__PURE__ */ jsxs(Form, { method: "post", children: [
      /* @__PURE__ */ jsx(
        TextInput,
        {
          label: "Email",
          placeholder: "you@mantine.dev",
          name: "email",
          type: "email",
          required: true
        }
      ),
      /* @__PURE__ */ jsx(
        PasswordInput,
        {
          label: "Password",
          placeholder: "Your password",
          required: true,
          mt: "md",
          name: "password"
        }
      ),
      /* @__PURE__ */ jsx(Group, { justify: "center", mt: "lg", children: /* @__PURE__ */ jsx(Anchor, { component: Link, size: "sm", to: "/forgot-password", children: "Forgot password?" }) }),
      /* @__PURE__ */ jsx(Button, { type: "submit", fullWidth: true, mt: "xl", children: "Sign up" })
    ] }) })
  ] });
}
async function action$1({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  await createNewUser((email == null ? void 0 : email.toString()) ?? "", (password == null ? void 0 : password.toString()) ?? "");
  return redirect$1("/login");
}
async function loader$1({ request }) {
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/dashboard"
  });
}
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$1,
  default: Screen$1,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
function Screen() {
  return /* @__PURE__ */ jsxs(Container, { size: 420, my: 40, children: [
    /* @__PURE__ */ jsx(Title, { ta: "center", className: "title", children: "Welcome back!" }),
    /* @__PURE__ */ jsxs(Text, { c: "dimmed", size: "sm", ta: "center", mt: 5, children: [
      "Do not have an account yet?",
      " ",
      /* @__PURE__ */ jsx(Anchor, { size: "sm", component: Link, to: "/signup", children: "Create account" })
    ] }),
    /* @__PURE__ */ jsx(Paper, { withBorder: true, shadow: "md", p: 30, mt: 30, radius: "md", children: /* @__PURE__ */ jsxs(Form, { method: "post", children: [
      /* @__PURE__ */ jsx(
        TextInput,
        {
          label: "Email",
          placeholder: "you@mantine.dev",
          name: "email",
          type: "email",
          required: true
        }
      ),
      /* @__PURE__ */ jsx(
        PasswordInput,
        {
          label: "Password",
          placeholder: "Your password",
          required: true,
          mt: "md",
          name: "password"
        }
      ),
      /* @__PURE__ */ jsx(Group, { justify: "center", mt: "lg", children: /* @__PURE__ */ jsx(Anchor, { component: Link, size: "sm", to: "/forgot-password", children: "Forgot password?" }) }),
      /* @__PURE__ */ jsx(Button, { type: "submit", fullWidth: true, mt: "xl", children: "Sign in" })
    ] }) })
  ] });
}
async function action({ request }) {
  return await authenticator.authenticate("user-pass", request, {
    successRedirect: "/",
    failureRedirect: "/login"
  });
}
async function loader({ request }) {
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/"
  });
}
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action,
  default: Screen,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-ahx-X_4I.js", "imports": ["/assets/index-VXuqoyi4.js", "/assets/components-2ATF55rX.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/root-DVl_fFzk.js", "imports": ["/assets/index-VXuqoyi4.js", "/assets/components-2ATF55rX.js", "/assets/polymorphic-factory-Chi_ekPl.js", "/assets/Transition-C52tgdzj.js", "/assets/Container-DoM9UoKx.js", "/assets/Title-DpvxP_SP.js", "/assets/Text-BwoYjkkk.js", "/assets/Button-Dp0I79fw.js", "/assets/px-CiO0pVtX.js"], "css": ["/assets/root-BSGyacV5.css"] }, "routes/campaigns.$campaignId.factions.new": { "id": "routes/campaigns.$campaignId.factions.new", "parentId": "routes/campaigns.$campaignId", "path": "factions/new", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/campaigns._campaignId.factions.new-BO10Nibo.js", "imports": ["/assets/index-VXuqoyi4.js", "/assets/polymorphic-factory-Chi_ekPl.js", "/assets/Transition-C52tgdzj.js", "/assets/Button-Dp0I79fw.js", "/assets/px-CiO0pVtX.js", "/assets/use-id-Dhf9WDzK.js", "/assets/ActionIcon-CxlVCXcX.js", "/assets/Tooltip-BLuLrrK8.js", "/assets/TextInput-DnfOQvPC.js", "/assets/components-2ATF55rX.js", "/assets/Container-DoM9UoKx.js", "/assets/Title-DpvxP_SP.js", "/assets/Paper-CZ_aVV0z.js"], "css": [] }, "routes/campaigns.$campaignId.dashboard": { "id": "routes/campaigns.$campaignId.dashboard", "parentId": "routes/campaigns.$campaignId", "path": "dashboard", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/campaigns._campaignId.dashboard-CnwTLuq2.js", "imports": ["/assets/index-VXuqoyi4.js", "/assets/polymorphic-factory-Chi_ekPl.js", "/assets/Text-BwoYjkkk.js", "/assets/components-2ATF55rX.js", "/assets/Container-DoM9UoKx.js", "/assets/Paper-CZ_aVV0z.js", "/assets/Anchor-C6dYt6Yb.js"], "css": [] }, "routes/campaigns.$campaignId": { "id": "routes/campaigns.$campaignId", "parentId": "root", "path": "campaigns/:campaignId", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/campaigns._campaignId-BEhjAGfo.js", "imports": ["/assets/index-VXuqoyi4.js", "/assets/polymorphic-factory-Chi_ekPl.js", "/assets/Transition-C52tgdzj.js", "/assets/px-CiO0pVtX.js", "/assets/use-id-Dhf9WDzK.js", "/assets/Stack-Dmoc5G3U.js", "/assets/Tooltip-BLuLrrK8.js", "/assets/components-2ATF55rX.js"], "css": [] }, "routes/campaigns.new": { "id": "routes/campaigns.new", "parentId": "root", "path": "campaigns/new", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/campaigns.new--bEP1nbh.js", "imports": ["/assets/index-VXuqoyi4.js", "/assets/polymorphic-factory-Chi_ekPl.js", "/assets/Transition-C52tgdzj.js", "/assets/use-id-Dhf9WDzK.js", "/assets/Container-DoM9UoKx.js", "/assets/Title-DpvxP_SP.js", "/assets/Paper-CZ_aVV0z.js", "/assets/TextInput-DnfOQvPC.js", "/assets/Button-Dp0I79fw.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-Dug_-WnY.js", "imports": ["/assets/index-VXuqoyi4.js", "/assets/polymorphic-factory-Chi_ekPl.js", "/assets/Text-BwoYjkkk.js", "/assets/components-2ATF55rX.js", "/assets/Container-DoM9UoKx.js", "/assets/Title-DpvxP_SP.js", "/assets/Stack-Dmoc5G3U.js", "/assets/Anchor-C6dYt6Yb.js"], "css": [] }, "routes/signup": { "id": "routes/signup", "parentId": "root", "path": "signup", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/signup-B3M8rSku.js", "imports": ["/assets/index-VXuqoyi4.js", "/assets/polymorphic-factory-Chi_ekPl.js", "/assets/Text-BwoYjkkk.js", "/assets/Transition-C52tgdzj.js", "/assets/use-id-Dhf9WDzK.js", "/assets/Button-Dp0I79fw.js", "/assets/ActionIcon-CxlVCXcX.js", "/assets/TextInput-DnfOQvPC.js", "/assets/Container-DoM9UoKx.js", "/assets/Title-DpvxP_SP.js", "/assets/Anchor-C6dYt6Yb.js", "/assets/components-2ATF55rX.js", "/assets/Paper-CZ_aVV0z.js", "/assets/PasswordInput-IhcYCoV7.js"], "css": [] }, "routes/login": { "id": "routes/login", "parentId": "root", "path": "login", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/login-BwE3UPbd.js", "imports": ["/assets/index-VXuqoyi4.js", "/assets/polymorphic-factory-Chi_ekPl.js", "/assets/Text-BwoYjkkk.js", "/assets/Transition-C52tgdzj.js", "/assets/use-id-Dhf9WDzK.js", "/assets/Button-Dp0I79fw.js", "/assets/ActionIcon-CxlVCXcX.js", "/assets/TextInput-DnfOQvPC.js", "/assets/Container-DoM9UoKx.js", "/assets/Title-DpvxP_SP.js", "/assets/Anchor-C6dYt6Yb.js", "/assets/components-2ATF55rX.js", "/assets/Paper-CZ_aVV0z.js", "/assets/PasswordInput-IhcYCoV7.js"], "css": [] } }, "url": "/assets/manifest-45a984e7.js", "version": "45a984e7" };
const mode = "production";
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v3_fetcherPersist": false, "v3_relativeSplatPath": false, "v3_throwAbortReason": false, "unstable_singleFetch": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/campaigns.$campaignId.factions.new": {
    id: "routes/campaigns.$campaignId.factions.new",
    parentId: "routes/campaigns.$campaignId",
    path: "factions/new",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/campaigns.$campaignId.dashboard": {
    id: "routes/campaigns.$campaignId.dashboard",
    parentId: "routes/campaigns.$campaignId",
    path: "dashboard",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/campaigns.$campaignId": {
    id: "routes/campaigns.$campaignId",
    parentId: "root",
    path: "campaigns/:campaignId",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/campaigns.new": {
    id: "routes/campaigns.new",
    parentId: "root",
    path: "campaigns/new",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route5
  },
  "routes/signup": {
    id: "routes/signup",
    parentId: "root",
    path: "signup",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/login": {
    id: "routes/login",
    parentId: "root",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};

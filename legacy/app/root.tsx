// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/tiptap/styles.css";
import "./styles.css";

import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";
import { ColorSchemeScript, MantineColorsTuple, MantineProvider, createTheme } from "@mantine/core";
import { NothingFoundBackground } from "./components/errors/NothingFound";

const myColor: MantineColorsTuple = [
  '#f6eeff',
  '#e7daf7',
  '#cab1ea',
  '#ad86dd',
  '#9562d2',
  '#854bcb',
  '#7d3ec9',
  '#6b31b2',
  '#5f2aa0',
  '#52228d'
];

const theme = createTheme({
  colors: {
    myColor,
  }
});

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme}>{children}</MantineProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError() as Record<string, unknown>;
  console.error(error);
  if ("status" in error) {
    if (error.status === 404) {
      return <NothingFoundBackground />;
    }
  }

  return <div>Unknown Error</div>;
}

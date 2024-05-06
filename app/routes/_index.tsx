import { PrismaClient } from "@prisma/client";
import {
  json,
  redirect,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request);

  if (!user) {
    return redirect("/login");
  }

  const prisma = new PrismaClient();

  const campaigns = await prisma.campaign.findMany({
    where: {
      ownerId: user.id,
    },
    select: {
      id: true,
      name: true,
    },
  });

  if (campaigns.length === 0) {
    return redirect("/campaigns/new");
  }

  if (campaigns.length === 1) {
    return redirect(`/campaigns/${campaigns[0].id}/dashboard`);
  }

  return json(campaigns);
}

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}

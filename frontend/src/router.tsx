import { createBrowserRouter } from "react-router-dom";
import Root from "./routes/Root";
import { lazy } from "react";

const Home = lazy(() => import("./routes/Home.tsx"));
const NewFaction = lazy(() => import("./routes/factions/New.tsx"));
const NewCampaign = lazy(() => import("./routes/campaigns/New.tsx"));
const Dashboard = lazy(() => import("./routes/Dashboard"));
const Worlds = lazy(() => import("~/routes/WorldIndex.tsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "campaigns/:campaignId",
        element: <Dashboard />,
      },
      {
        path: "campaigns/:campaignId/factions/new",
        element: <NewFaction />,
      },
      {
        path: "campaigns/:campaignId/worlds",
        element: <Worlds />,
      },
      {
        path: "campaigns/new",
        element: <NewCampaign />,
      },
    ],
  },
]);

export default router;

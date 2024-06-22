import { createBrowserRouter } from "react-router-dom";
import Root from "./routes/Root";
import Dashboard from "./routes/Dashboard";
import NewCampaign from "./routes/campaigns/New.tsx";
import NewFaction from "./routes/factions/New.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "campaigns/:campaignId",
        element: <Dashboard />,
        children: [
          {
            path: 'factions/new',
            element: <NewFaction />
          }
        ]
      },
      {
        path: 'campaigns/new',
        element: <NewCampaign />
      },
    ],
  },
]);

export default router;

import { gql } from "../__generated__";
import { useQuery } from "@apollo/client";
import { Navigate } from "react-router-dom";

const getCampaigns = gql(`
  query GetCampaigns {
  campaigns {
    id
    name
  }
}

`);

export default function Home() {
  const { data, loading } = useQuery(getCampaigns, {
    initialFetchPolicy: "no-cache",
  });

  if (loading || !data) {
    return <div>Loading</div>;
  }

  if (data.campaigns.length === 0) {
    return <Navigate to="/campaigns/new" />;
  }

  if (data.campaigns.length === 1) {
    return <Navigate to={`/campaigns/${data.campaigns[0].id}`} />;
  }

  return <div />;
}

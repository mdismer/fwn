import { useCallback } from "react";
import { Navigate } from "react-router-dom";
import useSWR from "swr";
import useCampaignAPI from "~/hooks/useCampaignApi";

export default function Home() {

  const api = useCampaignAPI()

  const fetcher = useCallback(() => {
    return api.campaignsList()
  }, [])

  const { data, isLoading } = useSWR("/api/campaigns", fetcher);

  if (isLoading || !data) {
    return <div>Loading</div>;
  }

  if (data.length === 0) {
    return <Navigate to="/campaigns/new" />;
  }

  if (data.length === 1) {
    return <Navigate to={`/campaigns/${data[0].id}`} />;
  }

  return <div />;
}

import { useKeycloak } from "@react-keycloak/web";
import { useCallback, useEffect, useState } from "react";

export default function useGetRequest<T>(url: string) {
  const { keycloak } = useKeycloak();

  const [data, setData] = useState<T | null>();
  const makeRequest = useCallback(async () => {
    const headers = new Headers({
      Authorization: "Bearer " + keycloak.token,
    });
    const response = await fetch(url, {
      headers,
    });

    const json: T = await response.json();
    setData(json);
    return json;
  }, [keycloak.token, url]);

  useEffect(() => {
    makeRequest();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { reload: makeRequest, data };
}

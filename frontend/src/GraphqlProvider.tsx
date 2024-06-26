import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { useKeycloak } from "@react-keycloak/web";
import { PropsWithChildren, useMemo } from "react";

const cache = new InMemoryCache();

export default function GraphqlProvider({ children }: PropsWithChildren) {
  const { keycloak } = useKeycloak();

  const client = useMemo(
    () =>
      new ApolloClient({
        uri: "/api/graphql",
        cache,
        headers: {
          Authorization: "Bearer " + keycloak.token,
        },
      }),
    [keycloak.token],
  );

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

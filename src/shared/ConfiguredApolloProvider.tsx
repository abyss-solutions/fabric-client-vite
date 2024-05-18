import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { useRecoilValue } from "recoil";
import * as state from "@/state";
import { PropsWithChildren, useMemo } from "react";

export const ConfiguredApolloProvider = ({
  children,
}: PropsWithChildren<object>) => {
  const token = useRecoilValue(state.auth0TokenState);
  const VITE_APP_API_URL = import.meta.env.VITE_APP_API_URL;

  const client = useMemo(
    () =>
      new ApolloClient({
        cache: new InMemoryCache(),
        uri: `${VITE_APP_API_URL}/graphql`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
    [VITE_APP_API_URL, token]
  );

  return token ? (
    <ApolloProvider client={client}>{children}</ApolloProvider>
  ) : (
    <>{children}</>
  );
};

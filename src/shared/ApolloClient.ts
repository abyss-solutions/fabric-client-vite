import { ApolloClient, InMemoryCache } from "@apollo/client";

const VITE_APP_API_URL = import.meta.env.VITE_APP_API_URL;
const VITE_APP_TEST_TOKEN = import.meta.env.VITE_APP_TEST_TOKEN;

console.log(VITE_APP_API_URL, VITE_APP_TEST_TOKEN);

export const apolloClient = new ApolloClient({
  uri: `${VITE_APP_API_URL}/graphql`,
  headers: {
    Authorization: `Bearer ${VITE_APP_TEST_TOKEN}`,
  },
  cache: new InMemoryCache(),
});

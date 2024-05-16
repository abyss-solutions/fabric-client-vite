import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ErrorBoundary } from "react-error-boundary";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./shared/ApolloClient.ts";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ErrorBoundary fallback={<div>Something went wrong</div>}>
    <Auth0Provider
      domain={import.meta.env.VITE_APP_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_APP_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: `${window.location.origin}/api/auth/callback`,
      }}
    >
      <ApolloProvider client={apolloClient}>
        <App />
      </ApolloProvider>
    </Auth0Provider>
  </ErrorBoundary>
);

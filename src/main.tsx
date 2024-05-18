import ReactDOM from "react-dom/client";
import "./index.css";
import { ErrorBoundary } from "react-error-boundary";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./shared/ApolloClient.ts";
import { Auth0Provider } from "@auth0/auth0-react";
import { ThemeProvider } from "@mui/material";
import { GlobalStyle, muiTheme } from "./theme/index.ts";
import { getScale } from "./utils/index.ts";
import { RouterProvider } from "react-router-dom";
import { router } from "@/shared";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={muiTheme}>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Auth0Provider
        domain={import.meta.env.VITE_APP_AUTH0_DOMAIN}
        clientId={import.meta.env.VITE_APP_AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: `${window.location.origin}/api/auth/callback`,
        }}
      >
        <ApolloProvider client={apolloClient}>
          <GlobalStyle scale={getScale()} />

          <RouterProvider router={router} />
        </ApolloProvider>
      </Auth0Provider>
    </ErrorBoundary>
  </ThemeProvider>
);

import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ErrorBoundary } from "react-error-boundary";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./shared/ApolloClient.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ErrorBoundary fallback={<div>Something went wrong</div>}>
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </ErrorBoundary>
);

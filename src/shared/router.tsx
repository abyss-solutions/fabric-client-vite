import { createBrowserRouter } from "react-router-dom";
import { HomePage, InsightsPage } from "@/pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "analysis/:inspection/insights",
    element: <InsightsPage />,
  },
]);

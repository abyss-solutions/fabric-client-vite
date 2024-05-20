import { PageLoader } from "@/components/shared/PageLoader";
import { useFetchCookies, useRouter } from "@/hooks";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import { Box } from "@mui/material";

export const InsightsPage = () => {
  const cookiesFetched = useFetchCookies();
  const router = useRouter();

  if (!cookiesFetched) {
    return (
      <Box sx={{ position: "relative", top: "25rem" }}>
        <PageLoader />
      </Box>
    );
  }

  return (
    <DefaultLayout>
      <div>
        <h1>Insights Page</h1>
        <pre>{JSON.stringify(router.query, null, 2)}</pre>
      </div>
    </DefaultLayout>
  );
};

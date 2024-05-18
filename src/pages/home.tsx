import LoginButton from "@/components/LoginButton";
import { PageLoader } from "@/components/shared/PageLoader";
import { useFetchCookies } from "@/hooks";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import { Box } from "@mui/material";

export const HomePage = () => {
  const cookiesFetched = useFetchCookies();

  if (!cookiesFetched) {
    return (
      <Box sx={{ position: "relative", top: "25rem" }}>
        <PageLoader />
      </Box>
    );
  }

  return (
    <DefaultLayout>
      <h1>Fabric Client Vite</h1>
      <LoginButton />
    </DefaultLayout>
  );
};

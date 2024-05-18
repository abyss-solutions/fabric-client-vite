import { PropsWithChildren, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useRecoilState } from "recoil";
import { Typography } from "@mui/material";
import * as state from "@/state";
import { DefaultLayout } from "@/layouts";
import { useAuth0 } from "@auth0/auth0-react";
import { PageLoader } from "../shared/PageLoader";

const GoToLogin = () => {
  const auth = useAuth0();
  useEffect(() => {
    auth.loginWithRedirect();
  }, [auth]);

  return <></>;
};
export const AuthGuard = ({ children }: PropsWithChildren<object>) => {
  const { error, isLoading, getIdTokenClaims, getAccessTokenSilently } =
    useAuth0();
  const [authCompleted, setAuthCompleted] = useState<boolean>(false);
  const [auth0TokenState, setAuth0TokenState] = useRecoilState(
    state.auth0TokenState
  );

  useEffect(() => {
    if (isLoading) return;
    if (auth0TokenState) {
      setAuthCompleted(true);
      return;
    }

    // fetch session access token and set recoil token state
    getAccessTokenSilently().then((potentialToken) => {
      console.log(potentialToken);

      if (potentialToken && typeof potentialToken === "string") {
        setAuth0TokenState(potentialToken);
        setAuthCompleted(true);
      }
    });
  }, [isLoading, setAuth0TokenState, getIdTokenClaims, auth0TokenState]);

  if (isLoading || !authCompleted) {
    return (
      <DefaultLayout>
        <Box sx={{ position: "relative", top: "25rem" }}>
          <PageLoader />
        </Box>
      </DefaultLayout>
    );
  }

  if (error) {
    return (
      <DefaultLayout>
        <Typography sx={{ mt: 10 }}>Error Logging in</Typography>
      </DefaultLayout>
    );
  }

  if (authCompleted && !auth0TokenState) {
    return <GoToLogin />;
  }

  return <>{children}</>;
};

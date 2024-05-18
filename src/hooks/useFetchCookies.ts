import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

export const useFetchCookies = () => {
  const [cookiesFetched, setCookiesFetched] = useState(false);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    getAccessTokenSilently()
      .then(() => {
        setCookiesFetched(true);
      })
      .catch((error) => {
        console.error("useFetchCookies ->", error);
      });
  }, [getAccessTokenSilently]);

  return cookiesFetched;
};

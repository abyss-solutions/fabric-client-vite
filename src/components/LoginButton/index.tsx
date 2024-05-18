import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect, user, logout } = useAuth0();

  const isLoggedIn = !!user;

  const logInOrOut = () => {
    if (isLoggedIn)
      logout({
        openUrl: async () => {
          window.location.href = "/";
        },
      });
    else loginWithRedirect();
  };

  return (
    <button type="button" onClick={logInOrOut}>
      {isLoggedIn ? "Log Out" : "Log In"} {user?.name}
    </button>
  );
};

export default LoginButton;

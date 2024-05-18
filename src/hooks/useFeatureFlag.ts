import { FeatureFlags } from "@/types/index";
import { useAuth0 } from "@auth0/auth0-react";

export const useFeatureFlag = (flag: FeatureFlags | Array<FeatureFlags>) => {
  const { user } = useAuth0();

  if (!user || !flag) {
    return false;
  }

  if (Array.isArray(flag)) {
    const roles: Array<string> = user[
      "http://abyss.com/user/roles"
    ] as Array<string>;
    if (roles.some((role) => flag.includes(role as FeatureFlags))) {
      return true;
    }
  }

  const roles: Array<string> = user[
    "http://abyss.com/user/roles"
  ] as Array<string>;
  if (roles.includes(flag as FeatureFlags)) {
    return true;
  }
  return false;
};

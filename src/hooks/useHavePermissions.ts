import { hasPermission } from "@/utils/userAccess";
import { Permissions } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";

export function useHavePermission(permission: Permissions): boolean {
  const { user } = useAuth0();
  return hasPermission(permission, user);
}

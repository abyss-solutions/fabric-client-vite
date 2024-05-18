import { Permissions } from '@/types';

const PERMISSIONS_CLAIM_NAME = 'http://abyssfabric.co/user/permissions';
export const hasPermission = (permission: Permissions, userClaims?: { [key: string]: unknown }) => {
  if (!userClaims) {
    return false;
  }

  const permissions = userClaims[PERMISSIONS_CLAIM_NAME];
  return !!(permissions && Array.isArray(permissions) && permissions.includes(permission));
};

import type { UserSession } from "./session";

export type AppPermission =
  "items:read" | "items:create" | "items:update" | "items:delete" | "settings:manage";

const rolePermissions: Record<UserSession["role"], AppPermission[]> = {
  admin: ["items:read", "items:create", "items:update", "items:delete", "settings:manage"],
  member: ["items:read", "items:create", "items:update"],
  viewer: ["items:read"],
};

export function hasPermission(session: UserSession | null, permission: AppPermission): boolean {
  if (!session) return false;
  const permissions = rolePermissions[session.role] ?? [];
  return permissions.includes(permission);
}

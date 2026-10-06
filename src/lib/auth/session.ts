export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: "admin" | "member" | "viewer";
  avatarUrl?: string;
}

export const mockUserSession: UserSession = {
  id: "usr_1",
  name: "Tony Developer",
  email: "tony@example.com",
  role: "admin",
  avatarUrl: "https://i.pravatar.cc/150?u=tony",
};

export async function getSession(): Promise<UserSession | null> {
  // In production, read from cookies/JWT or your auth provider (e.g. NextAuth/Auth.js/Supabase)
  return mockUserSession;
}

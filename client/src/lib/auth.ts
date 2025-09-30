export const TOKEN_KEY = "tt:student_token";

export function setToken(t: string) { localStorage.setItem(TOKEN_KEY, t); }
export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}
export function clearToken() { localStorage.removeItem(TOKEN_KEY); }

export function isLoggedIn() { return !!getToken(); }

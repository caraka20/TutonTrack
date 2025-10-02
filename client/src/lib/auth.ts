// client/src/lib/auth.ts
// Helpers token untuk admin & student + fallback kompatibel lama

const ADMIN_KEY = "tt:admin_token";
const STUDENT_KEY = "tt:student_token";
const LEGACY_KEY = "token";

/* ===== Admin token ===== */
export function setAdminToken(t: string) {
  try { localStorage.setItem(ADMIN_KEY, t); } catch {}
}
export function getAdminToken(): string {
  try { return localStorage.getItem(ADMIN_KEY) || ""; } catch { return ""; }
}
export function clearAdminToken() {
  try { localStorage.removeItem(ADMIN_KEY); } catch {}
}
export function hasAdminToken() {
  return !!getAdminToken();
}

/* ===== Student token (tetap dipakai untuk area mahasiswa) ===== */
export function setStudentToken(t: string) {
  try { localStorage.setItem(STUDENT_KEY, t); } catch {}
}
export function getStudentToken(): string {
  try { return localStorage.getItem(STUDENT_KEY) || ""; } catch { return ""; }
}
export function clearStudentToken() {
  try { localStorage.removeItem(STUDENT_KEY); } catch {}
}
export function hasStudentToken() {
  return !!getStudentToken();
}

/* ===== Kompatibilitas lama (jangan dipakai untuk admin lagi) ===== */
export function setLegacyToken(t: string) {
  try { localStorage.setItem(LEGACY_KEY, t); } catch {}
}
export function getLegacyToken(): string {
  try { return localStorage.getItem(LEGACY_KEY) || ""; } catch { return ""; }
}
export function clearLegacyToken() {
  try { localStorage.removeItem(LEGACY_KEY); } catch {}
}

/* ===== Util umum (dipakai api.ts sbg fallback) ===== */
export function getAnyToken(): string {
  // Utamakan admin → student → legacy
  return getAdminToken() || getStudentToken() || getLegacyToken();
}

/* ===== Clear all ===== */
export function clearAllTokens() {
  clearAdminToken();
  clearStudentToken();
  clearLegacyToken();
}

/* ===== Back-compat helpers (kalau ada kode lama pakai nama ini) ===== */
export function setToken(t: string) { setStudentToken(t); }
export function getToken(): string { return getStudentToken(); }
export function clearToken() { clearStudentToken(); }
export function hasToken() { return hasStudentToken(); }

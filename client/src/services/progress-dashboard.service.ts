import { apiGet } from "@/lib/api";

/* ========= util ========= */
function isObject(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null;
}
function pickNumber(obj: unknown, keys: string[]): number | undefined {
  if (!isObject(obj)) return undefined;
  for (const k of keys) {
    const v = obj[k];
    if (typeof v === "number" && Number.isFinite(v)) return v;
    if (typeof v === "string") {
      const n = Number(v);
      if (Number.isFinite(n)) return n;
    }
  }
  return undefined;
}
function pickString(obj: unknown, keys: string[]): string | undefined {
  if (!isObject(obj)) return undefined;
  for (const k of keys) {
    const v = obj[k];
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return undefined;
}
function unwrapData(raw: unknown): unknown {
  if (isObject(raw) && "data" in raw) {
    const d1 = (raw as Record<string, unknown>)["data"];
    if (isObject(d1) && "data" in d1) return (d1 as Record<string, unknown>)["data"];
    return d1;
  }
  return raw;
}

/* ========= tipe yang dipakai UI ========= */
export type DueSoonItem = {
  enrollmentId: number;
  courseName: string;
  itemId: number;
  jenis: string;
  sesi: number;
  deadlineAt: string | null;
  daysLeft: number | null;
};

export type CourseCard = {
  enrollmentId: number;
  courseId: number;
  courseName: string;
  progressPct: number; // 0..100
  overdue: number;
  dueSoon: DueSoonItem[];
};

/** GET /api/me/progress?days=N → daftar kartu + dueSoon list */
export async function getDashboardProgress(days = 3): Promise<{
  courses: CourseCard[];
  dueSoonFlat: DueSoonItem[];
}> {
  const raw = await apiGet<unknown>(`/api/me/progress?days=${encodeURIComponent(days)}`, true);
  const payload = unwrapData(raw);
  const items = Array.isArray(isObject(payload) ? (payload as Record<string, unknown>)["items"] : null)
    ? ((payload as Record<string, unknown>)["items"] as unknown[])
    : [];

  const courses: CourseCard[] = [];
  const dueSoonFlat: DueSoonItem[] = [];

  for (const it of items) {
    if (!isObject(it)) continue;
    const enrollmentId = pickNumber(it, ["enrollmentId"]) ?? 0;
    const courseId = pickNumber(it, ["courseId"]) ?? 0;
    const courseName = pickString(it, ["courseName", "nama", "name"]) ?? `Course#${courseId}`;
    const progressPctRaw =
      pickNumber(it, ["progressPct", "progress", "percent", "pct"]) ?? 0;
    const progressPct = Math.max(0, Math.min(100, progressPctRaw));
    const overdue = pickNumber(it, ["overdue"]) ?? 0;

    const dueSoonRaw = isObject(it) ? it["dueSoon"] : [];
    const dueSoon: DueSoonItem[] = [];
    if (Array.isArray(dueSoonRaw)) {
      for (const d of dueSoonRaw) {
        if (!isObject(d)) continue;
        const row: DueSoonItem = {
          enrollmentId,
          courseName,
          itemId: pickNumber(d, ["itemId", "id"]) ?? 0,
          jenis: pickString(d, ["jenis", "type"]) ?? "ITEM",
          sesi: pickNumber(d, ["sesi", "session"]) ?? 0,
          deadlineAt:
            pickString(d, ["deadlineAt"]) ??
            (isObject(d["deadlineAt"]) ? String(d["deadlineAt"]) : null),
          daysLeft:
            pickNumber(d, ["daysLeft"]) ??
            (isObject(d["daysLeft"]) ? Number(d["daysLeft"]) : null),
        };
        dueSoon.push(row);
        dueSoonFlat.push(row);
      }
    }

    courses.push({ enrollmentId, courseId, courseName, progressPct, overdue, dueSoon });
  }

  // urutkan kartu: progress naik (yang rendah dulu), lalu overdue banyak
  courses.sort((a, b) => a.progressPct - b.progressPct || b.overdue - a.overdue);

  // urutkan dueSoon: paling mepet dulu
  dueSoonFlat.sort((a, b) => (a.daysLeft ?? 9999) - (b.daysLeft ?? 9999));

  return { courses, dueSoonFlat };
}

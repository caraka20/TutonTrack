// src/services/progress.service.ts
import { apiGet } from "@/lib/api";
import type { Enrollment } from "@/services/enrollment.service";

/* =========================
   Util ketat (tanpa any)
========================= */
function isObject(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null;
}
function isArrayOf<T>(x: unknown, pred?: (v: unknown) => v is T): x is T[] {
  if (!Array.isArray(x)) return false;
  return pred ? x.every(pred) : true;
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

/* =========================
   Tipe respons (FE mirror)
========================= */
export type DueSoonItem = {
  itemId: number;
  jenis: string;
  sesi: number;
  deadlineAt: string | null;
  daysLeft: number | null;
};

export type CourseProgress = {
  enrollmentId: number;
  courseId: number;
  courseName: string;
  total: number;
  selesai: number;
  progressPct: number; // 0..100
  overdue: number;
  dueSoon: DueSoonItem[];
  lastUpdated?: string;
};

export type StudentProgressResponse = {
  studentId: number;
  items: CourseProgress[];
  summary: {
    courses: number;
    totalItems: number;
    totalSelesai: number;
    avgProgressPct: number;
    overdue: number;
  };
};

/* =========================================================
   Normalisasi payload BE: {data:{...}} | {data:{data:{...}}}
   + fallback perhitungan progressPct bila belum ada
========================================================= */
function normalizeStudentProgress(raw: unknown): StudentProgressResponse {
  // ambil data utama
  let payload: unknown = raw;
  if (isObject(raw) && "data" in raw) {
    const d1 = (raw as Record<string, unknown>)["data"];
    payload = d1;
    if (isObject(d1) && "data" in d1) {
      payload = (d1 as Record<string, unknown>)["data"];
    }
  }
  const p = isObject(payload) ? (payload as Record<string, unknown>) : {};

  // studentId
  const studentId = pickNumber(p, ["studentId"]) ?? 0;

  // items (array of CourseProgress-like)
  const itemsRaw =
    (isObject(p) && p["items"]) ||
    (isObject(p) && (p["courses"] as unknown)); // jaga-jaga kalau BE pakai key "courses"

  const items: CourseProgress[] = [];

  if (isArrayOf<unknown>(itemsRaw)) {
    for (const it of itemsRaw) {
      if (!isObject(it)) continue;

      const enrollmentId = pickNumber(it, ["enrollmentId"]) ?? 0;
      const courseId = pickNumber(it, ["courseId"]) ?? 0;
      const courseName =
        pickString(it, ["courseName", "nama", "name"]) ?? "Mata kuliah";
      const total = pickNumber(it, ["total", "totalItems"]) ?? 0;
      const selesai =
        pickNumber(it, ["selesai", "done", "doneItems", "completedItems"]) ?? 0;

      // progressPct langsung atau fallback dari selesai/total
      const pPctDirect =
        pickNumber(it, ["progressPct", "progress", "percent", "pct"]) ?? undefined;
      const progressPct =
        pPctDirect !== undefined
          ? Math.max(0, Math.min(100, pPctDirect))
          : total > 0
          ? Math.round((selesai / total) * 100)
          : 0;

      const overdue = pickNumber(it, ["overdue"]) ?? 0;

      // dueSoon
      const dsRaw = isObject(it) ? it["dueSoon"] : undefined;
      const dueSoon: DueSoonItem[] = [];
      if (isArrayOf<unknown>(dsRaw)) {
        for (const d of dsRaw) {
          if (!isObject(d)) continue;
          dueSoon.push({
            itemId: pickNumber(d, ["itemId", "id"]) ?? 0,
            jenis: pickString(d, ["jenis", "type"]) ?? "ITEM",
            sesi: pickNumber(d, ["sesi", "session"]) ?? 0,
            deadlineAt:
              pickString(d, ["deadlineAt"]) ??
              (isObject(d["deadlineAt"])
                ? String(d["deadlineAt"])
                : null),
            daysLeft:
              pickNumber(d, ["daysLeft"]) ??
              (isObject(d["daysLeft"]) ? Number(d["daysLeft"]) : null),
          });
        }
      }

      const lastUpdated =
        pickString(it, ["lastUpdated"]) ??
        (isObject(it["lastUpdated"]) ? String(it["lastUpdated"]) : undefined);

      items.push({
        enrollmentId,
        courseId,
        courseName,
        total,
        selesai,
        progressPct,
        overdue,
        dueSoon,
        lastUpdated,
      });
    }
  }

  // summary
  const totalsFromRaw = isObject(p) ? p["summary"] ?? p["totals"] : undefined;
  const summary = {
    courses:
      pickNumber(totalsFromRaw, ["courses"]) ?? items.length,
    totalItems:
      pickNumber(totalsFromRaw, ["totalItems"]) ??
      items.reduce((s, x) => s + x.total, 0),
    totalSelesai:
      pickNumber(totalsFromRaw, ["totalSelesai"]) ??
      items.reduce((s, x) => s + x.selesai, 0),
    avgProgressPct:
      pickNumber(totalsFromRaw, ["avgProgressPct"]) ??
      (items.length
        ? Math.round(items.reduce((s, x) => s + x.progressPct, 0) / items.length)
        : 0),
    overdue: pickNumber(totalsFromRaw, ["overdue"]) ?? items.reduce((s, x) => s + x.overdue, 0),
  };

  return { studentId, items, summary };
}

/* =========================================================
   API: GET /api/me/progress?days=N → compact utk merge cepat
========================================================= */
export type CompactProgress = {
  enrollmentId: number;
  progressPct: number; // 0..100
  dueSoonCount: number;
};

export async function getMeProgressCompact(days = 3): Promise<CompactProgress[]> {
  const res = await apiGet<unknown>(`/api/me/progress?days=${encodeURIComponent(days)}`, true);
  const norm = normalizeStudentProgress(res);
  return norm.items.map((x) => ({
    enrollmentId: x.enrollmentId,
    progressPct: x.progressPct,
    dueSoonCount: x.dueSoon.length,
  }));
}

/* ============================================
   Helper: index progress utk merge ke enrollments
============================================ */
export function buildProgressIndex(list: CompactProgress[]): Record<number, { pct: number; due: number }> {
  const out: Record<number, { pct: number; due: number }> = {};
  for (const it of list) {
    out[it.enrollmentId] = { pct: it.progressPct, due: it.dueSoonCount };
  }
  return out;
}

/* ==========================================================
   Merge progress ke data enrollment FE (tidak ubah kontrak)
========================================================== */
export function mergeProgressIntoEnrollments(
  enrollments: Enrollment[],
  idx: Record<number, { pct: number; due: number }>,
): Enrollment[] {
  return enrollments.map((e) => {
    const hit = idx[e.id];
    if (!hit) return e;
    return {
      ...e,
      progress: hit.pct,
      itemsDueSoon: hit.due,
    };
  });
}

/* ==========================================================
   Fallback: hitung progress dari /api/enrollments/:id/items
   Mengembalikan persen 0..100
========================================================== */
// tetap di file: src/services/progress.service.ts
type ApiEnvelope<T> =
  | T
  | { data: T }
  | { data: { data: T } }
  | { items: T }
  | { data: { items: T } };

type ItemRow = { status?: string | null };

export async function computeProgressFromItems(enrollmentId: number): Promise<number> {
  // ❗ pastikan generic-nya HANYA ItemRow[] (bukan ApiEnvelope<ItemRow[]>)
  const res = await apiGet<ApiEnvelope<ItemRow[]>>(
    `/api/enrollments/${enrollmentId}/items`,
    true
  );

  // Ekstrak array items dari berbagai bentuk envelope dg type guard aman
  let arr: unknown;

  if (Array.isArray(res)) {
    arr = res;
  } else if (isObject(res) && Array.isArray((res as Record<string, unknown>)["items"])) {
    arr = (res as Record<string, unknown>)["items"];
  } else if (isObject(res) && isObject((res as Record<string, unknown>)["data"])) {
    const d1 = (res as Record<string, unknown>)["data"] as Record<string, unknown>;

    if (Array.isArray(d1)) {
      arr = d1;
    } else if (Array.isArray(d1["items"])) {
      arr = d1["items"];
    } else if (isObject(d1["data"])) {
      const d2 = d1["data"] as Record<string, unknown>;
      if (Array.isArray(d2)) {
        arr = d2;
      } else if (Array.isArray(d2["items"])) {
        arr = d2["items"];
      }
    }
  }

  // Validasi bentuk array baris item
  if (!isArrayOf<ItemRow>(arr, (x): x is ItemRow => isObject(x))) return 0;

  const total = arr.length;
  if (total === 0) return 0;

  let selesai = 0;
  for (const it of arr) {
    const st = (it.status ?? "").toString().toUpperCase();
    if (st === "SELESAI") selesai += 1;
  }
  return Math.round((selesai / total) * 100);
}


/* ==========================================================
   Tambahan: Due Soon flatten untuk halaman /items (opsional)
   Tanpa mengubah fungsi yang sudah ada di atas.
========================================================== */
export type DueSoonRow = {
  enrollmentId: number;
  courseName: string;
  jenis: string;
  sesi: number;
  deadlineAt: string | null;
  daysLeft: number | null;
};

export async function getMeDueSoon(days = 7): Promise<DueSoonRow[]> {
  const res = await apiGet<unknown>(`/api/me/progress?days=${encodeURIComponent(days)}`, true);
  const norm = normalizeStudentProgress(res);

  const rows: DueSoonRow[] = [];
  for (const cp of norm.items) {
    for (const d of cp.dueSoon) {
      rows.push({
        enrollmentId: cp.enrollmentId,
        courseName: cp.courseName,
        jenis: d.jenis,
        sesi: d.sesi,
        deadlineAt: d.deadlineAt,
        daysLeft: d.daysLeft,
      });
    }
  }

  rows.sort((a, b) => {
    if (a.daysLeft == null && b.daysLeft == null) return 0;
    if (a.daysLeft == null) return 1;
    if (b.daysLeft == null) return -1;
    return a.daysLeft - b.daysLeft;
  });

  return rows;
}

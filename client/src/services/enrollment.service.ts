// src/services/enrollment.service.ts
import { apiDelete, apiGet, apiPost, apiPatch } from "@/lib/api";

/** Bentuk minimal untuk FE */
export type Enrollment = {
  id: number;
  course: unknown;              // akan dibaca aman via getCourseName
  progress?: number | null;     // boleh 0..1 atau 0..100, kita normalkan saat render
  itemsDueSoon?: number | null;
};

/* ========== type guards util ========== */
function isObject(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null;
}
function isArrayOf<T>(
  x: unknown,
  predicate?: (v: unknown) => v is T,
): x is T[] {
  if (!Array.isArray(x)) return false;
  return predicate ? x.every(predicate) : true;
}

/** baca items dari beberapa bentuk umum: {data:{items}}, {data:[]}, {items:[]}, [] */
function pickItems<T>(body: unknown): T[] {
  if (isArrayOf<T>(body)) return body;

  if (isObject(body)) {
    const d = body["data"];
    if (isObject(d)) {
      const items = (d as Record<string, unknown>)["items"];
      if (isArrayOf<T>(items)) return items;
      if (isArrayOf<T>(d)) return d as T[];
    }
    const items2 = body["items"];
    if (isArrayOf<T>(items2)) return items2;
  }
  return [];
}

/** baca affected dari beberapa bentuk: {affected} | {data:{affected}} | {data:{data:{affected}}} */
function readAffected(x: unknown): number {
  if (isObject(x)) {
    const a = x["affected"];
    if (typeof a === "number") return a;

    const d1 = x["data"];
    if (isObject(d1)) {
      const a1 = (d1 as Record<string, unknown>)["affected"];
      if (typeof a1 === "number") return a1;

      const d2 = (d1 as Record<string, unknown>)["data"];
      if (isObject(d2)) {
        const a2 = (d2 as Record<string, unknown>)["affected"];
        if (typeof a2 === "number") return a2;
      }
    }
  }
  return 0;
}

/** ambil nama matkul dari berbagai shape */
export function getCourseName(course: unknown): string {
  if (!isObject(course)) return "Mata kuliah";

  const tryKeys = ["nama", "name", "title", "courseName", "namaMatkul"];
  for (const k of tryKeys) {
    const v = course[k];
    if (typeof v === "string" && v.trim()) return v.trim();
  }

  const kode = typeof course["kode"] === "string" ? course["kode"].trim() : undefined;
  const nama = typeof course["nama"] === "string" ? course["nama"].trim() : undefined;
  if (kode && nama) return `${kode} – ${nama}`;
  if (kode) return kode;

  return "Mata kuliah";
}

/* ========== ENROLLMENTS LIST/CRUD ========== */

/** selalu coba endpoint resmi `/api/me/enrollments` dulu (sesuai router kamu) */
export async function getMyEnrollments(): Promise<Enrollment[]> {
  const paths = [
    "/api/me/enrollments",
    "/api/enrollments", // fallback lama
  ];

  for (const p of paths) {
    try {
      const res = await apiGet<unknown>(p, true);
      return pickItems<Enrollment>(res);
    } catch (e) {
      const msg = (e instanceof Error ? e.message : String(e ?? "")).toLowerCase();
      if (msg.includes("404") || msg.includes("not found")) continue;
      throw e;
    }
  }
  return [];
}

/** tambah enrollment: coba courseId; kalau gagal/ga ada → pakai courseName */
export async function addEnrollment(input: { courseId?: number; courseName?: string }) {
  if (typeof input.courseId === "number") {
    try {
      await apiPost("/api/enrollments", { courseId: input.courseId }, true);
      return;
    } catch {
      /* fallback ke nama */
    }
  }
  if (input.courseName && input.courseName.trim()) {
    await apiPost("/api/enrollments", { courseName: input.courseName.trim() }, true);
    return;
  }
  throw new Error("Mohon isi Course ID atau Nama Matkul.");
}

export async function deleteEnrollment(id: number) {
  await apiDelete(`/api/enrollments/${id}`, undefined, true);
}

export async function syncEnrollmentDeadlines(id: number): Promise<number> {
  const res = await apiPost<
    { affected: number } | { data: { affected: number } } | { data: { data: { affected: number } } }
  >(`/api/enrollments/${id}/sync-deadlines`, undefined, true);
  return readAffected(res);
}

/* ========== ITEMS (DETAIL ENROLLMENT) ========== */

export type ItemStatus = "BELUM" | "SELESAI";

export type EnrollmentItem = {
  id: number;
  jenis: string;
  sesi: number | null;
  status: ItemStatus;
  deadlineAt: string | null;
  nilai?: number | null;
  course?: unknown;
};

/** GET /api/enrollments/:enrollId/items */
export async function getEnrollmentItems(enrollId: number): Promise<EnrollmentItem[]> {
  const res = await apiGet<unknown>(`/api/enrollments/${enrollId}/items`, true);
  return pickItems<EnrollmentItem>(res);
}

/** PATCH /api/items/:itemId/status { status } */
export async function updateItemStatus(itemId: number, status: ItemStatus): Promise<void> {
  await apiPatch(`/api/items/${itemId}/status`, { status }, true);
}

/** PATCH /api/items/:itemId/nilai { nilai } */
export async function updateItemNilai(itemId: number, nilai: number): Promise<void> {
  await apiPatch(`/api/items/${itemId}/nilai`, { nilai }, true);
}

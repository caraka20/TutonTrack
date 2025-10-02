// client/src/services/course-admin.service.ts
import { apiGet, apiPost, apiPatch, apiDelete, type ApiEnvelope } from "@/lib/api";

/* =========================
   TYPES
========================= */
export type AdminCourse = {
  id: number;
  nama: string;
  deadlineCount?: number;
  createdAt: string;
  updatedAt?: string;
};

export type CourseListParams = {
  q?: string;
  page?: number;
  limit?: number;
  sortBy?: "createdAt" | "nama";
  sortDir?: "asc" | "desc";
};

export type Paginated<T> = { data: T[]; page: number; limit: number; total: number };

export type CreateCourseData = Pick<AdminCourse, "id" | "nama" | "createdAt">;
export type UpdateCourseData = Pick<AdminCourse, "id" | "nama" | "updatedAt">;
export type DeleteCourseData = { deleted: boolean } | boolean;

/* =========================
   SMALL SAFE HELPERS (tanpa any)
========================= */
function isRec(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null;
}
function isArr<T = unknown>(x: unknown): x is T[] {
  return Array.isArray(x);
}
function getNum(obj: Record<string, unknown>, key: string): number | undefined {
  const v = obj[key];
  return typeof v === "number" && Number.isFinite(v) ? v : undefined;
}

/** Coerce satu objek kursus jadi AdminCourse */
function coerceCourse(x: unknown): AdminCourse | null {
  if (!isRec(x)) return null;

  const idRaw = (x as Record<string, unknown>)["id"];
  const id = typeof idRaw === "number" && Number.isFinite(idRaw) ? idRaw : Number.NaN;
  if (!Number.isFinite(id)) return null;

  const nama = String((x as Record<string, unknown>)["nama"] ?? "");
  const createdAtRaw = (x as Record<string, unknown>)["createdAt"];
  const updatedAtRaw = (x as Record<string, unknown>)["updatedAt"];
  const createdAt =
    typeof createdAtRaw === "string" ? createdAtRaw : new Date().toISOString();
  const updatedAt = typeof updatedAtRaw === "string" ? updatedAtRaw : undefined;

  // deadlineCount bisa muncul di top-level atau lewat _count.courseDeadlines
  let deadlineCount: number | undefined;
  const topDC = (x as Record<string, unknown>)["deadlineCount"];
  if (typeof topDC === "number") {
    deadlineCount = topDC;
  } else if (
    isRec((x as Record<string, unknown>)["_count"]) &&
    typeof ((x as Record<string, unknown>)["_count"] as Record<string, unknown>)["courseDeadlines"] === "number"
  ) {
    deadlineCount = ((x as Record<string, unknown>)["_count"] as Record<string, unknown>)[
      "courseDeadlines"
    ] as number;
  }

  return { id, nama, createdAt, updatedAt, deadlineCount };
}

/** Normalisasi semua bentuk paginated yang umum dari BE */
function normalizeList(
  raw: unknown,
  fallbackPage: number,
  fallbackLimit: number,
): Paginated<AdminCourse> {
  let data: AdminCourse[] = [];
  let page = fallbackPage;
  let limit = fallbackLimit;
  let total: number | undefined;

  const takeArray = (v: unknown): AdminCourse[] =>
    isArr(v) ? (v as unknown[]).map(coerceCourse).filter(Boolean) as AdminCourse[] : [];

  // Array langsung
  if (isArr(raw)) {
    data = takeArray(raw);
    const t = data.length; // total dari panjang array jika tidak ada info lain
    return { data, page, limit, total: t };
  }

  if (isRec(raw)) {
    // { data: [...] } (+ optional pagination)
    if (isArr(raw["data"])) {
      data = takeArray(raw["data"]);
      if (isRec(raw["pagination"])) {
        const p = raw["pagination"] as Record<string, unknown>;
        page = getNum(p, "page") ?? page;
        limit = getNum(p, "limit") ?? limit;
        total = getNum(p, "total");
      } else {
        page = getNum(raw, "page") ?? page;
        limit = getNum(raw, "limit") ?? limit;
        total = getNum(raw, "total");
      }
      const t = total ?? data.length;
      return { data, page, limit, total: t };
    }

    // { items: [...] } (+ optional pagination)
    if (isArr(raw["items"])) {
      data = takeArray(raw["items"]);
      if (isRec(raw["pagination"])) {
        const p = raw["pagination"] as Record<string, unknown>;
        page = getNum(p, "page") ?? page;
        limit = getNum(p, "limit") ?? limit;
        total = getNum(p, "total");
      } else {
        page = getNum(raw, "page") ?? page;
        limit = getNum(raw, "limit") ?? limit;
        total = getNum(raw, "total");
      }
      const t = total ?? data.length;
      return { data, page, limit, total: t };
    }

    // { data: { items: [...] , pagination? } } atau { data: { data: [...] } }
    if (isRec(raw["data"])) {
      const d1 = raw["data"] as Record<string, unknown>;

      if (isArr(d1["items"])) {
        data = takeArray(d1["items"]);
        if (isRec(d1["pagination"])) {
          const p = d1["pagination"] as Record<string, unknown>;
          page = getNum(p, "page") ?? page;
          limit = getNum(p, "limit") ?? limit;
          total = getNum(p, "total");
        } else {
          page = getNum(d1, "page") ?? page;
          limit = getNum(d1, "limit") ?? limit;
          total = getNum(d1, "total");
        }
        const t = total ?? data.length;
        return { data, page, limit, total: t };
      }

      if (isArr(d1["data"])) {
        data = takeArray(d1["data"]);
        if (isRec(d1["pagination"])) {
          const p = d1["pagination"] as Record<string, unknown>;
          page = getNum(p, "page") ?? page;
          limit = getNum(p, "limit") ?? limit;
          total = getNum(p, "total");
        } else {
          page = getNum(d1, "page") ?? page;
          limit = getNum(d1, "limit") ?? limit;
          total = getNum(d1, "total");
        }
        const t = total ?? data.length;
        return { data, page, limit, total: t };
      }
    }
  }

  // fallback aman (total tidak diketahui → 0)
  return { data, page, limit, total: total ?? 0 };
}

/* =========================
   API
========================= */
export async function adminListCourses(
  params: CourseListParams = {},
): Promise<Paginated<AdminCourse>> {
  const qs = new URLSearchParams();
  if (params.q) qs.set("q", params.q);
  if (typeof params.page === "number") qs.set("page", String(params.page));
  if (typeof params.limit === "number") qs.set("limit", String(params.limit));
  if (params.sortBy) qs.set("sortBy", params.sortBy);
  if (params.sortDir) qs.set("sortDir", params.sortDir);

  const url = `/api/courses${qs.toString() ? `?${qs.toString()}` : ""}`;

  const env = await apiGet<unknown>(url, true);
  const body: unknown = (env as ApiEnvelope<unknown>).data ?? env; // api.ts sudah aman
  const page = params.page ?? 1;
  const limit = params.limit ?? 10;

  return normalizeList(body, page, limit);
}

export async function adminCreateCourse(body: { nama: string }): Promise<CreateCourseData | Record<string, unknown>> {
  const env = await apiPost<CreateCourseData | Record<string, unknown>, typeof body>("/api/courses", body, true);
  return env.data;
}

export async function adminUpdateCourse(
  id: number,
  patch: Partial<{ nama: string }>,
): Promise<UpdateCourseData | Record<string, unknown>> {
  const env = await apiPatch<UpdateCourseData | Record<string, unknown>, typeof patch>(`/api/courses/${id}`, patch, true);
  return env.data;
}

export async function adminDeleteCourse(
  id: number,
  opts?: { force?: boolean },
): Promise<ApiEnvelope<DeleteCourseData>> {
  const qs = opts?.force ? "?force=1" : "";
  // ⬇️ body harus undefined, withAuth = true (argumen ke-3)
  return apiDelete<DeleteCourseData>(`/api/courses/${id}${qs}`, undefined, true);
}

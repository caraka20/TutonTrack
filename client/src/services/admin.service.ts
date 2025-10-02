import { apiGet, apiPost, apiPatch, apiDelete } from "@/lib/api";

/* ================= Utils kecil (tanpa any) ================= */
function isRec(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null;
}
function isArr<T = unknown>(x: unknown): x is T[] {
  return Array.isArray(x);
}
function isNum(x: unknown): x is number {
  return typeof x === "number" && Number.isFinite(x);
}
function num(x: unknown, fb = 0): number {
  if (isNum(x)) return x;
  if (typeof x === "string") {
    const n = Number(x);
    if (Number.isFinite(n)) return n;
  }
  return fb;
}
function dig(o: unknown, k: string): unknown {
  return isRec(o) ? o[k] : undefined;
}
/** Unwrap {data:{...}} atau {data:{data:{...}}} → T */
function unwrap<T>(raw: unknown): T {
  if (isRec(raw) && isRec(raw.data)) {
    const d1 = raw.data as Record<string, unknown>;
    if (isRec(d1.data)) return d1.data as T;
    return d1 as T;
  }
  return raw as T;
}
function toIso(x: unknown): string | undefined {
  if (x instanceof Date) return x.toISOString();
  if (typeof x === "string" && x.trim()) return x;
  return undefined;
}

/* ================= AUTH ================= */
export type AdminLoginBody = { username: string; password: string };
export type AdminLoginData = {
  token: string;
  data: { id: number; username: string; role: string };
};

export async function adminLogin(body: AdminLoginBody): Promise<AdminLoginData> {
  const res = await apiPost<AdminLoginData, AdminLoginBody>("/api/admin/login", body, false);
  return res.data;
}

/* ================= DEADLINES ================= */
export type JenisTugas = "DISKUSI" | "TUGAS" | "ABSEN" | "QUIZ";
export type ApplyBody = { courseIds?: number[]; studentIds?: number[]; jenis?: JenisTugas; sesi?: number[] };
export type ShiftBody = ApplyBody & { days: number; includeCompleted?: boolean; minDate?: string | Date; maxDate?: string | Date };
export type ApplyResult = { affected: number; byCourse: Record<number, number> };
export type ShiftResult = { affected: number };

export async function adminApplyDeadlines(body: ApplyBody): Promise<ApplyResult> {
  const res = await apiPost<unknown, ApplyBody>("/api/admin/deadlines/apply", body, true);
  return unwrap<ApplyResult>(res.data);
}
export async function adminShiftDeadlines(body: ShiftBody): Promise<ShiftResult> {
  const payload: ShiftBody = { ...body, minDate: toIso(body.minDate) ?? body.minDate, maxDate: toIso(body.maxDate) ?? body.maxDate };
  const res = await apiPost<unknown, ShiftBody>("/api/admin/deadlines/shift", payload, true);
  return unwrap<ShiftResult>(res.data);
}

/* ================= DASHBOARD ================= */
export type SummaryResponse = {
  totalStudents: number; totalEnrollments: number; totalItems: number; totalCompleted: number;
  overdueCount: number; dueSoonCount: number; overallProgress: number;
};
export type TopRiskItem = { studentId: number; nim: string; nama: string; enrollments: number; totalItems: number; completedItems: number; overdue: number; progress: number; };
export type TopRiskResponse = { items: TopRiskItem[] };
export type HeatBucket = "P0_25" | "P25_50" | "P50_75" | "P75_100";
export type CourseHeat = { courseId: number; courseName: string; enrollments: number; avgProgress: number; bucketCounts: Record<HeatBucket, number>; };
export type CoursesHeatmapResponse = { items: CourseHeat[]; totalCourses: number };

export async function getAdminSummary(dueWithinDays = 3): Promise<SummaryResponse> {
  const res = await apiGet<unknown>(`/api/admin/dashboard/summary?dueWithinDays=${encodeURIComponent(dueWithinDays)}`, true);
  return unwrap<SummaryResponse>(res.data);
}
export async function getAdminTopRisk(limit = 10, minEnrollments?: number): Promise<TopRiskResponse> {
  const qs = new URLSearchParams({ limit: String(limit) });
  if (typeof minEnrollments === "number") qs.set("minEnrollments", String(minEnrollments));
  const res = await apiGet<unknown>(`/api/admin/dashboard/top-risk?${qs.toString()}`, true);
  return unwrap<TopRiskResponse>(res.data);
}
export async function getAdminCoursesHeatmap(): Promise<CoursesHeatmapResponse> {
  const res = await apiGet<unknown>("/api/admin/dashboard/courses/heatmap", true);
  return unwrap<CoursesHeatmapResponse>(res.data);
}

/* ================= STUDENTS ================= */
export type AdminStudent = {
  id: number; nim: string; noHp: string; nama: string; createdAt: string; updatedAt: string;
};
export type AdminStudentListParams = {
  q?: string; nim?: string; noHp?: string; courseId?: number;
  sort?: "createdAt:asc" | "createdAt:desc" | "nama:asc" | "nama:desc";
  page?: number; limit?: number;
};
export type Paginated<T> = { data: T[]; page: number; limit: number; total: number };

/** Mapper aman → AdminStudent */
function coerceStudent(x: unknown): AdminStudent | null {
  if (!isRec(x)) return null;
  const id = num(dig(x, "id"), NaN);
  if (!Number.isFinite(id)) return null;

  const nim = String(dig(x, "nim") ?? "");
  const noHp = String(dig(x, "noHp") ?? "");
  const nama = String(dig(x, "nama") ?? "");
  const createdAt = String(dig(x, "createdAt") ?? new Date().toISOString());
  const updatedAt = String(dig(x, "updatedAt") ?? dig(x, "createdAt") ?? new Date().toISOString());
  return { id, nim, noHp, nama, createdAt, updatedAt };
}

/** Ekstrak items + pagination dari objek apa pun */
function extractStudentsDeep(body: unknown): Paginated<AdminStudent> {
  let data: AdminStudent[] = [];
  let page = 1, limit = 10, total = 0;

  const take = (arr: unknown): void => {
    if (!isArr(arr)) return;
    const out: AdminStudent[] = [];
    for (const it of arr) {
      const row = coerceStudent(it);
      if (row) out.push(row);
    }
    if (out.length) data = out;
  };

  const applyPag = (src: unknown): void => {
    if (!isRec(src)) return;
    page = num(dig(src, "page"), page);
    limit = num(dig(src, "limit"), limit);
    total = num(dig(src, "total"), total);
    const pag = dig(src, "pagination");
    if (isRec(pag)) {
      page = num(dig(pag, "page"), page);
      limit = num(dig(pag, "limit"), limit);
      total = num(dig(pag, "total"), total);
    }
  };

  const walk = (box: unknown): void => {
    if (!isRec(box)) return;
    // kandidat array
    take(dig(box, "items"));
    take(dig(box, "data"));
    // pagination di mana pun
    applyPag(box);
    if (isRec(dig(box, "data"))) {
      walk(dig(box, "data"));
    }
  };

  walk(body);
  return { data, page, limit, total: total || data.length };
}

/** LIST: tahan semua bentuk, plus handle jika res.data = array */
export async function adminListStudents(
  params: AdminStudentListParams = {}
): Promise<Paginated<AdminStudent>> {
  const qs = new URLSearchParams();
  if (params.q) qs.set("q", params.q);
  if (params.nim) qs.set("nim", params.nim);
  if (params.noHp) qs.set("noHp", params.noHp);
  if (typeof params.courseId === "number") qs.set("courseId", String(params.courseId));
  if (params.sort) qs.set("sort", params.sort);
  if (typeof params.page === "number") qs.set("page", String(params.page));
  if (typeof params.limit === "number") qs.set("limit", String(params.limit));

  const url = `/api/students${qs.toString() ? `?${qs.toString()}` : ""}`;
  const res = await apiGet<unknown>(url, true);

  // 1) Coba ekstraksi bentuk "paginated" yang benar lebih dulu (items/data + pagination/total)
  const deep = extractStudentsDeep(res.data);
  if (deep.data.length > 0 || deep.total > 0) {
    return deep; // sudah ada page/limit/total dari server → pakai ini
  }

  // 2) BE kirim ARRAY polos (fallback)
  if (Array.isArray(res.data)) {
    const rows = (res.data as unknown[]).map(coerceStudent).filter(Boolean) as AdminStudent[];

    const pageNum = params.page ?? 1;
    const limitNum = params.limit ?? 10;

    // Tebak total:
    // - kalau jumlah baris == limit → besar kemungkinan masih ada halaman berikutnya
    //   maka set total > page*limit agar tombol Next hidup.
    // - kalau kurang dari limit → anggap sudah di halaman terakhir.
    const guessedTotal =
      rows.length === limitNum
        ? pageNum * limitNum + 1 // bikin totalPages > page → Next aktif
        : (pageNum - 1) * limitNum + rows.length;

    return { data: rows, page: pageNum, limit: limitNum, total: guessedTotal };
  }

  // 3) Benar-benar kosong
  return { data: [], page: params.page ?? 1, limit: params.limit ?? 10, total: 0 };
}

export async function adminGetStudent(id: number): Promise<{ data: AdminStudent }> {
  const res = await apiGet<unknown>(`/api/students/${id}`, true);
  return unwrap<{ data: AdminStudent }>(res.data);
}
export async function adminCreateStudent(payload: { nim: string; noHp: string; nama: string }) {
  const res = await apiPost<unknown, typeof payload>("/api/students", payload, true);
  return unwrap<{ data: AdminStudent }>(res.data);
}
export async function adminUpdateStudent(
  id: number,
  patch: Partial<{ nim: string; noHp: string; nama: string }>,
) {
  const res = await apiPatch<unknown, typeof patch>(`/api/students/${id}`, patch, true);
  return unwrap<{ data: AdminStudent }>(res.data);
}
export async function adminDeleteStudent(id: number) {
  // ⬇️ JANGAN taruh `true` di argumen ke-2
  const res = await apiDelete<unknown>(`/api/students/${id}`, undefined, true);
  return res.data as { deleted: boolean };
}
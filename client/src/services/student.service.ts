import { apiGet, apiPost, apiPatch } from "@/lib/api";

/* ===================== Types ===================== */
export type RegisterPayload = { nim: string; noHp: string; nama: string };
export type LoginResponse = { token: string };
export type Student = { id: number; nim: string; nama: string; noHp: string };

export type MeProgress = {
  name?: string;
  totalItems: number;
  completedItems: number;
  /** 0..1 (UI akan kalikan 100) */
  progress: number;
};

export type DueItem = {
  enrollmentId: number;
  courseName: string;
  jenis: string;      // ABSEN | DISKUSI | TUGAS | QUIZ
  sesi: number;
  deadlineAt: string; // ISO
};

/* ===================== Helpers tanpa any ===================== */
function isObject(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null;
}
function toNumber(x: unknown, fb = 0) {
  if (typeof x === "number" && Number.isFinite(x)) return x;
  if (typeof x === "string") {
    const n = Number(x);
    if (Number.isFinite(n)) return n;
  }
  return fb;
}
function toString(x: unknown, fb = "") {
  return typeof x === "string" ? x : fb;
}
function toStringOpt(x: unknown): string | undefined {
  return typeof x === "string" && x.trim() ? x : undefined;
}
function dig(obj: unknown, key: string): unknown {
  return isObject(obj) ? obj[key] : undefined;
}
function readNested<T>(body: unknown): T | undefined {
  if (!isObject(body)) return undefined;
  const d1 = body["data"];
  if (isObject(d1)) {
    const d2 = d1["data"];
    if (isObject(d2)) return d2 as T;
    return d1 as T;
  }
  return undefined;
}
function readCourseName(course: unknown): string {
  if (isObject(course)) {
    const n1 = course["nama"];
    if (typeof n1 === "string" && n1.trim()) return n1;
    const n2 = course["name"];
    if (typeof n2 === "string" && n2.trim()) return n2;
  }
  return "Mata kuliah";
}
function toIso(x: unknown): string | null {
  if (typeof x === "string" && x.trim()) return x;
  if (x instanceof Date) return x.toISOString();
  // handle object Date-like
  if (isObject(x) && "toString" in x) {
    try {
      const s = String(x);
      const d = new Date(s);
      if (!Number.isNaN(d.getTime())) return d.toISOString();
    } catch {}
  }
  return null;
}

/* ===================== Auth & Profile ===================== */
export async function registerStudent(payload: RegisterPayload) {
  await apiPost<{ data: Student; token: string }, RegisterPayload>(
    "/api/students/register",
    payload,
    false
  );
}

export async function loginStudentByNim(nim: string) {
  const res = await apiPost<LoginResponse, { nim: string }>(
    "/api/students/login",
    { nim },
    false
  );
  return res.data.token;
}

export async function getMe() {
  const res = await apiGet<{ data: Student }>("/api/students/me", true);
  return res.data.data;
}

export async function updateMe(patch: Partial<Pick<Student, "nama" | "noHp">>) {
  const res = await apiPatch<{ data: Student }, typeof patch>(
    "/api/students/me",
    patch,
    true
  );
  return res.data.data;
}

/* ===================== Dashboard: summary progress ===================== */
export async function getMeProgress(): Promise<MeProgress> {
  const raw = await apiGet<unknown>("/api/me/progress", true);

  // payload bisa {data:{...}} atau {data:{data:{...}}} atau langsung {...}
  const payload =
    readNested<Record<string, unknown>>(raw) ||
    (isObject(raw) ? (raw as Record<string, unknown>) : {});

  // ambil blok summary/totals kalau ada
  const totals =
    (isObject(payload["summary"]) ? (payload["summary"] as Record<string, unknown>) : undefined) ??
    (isObject(payload["totals"]) ? (payload["totals"] as Record<string, unknown>) : undefined);

  const progressFromTotals =
    toNumber((totals as Record<string, unknown> | undefined)?.["progress"], NaN) ??
    toNumber((totals as Record<string, unknown> | undefined)?.["avgProgressPct"], NaN);

  let progress01 = 0;

  if (Number.isFinite(progressFromTotals)) {
    // jika 0..100 → ubah ke 0..1
    const p = progressFromTotals as number;
    progress01 = p > 1 ? p / 100 : p;
  } else if (Array.isArray((payload as Record<string, unknown>)?.["items"])) {
    // 2) kalau ada daftar per-course, ambil rata-rata progressPct (dalam %)
    const itemsArr = (payload as Record<string, unknown>)["items"] as unknown[];

    const nums: number[] = itemsArr.map((it) =>
      isObject(it) ? toNumber((it as Record<string, unknown>)["progressPct"], 0) : 0,
    );

    const avgPct = nums.length ? Math.round(nums.reduce((a, b) => a + b, 0) / nums.length) : 0;
    progress01 = Math.max(0, Math.min(1, avgPct / 100));
  } else {
    // 3) fallback: hitung dari totalItems & totalSelesai bila valid
    const totalItems = toNumber((totals as Record<string, unknown> | undefined)?.["totalItems"], NaN);
    const totalSelesai = toNumber((totals as Record<string, unknown> | undefined)?.["totalSelesai"], NaN);

    progress01 =
      Number.isFinite(totalItems) && Number.isFinite(totalSelesai) && (totalItems as number) > 0
        ? (totalSelesai as number) / (totalItems as number)
        : 0;
  }

  return {
    name: toStringOpt((payload as Record<string, unknown>)?.["name"]),
    totalItems: toNumber((totals as Record<string, unknown> | undefined)?.["totalItems"], 0),
    completedItems: toNumber((totals as Record<string, unknown> | undefined)?.["totalSelesai"], 0),
    progress: Math.max(0, Math.min(1, progress01)),
  };

}


/* ===================== Dashboard: Due Soon ===================== */
/**
 * Ambil due-soon dari summary `/api/me/progress`.
 * Support:
 * - { data: { dueSoon: [...] } }
 * - { data: { data: { dueSoon: [...] } } }
 * - { dueSoon: [...] } | { itemsDueSoon: [...] } | { items: [...] }
 * - **BENTUK BARU**: { items: [{ enrollmentId, courseName, dueSoon: [...] }, ...] }
 */
export async function getDueSoon(): Promise<DueItem[]> {
  const raw = await apiGet<unknown>("/api/me/progress", true);

  // Unwrap {data} / {data:{data}}
  const box =
    readNested<Record<string, unknown>>(raw) ||
    (isObject(raw) ? (raw as Record<string, unknown>) : undefined) ||
    {};

  // 1) cek list top-level seperti sebelumnya
  const topList =
    (dig(box, "dueSoon") as unknown) ??
    (dig(box, "itemsDueSoon") as unknown) ??
    (dig(box, "items") as unknown);

  const pickFromArray = (arr: unknown[]): DueItem[] => {
    const out: DueItem[] = [];
    for (const x of arr) {
      if (!isObject(x)) continue;

      const enrollment = dig(x, "enrollment");
      const enrollmentId =
        toNumber(dig(x, "enrollmentId")) ||
        (isObject(enrollment) ? toNumber(enrollment["id"]) : 0);

      const course =
        dig(x, "course") ?? dig(x, "courseInfo") ?? enrollment;
      const courseName =
        toStringOpt(dig(x, "courseName")) ?? readCourseName(course);

      out.push({
        enrollmentId,
        courseName,
        jenis: toString(dig(x, "jenis"), toString(dig(x, "type"), "ITEM")),
        sesi: toNumber(dig(x, "sesi"), 0),
        deadlineAt: toString(dig(x, "deadlineAt"), new Date().toISOString()),
      });
    }
    return out;
  };

  if (Array.isArray(topList)) {
    return pickFromArray(topList as unknown[]);
  }

  // 2) BENTUK BARU: items[] berisi per-matkul, masing-masing punya dueSoon[]
  const items = Array.isArray(box["items"]) ? (box["items"] as unknown[]) : [];
  const out: DueItem[] = [];

  for (const it of items) {
    if (!isObject(it)) continue;
    const enrollmentId = toNumber(it["enrollmentId"], 0);
    const courseName =
      toStringOpt(it["courseName"]) ??
      readCourseName(it["course"] ?? it["courseInfo"]);

    const dueSoonArr = Array.isArray(it["dueSoon"]) ? (it["dueSoon"] as unknown[]) : [];
    for (const d of dueSoonArr) {
      if (!isObject(d)) continue;
      out.push({
        enrollmentId,
        courseName: courseName ?? "Mata kuliah",
        jenis: toString(d["jenis"], toString(d["type"], "ITEM")),
        sesi: toNumber(d["sesi"], 0),
        deadlineAt: toIso(d["deadlineAt"]) ?? new Date().toISOString(),
      });
    }
  }

  return out;
}



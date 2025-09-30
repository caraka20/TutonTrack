// src/services/enrollment.ts
import { apiGet } from "@/lib/api";

export type EnrollCourse = { id: number; nama: string; progress: number };

export async function getMyCourses() {
  const res = await apiGet<{ courses: EnrollCourse[] }>("/api/me/progress", true);
  // kalau endpoint /api/me/progress, ambil dari field courses
  const data = res.data;
  return Array.isArray((data as any).courses) ? (data as any).courses as EnrollCourse[] : [];
}

export async function getDueSoon() {
  const res = await apiGet<{ dueSoon: { id: number; jenis: string; sesi: number; deadlineAt: string | null }[] }>(
    "/api/me/progress",
    true
  );
  const data = res.data;
  return Array.isArray((data as any).dueSoon) ? (data as any).dueSoon : [];
}

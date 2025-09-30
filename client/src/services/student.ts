// src/services/student.ts
import { apiGet } from "@/lib/api";

// FE-safe enum (string union), jangan import @prisma/client di client bundle
export type JenisTugas = "DISKUSI" | "ABSEN" | "TUGAS" | "QUIZ";

export type DueItem = {
  id: number;
  jenis: JenisTugas;
  sesi: number;
  deadlineAt: string | null;
  courseId: number;
  courseName: string;
};

export type CourseProgress = {
  courseId: number;
  courseName: string;
  totalItems: number;
  completedItems: number;
  progress: number; // 0..1
};

export type MeProgress = {
  name: string;
  totalItems: number;
  completedItems: number;
  progress: number; // 0..1
  dueSoon: DueItem[];
  courses: CourseProgress[];
};

export async function getMeProgress() {
  const res = await apiGet<MeProgress>("/api/me/progress", true);
  return res.data;
}

export async function getCoursesProgress() {
  const full = await getMeProgress();
  return full.courses;
}

export async function getDueSoon() {
  const full = await getMeProgress();
  return full.dueSoon;
}

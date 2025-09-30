// server/src/app/progress/progress.model.ts
import { JenisTugas, StatusTugas } from "@prisma/client"

export type DueSoonItem = {
  itemId: number
  jenis: JenisTugas
  sesi: number
  deadlineAt: Date | null
  daysLeft: number | null
}

export type CourseProgress = {
  enrollmentId: number
  courseId: number
  courseName: string
  total: number
  selesai: number
  progressPct: number
  overdue: number
  dueSoon: DueSoonItem[]
  // opsional untuk tampilan
  lastUpdated: Date
}

export type StudentProgressResponse = {
  studentId: number
  items: CourseProgress[]
  summary: {
    courses: number
    totalItems: number
    totalSelesai: number
    avgProgressPct: number
    overdue: number
  }
}

export type AdminEnrollmentListItem = {
  enrollmentId: number
  studentId: number
  studentNama: string
  studentNim: string
  courseId: number
  courseName: string
  total: number
  selesai: number
  progressPct: number
  overdue: number
  createdAt: Date
  updatedAt: Date
}

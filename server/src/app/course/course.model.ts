// server/src/app/course/course.model.ts
import { JenisTugas } from "../../generated/prisma"

/* ===== SUGGEST ===== */
export type CourseSuggestItem = { id: number; nama: string }

/* ===== LIST (admin) ===== */
export type CourseSortBy = "createdAt" | "nama"
export type SortDir = "asc" | "desc"

export interface CourseListQuery {
  q?: string
  page: number
  limit: number
  sortBy: CourseSortBy
  sortDir: SortDir
}

export interface CourseListItem {
  id: number
  nama: string
  deadlineCount: number
  createdAt: Date
}

/* ===== DETAIL (admin) ===== */
export interface CourseDetailResponse {
  id: number
  nama: string
  deadlines: { jenis: JenisTugas; sesi: number; deadlineAt: Date | null }[]
  createdAt: Date
  updatedAt: Date
}

/* ===== CREATE/UPDATE ===== */
export interface CreateCourseBody {
  nama: string
}
export interface UpdateCourseBody {
  nama?: string
}

/* ===== DEADLINES ===== */
export interface PutDeadlinesBody {
  items: { jenis: JenisTugas; sesi: number; deadlineAt: Date | null }[]
}

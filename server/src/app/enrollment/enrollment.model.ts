// server/src/app/enrollment/enrollment.model.ts
import { JenisTugas, StatusTugas } from "@prisma/client"

/** Body untuk POST /api/enrollments (student self) */
export type AddEnrollmentBody =
  | { courseId: number; withQuiz?: boolean; quizSesi?: number[] }
  | { courseName: string; withQuiz?: boolean; quizSesi?: number[] }

/** Ringkasan enrollment */
export interface EnrollmentSummary {
  id: number
  studentId: number
  courseId: number
  courseName: string
  createdAt: Date
}

/** Response create enrollment */
export interface AddEnrollmentResponse {
  enrollment: EnrollmentSummary
  generated: number
}

/** View item per sesi */
export interface ItemView {
  id: number
  jenis: JenisTugas
  sesi: number
  status: StatusTugas
  nilai: number | null
  deadlineAt: Date | null
  selesaiAt: Date | null
  deskripsi: string | null
}

/** Body patch status */
export interface ItemStatusBody {
  status: "BELUM" | "SELESAI"
}

/** Body patch nilai */
export interface ItemNilaiBody {
  nilai: number
}

/** Body put reminder preference */
export interface ReminderPrefBody {
  offsetMin: number
  active: boolean
  note?: string | null
}

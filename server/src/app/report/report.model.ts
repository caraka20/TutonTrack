// server/src/app/report/report.model.ts
export type OverdueQuery = {
  courseId?: number
  start?: Date
  end?: Date
  page: number
  limit: number
  sortDir: "asc" | "desc"
}

export type OverdueItem = {
  itemId: number
  jenis: string
  sesi: number
  deadlineAt: Date
  daysOverdue: number
  enrollmentId: number
  courseId: number
  courseName: string
  studentId: number
  studentNim: string
  studentNama: string
}

export type ExportCsvQuery = {
  courseId?: number
}

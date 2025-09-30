// Ringkasan & tipe data untuk Dashboard Owner

export type SummaryQuery = {
  /** hitung due-soon untuk N hari ke depan (default 3) */
  dueWithinDays: number
}

export type SummaryResponse = {
  totalStudents: number
  totalEnrollments: number
  totalItems: number
  totalCompleted: number
  overdueCount: number
  dueSoonCount: number
  overallProgress: number // 0..1
}

export type TopRiskQuery = {
  /** ambil N teratas (default 10) */
  limit: number
  /** opsional: minimal enrollment agar relevan */
  minEnrollments?: number
}

export type TopRiskItem = {
  studentId: number
  nim: string
  nama: string
  enrollments: number
  totalItems: number
  completedItems: number
  overdue: number
  progress: number // 0..1
}

export type TopRiskResponse = {
  items: TopRiskItem[]
}

export type HeatBucket = "P0_25" | "P25_50" | "P50_75" | "P75_100"

export type CourseHeat = {
  courseId: number
  courseName: string
  enrollments: number
  avgProgress: number // 0..1
  bucketCounts: Record<HeatBucket, number>
}

export type CoursesHeatmapResponse = {
  items: CourseHeat[]
  totalCourses: number
}

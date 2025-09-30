import { DashboardRepository } from "./dashboard.repository"
import {
  SummaryQuery,
  SummaryResponse,
  TopRiskQuery,
  TopRiskResponse,
  CoursesHeatmapResponse,
  HeatBucket,
} from "./dashboard.model"

const now = () => new Date()

function bucketOf(progress: number): HeatBucket {
  // progress 0..1
  if (progress < 0.25) return "P0_25"
  if (progress < 0.5) return "P25_50"
  if (progress < 0.75) return "P50_75"
  return "P75_100"
}

export class DashboardService {
  static async summary(q: SummaryQuery): Promise<SummaryResponse> {
    const [totalStudents, totalEnrollments, items] = await Promise.all([
      DashboardRepository.countStudents(),
      DashboardRepository.countEnrollments(),
      DashboardRepository.itemsCore(),
    ])

    const n = items.length
    const completed = items.filter((i) => i.status === "SELESAI").length

    const nowTs = now().getTime()
    const soonTs = nowTs + q.dueWithinDays * 24 * 60 * 60 * 1000

    let overdue = 0
    let dueSoon = 0

    for (const it of items) {
      const dl = it.deadlineAt?.getTime()
      if (!dl) continue
      if (it.status !== "SELESAI") {
        if (dl < nowTs) overdue++
        else if (dl >= nowTs && dl <= soonTs) dueSoon++
      }
    }

    const overallProgress = n > 0 ? +(completed / n).toFixed(4) : 0

    return {
      totalStudents,
      totalEnrollments,
      totalItems: n,
      totalCompleted: completed,
      overdueCount: overdue,
      dueSoonCount: dueSoon,
      overallProgress,
    }
  }

  static async topRisk(q: TopRiskQuery): Promise<TopRiskResponse> {
    const items = await DashboardRepository.itemsCore()

    // Aggregate per student
    type Acc = {
      nim: string
      nama: string
      enrollments: Set<number> // pakai studentId|courseId gabung? cukup enrollment via Set courseId
      total: number
      done: number
      overdue: number
    }
    const map = new Map<number, Acc>() // studentId -> acc

    const nowTs = now().getTime()

    for (const it of items) {
      const sid = it.enrollment.studentId
      const acc = map.get(sid) ?? {
        nim: it.enrollment.student.nim,
        nama: it.enrollment.student.nama,
        enrollments: new Set<number>(),
        total: 0,
        done: 0,
        overdue: 0,
      }
      acc.total++
      if (it.status === "SELESAI") acc.done++
      const dl = it.deadlineAt?.getTime()
      if (it.status !== "SELESAI" && dl && dl < nowTs) acc.overdue++
      acc.enrollments.add(it.enrollment.courseId)
      map.set(sid, acc)
    }

    // buat array + filter minEnrollments (opsional)
    let arr = Array.from(map.entries()).map(([studentId, a]) => {
      const progress = a.total > 0 ? +(a.done / a.total).toFixed(4) : 0
      return {
        studentId,
        nim: a.nim,
        nama: a.nama,
        enrollments: a.enrollments.size,
        totalItems: a.total,
        completedItems: a.done,
        overdue: a.overdue,
        progress,
      }
    })

    if (q.minEnrollments && q.minEnrollments > 0) {
      arr = arr.filter((x) => x.enrollments >= q.minEnrollments!)
    }

    // sort: overdue DESC, progress ASC, totalItems DESC
    arr.sort((A, B) =>
      B.overdue - A.overdue ||
      A.progress - B.progress ||
      B.totalItems - A.totalItems
    )

    return { items: arr.slice(0, q.limit) }
  }

  static async coursesHeatmap(): Promise<CoursesHeatmapResponse> {
    const items = await DashboardRepository.itemsByCourse()

    // Aggregate per courseId per student (progress per enrollment), lalu ringkas per course
    type PerEnrollment = { done: number; total: number }
    const perCourseEnroll = new Map<number, Map<number, PerEnrollment>>() // courseId -> (studentId -> per-enroll)

    for (const it of items) {
      const cid = it.enrollment.courseId
      const sid = it.enrollment.studentId
      const byCourse = perCourseEnroll.get(cid) ?? new Map<number, PerEnrollment>()
      const pe = byCourse.get(sid) ?? { done: 0, total: 0 }
      pe.total++
      if (it.status === "SELESAI") pe.done++
      byCourse.set(sid, pe)
      perCourseEnroll.set(cid, byCourse)
    }

    // compute per course: avg progress dan bucket distribusi
    type CourseNameMap = Map<number, string>
    const courseNames: CourseNameMap = new Map()
    // ambil nama course (kita sudah punya di select itemsByCourse)
    for (const it of items) {
      const cid = it.enrollment.courseId
      if (!courseNames.has(cid)) courseNames.set(cid, it.enrollment.course.nama)
    }

    const result = []
    for (const [cid, byStudent] of perCourseEnroll.entries()) {
      let sumProgress = 0
      let countEnroll = 0
      const buckets: Record<HeatBucket, number> = { P0_25: 0, P25_50: 0, P50_75: 0, P75_100: 0 }

      for (const pe of byStudent.values()) {
        const p = pe.total > 0 ? pe.done / pe.total : 0
        sumProgress += p
        countEnroll++

        const bucket = bucketOf(p)
        buckets[bucket]++
      }

      const avg = countEnroll > 0 ? +(sumProgress / countEnroll).toFixed(4) : 0
      result.push({
        courseId: cid,
        courseName: courseNames.get(cid) ?? `Course#${cid}`,
        enrollments: countEnroll,
        avgProgress: avg,
        bucketCounts: buckets,
      })
    }

    // Urutkan yang enrollments terbanyak → avgProgress ascending (biar gampang spotting “bermasalah”)
    result.sort((a, b) => b.enrollments - a.enrollments || a.avgProgress - b.avgProgress)

    return { items: result, totalCourses: result.length }
  }
}

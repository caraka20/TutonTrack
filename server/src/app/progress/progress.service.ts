// server/src/app/progress/progress.service.ts
import { StatusTugas } from "@prisma/client"
import {
  AdminEnrollmentListItem,
  CourseProgress,
  StudentProgressResponse,
} from "./progress.model"
import { ProgressRepository } from "./progress.repository"

const daysBetween = (a: Date, b: Date) =>
  Math.ceil((a.getTime() - b.getTime()) / (24 * 3600 * 1000))

function buildCourseProgress(
  en: Awaited<ReturnType<typeof ProgressRepository.enrollmentsOfStudent>>[number],
  daysWindow: number,
): CourseProgress {
  const total = en.items.length
  const selesai = en.items.filter((it) => it.status === StatusTugas.SELESAI).length
  const progressPct = total ? Math.round((selesai / total) * 100) : 0

  const now = new Date()
  const dueSoon = en.items
    .filter((it) => it.status !== StatusTugas.SELESAI)
    .map((it) => {
      const daysLeft =
        it.deadlineAt ? daysBetween(it.deadlineAt, now) * -1 /* invert later? nope */ : null
      return {
        itemId: it.id,
        jenis: it.jenis,
        sesi: it.sesi,
        deadlineAt: it.deadlineAt,
        daysLeft: it.deadlineAt ? daysBetween(it.deadlineAt, now) : null,
      }
    })
    .filter((d) => d.daysLeft !== null && d.daysLeft! <= daysWindow && d.daysLeft! >= 0)
    .sort((a, b) => (a.daysLeft ?? 0) - (b.daysLeft ?? 0))

  const overdue = en.items.filter(
    (it) =>
      it.status !== StatusTugas.SELESAI &&
      it.deadlineAt !== null &&
      it.deadlineAt.getTime() < now.getTime(),
  ).length

  return {
    enrollmentId: en.id,
    courseId: en.course.id,
    courseName: en.course.nama,
    total,
    selesai,
    progressPct,
    overdue,
    dueSoon,
    lastUpdated: en.items.reduce((acc, it) => (it.updatedAt > acc ? it.updatedAt : acc), en.createdAt),
  }
}

export class ProgressService {
  static async me(studentId: number, daysWindow: number): Promise<StudentProgressResponse> {
    const rows = await ProgressRepository.enrollmentsOfStudent(studentId)

    const items = rows.map((en) => buildCourseProgress(en, daysWindow))

    const totalItems = items.reduce((s, x) => s + x.total, 0)
    const totalSelesai = items.reduce((s, x) => s + x.selesai, 0)
    const avgProgressPct = items.length
      ? Math.round(items.reduce((s, x) => s + x.progressPct, 0) / items.length)
      : 0
    const overdue = items.reduce((s, x) => s + x.overdue, 0)

    return {
      studentId,
      items,
      summary: {
        courses: items.length,
        totalItems,
        totalSelesai,
        avgProgressPct,
        overdue,
      },
    }
  }

  static async student(sid: number, daysWindow: number) {
    // reuse me()
    return this.me(sid, daysWindow)
  }

  static async adminEnrollmentsList(params: {
    page: number
    limit: number
    courseId?: number
    q?: string
    minPct?: number
    maxPct?: number
    overdueOnly?: boolean
  }): Promise<{ items: AdminEnrollmentListItem[]; total: number }> {
    const raw = await ProgressRepository.adminEnrollmentsRaw()
    const now = new Date()

    // map to computed items
    let mapped: AdminEnrollmentListItem[] = raw.map((en) => {
      const total = en.items.length
      const selesai = en.items.filter((it) => it.status === StatusTugas.SELESAI).length
      const overdue = en.items.filter(
        (it) => it.status !== StatusTugas.SELESAI && it.deadlineAt && it.deadlineAt < now,
      ).length
      const progressPct = total ? Math.round((selesai / total) * 100) : 0
      return {
        enrollmentId: en.id,
        studentId: en.student.id,
        studentNama: en.student.nama,
        studentNim: en.student.nim,
        courseId: en.course.id,
        courseName: en.course.nama,
        total,
        selesai,
        progressPct,
        overdue,
        createdAt: en.createdAt,
        updatedAt: en.updatedAt,
      }
    })

    // filters
    if (params.courseId) mapped = mapped.filter((x) => x.courseId === params.courseId)
    if (params.q) {
      const q = params.q.toLowerCase()
      mapped = mapped.filter(
        (x) =>
          x.studentNama.toLowerCase().includes(q) ||
          x.studentNim.toLowerCase().includes(q) ||
          x.courseName.toLowerCase().includes(q),
      )
    }
    if (params.minPct !== undefined) mapped = mapped.filter((x) => x.progressPct >= params.minPct!)
    if (params.maxPct !== undefined) mapped = mapped.filter((x) => x.progressPct <= params.maxPct!)
    if (params.overdueOnly) mapped = mapped.filter((x) => x.overdue > 0)

    const total = mapped.length
    const start = (params.page - 1) * params.limit
    const end = start + params.limit
    const items = mapped.slice(start, end)

    return { items, total }
  }
}

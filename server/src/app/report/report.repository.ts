// server/src/app/report/report.repository.ts
import { prismaClient } from "../../config/database"
import { OverdueItem } from "./report.model"

export class ReportRepository {
  /** Item status BELUM & deadlineAt < now (overdue). */
  static async overdue(query: {
    courseId?: number
    start?: Date
    end?: Date
    page: number
    limit: number
    sortDir: "asc" | "desc"
  }) {
    const now = new Date()
    const whereItem: any = {
      status: "BELUM",
      deadlineAt: { not: null, lt: now },
      ...(query.start || query.end
        ? {
            deadlineAt: {
              ...(query.start ? { gte: query.start } : {}),
              ...(query.end ? { lte: query.end } : {}),
            },
          }
        : {}),
      ...(query.courseId ? { enrollment: { courseId: query.courseId } } : {}),
    }

    const [rows, total] = await Promise.all([
      prismaClient.tutonItem.findMany({
        where: whereItem,
        orderBy: [{ deadlineAt: query.sortDir }],
        skip: (query.page - 1) * query.limit,
        take: query.limit,
        select: {
          id: true, jenis: true, sesi: true, deadlineAt: true, enrollmentId: true,
          enrollment: {
            select: {
              courseId: true,
              course: { select: { nama: true } },
              studentId: true,
              student: { select: { nim: true, nama: true } },
            },
          },
        },
      }),
      prismaClient.tutonItem.count({ where: whereItem }),
    ])

    const items: OverdueItem[] = rows.map((r) => ({
      itemId: r.id,
      jenis: r.jenis,
      sesi: r.sesi,
      deadlineAt: r.deadlineAt as Date,
      daysOverdue: Math.max(
        0,
        Math.ceil((now.getTime() - (r.deadlineAt as Date).getTime()) / 86_400_000)
      ),
      enrollmentId: r.enrollmentId,
      courseId: r.enrollment.courseId,
      courseName: r.enrollment.course.nama,
      studentId: r.enrollment.studentId,
      studentNim: r.enrollment.student.nim,
      studentNama: r.enrollment.student.nama,
    }))

    return { items, total }
  }

  /** CSV sederhana: enrollment + progress + overdue count */
  static async exportCsv(courseId?: number) {
    const whereEnr: any = courseId ? { courseId } : {}

    const rows = await prismaClient.enrollment.findMany({
      where: whereEnr,
      select: {
        id: true,
        createdAt: true,
        course: { select: { id: true, nama: true } },
        student: { select: { id: true, nim: true, nama: true } },
        _count: { select: { items: true } },
        items: {
          select: { status: true, deadlineAt: true },
        },
      },
      orderBy: [{ id: "asc" }],
    })

    const header = [
      "enrollmentId",
      "courseId",
      "courseName",
      "studentId",
      "studentNim",
      "studentNama",
      "totalItems",
      "completedItems",
      "overdueItems",
      "createdAt",
    ].join(",")

    const now = new Date()
    const lines = rows.map((r) => {
      const totalItems = r._count.items
      const completed = r.items.filter((i) => i.status === "SELESAI").length
      const overdue = r.items.filter(
        (i) => i.status === "BELUM" && i.deadlineAt && i.deadlineAt < now
      ).length

      const cols = [
        r.id,
        r.course.id,
        `"${(r.course.nama || "").replace(/"/g, '""')}"`,
        r.student.id,
        `"${r.student.nim}"`,
        `"${(r.student.nama || "").replace(/"/g, '""')}"`,
        totalItems,
        completed,
        overdue,
        r.createdAt.toISOString(),
      ]
      return cols.join(",")
    })

    return [header, ...lines].join("\n")
  }
}

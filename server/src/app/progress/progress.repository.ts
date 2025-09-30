// server/src/app/progress/progress.repository.ts
import { prismaClient } from "../../config/database"
import { StatusTugas } from "@prisma/client"

export class ProgressRepository {
  /** all enrollments of a student with items */
  static async enrollmentsOfStudent(studentId: number) {
    return prismaClient.enrollment.findMany({
      where: { studentId },
      include: {
        course: { select: { id: true, nama: true } },
        items: {
          select: {
            id: true,
            jenis: true,
            sesi: true,
            status: true,
            deadlineAt: true,
            updatedAt: true,
          },
          orderBy: [{ jenis: "asc" }, { sesi: "asc" }],
        },
      },
      orderBy: { createdAt: "desc" },
    })
  }

  /** single student's basic info (for admin view) */
  static async studentBasic(id: number) {
    return prismaClient.student.findUnique({
      where: { id },
      select: { id: true, nama: true, nim: true },
    })
  }

  /** list all enrollments (admin) with student & course + items */
  static async adminEnrollmentsRaw() {
    return prismaClient.enrollment.findMany({
      include: {
        student: { select: { id: true, nama: true, nim: true } },
        course: { select: { id: true, nama: true } },
        items: {
          select: {
            status: true,
            deadlineAt: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })
  }

  /** count total enrollments for pagination after applying filters (do on memory -> length) */
  // (no DB call needed; handled in service)
}

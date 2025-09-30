import { prismaClient } from "../../config/database"

export class DashboardRepository {
  static countStudents() {
    return prismaClient.student.count()
  }

  static countEnrollments() {
    return prismaClient.enrollment.count()
  }

  static async itemsCore() {
    // Ambil minimal kolom yang dibutuhkan untuk agregasi
    return prismaClient.tutonItem.findMany({
      select: {
        status: true,
        deadlineAt: true,
        enrollment: {
          select: {
            studentId: true,
            courseId: true,
            student: { select: { nim: true, nama: true } },
            course: { select: { nama: true } },
          },
        },
      },
    })
  }

  static async itemsByCourse() {
    // Sama, tapi plus id item & sesi kalau nanti mau dipakai
    return prismaClient.tutonItem.findMany({
      select: {
        status: true,
        enrollment: {
          select: {
            courseId: true,
            course: { select: { nama: true } },
            studentId: true,
          },
        },
      },
    })
  }
}

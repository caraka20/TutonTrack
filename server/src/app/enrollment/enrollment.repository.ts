// server/src/app/enrollment/enrollment.repository.ts
import { prismaClient } from "../../config/database"
import {
  Prisma,
  JenisTugas,
  StatusTugas,
  ReminderSource,
  ReminderChannel,
  ReminderStatus,
} from "@prisma/client"
import { RepoError } from "../student/student.repository"
import { ReminderPrefBody } from "./enrollment.model"

export class EnrollmentRepository {
  /* ============== Helpers ============== */

  /** Pastikan courseId ada; kalau input pakai courseName → upsert course & balikan id */
  static async resolveCourseId(input: { courseId?: number; courseName?: string }) {
    if (input.courseId) return input.courseId
    const name = (input.courseName ?? "").trim()
    if (!name) throw new RepoError("courseName required", 400)

    const course = await prismaClient.course.upsert({
      where: { nama: name },
      update: {},
      create: { nama: name },
      select: { id: true },
    })
    return course.id
  }

  /** Cegah ambil matkul yang sama 2x (soft-check) */
  static async ensureNotEnrolled(studentId: number, courseId: number) {
    const dup = await prismaClient.enrollment.findFirst({
      where: { studentId, courseId },
      select: { id: true },
    })
    if (dup) throw new RepoError("Sudah mengambil mata kuliah ini", 409)
  }

  /** Buat 1 enrollment + bawa createdAt & courseName */
  static async createEnrollment(studentId: number, courseId: number) {
    try {
      return await prismaClient.enrollment.create({
        data: { studentId, courseId },
        select: {
          id: true,
          studentId: true,
          courseId: true,
          createdAt: true,
          course: { select: { nama: true } },
        },
      })
    } catch (e: any) {
      // race condition → unique constraint (studentId+courseId)
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
        throw new RepoError("Sudah mengambil mata kuliah ini", 409)
      }
      throw e
    }
  }

  /**
   * Generate 8 diskusi, 8 absen, 3 tugas (+quiz opsional)
   * Deadline diisi dari MASTER GLOBAL `sessionWindow` (bukan per-course).
   * sessionWindow.endAt → TutonItem.deadlineAt
   */
  static async createItemsForEnrollment(params: {
    enrollmentId: number
    courseId: number
    withQuiz?: boolean
    quizSesi?: number[]
  }) {
    const { enrollmentId, withQuiz, quizSesi } = params

    // Ambil semua window yang relevan
    const windows = await prismaClient.sessionWindow.findMany({
      select: { jenis: true, sesi: true, endAt: true },
    })
    const winMap = new Map<string, Date | null>(
      windows.map((w) => [`${w.jenis}:${w.sesi}`, w.endAt ?? null]),
    )
    const findDeadline = (jenis: JenisTugas, sesi: number) =>
      winMap.get(`${jenis}:${sesi}`) ?? null

    const payload: Prisma.TutonItemCreateManyInput[] = []

    // DISKUSI 1..8
    for (let s = 1; s <= 8; s++) {
      payload.push({
        enrollmentId,
        jenis: JenisTugas.DISKUSI,
        sesi: s,
        status: StatusTugas.BELUM,
        deadlineAt: findDeadline(JenisTugas.DISKUSI, s),
        nilai: null,
        deskripsi: null,
        selesaiAt: null,
      })
    }
    // ABSEN 1..8
    for (let s = 1; s <= 8; s++) {
      payload.push({
        enrollmentId,
        jenis: JenisTugas.ABSEN,
        sesi: s,
        status: StatusTugas.BELUM,
        deadlineAt: findDeadline(JenisTugas.ABSEN, s),
        nilai: null,
        deskripsi: null,
        selesaiAt: null,
      })
    }
    // TUGAS 3,5,7
    for (const s of [3, 5, 7]) {
      payload.push({
        enrollmentId,
        jenis: JenisTugas.TUGAS,
        sesi: s,
        status: StatusTugas.BELUM,
        deadlineAt: findDeadline(JenisTugas.TUGAS, s),
        nilai: null,
        deskripsi: null,
        selesaiAt: null,
      })
    }
    // QUIZ opsional
    if (withQuiz && quizSesi?.length) {
      for (const s of quizSesi) {
        payload.push({
          enrollmentId,
          jenis: JenisTugas.QUIZ,
          sesi: s,
          status: StatusTugas.BELUM,
          deadlineAt: findDeadline(JenisTugas.QUIZ, s),
          nilai: null,
          deskripsi: null,
          selesaiAt: null,
        })
      }
    }

    if (!payload.length) return 0
    const result = await prismaClient.tutonItem.createMany({ data: payload })
    return result.count
  }

  /* ============== Queries ============== */

  static async listMyEnrollments(studentId: number) {
    const rows = await prismaClient.enrollment.findMany({
      where: { studentId },
      orderBy: { createdAt: "desc" },
      include: { course: true },
    })
    return rows.map((r) => ({
      id: r.id,
      studentId: r.studentId,
      courseId: r.courseId,
      courseName: r.course.nama,
      createdAt: r.createdAt,
    }))
  }

  /** Pastikan enrollment milik student */
  static async mustOwnEnrollment(enrollId: number, studentId: number) {
    const row = await prismaClient.enrollment.findFirst({
      where: { id: enrollId, studentId },
      include: { course: true },
    })
    if (!row) throw new RepoError("Enrollment not found", 404)
    return row
  }

  static async getItems(enrollId: number, studentId: number) {
    await this.mustOwnEnrollment(enrollId, studentId)
    return prismaClient.tutonItem.findMany({
      where: { enrollmentId: enrollId },
      orderBy: [{ jenis: "asc" }, { sesi: "asc" }],
      select: {
        id: true,
        jenis: true,
        sesi: true,
        status: true,
        nilai: true,
        deadlineAt: true,
        selesaiAt: true,
        deskripsi: true,
      },
    })
  }

  /** Pastikan item milik student */
  static async mustOwnItem(itemId: number, studentId: number) {
    const item = await prismaClient.tutonItem.findFirst({
      where: { id: itemId, enrollment: { studentId } },
      select: { id: true },
    })
    if (!item) throw new RepoError("Item not found", 404)
  }

  /* ============== Mutations on items ============== */

  static async updateItemStatus(itemId: number, status: "BELUM" | "SELESAI") {
    const selesaiAt = status === "SELESAI" ? new Date() : null
    return prismaClient.tutonItem.update({
      where: { id: itemId },
      data: { status: status as any, selesaiAt },
      select: { id: true, jenis: true, sesi: true, status: true, selesaiAt: true },
    })
  }

  static async updateItemNilai(itemId: number, nilai: number) {
    return prismaClient.tutonItem.update({
      where: { id: itemId },
      data: { nilai },
      select: { id: true, nilai: true },
    })
  }

  /** Upsert reminder preference (source=WEB, channel=WA) */
  static async upsertReminderPreference(
    itemId: number,
    studentId: number,
    body: ReminderPrefBody
  ) {
    await this.mustOwnItem(itemId, studentId)

    const existing = await prismaClient.reminder.findFirst({
      where: { itemId, source: ReminderSource.WEB },
      select: { id: true },
    })

    if (existing) {
      return prismaClient.reminder.update({
        where: { id: existing.id },
        data: {
          offsetMin: body.offsetMin,
          active: body.active,
          note: body.note ?? null,
        },
      })
    }

    return prismaClient.reminder.create({
      data: {
        itemId,
        source: ReminderSource.WEB,
        status: ReminderStatus.PENDING,
        channel: ReminderChannel.WA,
        note: body.note ?? null,
        offsetMin: body.offsetMin,
        active: body.active,
      },
    })
  }

  static async getOwnedEnrollment(enrollId: number, studentId: number) {
    return prismaClient.enrollment.findFirst({
      where: { id: enrollId, studentId },
      select: { id: true, courseId: true },
    })
  }

  /** Cek ada item SELESAI? */
  static async hasCompletedItems(enrollId: number) {
    const cnt = await prismaClient.tutonItem.count({
      where: { enrollmentId: enrollId, status: "SELESAI" },
    })
    return cnt > 0
  }

  /** Hapus enrollment (cascade hapus items & reminders sesuai schema) */
  static async deleteEnrollment(enrollId: number) {
    await prismaClient.enrollment.delete({ where: { id: enrollId } })
    return true
  }

  /**
   * Ambil “master deadline” yang sekarang bersumber dari `sessionWindow`
   * (param courseId diabaikan agar kompatibel dgn signature lama).
   */
  static async getCourseDeadlines(_courseId: number) {
    const wins = await prismaClient.sessionWindow.findMany({
      select: { jenis: true, sesi: true, endAt: true },
    })
    // Samakan bentuk keluaran lama: { jenis, sesi, deadlineAt }
    return wins.map((w) => ({ jenis: w.jenis, sesi: w.sesi, deadlineAt: w.endAt }))
  }

  /** Terapkan deadline ke satu enrollment saja (by jenis+sesi) */
  static async applyDeadlinesToEnrollment(
    enrollId: number,
    dls: Array<{ jenis: JenisTugas; sesi: number; deadlineAt: Date | null }>
  ) {
    let affected = 0
    for (const d of dls) {
      const res = await prismaClient.tutonItem.updateMany({
        where: { enrollmentId: enrollId, jenis: d.jenis, sesi: d.sesi },
        data: { deadlineAt: d.deadlineAt },
      })
      affected += res.count
    }
    return { affected }
  }

  /** Ambil item yang DIPEGANG student ini; kalau tidak, return null */
  static async getOwnedItemDetail(itemId: number, studentId: number) {
    return prismaClient.tutonItem.findFirst({
      where: { id: itemId, enrollment: { studentId } },
      select: {
        id: true,
        jenis: true,
        sesi: true,
        status: true,
        nilai: true,
        deadlineAt: true,
        selesaiAt: true,
        deskripsi: true,
        enrollmentId: true,
      },
    })
  }

  /** Update deskripsi */
  static async updateItemDesc(itemId: number, deskripsi: string) {
    return prismaClient.tutonItem.update({
      where: { id: itemId },
      data: { deskripsi },
      select: { id: true, jenis: true, sesi: true, deskripsi: true, updatedAt: true },
    })
  }
}

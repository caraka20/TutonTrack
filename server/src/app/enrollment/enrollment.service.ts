// server/src/app/enrollment/enrollment.service.ts
import { EnrollmentRepository } from "./enrollment.repository"
import {
  AddEnrollmentBody,
  AddEnrollmentResponse,
  ItemView,
  ReminderPrefBody,
} from "./enrollment.model"
import { normalizeQuizSesi } from "./enrollment.validation"
import { AppError } from "../../middleware/app-error"
import { ERROR_CODE } from "../../utils/error-codes"

export class EnrollmentService {
  /** Student menambah matkul + auto-generate items (ikut CourseDeadline bila ada) */
  static async add(studentId: number, body: AddEnrollmentBody): Promise<AddEnrollmentResponse> {
    // resolve course
    const courseId = await EnrollmentRepository.resolveCourseId({
      courseId: (body as any).courseId,
      courseName: (body as any).courseName,
    })

    // pastikan belum ambil
    await EnrollmentRepository.ensureNotEnrolled(studentId, courseId)

    // create enrollment
    const created = await EnrollmentRepository.createEnrollment(studentId, courseId)

    // generate items
    const generated = await EnrollmentRepository.createItemsForEnrollment({
      enrollmentId: created.id,
      courseId,
      withQuiz: (body as any).withQuiz ?? false,
      quizSesi: normalizeQuizSesi((body as any).quizSesi),
    })

    return {
      enrollment: {
        id: created.id,
        studentId: created.studentId,
        courseId: created.courseId,
        courseName: created.course.nama,
        createdAt: created.createdAt,
      },
      generated,
    }
  }

  /** Daftar enrollment milik dirinya */
  static async myEnrollments(studentId: number) {
    return EnrollmentRepository.listMyEnrollments(studentId)
  }

  static async items(enrollId: number, studentId: number): Promise<ItemView[]> {
    return EnrollmentRepository.getItems(enrollId, studentId) as any
  }

  static async setItemStatus(itemId: number, studentId: number, status: "BELUM" | "SELESAI") {
    await EnrollmentRepository.mustOwnItem(itemId, studentId)
    return EnrollmentRepository.updateItemStatus(itemId, status)
  }

  static async setItemNilai(itemId: number, studentId: number, nilai: number) {
    await EnrollmentRepository.mustOwnItem(itemId, studentId)
    return EnrollmentRepository.updateItemNilai(itemId, nilai)
  }

  static async putReminder(itemId: number, studentId: number, body: ReminderPrefBody) {
    return EnrollmentRepository.upsertReminderPreference(itemId, studentId, body)
  }

  static async unenroll(enrollId: number, studentId: number) {
    const owned = await EnrollmentRepository.getOwnedEnrollment(enrollId, studentId)
    if (!owned) throw AppError.fromCode(ERROR_CODE.NOT_FOUND, "Enrollment tidak ditemukan")

    const locked = await EnrollmentRepository.hasCompletedItems(enrollId)
    if (locked) {
      throw AppError.fromCode(
        ERROR_CODE.BAD_REQUEST,
        "Tidak bisa unenroll: sudah ada item yang SELESAI"
      )
    }

    await EnrollmentRepository.deleteEnrollment(enrollId)
    return { deleted: true }
  }

  static async syncDeadlines(enrollId: number, studentId: number) {
    const owned = await EnrollmentRepository.getOwnedEnrollment(enrollId, studentId)
    if (!owned) throw AppError.fromCode(ERROR_CODE.NOT_FOUND, "Enrollment tidak ditemukan")

    const dls = await EnrollmentRepository.getCourseDeadlines(owned.courseId)
    if (!dls.length) return { affected: 0 }

    const result = await EnrollmentRepository.applyDeadlinesToEnrollment(
      enrollId,
      dls.map((d) => ({ jenis: d.jenis, sesi: d.sesi, deadlineAt: d.deadlineAt ?? null }))
    )
    return result
  }
  static async getItem(itemId: number, studentId: number) {
    const item = await EnrollmentRepository.getOwnedItemDetail(itemId, studentId)
    if (!item) throw AppError.fromCode(ERROR_CODE.NOT_FOUND, "Item tidak ditemukan")
    return item
  }

  static async setItemDesc(itemId: number, studentId: number, deskripsi: string) {
    const owned = await EnrollmentRepository.getOwnedItemDetail(itemId, studentId)
    if (!owned) throw AppError.fromCode(ERROR_CODE.NOT_FOUND, "Item tidak ditemukan")

    const data = await EnrollmentRepository.updateItemDesc(itemId, deskripsi)
    return data
  }
  
}

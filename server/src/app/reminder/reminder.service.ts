import { ReminderRepository } from "./reminder.repository"
import { ReminderListQuery, GenerateDueBody } from "./reminder.model"
import { AppError } from "../../middleware/app-error"
import { ERROR_CODE } from "../../utils/error-codes"

export class ReminderService {
  /** List dengan default & normalisasi */
  static async list(q: ReminderListQuery) {
    const safe: ReminderListQuery = {
      page: Math.max(1, q.page),
      limit: Math.min(Math.max(q.limit, 1), 100),
      status: q.status ?? "PENDING",
      dueWithinMin: q.dueWithinMin ?? 1440,
      courseId: q.courseId,
      studentId: q.studentId,
      jenis: q.jenis,
    }

    // Jika status bukan PENDING tapi diminta dueWithinMin → boleh, tapi ingat “due” relevan ke PENDING.
    // Di sini tidak diblok, biar fleksibel. Kalau mau, bisa di-warning/ignore.

    return ReminderRepository.list(safe)
  }

  /** Send: guard status sudah di repo; di service tambah guard role bila perlu */
  static async send(id: number, adminId?: number) {
    if (!adminId) {
      // seharusnya sudah dijamin oleh middleware authAdmin; ini extra guard
      throw AppError.fromCode(ERROR_CODE.UNAUTHORIZED, "Admin token required")
    }
    return ReminderRepository.markSent(id, adminId)
  }

  /** Generate: normalisasi angka agar aman */
  static async generateDue(body: GenerateDueBody) {
    const offset = Math.min(Math.max(body.defaultOffsetMin ?? 1440, 1), 60 * 24 * 7) // 1..7 hari
    const horizon = Math.min(Math.max(body.horizonDays ?? 14, 1), 60)                // 1..60 hari
    return ReminderRepository.generateDue(offset, horizon)
  }
}

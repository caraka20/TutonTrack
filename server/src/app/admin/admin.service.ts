// server/src/app/admin/admin.service.ts
import { prismaClient } from "../../config/database"
import bcrypt from "bcrypt"
import { AppError } from "../../middleware/app-error"
import { ERROR_CODE } from "../../utils/error-codes"
import { generateToken } from "../../utils/jwt"
import { AdminDeadlineRepository } from "./admin.repository"
import { ApplyBody, ShiftBody } from "./admin.validation"

export class AdminService {
  static async login(username: string, password: string) {
    const admin = await prismaClient.admin.findUnique({ where: { username } })
    if (!admin || !admin.isActive) {
      throw AppError.fromCode(ERROR_CODE.UNAUTHORIZED, "Invalid credentials")
    }
    const ok = await bcrypt.compare(password, admin.passwordHash)
    if (!ok) throw AppError.fromCode(ERROR_CODE.UNAUTHORIZED, "Invalid credentials")

    // ⬇️ Hapus `role` dari payload token (biar match interface kamu)
    const token = generateToken({ username: admin.username })

    // Role tetap dikirim di body respons (buat FE)
    return { token, data: { id: admin.id, username: admin.username, role: admin.role } }
  }

  static apply(body: ApplyBody) {
    return AdminDeadlineRepository.applyByFilter(body)
  }

  static shift(body: ShiftBody) {
    return AdminDeadlineRepository.shiftByFilter({
      days: body.days,
      includeCompleted: body.includeCompleted,
      courseIds: body.courseIds,
      studentIds: body.studentIds,
      jenis: body.jenis,
      sesi: body.sesi,
      minDate: body.minDate ? new Date(body.minDate) : undefined,
      maxDate: body.maxDate ? new Date(body.maxDate) : undefined,
    })
  }
}

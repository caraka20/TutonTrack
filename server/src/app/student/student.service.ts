import type { Student } from "@prisma/client"
import { StudentRepository, RepoError } from "./student.repository"
import { toStudentPublic } from "./student.model"
import {
  ADMIN_CREATE, ADMIN_UPDATE, LIST_QUERY, LOGIN, PARAMS_ID, REGISTER, UPDATE_ME, normalizePhone,
} from "./student.validation"
import { generateToken } from "../../utils/jwt"   // ⬅️ pakai util kamu

export class StudentService {
  /* ===== PUBLIC ===== */

  static async register(body: unknown, autoLogin = true) {
    const parsed = REGISTER.parse(body)
    const s = await StudentRepository.create(parsed)
    const data = toStudentPublic(s)
    if (!autoLogin) return { data }
    const token = generateToken({ username: s.nim })   // ⬅️ sesuai util
    return { data, token }
  }

  static async login(body: unknown) {
    const parsed = LOGIN.parse(body)
    let s: Student | null = null
    if (parsed.nim) s = await StudentRepository.findByNim(parsed.nim)
    if (!s && parsed.noHp) s = await StudentRepository.findByNoHp(parsed.noHp)
    if (!s) throw new RepoError("Invalid credentials", 401)
    const token = generateToken({ username: s.nim })   // ⬅️ sesuai util
    return { data: toStudentPublic(s), token }
  }

  static async getMe(studentId: number) {
    const s = await StudentRepository.findById(studentId)
    if (!s) throw new RepoError("Student not found", 404)
    return { data: toStudentPublic(s) }
  }

  static async updateMe(studentId: number, body: unknown) {
    const parsed = UPDATE_ME.parse(body)
    const patch: { nama?: string; noHp?: string } = {}
    if (parsed.nama) patch.nama = parsed.nama
    if (parsed.noHp) patch.noHp = normalizePhone(parsed.noHp)
    const updated = await StudentRepository.update(studentId, patch)
    return { data: toStudentPublic(updated) }
  }

  /* ===== ADMIN ===== */

  static async list(query: unknown) {
    const q = LIST_QUERY.parse(query)
    const result = await StudentRepository.list(q)
    return {
      data: result.data.map(toStudentPublic),
      page: result.page,
      limit: result.limit,
      total: result.total,
    }
  }

  static async create(body: unknown) {
    const parsed = ADMIN_CREATE.parse(body)
    const s = await StudentRepository.create(parsed)
    return { data: toStudentPublic(s) }
  }

  static async detail(params: unknown) {
    const { id } = PARAMS_ID.parse(params)
    const s = await StudentRepository.findById(id)
    if (!s) throw new RepoError("Student not found", 404)
    return { data: toStudentPublic(s) }
  }

  static async update(params: unknown, body: unknown) {
    const { id } = PARAMS_ID.parse(params)
    const parsed = ADMIN_UPDATE.parse(body)
    const updated = await StudentRepository.update(id, parsed)
    return { data: toStudentPublic(updated) }
  }

  static async remove(params: unknown) {
    const { id } = PARAMS_ID.parse(params)
    await StudentRepository.delete(id)
    return { ok: true }
  }

  static async exists(body: unknown) {
    const { nim, noHp } = (body ?? {}) as { nim?: string; noHp?: string }
    if (!nim && !noHp) throw new RepoError("Provide nim or noHp", 400)
    const exists = await StudentRepository.exists({ nim, noHp })
    const by = exists ? (nim ? "nim" : "noHp") : undefined
    return { ok: true, exists, by }
  }


}

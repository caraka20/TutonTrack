// server/src/app/course/course.service.ts
import { CourseRepository } from "./course.repository"
import {
  CourseListQuery,
  CreateCourseBody,
  UpdateCourseBody,
  PutDeadlinesBody,
  CourseListItem,
} from "./course.model"
import { AppError } from "../../middleware/app-error"
import { ERROR_CODE } from "../../utils/error-codes"

// ===== helpers =====
const norm = (s: string) => s.trim().replace(/\s+/g, " ")
const tokens = (s: string) =>
  norm(s)
    .toLowerCase()
    .split(" ")
    .filter(Boolean)

function looksDuplicate(a: string, b: string) {
  // heuristik ringan: ignore spasi/kapitalisasi, cek inklusi 1 sama lain
  const A = norm(a).toLowerCase()
  const B = norm(b).toLowerCase()
  if (A === B) return true
  if (A.includes(B) || B.includes(A)) return true
  // token overlap >= 70%
  const ta = new Set(tokens(A))
  const tb = new Set(tokens(B))
  const inter = [...ta].filter((t) => tb.has(t)).length
  const ratio = inter / Math.max(ta.size, tb.size || 1)
  return ratio >= 0.7
}

// Validasi aturan sesi per jenis
function validateDeadlinesBody(body: PutDeadlinesBody) {
  const ok = body.items.every((it) => {
    if (it.jenis === "DISKUSI") return it.sesi >= 1 && it.sesi <= 8
    if (it.jenis === "ABSEN") return it.sesi >= 1 && it.sesi <= 8
    if (it.jenis === "TUGAS") return [3, 5, 7].includes(it.sesi)
    if (it.jenis === "QUIZ") return it.sesi >= 1 // bebas, asal positif
    return false
  })
  if (!ok) {
    throw AppError.fromCode(
      ERROR_CODE.BAD_REQUEST,
      "Sesi tidak valid untuk salah satu jenis tugas (DISKUSI 1–8, ABSEN 1–8, TUGAS 3/5/7, QUIZ >=1)",
    )
  }
}

export class CourseService {
  // ===== Suggest (public) =====
  static async suggest(q: string, limit?: number) {
    const query = norm(q || "")
    if (query.length < 2) return [] // hemat query
    const lim = Math.min(Math.max(limit ?? 10, 1), 20)

    // strategi: kirim full q; di repo dia akan pakai contains
    // (kalau mau, bisa panggil .list dengan q=token utama juga)
    const items = await CourseRepository.suggest(query, lim)

    // urutkan ringan: nama yang paling “mirip” diletakkan di atas
    const scored = items
      .map((i) => ({
        ...i,
        _score: looksDuplicate(i.nama, query) ? 2 : tokens(i.nama).some((t) => query.toLowerCase().includes(t)) ? 1 : 0,
      }))
      .sort((a, b) => b._score - a._score || a.nama.localeCompare(b.nama))
      .slice(0, lim)
      .map(({ _score, ...rest }) => rest)

    return scored
  }

  // ===== List (admin) =====
  static async list(query: CourseListQuery): Promise<{ items: CourseListItem[]; total: number }> {
    const safe: CourseListQuery = {
      ...query,
      page: Math.max(query.page, 1),
      limit: Math.min(Math.max(query.limit, 1), 100),
      sortBy: query.sortBy ?? "createdAt",
      sortDir: query.sortDir ?? "desc",
    }
    // normalisasi q (opsional)
    if (safe.q) safe.q = norm(safe.q)
    return CourseRepository.list(safe)
  }

  // ===== Detail (admin) =====
  static detail(id: number) {
    return CourseRepository.detail(id)
  }

  // ===== Create (student & admin – controller yang membatasi) =====
  static async create(body: CreateCourseBody) {
    const nama = norm(body.nama)

    // Dupe-precheck sederhana: cari satu halaman kecil yang “mirip”
    const around = await CourseRepository.list({
      q: tokens(nama)[0] ?? nama,
      page: 1,
      limit: 10,
      sortBy: "createdAt",
      sortDir: "desc",
    })

    const dupe = around.items.find((c) => looksDuplicate(c.nama, nama))
    if (dupe) {
      throw AppError.fromCode(
        ERROR_CODE.BAD_REQUEST,
        `Course serupa sudah ada (${dupe.nama}). Gunakan yang sudah ada atau ubah penamaannya.`,
      )
    }

    return CourseRepository.create({ nama })
  }

  // ===== Update (admin) =====
  static async update(id: number, body: UpdateCourseBody) {
    const payload: UpdateCourseBody = {}

    if (body.nama) {
      const namaBaru = norm(body.nama)

      // cek tabrakan nama
      const around = await CourseRepository.list({
        q: tokens(namaBaru)[0] ?? namaBaru,
        page: 1,
        limit: 10,
        sortBy: "createdAt",
        sortDir: "desc",
      })
      const dupe = around.items.find((c) => c.id !== id && looksDuplicate(c.nama, namaBaru))
      if (dupe) {
        throw AppError.fromCode(
          ERROR_CODE.BAD_REQUEST,
          `Nama course bentrok dengan '${dupe.nama}'.`,
        )
      }

      payload.nama = namaBaru
    }

    return CourseRepository.update(id, payload)
  }

  // ===== Delete (admin) =====
  static remove(id: number) {
    // (opsional) di sini bisa tambahkan guard “jika masih ada enrollment, tolak”
    return CourseRepository.remove(id)
  }

  // ===== Deadlines (admin) =====
  static async putDeadlines(courseId: number, body: PutDeadlinesBody) {
    validateDeadlinesBody(body)
    return CourseRepository.replaceDeadlines(courseId, body)
  }

  static getDeadlines(courseId: number) {
    return CourseRepository.getDeadlines(courseId)
  }

  static async applyDeadlines(courseId: number) {
    // bisa tambahkan audit log / notifikasi di sini
    const res = await CourseRepository.applyDeadlines(courseId)
    // Kalau tidak ada yang berubah, tetap dianggap sukses (idempotent)
    return { affected: res.affected }
  }
}

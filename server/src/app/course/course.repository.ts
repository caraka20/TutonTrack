// server/src/app/course/course.repository.ts
import { prismaClient } from "../../config/database"
import { Prisma, JenisTugas } from "@prisma/client"
import {
  CourseDetailResponse,
  CourseListItem,
  CourseListQuery,
  CourseSuggestItem,
  CreateCourseBody,
  UpdateCourseBody,
  PutDeadlinesBody,
} from "./course.model"
import { RepoError } from "../student/student.repository"

/** Util: key konsisten untuk pair (jenis,sesi) */
type Key = `${JenisTugas}:${number}`
const k = (j: JenisTugas, s: number): Key => `${j}:${s}` as Key

export class CourseRepository {
  /* ================== SUGGEST (public) ================== */
  static async suggest(q: string, limit = 10): Promise<CourseSuggestItem[]> {
    const rows = await prismaClient.course.findMany({
      where: { nama: { contains: q } },
      orderBy: { nama: "asc" },
      take: Math.min(Math.max(limit, 1), 20),
      select: { id: true, nama: true },
    })
    return rows
  }

  /* ================== LIST (admin) ================== */
  static async list(q: CourseListQuery): Promise<{ items: CourseListItem[]; total: number }> {
    const n = q.q?.trim()
    const where: Prisma.CourseWhereInput | undefined = n ? { nama: { contains: n } } : undefined

    const orderBy = {
      [q.sortBy ?? "createdAt"]: q.sortDir ?? "desc",
    } as Prisma.CourseOrderByWithRelationInput

    const skip = ((q.page ?? 1) - 1) * (q.limit ?? 10)
    const take = q.limit ?? 10

    const [rows, total, winCount] = await Promise.all([
      prismaClient.course.findMany({
        where,
        orderBy,
        skip,
        take,
        select: { id: true, nama: true, createdAt: true },
      }),
      prismaClient.course.count({ where }),
      prismaClient.sessionWindow.count(), // global fixed windows
    ])

    const items: CourseListItem[] = rows.map((r) => ({
      id: r.id,
      nama: r.nama,
      deadlineCount: winCount, // sama untuk semua course (global, fixed)
      createdAt: r.createdAt,
    }))

    return { items, total }
  }

  /* ================== DETAIL (admin) ================== */
  static async detail(id: number): Promise<CourseDetailResponse | null> {
    const course = await prismaClient.course.findUnique({
      where: { id },
      select: { id: true, nama: true, createdAt: true, updatedAt: true },
    })
    if (!course) return null

    const wins = await prismaClient.sessionWindow.findMany({
      orderBy: [{ jenis: "asc" }, { sesi: "asc" }],
      select: { jenis: true, sesi: true, endAt: true },
    })

    return {
      id: course.id,
      nama: course.nama,
      deadlines: wins.map((w) => ({ jenis: w.jenis, sesi: w.sesi, deadlineAt: w.endAt ?? null })),
      createdAt: course.createdAt,
      updatedAt: course.updatedAt,
    }
  }

  /* ================== CREATE (student & admin) ================== */
  static async create(body: CreateCourseBody) {
    return prismaClient.course.create({
      data: { nama: body.nama.trim() },
      select: { id: true, nama: true, createdAt: true },
    })
  }

  /* ================== UPDATE (admin) ================== */
  static async update(id: number, body: UpdateCourseBody) {
    const updated = await prismaClient.course.update({
      where: { id },
      data: { ...(body.nama ? { nama: body.nama.trim() } : {}) },
      select: { id: true, nama: true, updatedAt: true },
    })
    return updated
  }

  /* ================== DELETE (admin) ================== */
  static async remove(id: number) {
    try {
      await prismaClient.course.delete({ where: { id } })
      return { deleted: true }
    } catch (err: unknown) {
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2003") {
        throw new RepoError(
          "Course masih memiliki relasi (enrollment/items). Hapus relasinya terlebih dahulu atau gunakan force=1.",
          400,
          "HAS_RELATIONS"
        )
      }
      throw err
    }
  }

  /** HAPUS SEMUA RELASI LALU COURSE (cascade) */
  static async removeCascade(id: number) {
    await prismaClient.$transaction([
      prismaClient.tutonItem.deleteMany({ where: { enrollment: { courseId: id } } }),
      prismaClient.enrollment.deleteMany({ where: { courseId: id } }),
    ])
    await prismaClient.course.delete({ where: { id } })
    return { deleted: true, cascade: true }
  }

  /* ================== DEADLINES (fixed/global) ================== */
  /**
   * DEADLINES FIXED → tidak boleh diubah per-course.
   * Fungsi ini dipertahankan demi kompatibilitas API namun akan melempar error.
   */
  static async replaceDeadlines(_courseId: number, _body: PutDeadlinesBody) {
    throw new RepoError("Deadlines bersifat global & tetap. Ubah hanya pengingat (reminder) H-n.", 400, "FIXED_DEADLINES")
  }

  /** Baca “deadlines” dari SessionWindow (global) untuk ditampilkan di UI admin. */
  static async getDeadlines(_courseId: number) {
    const wins = await prismaClient.sessionWindow.findMany({
      orderBy: [{ jenis: "asc" }, { sesi: "asc" }],
      select: { jenis: true, sesi: true, endAt: true },
    })
    return wins.map((w) => ({ jenis: w.jenis, sesi: w.sesi, deadlineAt: w.endAt ?? null }))
  }

  /**
   * Apply: set ke semua TutonItem milik course:
   *  - deadlineAt ← SessionWindow.endAt
   *  - openAt     ← SessionWindow.startAt
   */
  static async applyDeadlines(courseId: number) {
    // pasangan (jenis,sesi) yang benar-benar dipakai item course ini
    const pairs = await prismaClient.tutonItem.findMany({
      where: { enrollment: { courseId } },
      select: { jenis: true, sesi: true },
      distinct: ["jenis", "sesi"],
    })
    if (!pairs.length) return { affected: 0 }

    const sw = await prismaClient.sessionWindow.findMany({
      where: { OR: pairs.map((p) => ({ jenis: p.jenis, sesi: p.sesi })) },
      select: { jenis: true, sesi: true, startAt: true, endAt: true },
    })

    const mapSW = new Map<Key, { startAt: Date | null; endAt: Date | null }>()
    for (const w of sw) mapSW.set(k(w.jenis, w.sesi), { startAt: w.startAt ?? null, endAt: w.endAt ?? null })

    let affected = 0
    for (const { jenis, sesi } of pairs) {
      const w = mapSW.get(k(jenis, sesi))
      const res = await prismaClient.tutonItem.updateMany({
        where: { jenis, sesi, enrollment: { courseId } },
        data: { openAt: w?.startAt ?? null, deadlineAt: w?.endAt ?? null },
      })
      affected += res.count
    }

    return { affected }
  }
}

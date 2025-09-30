// server/src/app/course/course.repository.ts
import { prismaClient } from "../../config/database"
import { Prisma } from "@prisma/client"
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

export class CourseRepository {
  /* ============ SUGGEST (public) ============ */
  static async suggest(q: string, limit = 10): Promise<CourseSuggestItem[]> {
    const rows = await prismaClient.course.findMany({
      where: { nama: { contains: q } }, // kolasi MySQL biasanya CI
      orderBy: { nama: "asc" },
      take: Math.min(Math.max(limit, 1), 20),
      select: { id: true, nama: true },
    })
    return rows
  }

  /* ============ LIST (admin) ============ */
  static async list(q: CourseListQuery): Promise<{ items: CourseListItem[]; total: number }> {
    const n = q.q?.trim()
    const where: Prisma.CourseWhereInput | undefined = n ? { nama: { contains: n } } : undefined

    const orderBy = {
      [q.sortBy ?? "createdAt"]: q.sortDir ?? "desc",
    } as Prisma.CourseOrderByWithRelationInput

    const skip = ((q.page ?? 1) - 1) * (q.limit ?? 10)
    const take = q.limit ?? 10

    // gunakan SELECT (bukan include) dan _count di bawah select
    const [rows, total] = await Promise.all([
      prismaClient.course.findMany({
        where,
        orderBy,
        skip,
        take,
        select: {
          id: true,
          nama: true,
          createdAt: true,
          _count: { select: { courseDeadlines: true } },
        },
      }),
      prismaClient.course.count({ where }),
    ])

    const items: CourseListItem[] = rows.map((r) => ({
      id: r.id,
      nama: r.nama,
      deadlineCount: r._count.courseDeadlines,
      createdAt: r.createdAt,
    }))

    return { items, total }
  }

  /* ============ DETAIL (admin) ============ */
  static async detail(id: number): Promise<CourseDetailResponse | null> {
    const row = await prismaClient.course.findUnique({
      where: { id },
      select: {
        id: true,
        nama: true,
        createdAt: true,
        updatedAt: true,
        courseDeadlines: { select: { jenis: true, sesi: true, deadlineAt: true } },
      },
    })
    if (!row) return null
    return {
      id: row.id,
      nama: row.nama,
      deadlines: row.courseDeadlines.map(d => ({ jenis: d.jenis, sesi: d.sesi, deadlineAt: d.deadlineAt ?? null })),
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    }
  }

  /* ============ CREATE (student & admin) ============ */
  static async create(body: CreateCourseBody) {
    return prismaClient.course.create({
      data: { nama: body.nama.trim() },
      select: { id: true, nama: true, createdAt: true },
    })
  }

  /* ============ UPDATE (admin) ============ */
  static async update(id: number, body: UpdateCourseBody) {
    const updated = await prismaClient.course.update({
      where: { id },
      data: {
        ...(body.nama ? { nama: body.nama.trim() } : {}),
      },
      select: { id: true, nama: true, updatedAt: true },
    })
    return updated
  }

  /* ============ DELETE (admin) ============ */
  static async remove(id: number) {
    await prismaClient.course.delete({ where: { id } })
    return { deleted: true }
  }

  /* ============ DEADLINES (admin) ============ */
  static async replaceDeadlines(courseId: number, body: PutDeadlinesBody) {
    // hapus semua lalu createMany
    await prismaClient.courseDeadline.deleteMany({ where: { courseId } })
    if (body.items?.length) {
      await prismaClient.courseDeadline.createMany({
        data: body.items.map((it) => ({
          courseId,
          jenis: it.jenis,
          sesi: it.sesi,
          deadlineAt: it.deadlineAt ?? null,
        })),
        skipDuplicates: true,
      })
    }
    const count = await prismaClient.courseDeadline.count({ where: { courseId } })
    return { count }
  }

  static async getDeadlines(courseId: number) {
    return prismaClient.courseDeadline.findMany({
      where: { courseId },
      orderBy: [{ jenis: "asc" }, { sesi: "asc" }],
      select: { jenis: true, sesi: true, deadlineAt: true },
    })
  }

  /** Propagasi master deadline → semua TutonItem di enrollment course tsb */
  static async applyDeadlines(courseId: number) {
    const dls = await prismaClient.courseDeadline.findMany({
      where: { courseId },
      select: { jenis: true, sesi: true, deadlineAt: true },
    })
    if (!dls.length) throw new RepoError("No deadlines to apply", 400)

    let affected = 0
    for (const d of dls) {
      const res = await prismaClient.tutonItem.updateMany({
        where: { jenis: d.jenis, sesi: d.sesi, enrollment: { courseId } },
        data: { deadlineAt: d.deadlineAt ?? null },
      })
      affected += res.count
    }
    return { affected }
  }
}

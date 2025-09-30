import { Prisma } from "@prisma/client"
import { prismaClient } from "../../config/database"
import { normalizePhone } from "./student.validation"

/** Error khusus layer repository (untuk status & code yang rapi) */
export class RepoError extends Error {
  status: number
  code?: string
  constructor(message: string, status = 400, code?: string) {
    super(message)
    this.name = "RepoError"
    this.status = status
    this.code = code
  }
}

export class StudentRepository {
  /** Create student (cek unik manual utk pesan error rapi) */
  static async create(data: { nim: string; noHp: string; nama: string }) {
    const nim = data.nim.trim()
    const noHp = normalizePhone(data.noHp)
    await this.ensureUniqueOrThrow({ nim, noHp })

    try {
      return await prismaClient.student.create({
        data: { nim, noHp, nama: data.nama.trim() },
      })
    } catch (err: any) {
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
        const target = (err.meta?.target as string[])?.[0] ?? "unique field"
        throw new RepoError(`${target} already exists`, 409, "DUPLICATE")
      }
      throw err
    }
  }

  static findById(id: number) {
    return prismaClient.student.findUnique({ where: { id } })
  }

  static findByNim(nim: string) {
    return prismaClient.student.findUnique({ where: { nim: nim.trim() } })
  }

  static findByNoHp(noHpRaw: string) {
    const noHp = normalizePhone(noHpRaw)
    return prismaClient.student.findUnique({ where: { noHp } })
  }

  /** Cek eksistensi cepat (nim/noHp) */
  static async exists(where: { nim?: string; noHp?: string }) {
    const OR: Prisma.StudentWhereInput[] = []
    if (where.nim) OR.push({ nim: where.nim.trim() })
    if (where.noHp) OR.push({ noHp: normalizePhone(where.noHp) })
    if (OR.length === 0) return false
    const s = await prismaClient.student.findFirst({ where: { OR }, select: { id: true } })
    return !!s
  }

  /** Update; jika nim/noHp berubah, cek unik (exclude id sendiri) */
  static async update(id: number, data: { nim?: string; noHp?: string; nama?: string }) {
    const patch: Prisma.StudentUpdateInput = {}
    if (data.nim) patch.nim = data.nim.trim()
    if (data.noHp) patch.noHp = normalizePhone(data.noHp)
    if (data.nama) patch.nama = data.nama.trim()

    if (patch.nim || patch.noHp) {
      await this.ensureUniqueOrThrow(
        {
          nim: typeof patch.nim === "string" ? patch.nim : undefined,
          noHp: typeof patch.noHp === "string" ? patch.noHp : undefined,
        },
        id
      )
    }

    try {
      return await prismaClient.student.update({
        where: { id },
        data: patch,
      })
    } catch (err: any) {
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
        const target = (err.meta?.target as string[])?.[0] ?? "unique field"
        throw new RepoError(`${target} already exists`, 409, "DUPLICATE")
      }
      throw err
    }
  }

  static delete(id: number) {
    return prismaClient.student.delete({ where: { id } })
  }

  /** Listing + search + pagination + filter by courseId */
  static async list(params: {
    q?: string
    nim?: string
    noHp?: string
    courseId?: number
    sort?: "createdAt:asc" | "createdAt:desc" | "nama:asc" | "nama:desc"
    page?: number
    limit?: number
  }) {
    const {
      q,
      nim,
      noHp: noHpRaw,
      courseId,
      sort = "createdAt:desc",
      page = 1,
      limit = 20,
    } = params

    const noHp = noHpRaw ? normalizePhone(noHpRaw) : undefined

    const whereAnd: Prisma.StudentWhereInput[] = []
    if (q) {
      const like = q.trim()
      whereAnd.push({
        OR: [
          { nim: { contains: like } },
          { noHp: { contains: like } },
          { nama: { contains: like } },
        ],
      })
    }
    if (nim) whereAnd.push({ nim: nim.trim() })
    if (noHp) whereAnd.push({ noHp })
    if (courseId) whereAnd.push({ enrollments: { some: { courseId } } })

    const where: Prisma.StudentWhereInput = whereAnd.length ? { AND: whereAnd } : {}

    const [field, dir] = (sort.split(":") as ["createdAt" | "nama", "asc" | "desc"])
    const orderBy: Prisma.StudentOrderByWithRelationInput = { [field]: dir }

    const skip = (page - 1) * limit

    const [total, data] = await prismaClient.$transaction([
      prismaClient.student.count({ where }),
      prismaClient.student.findMany({
        where,
        orderBy,
        skip,
        take: limit,
      }),
    ])

    return { data, total, page, limit }
  }

  /** Pastikan nim/noHp unik; jika tidak, lempar RepoError 409 */
  private static async ensureUniqueOrThrow(
    fields: { nim?: string; noHp?: string },
    excludeId?: number
  ) {
    const { nim, noHp } = fields
    if (!nim && !noHp) return

    const whereOr: Prisma.StudentWhereInput[] = []
    if (nim) whereOr.push({ nim })
    if (noHp) whereOr.push({ noHp: normalizePhone(noHp) })

    const conflict = await prismaClient.student.findFirst({
      where: {
        OR: whereOr,
        ...(excludeId ? { NOT: { id: excludeId } } : {}),
      },
      select: { id: true, nim: true, noHp: true },
    })

    if (conflict) {
      if (nim && conflict.nim === nim) {
        throw new RepoError("NIM already exists", 409, "DUPLICATE_NIM")
      }
      if (noHp && conflict.noHp === normalizePhone(noHp)) {
        throw new RepoError("noHp already exists", 409, "DUPLICATE_NOHP")
      }
      throw new RepoError("Unique constraint violation", 409, "DUPLICATE")
    }
  }

  
}

// server/src/app/admin/admin.repository.ts
import { prismaClient } from "../../config/database"
import { JenisTugas, StatusTugas } from "@prisma/client"

type Filter = {
  courseIds?: number[]
  studentIds?: number[]
  jenis?: JenisTugas
  sesi?: number[]
}

// 👉 kunci yang konsisten untuk map (jenis:sesi)
type Key = `${JenisTugas}:${number}`

export class AdminDeadlineRepository {
  /* Bangun where untuk TutonItem berdasarkan filter + constraint ada relasi */
  private static buildItemsWhere(filter: Filter) {
    const where: any = {}
    if (filter.jenis) where.jenis = filter.jenis
    if (filter.sesi?.length) where.sesi = { in: filter.sesi }

    // relasi via enrollment
    where.enrollment = {}
    if (filter.courseIds?.length) where.enrollment.courseId = { in: filter.courseIds }
    if (filter.studentIds?.length) where.enrollment.studentId = { in: filter.studentIds }

    return where
  }

  /** APPLY: salin CourseDeadline ke TutonItem.deadlineAt sesuai filter */
  static async applyByFilter(filter: Filter) {
    // ambil semua item yang match (minimal field untuk grouping)
    const items = await prismaClient.tutonItem.findMany({
      where: this.buildItemsWhere(filter),
      select: { id: true, jenis: true, sesi: true, enrollment: { select: { courseId: true } } },
    })
    if (!items.length) return { affected: 0, byCourse: {} as Record<number, number> }

    // Kelompokkan per course → (jenis,sesi)
    const byCourse = new Map<number, Map<Key, number[]>>() // courseId -> key(jenis:sesi) -> itemIds
    for (const it of items) {
      const cid = it.enrollment.courseId
      const key: Key = `${it.jenis}:${it.sesi}` as Key
      const m = byCourse.get(cid) ?? new Map<Key, number[]>()
      const arr = m.get(key) ?? []
      arr.push(it.id)
      m.set(key, arr)
      byCourse.set(cid, m)
    }

    let affected = 0
    const resultPerCourse: Record<number, number> = {}

    // Untuk tiap courseId, ambil master deadlines utk kunci yang diperlukan, lalu updateMany
    for (const [courseId, map] of byCourse) {
      // Ambil seluruh (jenis,sesi) unik
      const pairs = [...map.keys()].map((k) => {
        const [jenis, sesiStr] = k.split(":")
        return { jenis: jenis as JenisTugas, sesi: Number(sesiStr) }
      })

      const masters = await prismaClient.courseDeadline.findMany({
        where: { courseId, OR: pairs.map((p) => ({ jenis: p.jenis, sesi: p.sesi })) },
        select: { jenis: true, sesi: true, deadlineAt: true },
      })
      if (!masters.length) continue

      const byKey = new Map<Key, Date | null>(
        masters.map((m) => [ `${m.jenis}:${m.sesi}` as Key, m.deadlineAt ] as const),
      )

      for (const [key, ids] of map) {
        const dl = byKey.get(key) // ✅ key & map pakai tipe Key yang sama
        if (dl === undefined) continue // tidak ada master → skip
        const res = await prismaClient.tutonItem.updateMany({
          where: { id: { in: ids } },
          data: { deadlineAt: dl ?? null },
        })
        affected += res.count
        resultPerCourse[courseId] = (resultPerCourse[courseId] ?? 0) + res.count
      }
    }

    return { affected, byCourse: resultPerCourse }
  }

  /** SHIFT: geser TutonItem.deadlineAt ±days (hanya item dengan deadlineAt != null) */
  static async shiftByFilter(params: Filter & {
    days: number
    includeCompleted?: boolean
    minDate?: Date
    maxDate?: Date
  }) {
    const { days, includeCompleted, minDate, maxDate, ...filter } = params
    if (!days || !Number.isInteger(days)) return { affected: 0 }

    const where: any = this.buildItemsWhere(filter)
    where.deadlineAt = { not: null }
    if (!includeCompleted) where.status = { not: StatusTugas.SELESAI }
    if (minDate || maxDate) {
      where.deadlineAt = {
        ...(where.deadlineAt ?? {}),
        ...(minDate ? { gte: minDate } : {}),
        ...(maxDate ? { lte: maxDate } : {}),
      }
    }

    // ambil id + deadline
    const items = await prismaClient.tutonItem.findMany({
      where,
      select: { id: true, deadlineAt: true },
    })
    if (!items.length) return { affected: 0 }

    const addMs = days * 24 * 60 * 60 * 1000
    let affected = 0

    // update satu-satu (aman lintas DB; mudah di-test)
    for (const it of items) {
      const dl = it.deadlineAt
      if (!dl) continue
      const newDate = new Date(dl.getTime() + addMs)
      const res = await prismaClient.tutonItem.update({
        where: { id: it.id },
        data: { deadlineAt: newDate },
        select: { id: true },
      })
      if (res?.id) affected++
    }

    return { affected }
  }
}

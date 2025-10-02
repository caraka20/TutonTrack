// server/src/app/admin/admin.repository.ts
import { prismaClient } from "../../config/database"
import { JenisTugas, StatusTugas } from "@prisma/client"

type Filter = {
  courseIds?: number[]
  studentIds?: number[]
  jenis?: JenisTugas
  sesi?: number[]
}

// kunci konsisten untuk map (jenis:sesi)
type Key = `${JenisTugas}:${number}`

export class AdminDeadlineRepository {
  /* where untuk TutonItem berdasarkan filter + constraint relasi */
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

  /** APPLY:
   *  Ambil master jendela global per (jenis, sesi) dari SessionWindow,
   *  lalu set TutonItem.openAt = startAt & TutonItem.deadlineAt = endAt.
   */
  static async applyByFilter(filter: Filter) {
    // ambil semua item yang cocok (minimal kolom untuk grouping)
    const items = await prismaClient.tutonItem.findMany({
      where: this.buildItemsWhere(filter),
      select: {
        id: true,
        jenis: true,
        sesi: true,
        enrollment: { select: { courseId: true } },
      },
    })
    if (!items.length) return { affected: 0, byCourse: {} as Record<number, number> }

    // Kelompokkan per course → (jenis,sesi)
    const byCourse = new Map<number, Map<Key, number[]>>() // courseId -> key -> itemIds
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

    // Untuk tiap courseId, ambil window yang diperlukan → updateMany
    for (const [courseId, map] of byCourse) {
      // daftar kombinasi (jenis,sesi) yang diperlukan
      const pairs = [...map.keys()].map((k) => {
        const [jenis, sesiStr] = k.split(":")
        return { jenis: jenis as JenisTugas, sesi: Number(sesiStr) }
      })

      // ambil windows dari SessionWindow (global, tidak per-course)
      const windows = await prismaClient.sessionWindow.findMany({
        where: { OR: pairs.map((p) => ({ jenis: p.jenis, sesi: p.sesi })) },
        select: { jenis: true, sesi: true, startAt: true, endAt: true },
      })
      if (!windows.length) continue

      const byKey = new Map<Key, { startAt: Date | null; endAt: Date | null }>(
        windows.map((w) => [
          `${w.jenis}:${w.sesi}` as Key,
          { startAt: w.startAt ?? null, endAt: w.endAt ?? null },
        ]),
      )

      for (const [key, ids] of map) {
        const win = byKey.get(key)
        if (!win) continue // tidak ada window untuk kombinasi tsb

        const res = await prismaClient.tutonItem.updateMany({
          where: { id: { in: ids } },
          data: {
            openAt: win.startAt ?? null,
            deadlineAt: win.endAt ?? null,
          },
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

    // update satu-satu (aman untuk berbagai DB & mudah di-test)
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

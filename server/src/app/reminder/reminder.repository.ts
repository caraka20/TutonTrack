import { prismaClient } from "../../config/database"
import { JenisTugas, ReminderSource, ReminderStatus } from "@prisma/client"
import { ReminderListItem, ReminderListQuery } from "./reminder.model"
import { RepoError } from "../student/student.repository"

function nowUtc() { return new Date() }

/**
 * Hitung jendela “akan jatuh tempo dalam N menit”:
 * dueAt = deadlineAt - offsetMin
 * filter: now <= dueAt <= now + dueWithinMin
 */
function buildDueWindowFilter(dueWithinMin: number) {
  const now = nowUtc()
  const upper = new Date(now.getTime() + dueWithinMin * 60 * 1000)
  return { now, upper }
}

export class ReminderRepository {
  /** LIST (ADMIN) */
  static async list(q: ReminderListQuery) {
    const status = q.status ?? ReminderStatus.PENDING
    const dueWithin = q.dueWithinMin ?? 1440 // H-1 default

    const { now, upper } = buildDueWindowFilter(dueWithin)

    // filter base
    const where: any = {
      status,
      // hanya yang ada deadline (karena dueAt = deadline - offset)
      item: { deadlineAt: { not: null } },
    }

    if (q.courseId) where.item = { ...(where.item ?? {}), enrollment: { courseId: q.courseId } }
    if (q.studentId) where.item = { ...(where.item ?? {}), enrollment: { ...(where.item?.enrollment ?? {}), studentId: q.studentId } }
    if (q.jenis) where.item = { ...(where.item ?? {}), jenis: q.jenis }

    // filter window due: (deadlineAt - offsetMin) di antara [now, upper]
    // Prisma belum support ekspresi (deadline-offset) langsung, jadi kita tarik dulu lalu filter manual.
    const rows = await prismaClient.reminder.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (q.page - 1) * q.limit,
      take: q.limit,
      select: {
        id: true, status: true, source: true, channel: true, note: true,
        active: true, offsetMin: true, createdAt: true, sentAt: true,
        item: {
          select: {
            id: true, jenis: true, sesi: true, deadlineAt: true,
            enrollment: {
              select: {
                studentId: true, courseId: true,
                student: { select: { nama: true } },
                course: { select: { nama: true } },
              },
            },
          },
        },
      },
    })

    // total untuk pagination (tanpa window due)
    const total = await prismaClient.reminder.count({ where })

    // map + filter window due secara in-memory
    const items: ReminderListItem[] = []
    for (const r of rows) {
      const dl = r.item.deadlineAt
      if (!dl) continue
      const dueAt = new Date(dl.getTime() - r.offsetMin * 60 * 1000)
      if (dueAt >= now && dueAt <= upper) {
        items.push({
          id: r.id,
          status: r.status,
          source: r.source,
          channel: r.channel,
          note: r.note ?? null,
          active: r.active,
          offsetMin: r.offsetMin,
          dueAt,
          itemId: r.item.id,
          jenis: r.item.jenis,
          sesi: r.item.sesi,
          deadlineAt: dl,
          studentId: r.item.enrollment.studentId,
          studentNama: r.item.enrollment.student.nama,
          courseId: r.item.enrollment.courseId,
          courseNama: r.item.enrollment.course.nama,
          createdAt: r.createdAt,
          sentAt: r.sentAt ?? null,
        })
      }
    }

    return { items, total }
  }

  /** SEND (ADMIN) */
  static async markSent(id: number, adminId?: number) {
    const remind = await prismaClient.reminder.findUnique({
      where: { id },
      select: { id: true, status: true },
    })
    if (!remind) throw new RepoError("Reminder not found", 404)
    if (remind.status === ReminderStatus.SENT) {
      throw new RepoError("Reminder already sent", 400)
    }
    if (remind.status === ReminderStatus.CANCELLED) {
      throw new RepoError("Reminder has been cancelled", 400)
    }

    return prismaClient.reminder.update({
      where: { id },
      data: { status: ReminderStatus.SENT, sentAt: nowUtc(), createdByAdminId: adminId ?? null },
      select: { id: true, status: true, sentAt: true },
    })
  }

  /**
   * GENERATE DUE (ADMIN)
   * - Untuk setiap TutonItem yang punya deadlineAt dalam horizon N hari:
   *   - Jika SUDAH ada reminder WEB (preferensi) → biarkan (statusnya PENDING default).
   *   - Jika BELUM ada reminder → buat dengan (offsetMin=default, active=true, source=WEB, status=PENDING).
   * Return: { created: number }
   */
  static async generateDue(defaultOffsetMin: number, horizonDays: number) {
    const now = nowUtc()
    const horizon = new Date(now.getTime() + horizonDays * 24 * 60 * 60 * 1000)

    // Ambil items yang punya deadline dan jatuh sebelum horizon
    const items = await prismaClient.tutonItem.findMany({
      where: { deadlineAt: { not: null, lte: horizon } },
      select: { id: true, deadlineAt: true },
    })
    if (!items.length) return { created: 0 }

    const itemIds = items.map(i => i.id)

    // Cari existing WEB reminders untuk item2 tsb (anggap “satu item satu reminder preferensi”)
    const exists = await prismaClient.reminder.findMany({
      where: { source: ReminderSource.WEB, itemId: { in: itemIds } },
      select: { itemId: true },
    })
    const has = new Set(exists.map(e => e.itemId))

    // Siapkan insert untuk yang belum ada
    const payload = items
      .filter(i => !has.has(i.id))
      .map(i => ({
        itemId: i.id,
        source: ReminderSource.WEB,
        status: ReminderStatus.PENDING,
        channel: "WA" as const,
        note: "Generated by system",
        offsetMin: defaultOffsetMin,
        active: true,
      }))

    if (!payload.length) return { created: 0 }

    const result = await prismaClient.reminder.createMany({ data: payload, skipDuplicates: true })
    return { created: result.count }
  }
}

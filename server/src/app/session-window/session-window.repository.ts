import { prismaClient } from "../../config/database"
import { Prisma, JenisTugas } from "@prisma/client"
import { SessionWindowItem } from "./session-window.model"

export class SessionWindowRepository {
  static async listAll() {
    const rows = await prismaClient.sessionWindow.findMany({
      orderBy: [{ sesi: "asc" }, { jenis: "asc" }],
      select: { sesi: true, jenis: true, startAt: true, endAt: true, id: true }
    })
    // hide id, kita konsisten pakai (sesi, jenis)
    return rows.map(({ id: _id, ...rest }) => rest)
  }

  /** upsert by unique (sesi, jenis) */
  static async upsertMany(items: SessionWindowItem[]) {
    if (!items.length) return { count: 0 }

    const tx: Prisma.PrismaPromise<any>[] = []
    for (const it of items) {
      tx.push(
        prismaClient.sessionWindow.upsert({
          where: { sesi_jenis: { sesi: it.sesi, jenis: it.jenis } }, // <-- requires @@unique([sesi, jenis]) with compound unique name `sesi_jenis`
          update: { startAt: it.startAt, endAt: it.endAt },
          create: { sesi: it.sesi, jenis: it.jenis, startAt: it.startAt, endAt: it.endAt },
          select: { id: true }
        })
      )
    }
    const res = await prismaClient.$transaction(tx)
    return { count: res.length }
  }
}

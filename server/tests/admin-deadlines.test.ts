// tests/admin-deadlines.test.ts
import request from "supertest"
import app from "../src/app"
import { prismaClient } from "../src/config/database"
import { AdminTest, CourseTest, StudentTest } from "./test-util"
import { JenisTugas } from "@prisma/client"

describe("ADMIN Deadlines Ops (SessionWindow)", () => {
  let adminToken: string

  beforeAll(async () => {
    adminToken = await AdminTest.loginOwner("owner-deadline")
  })

  afterAll(async () => {
    await prismaClient.tutonItem.deleteMany({})
    await prismaClient.enrollment.deleteMany({})
    await prismaClient.sessionWindow.deleteMany({})      // ⬅️ bersihkan windows
    await prismaClient.course.deleteMany({ where: { nama: { startsWith: "TEST-COURSE DL" } } })
    await StudentTest.cleanup()
    await AdminTest.cleanup()
    await prismaClient.$disconnect()
  })

  /** helper: set window (global) */
  async function setWindow(jenis: JenisTugas, sesi: number, start: Date, end: Date) {
    await prismaClient.sessionWindow.upsert({
      where: { sesi_jenis: { sesi, jenis } }, // pakai @@unique([sesi, jenis])
      update: { startAt: start, endAt: end },
      create: { sesi, jenis, startAt: start, endAt: end },
    })
  }

  it("POST /api/admin/deadlines/apply → copy SessionWindow to TutonItem", async () => {
    // setup: 2 course + 2 student + enroll
    const c1 = await CourseTest.createUnique("TEST-COURSE DL - Ekonomi")
    const c2 = await CourseTest.createUnique("TEST-COURSE DL - Akuntansi")

    const sA = await StudentTest.create()
    const sB = await StudentTest.create()

    const eA1 = await prismaClient.enrollment.create({ data: { studentId: sA.id, courseId: c1.id } })
    const eB2 = await prismaClient.enrollment.create({ data: { studentId: sB.id, courseId: c2.id } })

    // seed items tanpa deadline
    const seedItems = async (enrollId: number) => {
      const base = [
        { jenis: JenisTugas.DISKUSI, sesi: 1 },
        { jenis: JenisTugas.DISKUSI, sesi: 2 },
        { jenis: JenisTugas.ABSEN,   sesi: 1 },
      ] as const
      await prismaClient.tutonItem.createMany({
        data: base.map((b) => ({ enrollmentId: enrollId, jenis: b.jenis, sesi: b.sesi, status: "BELUM", deadlineAt: null })),
      })
    }
    await seedItems(eA1.id)
    await seedItems(eB2.id)

    // seed SessionWindow untuk DISKUSI sesi 1 & 2
    const now = new Date()
    const d1s = new Date(now.getTime() + 1 * 3600_000)
    const d1e = new Date(now.getTime() + 48 * 3600_000)
    const d2s = new Date(now.getTime() + 72 * 3600_000)
    const d2e = new Date(now.getTime() + 96 * 3600_000)
    await setWindow(JenisTugas.DISKUSI, 1, d1s, d1e)
    await setWindow(JenisTugas.DISKUSI, 2, d2s, d2e)

    // apply untuk course c1 saja & jenis DISKUSI sesi [1,2]
    const res = await request(app)
      .post("/api/admin/deadlines/apply")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ courseIds: [c1.id], jenis: "DISKUSI", sesi: [1, 2] })

    expect(res.status).toBe(200)
    expect(res.body?.data?.affected).toBeGreaterThan(0)
    const byCourse = res.body?.data?.byCourse ?? {}
    expect(byCourse[c1.id]).toBeGreaterThan(0)
    expect(byCourse[c2.id] ?? 0).toBe(0)

    // verifikasi item enrollment eA1 terisi deadline utk DISKUSI 1 & 2 dari SessionWindow
    const after = await prismaClient.tutonItem.findMany({
      where: { enrollmentId: eA1.id, jenis: "DISKUSI", sesi: { in: [1, 2] } },
      select: { sesi: true, openAt: true, deadlineAt: true },
      orderBy: { sesi: "asc" },
    })
    expect(after.every((x) => x.openAt && x.deadlineAt)).toBe(true)
    // pastikan tanggal sesuai salah satu window
    const s1 = after.find((x) => x.sesi === 1)!
    const s2 = after.find((x) => x.sesi === 2)!
    expect(Number(s1.openAt)).toBe(Number(d1s))
    expect(Number(s1.deadlineAt)).toBe(Number(d1e))
    expect(Number(s2.openAt)).toBe(Number(d2s))
    expect(Number(s2.deadlineAt)).toBe(Number(d2e))
  })

  it("POST /api/admin/deadlines/shift → shift +2 days, skip completed", async () => {
    const c = await CourseTest.createUnique("TEST-COURSE DL - Manajemen")
    const s = await StudentTest.create()
    const e = await prismaClient.enrollment.create({ data: { studentId: s.id, courseId: c.id } })

    // dua item ber-deadline
    const dl = new Date()
    dl.setDate(dl.getDate() + 3)
    const i1 = await prismaClient.tutonItem.create({
      data: { enrollmentId: e.id, jenis: "DISKUSI", sesi: 1, status: "BELUM", deadlineAt: dl },
    })
    const i2 = await prismaClient.tutonItem.create({
      data: { enrollmentId: e.id, jenis: "DISKUSI", sesi: 2, status: "SELESAI", deadlineAt: dl },
    })

    const res = await request(app)
      .post("/api/admin/deadlines/shift")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ courseIds: [c.id], jenis: "DISKUSI", sesi: [1, 2], days: 2 })

    expect(res.status).toBe(200)
    expect(res.body?.data?.affected).toBe(1) // hanya i1

    const a1 = await prismaClient.tutonItem.findUnique({ where: { id: i1.id } })
    const a2 = await prismaClient.tutonItem.findUnique({ where: { id: i2.id } })
    expect(a1?.deadlineAt && a1.deadlineAt.getTime()).toBe(dl.getTime() + 2 * 24 * 60 * 60 * 1000)
    expect(a2?.deadlineAt && a2.deadlineAt.getTime()).toBe(dl.getTime())
  })
})

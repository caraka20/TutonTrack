// tests/admin-deadlines.test.ts
import request from "supertest"
import app from "../src/app"
import { prismaClient } from "../src/config/database"
import { AdminTest, CourseTest, StudentTest } from "./test-util"
import { JenisTugas } from "@prisma/client"

describe("ADMIN Deadlines Ops", () => {
  let adminToken: string

  beforeAll(async () => {
    adminToken = await AdminTest.loginOwner("owner-deadline")
  })

  afterAll(async () => {
    await prismaClient.tutonItem.deleteMany({})
    await prismaClient.enrollment.deleteMany({})
    await prismaClient.courseDeadline.deleteMany({})
    await prismaClient.course.deleteMany({ where: { nama: { startsWith: "TEST-COURSE DL" } } })
    await StudentTest.cleanup()
    await AdminTest.cleanup()
    await prismaClient.$disconnect()
  })

  it("POST /api/admin/deadlines/apply → apply master by filters", async () => {
    // setup: dua course + deadlines + dua mahasiswa, masing2 enroll
    const c1 = await CourseTest.createUnique("TEST-COURSE DL - Ekonomi")
    const c2 = await CourseTest.createUnique("TEST-COURSE DL - Akuntansi")
    await CourseTest.seedDeadlines(c1.id, new Date())
    await CourseTest.seedDeadlines(c2.id, new Date())

    const sA = await StudentTest.create()
    const sB = await StudentTest.create()

    const eA1 = await prismaClient.enrollment.create({ data: { studentId: sA.id, courseId: c1.id } })
    const eB2 = await prismaClient.enrollment.create({ data: { studentId: sB.id, courseId: c2.id } })

    // generate sebagian items kosong deadline
    const seedItems = async (enrollId: number) => {
      const base = [
        { jenis: JenisTugas.DISKUSI, sesi: 1 },
        { jenis: JenisTugas.DISKUSI, sesi: 2 },
        { jenis: JenisTugas.ABSEN,   sesi: 1 },
        { jenis: JenisTugas.TUGAS,   sesi: 3 },
        { jenis: JenisTugas.QUIZ,    sesi: 2 },
      ] as const
      await prismaClient.tutonItem.createMany({
        data: base.map((b) => ({ enrollmentId: enrollId, jenis: b.jenis, sesi: b.sesi, status: "BELUM", deadlineAt: null })),
      })
    }
    await seedItems(eA1.id)
    await seedItems(eB2.id)

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

    // verifikasi item enrollment eA1 terisi deadline utk DISKUSI 1 & 2
    const after = await prismaClient.tutonItem.findMany({
      where: { enrollmentId: eA1.id, jenis: "DISKUSI", sesi: { in: [1, 2] } },
      select: { sesi: true, deadlineAt: true },
      orderBy: { sesi: "asc" },
    })
    expect(after.every((x) => x.deadlineAt !== null)).toBe(true)
  })

  it("POST /api/admin/deadlines/shift → shift +2 days, skip completed", async () => {
    // setup: satu course + deadlines + satu enrollment + items ber-deadline
    const c = await CourseTest.createUnique("TEST-COURSE DL - Manajemen")
    await CourseTest.seedDeadlines(c.id, new Date())
    const s = await StudentTest.create()
    const e = await prismaClient.enrollment.create({ data: { studentId: s.id, courseId: c.id } })

    // buat dua item dengan deadline (copy dari master manual)
    const dl = new Date()
    dl.setDate(dl.getDate() + 3)
    const i1 = await prismaClient.tutonItem.create({
      data: { enrollmentId: e.id, jenis: "DISKUSI", sesi: 1, status: "BELUM", deadlineAt: dl },
    })
    const i2 = await prismaClient.tutonItem.create({
      data: { enrollmentId: e.id, jenis: "DISKUSI", sesi: 2, status: "SELESAI", deadlineAt: dl },
    })

    // shift +2 hari, includeCompleted=false (default)
    const res = await request(app)
      .post("/api/admin/deadlines/shift")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ courseIds: [c.id], jenis: "DISKUSI", sesi: [1, 2], days: 2 })

    expect(res.status).toBe(200)
    expect(res.body?.data?.affected).toBe(1) // hanya i1 (BELUM)

    const a1 = await prismaClient.tutonItem.findUnique({ where: { id: i1.id } })
    const a2 = await prismaClient.tutonItem.findUnique({ where: { id: i2.id } })

    expect(a1?.deadlineAt && a1.deadlineAt.getTime()).toBe(dl.getTime() + 2 * 24 * 60 * 60 * 1000)
    expect(a2?.deadlineAt && a2.deadlineAt.getTime()).toBe(dl.getTime()) // tidak berubah
  })
})

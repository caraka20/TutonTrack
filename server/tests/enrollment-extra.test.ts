import request from "supertest"
import app from "../src/app"
import { prismaClient } from "../src/config/database"
import { AdminTest, CourseTest, EnrollmentTest, StudentTest } from "./test-util"
import { JenisTugas } from "@prisma/client"

describe("Enrollment extra endpoints", () => {
  afterAll(async () => {
    await CourseTest.cleanup()
    await StudentTest.cleanup()
    await AdminTest.cleanup()
    await prismaClient.$disconnect()
  })

  it("DELETE /api/enrollments/:enrollId → success when no completed items", async () => {
    const { student, token } = await StudentTest.registerAndLogin()
    const course = await CourseTest.createUnique()
    const enr = await EnrollmentTest.createWithItems(student.id, course.id) // semua BELUM

    const res = await request(app)
      .delete(`/api/enrollments/${enr.id}`)
      .set("Authorization", `Bearer ${token}`)

    expect([200, 204]).toContain(res.status)
    const gone = await prismaClient.enrollment.findUnique({ where: { id: enr.id } })
    expect(gone).toBeNull()
  })

  it("DELETE /api/enrollments/:enrollId → 400 if any item completed", async () => {
    const { student, token } = await StudentTest.registerAndLogin()
    const course = await CourseTest.createUnique()
    const enr = await EnrollmentTest.createWithItems(student.id, course.id)

    // tandai satu item selesai
    const anyItem = await prismaClient.tutonItem.findFirst({ where: { enrollmentId: enr.id } })
    await prismaClient.tutonItem.update({ where: { id: anyItem!.id }, data: { status: "SELESAI" } })

    const res = await request(app)
      .delete(`/api/enrollments/${enr.id}`)
      .set("Authorization", `Bearer ${token}`)

    expect([400, 409]).toContain(res.status)
    const still = await prismaClient.enrollment.findUnique({ where: { id: enr.id } })
    expect(still).not.toBeNull()
  })

  it("POST /api/enrollments/:enrollId/sync-deadlines → copy only this enrollment", async () => {
    // master deadlines
    const course = await CourseTest.createUnique()
    await CourseTest.seedDeadlines(course.id)

    // student A (target sync)
    const { student: a, token: tokenA } = await StudentTest.registerAndLogin()
    const enrA = await EnrollmentTest.createWithItems(a.id, course.id)

    // student B (tidak ikut sync)
    const { student: b } = await StudentTest.registerAndLogin()
    const enrB = await EnrollmentTest.createWithItems(b.id, course.id)

    // sebelum sync: item A kosong deadline
    const beforeA = await prismaClient.tutonItem.findMany({
      where: { enrollmentId: enrA.id }, select: { jenis: true, sesi: true, deadlineAt: true }
    })
    expect(beforeA.every((i) => i.deadlineAt === null)).toBe(true)

    // call API
    const res = await request(app)
      .post(`/api/enrollments/${enrA.id}/sync-deadlines`)
      .set("Authorization", `Bearer ${tokenA}`)

    expect(res.status).toBe(200)
    expect(typeof res.body?.data?.affected).toBe("number")
    expect(res.body.data.affected).toBeGreaterThan(0)

    // sesudah: A terisi, B tetap null
    const afterA = await prismaClient.tutonItem.findMany({
      where: { enrollmentId: enrA.id }, select: { jenis: true, sesi: true, deadlineAt: true }
    })
    expect(afterA.some((i) => i.jenis === "DISKUSI" && i.sesi === 1 && i.deadlineAt !== null)).toBe(true)
    expect(afterA.some((i) => i.jenis === "TUGAS" && i.sesi === 3 && i.deadlineAt !== null)).toBe(true)

    const afterB = await prismaClient.tutonItem.findMany({
      where: { enrollmentId: enrB.id }, select: { jenis: true, sesi: true, deadlineAt: true }
    })
    expect(afterB.every((i) => i.deadlineAt === null)).toBe(true)
  })
})

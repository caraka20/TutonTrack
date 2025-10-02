import request from "supertest"
import app from "../src/app"
import { prismaClient } from "../src/config/database"
import { AdminTest, CourseTest, EnrollmentTest, StudentTest } from "./test-util"

describe("Items QoL", () => {
  afterAll(async () => {
    await StudentTest.cleanup()
    await AdminTest.cleanup()
    await prismaClient.$disconnect()
  })

  it("GET /api/items/:itemId → return item detail (own)", async () => {
    const { student, token } = await StudentTest.registerAndLogin()
    const c = await CourseTest.createUnique()
    const enr = await EnrollmentTest.createWithItems(student.id, c.id)

    const anyItem = await prismaClient.tutonItem.findFirst({
      where: { enrollmentId: enr.id },
      select: { id: true },
    })
    expect(anyItem).toBeTruthy()

    const res = await request(app)
      .get(`/api/items/${anyItem!.id}`)
      .set("Authorization", `Bearer ${token}`)

    expect(res.status).toBe(200)
    expect(res.body?.data?.data?.id).toBe(anyItem!.id)
  })

  it("GET /api/items/:itemId → 404 if not owned", async () => {
    const { student: a } = await StudentTest.registerAndLogin()
    const { token: tokenB } = await StudentTest.registerAndLogin()
    const c = await CourseTest.createUnique()
    const enr = await EnrollmentTest.createWithItems(a.id, c.id)

    const anyItem = await prismaClient.tutonItem.findFirst({
      where: { enrollmentId: enr.id },
      select: { id: true },
    })
    const res = await request(app)
      .get(`/api/items/${anyItem!.id}`)
      .set("Authorization", `Bearer ${tokenB}`)

    expect([403, 404]).toContain(res.status)
  })

  it("PATCH /api/items/:itemId/desc → update deskripsi (own)", async () => {
    const { student, token } = await StudentTest.registerAndLogin()
    const c = await CourseTest.createUnique()
    const enr = await EnrollmentTest.createWithItems(student.id, c.id)

    const anyItem = await prismaClient.tutonItem.findFirst({
      where: { enrollmentId: enr.id },
      select: { id: true },
    })

    const res = await request(app)
      .patch(`/api/items/${anyItem!.id}/desc`)
      .set("Authorization", `Bearer ${token}`)
      .send({ deskripsi: "Link tugas: https://contoh.com/tugas-1" })

    expect(res.status).toBe(200)
    expect(res.body?.data?.data?.deskripsi).toMatch(/https:\/\/contoh\.com/)
  })

  it("PATCH /api/items/:itemId/desc → 400 on empty desc", async () => {
    const { student, token } = await StudentTest.registerAndLogin()
    const c = await CourseTest.createUnique()
    const enr = await EnrollmentTest.createWithItems(student.id, c.id)

    const anyItem = await prismaClient.tutonItem.findFirst({
      where: { enrollmentId: enr.id },
      select: { id: true },
    })

    const res = await request(app)
      .patch(`/api/items/${anyItem!.id}/desc`)
      .set("Authorization", `Bearer ${token}`)
      .send({ deskripsi: "" })

    expect(res.status).toBe(400) // VALIDATION_ERROR dari zod
  })
})

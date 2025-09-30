import request from "supertest";
import app from "../src/app";
import { prismaClient } from "../src/config/database";
import { AdminTest, CourseTest, StudentTest } from "./test-util";
import { JenisTugas, StatusTugas } from "@prisma/client";

/** buat satu enrollment + satu item overdue (deadline kemarin, status BELUM) */
async function seedOneOverdue() {
  const { student } = await StudentTest.registerAndLogin();
  const course = await CourseTest.createUnique("TEST-COURSE Laporan Overdue");

  const enr = await prismaClient.enrollment.create({
    data: { studentId: student.id, courseId: course.id },
    select: { id: true },
  });

  // item overdue: deadline kemarin, status BELUM
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  await prismaClient.tutonItem.create({
    data: {
      enrollmentId: enr.id,
      jenis: JenisTugas.DISKUSI,
      sesi: 1,
      status: StatusTugas.BELUM,
      deadlineAt: yesterday,
    },
  });

  return { student, course, enr };
}

describe("Admin Reports", () => {
  let adminToken: string;

  beforeAll(async () => {
    adminToken = await AdminTest.loginOwner("owner-report");
  });

  afterAll(async () => {
    // beres-beres semua data test “TEST-COURSE*” & student “TEST-*”
    await prismaClient.reminder.deleteMany({
      where: { item: { enrollment: { student: { nim: { startsWith: "TEST-" } } } } },
    });
    await prismaClient.tutonItem.deleteMany({
      where: { enrollment: { student: { nim: { startsWith: "TEST-" } } } },
    });
    await prismaClient.enrollment.deleteMany({
      where: { student: { nim: { startsWith: "TEST-" } } },
    });
    await prismaClient.course.deleteMany({
      where: { nama: { startsWith: "TEST-COURSE" } },
    });
    await StudentTest.cleanup();
    await AdminTest.cleanup();
    await prismaClient.$disconnect();
  });

  it("GET /api/admin/reports/overdue → returns overdue items", async () => {
    const { course } = await seedOneOverdue();

    const res = await request(app)
      .get("/api/admin/reports/overdue")
      .set("Authorization", `Bearer ${adminToken}`)
      .query({
        courseId: course.id, // filter ke course ini biar deterministic
        // kamu bisa tambahkan filter lain kalau validasi kamu mewajibkan
      });

    expect(res.status).toBe(200);
    expect(res.body?.status).toBe("success");
    // bentuk response dibiarkan fleksibel: cukup pastikan array berisi data
    const data = res.body?.data;
    expect(data).toBeDefined();
    // kalau servicemu return { items: [...] }
    const items = Array.isArray(data?.items) ? data.items : Array.isArray(data) ? data : [];
    expect(Array.isArray(items)).toBe(true);
    expect(items.length).toBeGreaterThan(0);
  });

  it("GET /api/admin/reports/export.csv → sends CSV", async () => {
    const { course } = await seedOneOverdue();

    const res = await request(app)
      .get("/api/admin/reports/export.csv")
      .set("Authorization", `Bearer ${adminToken}`)
      .query({ courseId: course.id });

    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/text\/csv/i);
    expect(res.headers["content-disposition"]).toMatch(/attachment; filename="export\.csv"/i);

    const text = res.text || "";
    // cek minimal ada header CSV & nama course
    expect(text.toLowerCase()).toContain("course"); // tergantung header yang kamu buat
    expect(text).toContain(course.nama);
  });
});

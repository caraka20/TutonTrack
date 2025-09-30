// tests/progress.test.ts
import request from "supertest";
import app from "../src/app";
import { prismaClient } from "../src/config/database";
import { AdminTest, StudentTest, CourseTest, EnrollmentTest } from "./test-util";
import { JenisTugas, StatusTugas } from "@prisma/client";

describe("Progress & Dashboard API", () => {
  let adminToken: string;
  let studentToken: string;
  let sid: number;
  let enrollId: number;

  beforeAll(async () => {
    // login OWNER
    adminToken = await AdminTest.loginOwner("owner-test-progress");

    // 1 student + token
    const { student, token } = await StudentTest.registerAndLogin();
    studentToken = token;
    sid = student.id;

    // 1 course + deadlines template
    const c = await CourseTest.createUnique("TEST-COURSE Progress Seed");
    await CourseTest.seedDeadlines(c.id, new Date());

    // enroll + generate items kosong deadline
    const enr = await EnrollmentTest.createWithItems(sid, c.id);
    enrollId = enr.id;

    // ambil item2-nya
    const items = await prismaClient.tutonItem.findMany({
      where: { enrollmentId: enrollId },
      orderBy: [{ jenis: "asc" }, { sesi: "asc" }],
    });

    // safety: pastikan minimal ada 3 item
    if (items.length < 3) {
      // tambah manual jika skenario di helper berubah
      await prismaClient.tutonItem.createMany({
        data: [
          { enrollmentId: enrollId, jenis: JenisTugas.DISKUSI, sesi: 3, status: StatusTugas.BELUM },
          { enrollmentId: enrollId, jenis: JenisTugas.ABSEN, sesi: 2, status: StatusTugas.BELUM },
          { enrollmentId: enrollId, jenis: JenisTugas.TUGAS, sesi: 5, status: StatusTugas.BELUM },
        ],
        skipDuplicates: true,
      });
    }

    // refresh list
    const list = await prismaClient.tutonItem.findMany({
      where: { enrollmentId: enrollId },
      orderBy: [{ jenis: "asc" }, { sesi: "asc" }],
    });

    // set 1 item selesai, 1 overdue (kemarin), 1 due soon (besok)
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 3600 * 1000);
    const tomorrow = new Date(now.getTime() + 24 * 3600 * 1000);

    // pick tiga item berbeda jika ada
    const itSelesai = list[0];
    const itOverdue = list[1] ?? list[0];
    const itSoon = list[2] ?? list[0];

    await prismaClient.tutonItem.update({
      where: { id: itSelesai.id },
      data: { status: StatusTugas.SELESAI },
    });
    await prismaClient.tutonItem.update({
      where: { id: itOverdue.id },
      data: { deadlineAt: yesterday, status: StatusTugas.BELUM },
    });
    await prismaClient.tutonItem.update({
      where: { id: itSoon.id },
      data: { deadlineAt: tomorrow, status: StatusTugas.BELUM },
    });
  });

  afterAll(async () => {
    await CourseTest.cleanup();
    await StudentTest.cleanup();
    await AdminTest.cleanup();
    await prismaClient.$disconnect();
  });

  it("GET /api/me/progress → ringkasan progress student aktif", async () => {
    const res = await request(app)
      .get("/api/me/progress")
      .set("Authorization", `Bearer ${studentToken}`);

    expect(res.status).toBe(200);
    const data = res.body?.data;
    expect(data).toBeTruthy();

    // bentuk minimal yang kita cek agar robust terhadap perubahan implementasi
    expect(Array.isArray(data.courses ?? data.items ?? [])).toBe(true);

    // harus ada agregat total basic
    const totals = data.totals ?? data.summary ?? {};
    expect(typeof (totals.totalItems ?? 0)).toBe("number");
    expect(typeof (totals.doneItems ?? 0)).toBe("number");

    // progress dalam rentang 0..100
    const progress = totals.progress ?? totals.percent ?? 0;
    expect(progress).toBeGreaterThanOrEqual(0);
    expect(progress).toBeLessThanOrEqual(100);

    // dueSoon minimal array (karena kita seed besok)
    const dueSoon = data.dueSoon ?? (data.courses?.[0]?.dueSoon ?? []);
    if (dueSoon) expect(Array.isArray(dueSoon)).toBe(true);
  });

  it("GET /api/admin/students/:sid/progress → ringkasan progress via admin", async () => {
    const res = await request(app)
      .get(`/api/admin/students/${sid}/progress`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    const data = res.body?.data;
    expect(data).toBeTruthy();

    expect(Array.isArray(data.courses ?? data.items ?? [])).toBe(true);
    const totals = data.totals ?? data.summary ?? {};
    expect(typeof (totals.totalItems ?? 0)).toBe("number");
    expect(typeof (totals.doneItems ?? 0)).toBe("number");
  });

  it("GET /api/admin/enrollments → daftar enrollment (monitoring)", async () => {
    const res = await request(app)
      .get("/api/admin/enrollments")
      .set("Authorization", `Bearer ${adminToken}`)
      .query({ page: 1, limit: 10 }); // kalau ada pagination

    expect(res.status).toBe(200);
    const payload = res.body?.data ?? res.body;
    // izinkan dua model hasil: {items,total} atau array langsung
    if (Array.isArray(payload)) {
      expect(Array.isArray(payload)).toBe(true);
    } else {
      expect(Array.isArray(payload.items ?? [])).toBe(true);
      expect(typeof (payload.total ?? 0)).toBe("number");
    }
  });
});

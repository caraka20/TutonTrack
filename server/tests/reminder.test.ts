// tests/reminder.test.ts
import request from "supertest";
import app from "../src/app";
import { prismaClient } from "../src/config/database";
import { AdminTest, StudentTest, CourseTest } from "./test-util";
import { JenisTugas, StatusTugas, ReminderSource, ReminderStatus, ReminderChannel } from "@prisma/client";

describe("ADMIN Reminders API", () => {
  let adminToken: string;

  beforeAll(async () => {
    adminToken = await AdminTest.loginOwner("owner-reminders");
  });

  afterAll(async () => {
    // cleanup semua data test
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

  /** Seed:
   *  - student, course, enrollment
   *  - 1 TutonItem BELUM dengan deadline = sekarang + (1440 + 10) menit  → dueAt = +10 menit
   *  - (tanpa preferensi) → generate-due akan membuat reminder WEB PENDING default
   */
  async function seedItemWithFutureDueAt() {
    const { student } = await StudentTest.registerAndLogin();
    const course = await CourseTest.createUnique("TEST-COURSE Reminder-Due");

    const enr = await prismaClient.enrollment.create({
      data: { studentId: student.id, courseId: course.id },
      select: { id: true },
    });

    // offset default 1440 (H-1). Kita buat deadline H-1 + 10 menit → dueAt = +10 menit dari sekarang
    const inMinutes = 1440 + 10;
    const deadline = new Date(Date.now() + inMinutes * 60 * 1000);

    const item = await prismaClient.tutonItem.create({
      data: {
        enrollmentId: enr.id,
        jenis: JenisTugas.DISKUSI,
        sesi: 1,
        status: StatusTugas.BELUM,
        deadlineAt: deadline,
        deskripsi: "diskusi#1",
      },
      select: { id: true },
    });

    // Pastikan belum ada preferensi WEB, biar generate-due yang bikin
    await prismaClient.reminder.deleteMany({
      where: { itemId: item.id, source: ReminderSource.WEB },
    });

    return { student, course, enr, item };
  }

  it("POST /api/admin/reminders/generate-due → list pending & send one", async () => {
    const { student, course } = await seedItemWithFutureDueAt();

    // generate dengan defaultOffsetMin=1440 (H-1), horizon 2 hari
    const gen = await request(app)
      .post("/api/admin/reminders/generate-due")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ horizonDays: 2, defaultOffsetMin: 1440 });

    expect(gen.status).toBe(200);
    const created = gen.body?.data?.created ?? gen.body?.created ?? 0;
    expect(typeof created).toBe("number");
    expect(created).toBeGreaterThan(0); // harus membuat minimal 1 reminder

    // list pending dalam 60 menit ke depan (karena dueAt = +10 menit)
    const list = await request(app)
      .get("/api/admin/reminders")
      .set("Authorization", `Bearer ${adminToken}`)
      .query({
        status: "PENDING",
        dueWithinMin: 60, // 1 jam cukup
        courseId: course.id,
        studentId: student.id,
        page: 1,
        limit: 20,
      });

    expect(list.status).toBe(200);
    const items = list.body?.data?.items ?? list.body?.data ?? [];
    expect(Array.isArray(items)).toBe(true);
    expect(items.length).toBeGreaterThan(0);

    // kirim salah satu
    const remId = items[0]?.id;
    expect(typeof remId).toBe("number");

    const send = await request(app)
      .post(`/api/admin/reminders/${remId}/send`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({});

    expect(send.status).toBe(200);
    const sent = send.body?.data ?? send.body;
    if (sent?.status) expect(sent.status).toBe("SENT");
    if (sent?.sentAt) expect(new Date(sent.sentAt).getTime()).toBeLessThanOrEqual(Date.now());

    // verifikasi di list SENT
    const listSent = await request(app)
      .get("/api/admin/reminders")
      .set("Authorization", `Bearer ${adminToken}`)
      .query({ status: "SENT", courseId: course.id, studentId: student.id, page: 1, limit: 10 });

    expect(listSent.status).toBe(200);
    const sentItems = listSent.body?.data?.items ?? listSent.body?.data ?? [];
    const found = sentItems.some((r: any) => r.id === remId);
    expect(found).toBe(true);
  });

  it("GET /api/admin/reminders → 401/403 without admin token", async () => {
    const res = await request(app).get("/api/admin/reminders").query({ status: "PENDING" });
    expect([401, 403]).toContain(res.status);
  });
});

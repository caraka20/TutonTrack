// tests/test-util.ts
import { prismaClient } from "../src/config/database";
import { generateToken } from "../src/utils/jwt";
import bcrypt from "bcrypt";
import { AdminRole, JenisTugas } from "@prisma/client";

/** nomor HP unik max 20 char (schema @db.VarChar(20)) */
function genPhone(): string {
  const ts = Date.now().toString().slice(-10);         // 10 digit time
  const rnd = Math.floor(Math.random() * 900 + 100);   // 3 digit random
  return `081${ts}${rnd}`.slice(0, 20);
}

/* ===================== STUDENT ===================== */
export class StudentTest {
  /** Buat 1 student unik */
  static async create(overrides: Partial<{ nim: string; noHp: string; nama: string }> = {}) {
    const nim = overrides.nim ?? `TEST-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const noHp = overrides.noHp ?? genPhone();
    const nama = overrides.nama ?? "Student Test";

    return prismaClient.student.create({
      data: { nim, noHp, nama },
    });
  }

  static async createAndToken() {
    const { student, token } = await this.registerAndLogin();
    return { s: student, token };
  }

  /** Buat banyak student unik */
  static async createMany(n: number) {
    const jobs: Array<Promise<any>> = [];
    for (let i = 0; i < n; i++) jobs.push(this.create());
    return Promise.all(jobs);
  }

  /**
   * Register “diam-diam” dan balikin token JWT.
   * Payload JWT mengikuti utils kamu: { username }, diisi nim student.
   */
  static async registerAndLogin() {
    const s = await this.create();
    const token = generateToken({ username: s.nim });
    return { student: s, token };
  }

  /** Bersihkan data student test (prefix NIM startsWith TEST-) beserta turunannya */
  static async cleanup() {
    // cari student test
    const studs = await prismaClient.student.findMany({
      where: { nim: { startsWith: "TEST-" } },
      select: { id: true },
    });
    const sids = studs.map((s) => s.id);

    if (sids.length) {
      // ambil enrollment mereka
      const enrolls = await prismaClient.enrollment.findMany({
        where: { studentId: { in: sids } },
        select: { id: true },
      });
      const eids = enrolls.map((e) => e.id);

      if (eids.length) {
        // hapus reminder → item → enrollment
        await prismaClient.reminder.deleteMany({
          where: { item: { enrollmentId: { in: eids } } },
        });
        await prismaClient.tutonItem.deleteMany({
          where: { enrollmentId: { in: eids } },
        });
        await prismaClient.enrollment.deleteMany({
          where: { id: { in: eids } },
        });
      }

      // terakhir hapus student
      await prismaClient.student.deleteMany({
        where: { id: { in: sids } },
      });
    }
  }
}

/* ===================== ADMIN ===================== */
export class AdminTest {
  static async create(username = "owner", role: AdminRole = AdminRole.OWNER) {
    const hash = await bcrypt.hash("password", 10);
    return prismaClient.admin.upsert({
      where: { username },
      update: {},
      create: { username, passwordHash: hash, role },
    });
  }

  /** Login OWNER → token JWT, payload.username = username admin */
  static async loginOwner(username = "owner") {
    const admin = await this.create(username, AdminRole.OWNER);
    return generateToken({ username: admin.username });
  }

  static async cleanup() {
    await prismaClient.admin.deleteMany({
      where: { username: { in: ["owner", "admin", "owner-test"] } },
    });
  }
}

/* ===================== COURSE ===================== */
export class CourseTest {
  /** Nama unik */
  static uniqueName(base = "TEST-COURSE") {
    return `${base} ${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  }

  /** create unik (selalu tambahkan suffix agar tidak kena unique constraint) */
  static async createUnique(name = "TEST-COURSE") {
    const finalName = this.uniqueName(name);
    return prismaClient.course.create({
      data: { nama: finalName },
      select: { id: true, nama: true },
    });
  }

  /** upsert berdasarkan nama (pakai untuk kasus tertentu) */
  static async upsert(name = "Statistika UT") {
    return prismaClient.course.upsert({
      where: { nama: name },
      update: {},
      create: { nama: name },
      select: { id: true, nama: true },
    });
  }

  /**
   * Seed “deadline” untuk verifikasi:
   * SEKARANG mengisi SessionWindow (GLOBAL), bukan CourseDeadline.
   * Signature tetap sama → parameter `courseId` diabaikan untuk kompatibilitas.
   */
  static async seedDeadlines(_courseId: number, base = new Date()) {
    const start = (days: number, h = 0, m = 0) =>
      new Date(base.getFullYear(), base.getMonth(), base.getDate() + days, h, m, 0, 0);
    const end = (days: number, h = 23, m = 59) =>
      new Date(base.getFullYear(), base.getMonth(), base.getDate() + days, h, m, 0, 0);

    const data: Array<{ jenis: JenisTugas; sesi: number; startAt: Date; endAt: Date }> = [
      { jenis: "DISKUSI", sesi: 1, startAt: start(1, 0, 0), endAt: end(1) },
      { jenis: "DISKUSI", sesi: 2, startAt: start(2, 0, 0), endAt: end(2) },
      { jenis: "ABSEN",   sesi: 1, startAt: start(1, 8, 0), endAt: end(1, 12, 0) },
      { jenis: "TUGAS",   sesi: 3, startAt: start(5, 9, 0), endAt: end(5, 20, 0) },
      { jenis: "QUIZ",    sesi: 2, startAt: start(7, 8, 0), endAt: end(7, 9, 0) },
    ];

    for (const w of data) {
      await prismaClient.sessionWindow.upsert({
        where: { sesi_jenis: { sesi: w.sesi, jenis: w.jenis } }, // @@unique([sesi, jenis])
        update: { startAt: w.startAt, endAt: w.endAt },
        create: { sesi: w.sesi, jenis: w.jenis, startAt: w.startAt, endAt: w.endAt },
      });
    }
  }

  static async cleanup() {
    // hapus course yang prefiks TEST-COURSE; SessionWindow bersifat global → biarkan
    await prismaClient.course.deleteMany({
      where: { nama: { startsWith: "TEST-COURSE" } },
    });
  }
}

/* ===================== ENROLLMENT (helper utk test) ===================== */
export class EnrollmentTest {
  /** Buat enrollment + beberapa TutonItem “kosong deadline/openAt” */
  static async createWithItems(studentId: number, courseId: number) {
    const enr = await prismaClient.enrollment.create({
      data: { studentId, courseId },
      select: { id: true },
    });

    // buat item dasar
    const items = [
      { enrollmentId: enr.id, jenis: JenisTugas.DISKUSI, sesi: 1 },
      { enrollmentId: enr.id, jenis: JenisTugas.DISKUSI, sesi: 2 },
      { enrollmentId: enr.id, jenis: JenisTugas.ABSEN,   sesi: 1 },
      { enrollmentId: enr.id, jenis: JenisTugas.TUGAS,   sesi: 3 },
      { enrollmentId: enr.id, jenis: JenisTugas.QUIZ,    sesi: 2 },
    ] as const;

    await prismaClient.tutonItem.createMany({
      data: items.map((it) => ({
        ...it,
        status: "BELUM",
        openAt: null,
        deadlineAt: null,
      })),
      skipDuplicates: true,
    });

    return enr;
  }

  static async itemsOfEnrollment(enrollmentId: number) {
    return prismaClient.tutonItem.findMany({
      where: { enrollmentId },
      select: { jenis: true, sesi: true, openAt: true, deadlineAt: true },
      orderBy: [{ jenis: "asc" }, { sesi: "asc" }],
    });
  }
}

/* ===================== DASHBOARD SEED ===================== */
export class DashboardSeed {
  /**
   * Seed:
   * - 2 course
   * - 3 student
   * - enroll & full items (8 DISKUSI + 8 ABSEN + 3 TUGAS) per enrollment
   * - Tandai sebagian item SELESAI, sebagian overdue (deadlineAt lampau), sebagian due-soon (~H+1)
   */
  static async seed() {
    // courses
    const c1 = await CourseTest.createUnique("TEST-COURSE Dashboard Ekonomi");
    const c2 = await CourseTest.createUnique("TEST-COURSE Dashboard Akuntansi");

    // students
    const sA = await StudentTest.create({ nama: "Student A" });
    const sB = await StudentTest.create({ nama: "Student B" });
    const sC = await StudentTest.create({ nama: "Student C" });

    // enrollments
    const eA1 = await prismaClient.enrollment.create({ data: { studentId: sA.id, courseId: c1.id } });
    const eB1 = await prismaClient.enrollment.create({ data: { studentId: sB.id, courseId: c1.id } });
    const eC2 = await prismaClient.enrollment.create({ data: { studentId: sC.id, courseId: c2.id } });

    // helper generate full items for an enrollment
    const genFull = async (enrollmentId: number) => {
      const data: any[] = [];
      for (let sesi = 1; sesi <= 8; sesi++) {
        data.push({ enrollmentId, jenis: "DISKUSI", sesi, status: "BELUM", openAt: null, deadlineAt: null });
        data.push({ enrollmentId, jenis: "ABSEN",   sesi, status: "BELUM", openAt: null, deadlineAt: null });
      }
      for (const sesi of [3, 5, 7]) {
        data.push({ enrollmentId, jenis: "TUGAS", sesi, status: "BELUM", openAt: null, deadlineAt: null });
      }
      await prismaClient.tutonItem.createMany({ data, skipDuplicates: true });
    };

    await genFull(eA1.id);
    await genFull(eB1.id);
    await genFull(eC2.id);

    // mark progress + deadlines:
    const now = new Date();
    const past = new Date(now.getTime() - 48 * 60 * 60 * 1000);   // 2 hari lalu (overdue)
    const soon = new Date(now.getTime() + 20 * 60 * 60 * 1000);   // ~H+0.8 (due-soon)

    // Student A (c1): sebagian selesai, sebagian overdue, sebagian soon
    await prismaClient.tutonItem.updateMany({
      where: { enrollmentId: eA1.id, jenis: "DISKUSI", sesi: { in: [1, 2, 3] } },
      data: { status: "SELESAI", selesaiAt: now },
    });
    await prismaClient.tutonItem.updateMany({
      where: { enrollmentId: eA1.id, jenis: "TUGAS", sesi: 3 },
      data: { deadlineAt: past }, // overdue
    });
    await prismaClient.tutonItem.updateMany({
      where: { enrollmentId: eA1.id, jenis: "ABSEN", sesi: 1 },
      data: { deadlineAt: soon }, // due-soon
    });

    // Student B (c1): progress rendah & overdue lebih banyak
    await prismaClient.tutonItem.updateMany({
      where: { enrollmentId: eB1.id, jenis: "DISKUSI", sesi: { in: [1] } },
      data: { status: "SELESAI", selesaiAt: now },
    });
    await prismaClient.tutonItem.updateMany({
      where: { enrollmentId: eB1.id, jenis: "DISKUSI", sesi: { in: [4, 5] } },
      data: { deadlineAt: past },
    });
    await prismaClient.tutonItem.updateMany({
      where: { enrollmentId: eB1.id, jenis: "TUGAS", sesi: 5 },
      data: { deadlineAt: soon },
    });

    // Student C (c2): tidak overdue, beberapa soon
    await prismaClient.tutonItem.updateMany({
      where: { enrollmentId: eC2.id, jenis: "DISKUSI", sesi: { in: [1, 2] } },
      data: { status: "SELESAI", selesaiAt: now },
    });
    await prismaClient.tutonItem.updateMany({
      where: { enrollmentId: eC2.id, jenis: "ABSEN", sesi: 2 },
      data: { deadlineAt: soon },
    });

    return { courses: [c1, c2], students: [sA, sB, sC], enrollments: [eA1, eB1, eC2] };
  }
}

describe("Enrollment smoke", () => {
  it("works", () => {
    expect(true).toBe(true);
  });
});

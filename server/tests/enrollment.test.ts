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
  static uniqueName() {
    return `TEST-COURSE ${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  }

  /** Upsert course berdasarkan nama; return id & nama */
  static async upsert(name = "Statistika UT") {
    return prismaClient.course.upsert({
      where: { nama: name },
      update: {},
      create: { nama: name },
      select: { id: true, nama: true },
    });
  }

  /** create unik (bukan upsert) */
  static async createUnique(name = CourseTest.uniqueName()) {
    return prismaClient.course.create({
      data: { nama: name },
      select: { id: true, nama: true },
    });
  }

  /** Seed sebagian deadline untuk verifikasi copy ke TutonItem saat enroll */
  static async seedDeadlines(courseId: number, base = new Date()) {
    const d = (days: number, h = 23, m = 59) =>
      new Date(base.getFullYear(), base.getMonth(), base.getDate() + days, h, m, 0, 0);

    await prismaClient.courseDeadline.deleteMany({ where: { courseId } });
    await prismaClient.courseDeadline.createMany({
      data: [
        { courseId, jenis: JenisTugas.DISKUSI, sesi: 1, deadlineAt: d(1) },
        { courseId, jenis: JenisTugas.DISKUSI, sesi: 2, deadlineAt: d(2) },
        { courseId, jenis: JenisTugas.ABSEN,   sesi: 1, deadlineAt: d(1, 12, 0) },
        { courseId, jenis: JenisTugas.TUGAS,   sesi: 3, deadlineAt: d(5, 20, 0) },
        { courseId, jenis: JenisTugas.QUIZ,    sesi: 2, deadlineAt: d(7, 9, 0) },
      ],
    });
  }

  static async cleanup() {
    await prismaClient.courseDeadline.deleteMany({});
    // tidak menghapus course master; biarkan ada jika dipakai test lain
  }
}

/* ===================== ENROLLMENT (helper utk test) ===================== */
export class EnrollmentTest {
  /** Buat enrollment + beberapa TutonItem “kosong deadline” */
  static async createWithItems(studentId: number, courseId: number) {
    const enr = await prismaClient.enrollment.create({
      data: { studentId, courseId },
      select: { id: true },
    });

    // buat item dasar (tanpa deadline)
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
        deadlineAt: null,
      })),
      skipDuplicates: true,
    });

    return enr;
  }

  static async itemsOfEnrollment(enrollmentId: number) {
    return prismaClient.tutonItem.findMany({
      where: { enrollmentId },
      select: { jenis: true, sesi: true, deadlineAt: true },
      orderBy: [{ jenis: "asc" }, { sesi: "asc" }],
    });
  }
}

describe("Enrollment smoke", () => {
  it("works", () => {
    expect(true).toBe(true);
  });
});
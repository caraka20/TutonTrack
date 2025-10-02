// tests/admin-dashboard.test.ts
import request from "supertest";
import app from "../src/app";
import { prismaClient } from "../src/config/database";
import { AdminTest, CourseTest, StudentTest, DashboardSeed } from "./test-util";

describe("ADMIN Dashboard API", () => {
  let adminToken: string;

  beforeAll(async () => {
    adminToken = await AdminTest.loginOwner("owner-dashboard");
    await DashboardSeed.seed();
  });

  afterAll(async () => {
    await StudentTest.cleanup();
    await AdminTest.cleanup();
    await prismaClient.$disconnect();
  });

  it("GET /api/admin/dashboard/summary → totals & due numbers", async () => {
    const res = await request(app)
      .get("/api/admin/dashboard/summary")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(200);

    const d = res.body?.data ?? res.body;

    // harus ada angka2 ini
    expect(typeof d.totalStudents).toBe("number");
    expect(typeof d.totalEnrollments).toBe("number");

    // karena seed bikin overdue & dueSoon
    expect(d.overdueCount).toBeGreaterThan(0);
    expect(d.dueSoonCount).toBeGreaterThan(0);
  });

  it("GET /api/admin/dashboard/top-risk → array of risky students", async () => {
    const res = await request(app)
      .get("/api/admin/dashboard/top-risk")
      .set("Authorization", `Bearer ${adminToken}`)
      .query({ limit: 5 });

    expect(res.status).toBe(200);

    const items = res.body?.data?.items ?? res.body?.data ?? [];
    expect(Array.isArray(items)).toBe(true);

    if (!items.length) return;

    const first = items[0];

    // field wajib
    expect(typeof first.studentId).toBe("number");
    expect(typeof first.progress).toBe("number");
    expect(typeof first.overdue).toBe("number");

    // nama bisa dikirim sebagai `studentNama` atau `nama`
    const studentName = first.studentNama ?? first.nama;
    expect(typeof studentName).toBe("string");

    // jumlah enrollment bisa `enrollCount` atau `enrollments`
    const enrollCount = first.enrollCount ?? first.enrollments;
    expect(typeof enrollCount).toBe("number");

    // metrik opsional (kalau ada)
    if (first.totalItems !== undefined) {
      expect(typeof first.totalItems).toBe("number");
    }
    if (first.completedItems !== undefined) {
      expect(typeof first.completedItems).toBe("number");
    }
  });

  it("GET /api/admin/dashboard/courses/heatmap → distribution by course", async () => {
    const res = await request(app)
      .get("/api/admin/dashboard/courses/heatmap")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(200);

    const items = res.body?.data?.items ?? res.body?.data ?? [];
    expect(Array.isArray(items)).toBe(true);

    if (!items.length) return;

    const first = items[0];

    // id wajib
    expect(typeof first.courseId).toBe("number");

    // nama course bisa `courseNama` atau `courseName`
    const courseName = first.courseNama ?? first.courseName;
    expect(typeof courseName).toBe("string");

    // buckets bisa object (bucketCounts) atau array (buckets)
    if (first.bucketCounts !== undefined) {
      expect(typeof first.bucketCounts).toBe("object");
      // cek beberapa bucket umum bila ada
      const bc = first.bucketCounts;
      // boleh gak ada semua keys; kalau ada harus number
      for (const k of ["P0_25", "P25_50", "P50_75", "P75_100"]) {
        if (bc[k] !== undefined) expect(typeof bc[k]).toBe("number");
      }
    } else if (first.buckets !== undefined) {
      expect(Array.isArray(first.buckets)).toBe(true);
    }

    // opsional, tapi kalau ada harus number
    if (first.avgProgress !== undefined) {
      expect(typeof first.avgProgress).toBe("number");
    }
    if (first.enrollments !== undefined) {
      expect(typeof first.enrollments).toBe("number");
    }
  });
});

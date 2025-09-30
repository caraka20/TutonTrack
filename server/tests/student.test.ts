// tests/student.test.ts
import supertest from "supertest";
import app from "../src/app";
import { prismaClient } from "../src/config/database";
import { StudentTest, AdminTest } from "./test-util";

function uniquePhone() {
  const ts = Date.now().toString().slice(-9);
  const rnd = Math.floor(Math.random() * 900 + 100);
  return `081${ts}${rnd}`.slice(0, 20);
}

// extractor fleksibel utk berbagai shape ResponseHandler
function extractItemsAndPagination(body: any) {
  const candidates = [
    body?.data?.items,          // { data: { items, pagination } }
    body?.data?.data?.items,    // { data: { data: { items, pagination } } }
    body?.data,                 // { data: [ ... ] }
  ];
  let items: any[] | undefined;
  for (const c of candidates) {
    if (Array.isArray(c)) { items = c; break; }
  }
  const pagination =
    body?.data?.pagination ??
    body?.data?.data?.pagination ??
    undefined;

  return { items: items ?? [], pagination };
}

describe("Student API", () => {
  let studentToken: string;
  let ownerToken: string;

  beforeEach(async () => {
    await StudentTest.cleanup();
    const { token } = await StudentTest.registerAndLogin(); // ← destructure
    studentToken = token;
    ownerToken = await AdminTest.loginOwner();
  });

  afterAll(async () => {
    await StudentTest.cleanup();
    await AdminTest.cleanup();
    await prismaClient.$disconnect();
  });

  // ---------- PUBLIC ----------
  it("should register a new student", async () => {
    const res = await supertest(app)
      .post("/api/students/register")
      .send({
        nim: `NIM-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        noHp: uniquePhone(),
        nama: "Budi Test",
      });

    expect(res.status).toBe(201);
    expect(res.body.status).toBe("success");
    expect(res.body.data).toHaveProperty("data.nim");
    expect(res.body.data).toHaveProperty("token");
  });

  it("should login with nim", async () => {
    const student = await StudentTest.create();
    const res = await supertest(app)
      .post("/api/students/login")
      .send({ nim: student.nim });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("success");
    expect(res.body.data).toHaveProperty("token");
    expect(res.body.data).toHaveProperty("data.nim", student.nim);
  });

  // ---------- SELF ----------
  it("should return profile when authenticated", async () => {
    const res = await supertest(app)
      .get("/api/students/me")
      .set("Authorization", `Bearer ${studentToken}`);

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("success");
    expect(res.body.data).toHaveProperty("data.nim");
  });

  it("should update profile (nama, noHp)", async () => {
    const res = await supertest(app)
      .patch("/api/students/me")
      .set("Authorization", `Bearer ${studentToken}`)
      .send({ nama: "Nama Baru", noHp: uniquePhone() });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("success");
    expect(res.body.data).toHaveProperty("data.nama", "Nama Baru");
  });

  // ---------- ADMIN ----------
  it("should list students with OWNER token", async () => {
    await StudentTest.createMany(5);

    const res = await supertest(app)
      .get("/api/students")
      .set("Authorization", `Bearer ${ownerToken}`)
      .query({ page: 1, limit: 5 });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("success");

    const { items, pagination } = extractItemsAndPagination(res.body);
    expect(Array.isArray(items)).toBe(true);
    expect(items.length).toBeGreaterThan(0);

    if (pagination) {
      expect(pagination).toEqual(
        expect.objectContaining({
          page: expect.any(Number),
          limit: expect.any(Number),
          total: expect.any(Number),
        })
      );
    }
  });

  it("should get student detail", async () => {
    const student = await StudentTest.create();
    const res = await supertest(app)
      .get(`/api/students/${student.id}`)
      .set("Authorization", `Bearer ${ownerToken}`);

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("success");
    expect(res.body.data).toHaveProperty("data.id", student.id);
  });

  it("should update student by admin", async () => {
    const student = await StudentTest.create();
    const res = await supertest(app)
      .patch(`/api/students/${student.id}`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .send({ nama: "Admin Update" });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("success");
    expect(res.body.data).toHaveProperty("data.nama", "Admin Update");
  });

  it("should delete student by admin", async () => {
    const student = await StudentTest.create();
    const res = await supertest(app)
      .delete(`/api/students/${student.id}`)
      .set("Authorization", `Bearer ${ownerToken}`);

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("success");
    expect(res.body.data).toHaveProperty("deleted", true);
  });

  it("should check exists endpoint", async () => {
    const student = await StudentTest.create();
    const res = await supertest(app)
      .post("/api/students/exists")
      .set("Authorization", `Bearer ${ownerToken}`)
      .send({ nim: student.nim });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("success");
    expect(res.body.data.exists).toBe(true);
    expect(res.body.data.by).toBe("nim");
  });
});

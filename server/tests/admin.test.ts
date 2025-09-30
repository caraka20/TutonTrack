import request from "supertest";
import app from "../src/app";
import { AdminTest } from "./test-util";
import { prismaClient } from "../src/config/database";

describe("Admin Auth", () => {
  beforeAll(async () => {
    // pastikan ada admin dgn username 'owner-login' dan password 'password'
    await AdminTest.create("owner-login");
  });

  afterAll(async () => {
    await AdminTest.cleanup();
    await prismaClient.$disconnect();
  });

  it("POST /api/admin/login → success", async () => {
    const res = await request(app)
      .post("/api/admin/login")
      .send({ username: "owner-login", password: "password" });

    expect(res.status).toBe(200);
    expect(res.body?.status).toBe("success");
    expect(res.body?.data).toHaveProperty("token");
  });

  it("POST /api/admin/login → wrong password (401)", async () => {
    const res = await request(app)
      .post("/api/admin/login")
      .send({ username: "owner-login", password: "wrongpass" });

    // jika servicemu mengembalikan 401 (ideal). Beberapa setup bisa 400.
    expect([401, 400]).toContain(res.status);
    expect(res.body?.status).toBe("error");
  });

  it("POST /api/admin/login → unknown user (401/404)", async () => {
    const res = await request(app)
      .post("/api/admin/login")
      .send({ username: "not-exist-user", password: "password" });

    expect([401, 404]).toContain(res.status);
    expect(res.body?.status).toBe("error");
  });
});

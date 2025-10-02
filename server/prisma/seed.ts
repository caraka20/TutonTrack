// server/prisma/seed.ts
import { PrismaClient, JenisTugas } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

/* ============== Helpers kecil ============== */
// buat Date UTC (tahun, bulan 1-12, tanggal, jam, menit)
const d = (y:number, m1:number, d:number, hh=0, mm=0) =>
  new Date(Date.UTC(y, m1 - 1, d, hh, mm));

async function upsertAdmin(username: string, password: string, role: "OWNER" | "ADMIN") {
  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.admin.upsert({
    where: { username },
    update: { passwordHash, role, isActive: true, updatedAt: new Date() },
    create: { username, passwordHash, role, isActive: true },
  });
  console.log(`✓ ensured ${role} "${username}"`);
}

/** upsert jendela per (sesi, jenis) */
async function setWindow(
  sesi: number,
  jenis: JenisTugas,
  startAt: Date,
  endAt: Date
) {
  await prisma.sessionWindow.upsert({
    where: { sesi_jenis: { sesi, jenis } }, // dari @@unique([sesi, jenis])
    update: { startAt, endAt },
    create: { sesi, jenis, startAt, endAt },
  });
  console.log(
    `  • ${jenis} sesi ${sesi}: ${startAt.toISOString()} → ${endAt.toISOString()}`
  );
}

/** Seed jendela 2025/2026 ganjil sesuai poster */
async function seedWindows_2025Ganjil() {
  // DISKUSI & ABSEN → pakai “Jadwal Tuton” per sesi
  // Sesi 1: 6–19 Okt 2025
  for (const j of ["DISKUSI", "ABSEN"] as const) {
    await setWindow(1, j as JenisTugas, d(2025,10,6,0,0), d(2025,10,19,23,59));
  }

  // Sesi 2: 13–26 Okt 2025
  for (const j of ["DISKUSI", "ABSEN"] as const) {
    await setWindow(2, j as JenisTugas, d(2025,10,13,0,0), d(2025,10,26,23,59));
  }

  // Sesi 3: 20 Okt – 2 Nov 2025
  for (const j of ["DISKUSI", "ABSEN"] as const) {
    await setWindow(3, j as JenisTugas, d(2025,10,20,0,0), d(2025,11,2,23,59));
  }
  // TUGAS 1: 20 Okt 12:00 – 3 Nov 15:00
  await setWindow(3, "TUGAS", d(2025,10,20,12,0), d(2025,11,3,15,0));

  // Sesi 4: 27 Okt – 9 Nov 2025
  for (const j of ["DISKUSI", "ABSEN"] as const) {
    await setWindow(4, j as JenisTugas, d(2025,10,27,0,0), d(2025,11,9,23,59));
  }

  // Sesi 5: 3–16 Nov 2025
  for (const j of ["DISKUSI", "ABSEN"] as const) {
    await setWindow(5, j as JenisTugas, d(2025,11,3,0,0), d(2025,11,16,23,59));
  }
  // TUGAS 2: 3 Nov 12:00 – 17 Nov 15:00
  await setWindow(5, "TUGAS", d(2025,11,3,12,0), d(2025,11,17,15,0));

  // Sesi 6: 10–23 Nov 2025
  for (const j of ["DISKUSI", "ABSEN"] as const) {
    await setWindow(6, j as JenisTugas, d(2025,11,10,0,0), d(2025,11,23,23,59));
  }

  // Sesi 7: 17–30 Nov 2025
  for (const j of ["DISKUSI", "ABSEN"] as const) {
    await setWindow(7, j as JenisTugas, d(2025,11,17,0,0), d(2025,11,30,23,59));
  }
  // TUGAS 3: 17 Nov 12:00 – 1 Des 15:00
  await setWindow(7, "TUGAS", d(2025,11,17,12,0), d(2025,12,1,15,0));

  // Sesi 8: 24 Nov – 7 Des 2025
  for (const j of ["DISKUSI", "ABSEN"] as const) {
    await setWindow(8, j as JenisTugas, d(2025,11,24,0,0), d(2025,12,7,23,59));
  }
}

async function main() {
  // Admin default
  await upsertAdmin("raka20", "raka20", "OWNER");
  await upsertAdmin("admin",  "raka20", "ADMIN");

  // Windows global per sesi/jenis
  console.log("Seeding SessionWindow 2025/2026 ganjil…");
  await seedWindows_2025Ganjil();

  console.log("✔ seed complete");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

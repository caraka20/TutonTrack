// Shared types untuk halaman enrollment detail & komponen terkait

export type Status = "BELUM" | "SELESAI";

export type Item = {
  id: number;
  jenis: string;              // ABSEN | DISKUSI | TUGAS | QUIZ | ...
  sesi: number | null;
  status: Status;
  deadlineAt: string | null;  // ISO atau null
  nilai?: number | null;
  course?: unknown;           // untuk ambil nama matkul dari item pertama
};

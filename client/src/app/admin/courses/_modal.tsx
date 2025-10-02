"use client";

import { useState } from "react";
import type { AdminCourse } from "@/services/course-admin.service";

export default function CourseFormModal({
  mode,
  submitting,
  onClose,
  onSubmit,
}: {
  mode: { type: "create" } | { type: "edit"; row: AdminCourse };
  submitting: boolean;
  onClose: () => void;
  onSubmit: (v: { nama: string }) => void;
}) {
  const [nama, setNama] = useState(mode.type === "edit" ? mode.row.nama : "");
  const title = mode.type === "edit" ? "Edit Course" : "Tambah Course";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50" />
      <div
        className="relative w-[92%] max-w-md rounded-2xl border border-white/15 bg-[rgba(20,24,38,0.9)] backdrop-blur p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-lg font-semibold">{title}</div>

        <div className="mt-3 space-y-3">
          <div>
            <label className="text-sm text-white/70">Nama</label>
            <input
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="mis. Matematika Ekonomi"
              className="mt-1 w-full h-9 rounded-lg border border-white/15 bg-white/10 px-3 outline-none"
            />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            disabled={submitting}
            className="rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 hover:bg-white/[0.14]"
          >
            Batal
          </button>
          <button
            onClick={() => onSubmit({ nama })}
            disabled={submitting || !nama.trim()}
            className="btn-primary rounded-lg px-3 py-1.5"
          >
            {submitting ? "Menyimpan…" : "Simpan"}
          </button>
        </div>
      </div>
    </div>
  );
}

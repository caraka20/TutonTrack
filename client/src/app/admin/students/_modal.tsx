"use client";
import { useState } from "react";
import { AdminStudent } from "@/services/admin.service";

const cls = (...a: (string | false | null | undefined)[]) => a.filter(Boolean).join(" ");

export default function StudentFormModal({
  mode,
  submitting,
  onClose,
  onSubmit,
}: {
  mode: { type: "create" } | { type: "edit"; row: AdminStudent };
  submitting: boolean;
  onClose: () => void;
  onSubmit: (v: { nim: string; noHp: string; nama: string }) => void;
}) {
  const [nim, setNim] = useState(mode.type === "edit" ? mode.row.nim : "");
  const [noHp, setNoHp] = useState(mode.type === "edit" ? mode.row.noHp : "");
  const [nama, setNama] = useState(mode.type === "edit" ? mode.row.nama : "");

  const title = mode.type === "edit" ? "Edit Student" : "Tambah Student";
  const valid = nim.trim() && nama.trim() && noHp.trim();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
      <div
        className="relative w-[92%] max-w-md rounded-2xl border border-white/12 bg-[rgba(17,21,35,0.92)] shadow-xl backdrop-blur p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-lg font-semibold">{title}</div>

        <div className="mt-4 space-y-3">
          <div>
            <label className="text-sm text-white/70">NIM</label>
            <input
              value={nim}
              onChange={(e) => setNim(e.target.value)}
              className="mt-1 w-full h-10 rounded-xl border border-white/12 bg-white/[0.06] px-3 outline-none"
            />
          </div>
          <div>
            <label className="text-sm text-white/70">Nama</label>
            <input
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="mt-1 w-full h-10 rounded-xl border border-white/12 bg-white/[0.06] px-3 outline-none"
            />
          </div>
          <div>
            <label className="text-sm text-white/70">No. HP</label>
            <input
              value={noHp}
              onChange={(e) => setNoHp(e.target.value)}
              className="mt-1 w-full h-10 rounded-xl border border-white/12 bg-white/[0.06] px-3 outline-none"
            />
          </div>
        </div>

        <div className="mt-5 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            disabled={submitting}
            className="rounded-xl border border-white/12 bg-white/[0.06] px-3 py-2 hover:bg-white/[0.10]"
          >
            Batal
          </button>
          <button
            onClick={() => onSubmit({ nim, noHp, nama })}
            disabled={submitting || !valid}
            className={cls(
              "rounded-xl px-3 py-2 border font-medium",
              submitting
                ? "border-white/10 text-white/60"
                : "border-emerald-400/30 bg-emerald-400/10 text-emerald-200 hover:bg-emerald-400/15",
            )}
          >
            {submitting ? "Menyimpan…" : "Simpan"}
          </button>
        </div>
      </div>
    </div>
  );
}

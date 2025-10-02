"use client";

import { CheckCircle2, Circle, Save } from "lucide-react";
import type { Item } from "@/types/enrollment";

type Props = {
  item: Item;
  valueDraft?: number;
  onToggle: () => void;
  onChangeNilai: (v: number | "") => void;
  onSaveDraft?: () => void;      // simpan hanya item ini (muncul kalau ada draft)
};

export default function ItemRow({
  item,
  valueDraft,
  onToggle,
  onChangeNilai,
  onSaveDraft,
}: Props) {
  const deadlineLabel = item.deadlineAt ? new Date(item.deadlineAt).toLocaleString() : "—";
  const done = item.status === "SELESAI";

  const supportsScore = ["ABSEN", "DISKUSI", "TUGAS", "QUIZ"].includes(item.jenis.toUpperCase());
  const editable = supportsScore && done && item.jenis.toUpperCase() !== "ABSEN";

  const currentVal =
    valueDraft !== undefined
      ? String(valueDraft)
      : item.nilai !== null && item.nilai !== undefined
      ? String(item.nilai)
      : "";

  const showInlineSave = editable && valueDraft !== undefined && typeof onSaveDraft === "function";

  return (
    <div className="flex flex-col gap-2 rounded-xl border border-white/10 bg-white/[0.06] p-3 sm:flex-row sm:items-center sm:gap-3">
      <button
        onClick={onToggle}
        className="self-start rounded-md bg-white/10 hover:bg-white/[0.12] p-1.5"
        title={done ? "Tandai belum" : "Tandai selesai"}
      >
        {done ? <CheckCircle2 className="h-5 w-5 text-green-400" /> : <Circle className="h-5 w-5 opacity-80" />}
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <div className="font-medium">
            {item.jenis} {item.sesi ? `Sesi ${item.sesi}` : ""}
          </div>
          <div className="text-xs text-white/60">Deadline: {deadlineLabel}</div>
        </div>

        {supportsScore && (
          <div className="mt-1.5 flex items-center gap-2">
            <label className="text-xs text-white/65 mr-2">Nilai:</label>
            <input
              inputMode="numeric"
              pattern="[0-9]*"
              className={[
                "w-20 rounded-lg border px-2 py-1 text-sm outline-none",
                editable
                  ? "border-white/15 bg-white/10 focus:bg-white/[0.12]"
                  : "border-white/10 bg-white/5 text-white/50 cursor-not-allowed",
              ].join(" ")}
              placeholder={editable ? "0-100" : "—"}
              value={currentVal}
              disabled={!editable}
              onChange={(e) => {
                if (!editable) return;
                const raw = e.target.value;
                if (raw === "") return onChangeNilai("");
                const num = Number(raw.replace(/\D/g, ""));
                if (Number.isFinite(num)) onChangeNilai(Math.max(0, Math.min(100, num)));
              }}
            />
            {valueDraft !== undefined && editable && (
              <span className="text-xs text-white/55">(draft)</span>
            )}

            {showInlineSave && (
              <button
                onClick={onSaveDraft}
                className="ml-1 inline-flex items-center gap-1 rounded-lg border border-white/15 bg-white/10 hover:bg-white/[0.12] px-2 py-1 text-xs"
                title="Simpan nilai"
              >
                <Save className="h-3.5 w-3.5" />
                Simpan
              </button>
            )}

            {!editable && item.jenis.toUpperCase() === "ABSEN" && done && (
              <span className="text-xs text-white/60">otomatis 100</span>
            )}
            {!editable && item.status === "BELUM" && (
              <span className="text-xs text-white/60">selesaikan dulu</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

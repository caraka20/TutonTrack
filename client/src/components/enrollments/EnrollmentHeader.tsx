"use client";

import { ChevronLeft, RefreshCw, Save } from "lucide-react";

type Props = {
  courseName: string;
  progressPct: number;
  onBack: () => void;
  onSync: () => void;
  onSave: () => void;
  saving: boolean;
  dirtyCount: number;
};

export default function EnrollmentHeader({
  courseName,
  progressPct,
  onBack,
  onSync,
  onSave,
  saving,
  dirtyCount,
}: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-3">
        <button
          onClick={onBack}
          className="rounded-lg border border-white/15 bg-white/10 hover:bg-white/[0.12] px-2.5 py-2"
          aria-label="Kembali"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="min-w-0">
          <div className="text-xs text-white/60">Mata kuliah</div>
          <h1 className="text-xl font-semibold truncate">{courseName}</h1>
          <div className="text-xs text-white/70 mt-0.5">{progressPct}% selesai</div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onSync}
          className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 hover:bg-white/[0.12] px-3 py-2 text-sm"
        >
          <RefreshCw className="h-4 w-4" />
          Sinkron deadline
        </button>

        <button
          onClick={onSave}
          disabled={saving || dirtyCount === 0}
          className={[
            "inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm",
            saving || dirtyCount === 0
              ? "border-white/10 bg-white/5 text-white/50 cursor-not-allowed"
              : "border-white/15 bg-white/10 hover:bg-white/[0.12]",
          ].join(" ")}
          title={dirtyCount ? `Ada ${dirtyCount} perubahan` : "Tidak ada perubahan"}
        >
          <Save className="h-4 w-4" />
          {saving ? "Menyimpan…" : dirtyCount ? `Simpan (${dirtyCount})` : "Simpan"}
        </button>
      </div>
    </div>
  );
}

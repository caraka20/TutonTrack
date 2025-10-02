// src/app/(student)/enrollments/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import {
  addEnrollment,
  deleteEnrollment,
  getMyEnrollments,
  syncEnrollmentDeadlines,
  type Enrollment,
  getCourseName,
} from "@/services/enrollment.service";
import {
  getMeProgressCompact,
  buildProgressIndex,
  mergeProgressIntoEnrollments,
  computeProgressFromItems,
} from "@/services/progress.service";
import { showError, showSuccess, confirm } from "@/utils/alert";
import { BookOpen, Plus, RefreshCw, Trash2 } from "lucide-react";
import ProgressCircle from "@/components/dashboard/progress-circle";

/* util kecil */
function isObject(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null;
}
function readString(x: unknown): string | undefined {
  return typeof x === "string" && x.trim() ? x : undefined;
}

type ViewState = "loading" | "ready" | "idle";

export default function EnrollmentsPage() {
  const [state, setState] = useState<ViewState>("loading");
  const [items, setItems] = useState<Enrollment[]>([]);
  const router = useRouter();

  const load = async () => {
    setState("loading");
    try {
      const [list, compact] = await Promise.all([
        getMyEnrollments(),
        getMeProgressCompact(),
      ]);

      const idx = buildProgressIndex(compact);
      let merged = mergeProgressIntoEnrollments(list, idx);

      // fallback hitung dari items untuk yang masih 0/undefined
      const needFallback = merged.filter(
        (e) => !(typeof e.progress === "number" && e.progress > 0)
      );
      if (needFallback.length) {
        const results = await Promise.all(
          needFallback.map(async (e) => ({
            id: e.id,
            pct: await computeProgressFromItems(e.id),
          }))
        );
        const map: Record<number, number> = {};
        for (const r of results) map[r.id] = r.pct;
        merged = merged.map((e) =>
          typeof e.progress === "number" && e.progress > 0
            ? e
            : { ...e, progress: map[e.id] ?? 0 }
        );
      }

      setItems(merged);
      setState("ready");
    } catch (e) {
      setState("idle");
      await showError(e, "Gagal memuat enrollment.");
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const empty = useMemo(
    () => state === "ready" && items.length === 0,
    [state, items]
  );

  const onAdd = async () => {
    const { value } = await Swal.fire({
      title: "Tambah Matkul",
      input: "text",
      inputPlaceholder: "Contoh: Matematika Ekonomi EKMA4456",
      showCancelButton: true,
      confirmButtonText: "Tambah",
      cancelButtonText: "Batal",
      inputValidator: (v) => (!v || !v.trim() ? "Nama/ID matkul wajib diisi" : undefined),
    });
    if (!value) return;

    const v = String(value).trim();
    const asId = Number(v);

    try {
      if (Number.isFinite(asId) && /^\d+$/.test(v)) {
        await addEnrollment({ courseId: asId });
      } else {
        await addEnrollment({ courseName: v });
      }
      await showSuccess("Matkul ditambahkan.");
      await load();
    } catch (e) {
      await showError(e, "Gagal menambahkan matkul.");
    }
  };

  const onDelete = async (id: number, nama: string) => {
    const ok = await confirm(`Hapus enrollment “${nama}”? (Item yang sudah selesai tidak boleh ada)`);
    if (!ok) return;

    try {
      await deleteEnrollment(id);
      setItems((prev) => prev.filter((x) => x.id !== id));
      await showSuccess("Enrollment dihapus.");
    } catch (e) {
      await showError(e, "Tidak bisa menghapus enrollment ini.");
    }
  };

  const onSync = async (id: number, nama: string) => {
    try {
      const affected = await syncEnrollmentDeadlines(id);
      await showSuccess("Sinkronisasi deadline berhasil", `${affected} item terisi deadline untuk ${nama}.`);
      await load();
    } catch (e) {
      await showError(e, "Gagal sinkronisasi deadline.");
    }
  };

  const goDetail = (id: number) => router.push(`/enrollments/${id}`);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 opacity-85" />
          <h1 className="text-xl font-semibold">Enrollments</h1>
        </div>

        {/* Tombol dengan gradient & glow */}
        <button
          onClick={onAdd}
          className={[
            "relative inline-flex items-center gap-2 rounded-xl px-4 py-2 font-semibold transition",
            "text-white",
            "bg-gradient-to-r from-amber-400 via-orange-400 to-sky-500",
            "shadow-[0_10px_28px_rgba(251,191,36,0.35)] hover:shadow-[0_14px_36px_rgba(56,189,248,0.35)]",
            "hover:saturate-125 hover:brightness-110 active:brightness-95",
            "focus:outline-none focus:ring-2 focus:ring-amber-300/60",
            "border border-white/10"
          ].join(" ")}
        >
          <Plus className="h-4 w-4" />
          Tambah
        </button>
      </div>

      {/* Loading */}
      {state === "loading" && (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-32 sm:h-36 rounded-2xl border border-white/10 bg-white/5 backdrop-blur animate-pulse"
            />
          ))}
        </div>
      )}

      {/* Kosong */}
      {empty && (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/80 backdrop-blur">
          Belum ada mata kuliah. Tambahkan dulu ya.
        </div>
      )}

      {/* List */}
      {state === "ready" && items.length > 0 && (
        <div className="space-y-4">
          {items.map((en) => {
            // Nama matkul dari course/name, jika tidak ada pakai root courseName
            let nama = getCourseName(en.course);
            if (nama === "Mata kuliah") {
              const rootName =
                (isObject(en) && readString((en as Record<string, unknown>)["courseName"])) || undefined;
              if (rootName) nama = rootName;
            }

            const rawPct = typeof en.progress === "number" ? en.progress : 0;
            const pct = Math.max(0, Math.min(100, rawPct));
            const due = Number(en.itemsDueSoon ?? 0);

            return (
              <article
                key={en.id}
                role="button"
                tabIndex={0}
                onClick={() => goDetail(en.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    goDetail(en.id);
                  }
                }}
                className="group flex items-start gap-4 sm:gap-5 rounded-2xl border border-white/12 bg-white/[0.05] p-4 sm:p-5 md:p-6 backdrop-blur transition hover:border-white/20 hover:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-white/20"
              >
                {/* Progress kiri - kecil di mobile, besar di desktop */}
                <div className="shrink-0">
                  <div className="md:hidden">
                    <ProgressCircle value={pct} size={56} />
                  </div>
                  <div className="hidden md:block">
                    <ProgressCircle value={pct} size={72} />
                  </div>
                </div>

                {/* Konten */}
                <div className="min-w-0 flex-1">
                  {/* Nama matkul juga link */}
                  <Link
                    href={`/enrollments/${en.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-[1.05rem] sm:text-lg font-semibold leading-tight hover:underline"
                  >
                    {nama}
                  </Link>

                  <div className="mt-1.5 flex flex-wrap items-center gap-2 text-sm">
                    <span className="rounded-md border border-white/15 bg-white/10 px-2 py-0.5">
                      {Math.round(pct)}% selesai
                    </span>
                    <span className="text-white/70">
                      {due > 0 ? `${due} due soon` : "Tidak ada yang mendesak"}
                    </span>
                  </div>

                  {/* link kecil tetap ada, tapi card sudah clickable */}
                  <Link
                    href={`/enrollments/${en.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="mt-3 inline-flex items-center gap-1 text-sm text-white/90 hover:underline"
                  >
                    Kelola nilai &amp; deadline →
                  </Link>
                </div>

                {/* Aksi kanan (jangan bubble ke card) */}
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    title="Sinkronisasi deadline"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSync(en.id, nama);
                    }}
                    className="rounded-lg border border-white/15 bg-white/10 p-2 hover:bg-white/[0.14]"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </button>
                  <button
                    title="Hapus mata kuliah"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(en.id, nama);
                    }}
                    className="rounded-lg border border-white/15 bg-white/10 p-2 hover:bg-white/[0.14]"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { ChevronDown, CheckCircle2, XCircle, Minus } from "lucide-react";
import { getDashboardProgress, type CourseCard } from "@/services/progress-dashboard.service";
import { getEnrollmentItems } from "@/services/enrollment.service";
import ProgressCircle from "./progress-circle";
import { Card, CardContent } from "@/components/ui/card";

/* Utils */
function isObject(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null;
}
function toNum(x: unknown, fb = 0): number {
  return typeof x === "number" && Number.isFinite(x) ? x : fb;
}
function toStr(x: unknown, fb = ""): string {
  return typeof x === "string" ? x : fb;
}

/* Types */
type ItemRow = {
  id: number;
  jenis: string;          // ABSEN | DISKUSI | TUGAS | QUIZ | ...
  status: string;         // BELUM | SELESAI
  nilai?: number | null;
  sesi?: number | null;
  deadlineAt?: string | null;
};
type LoadState = "idle" | "loading" | "ready" | "error";

/* Grouping per sesi */
type Kind = "DISKUSI" | "TUGAS" | "ABSEN";
const KINDS: Kind[] = ["DISKUSI", "TUGAS", "ABSEN"];

function groupBySesi(rows: ItemRow[]) {
  const map = new Map<number, Partial<Record<Kind, ItemRow>>>();
  for (const r of rows) {
    const sesi = toNum(r.sesi, 0);
    const jenis = toStr(r.jenis, "ITEM").toUpperCase() as Kind;
    if (!KINDS.includes(jenis)) continue;

    const slot = map.get(sesi) ?? {};
    const existing = slot[jenis];
    if (!existing || toStr(r.status, "").toUpperCase() === "SELESAI") {
      slot[jenis] = r;
    }
    map.set(sesi, slot);
  }

  const sesiList = Array.from(map.keys()).sort((a, b) => a - b);
  return sesiList.map((s) => ({ sesi: s, byKind: map.get(s)! }));
}

/* Grade badge */
function GradeBadge({ nilai }: { nilai: number | null }) {
  if (nilai == null) return <span className="text-white/60">—</span>;
  const cls =
    nilai >= 80
      ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
      : nilai >= 70
      ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
      : "bg-rose-500/15 text-rose-300 border-rose-500/30";
  return (
    <span className={`ml-2 inline-flex items-center rounded-md border px-1.5 py-0.5 text-xs ${cls}`}>
      {Math.round(nilai)}
    </span>
  );
}

/* Status cell: aturan khusus
   - DISKUSI/ABSEN/TUGAS:
     - jika tidak ada item → tampilkan "-" (ikon minus)
     - jika ada item:
       - done → hijau check (kalau ada nilai, tampilkan badge)
       - belum done → X merah
   - ABSEN: jika done & tidak ada nilai, tampilkan badge 100.
   - TUGAS: hanya sesi 3/5/7 yang valid; selain itu → "-"
*/
function StatusCell({ item, jenis, sesi }: { item?: ItemRow; jenis: Kind; sesi: number }) {
  // Rule untuk TUGAS: hanya 3/5/7 valid
  if (jenis === "TUGAS" && ![3, 5, 7].includes(sesi)) {
    return (
      <div className="flex items-center justify-center text-white/50">
        <Minus className="h-4 w-4" />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="flex items-center justify-center text-white/50">
        <Minus className="h-4 w-4" />
      </div>
    );
  }

  const done = toStr(item.status, "").toUpperCase() === "SELESAI";
  const nilai =
    typeof item.nilai === "number" && Number.isFinite(item.nilai) ? item.nilai : null;

  // ABSEN: done tanpa nilai → tampilkan 100 hijau
  const absenAuto = jenis === "ABSEN" && done && nilai == null ? 100 : null;

  return (
    <div className="flex items-center justify-center gap-2">
      {done ? (
        // Kalau sudah dinilai, jangan tampilkan checklist (sesuai request)
        nilai != null || absenAuto != null ? null : (
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
        )
      ) : (
        <XCircle className="h-4 w-4 text-rose-400" />
      )}

      {nilai != null && <GradeBadge nilai={nilai} />}
      {absenAuto != null && <GradeBadge nilai={absenAuto} />}
    </div>
  );
}

/* Tabel detail per sesi */
function DetailTable({ rows }: { rows: ItemRow[] }) {
  const grouped = groupBySesi(rows);

  return (
    <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.04] overflow-hidden">
      <div className="grid grid-cols-[72px_1fr_1fr_1fr] text-xs uppercase tracking-wide text-white/60 border-b border-white/10">
        <div className="px-3 py-2">Sesi</div>
        <div className="px-3 py-2 text-center">Diskusi</div>
        <div className="px-3 py-2 text-center">Tugas</div>
        <div className="px-3 py-2 text-center">Absen</div>
      </div>

      {grouped.map(({ sesi, byKind }) => (
        <div key={sesi} className="grid grid-cols-[72px_1fr_1fr_1fr] border-b border-white/5 last:border-b-0">
          <div className="px-3 py-2 text-sm">{sesi}</div>
          <div className="px-3 py-2"><StatusCell jenis="DISKUSI" sesi={sesi} item={byKind["DISKUSI"]} /></div>
          <div className="px-3 py-2"><StatusCell jenis="TUGAS" sesi={sesi} item={byKind["TUGAS"]} /></div>
          <div className="px-3 py-2"><StatusCell jenis="ABSEN" sesi={sesi} item={byKind["ABSEN"]} /></div>
        </div>
      ))}

      {grouped.length === 0 && (
        <div className="px-3 py-3 text-sm text-white/70">Belum ada item.</div>
      )}
    </div>
  );
}

/* Skeleton */
function TableSkeleton() {
  return (
    <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.04] p-3">
      <div className="h-6 w-40 rounded bg-white/10 mb-3 animate-pulse" />
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-9 rounded bg-white/5 animate-pulse" />
        ))}
      </div>
    </div>
  );
}

/* Kartu + dropdown */
function CourseCardAccordion({ c }: { c: CourseCard }) {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<LoadState>("idle");
  const [rows, setRows] = useState<ItemRow[]>([]);

  const pct = Math.max(0, Math.min(100, Math.round(c.progressPct)));
  const smallMobile = typeof window !== "undefined" && window.innerWidth < 420;
  const circleSize = smallMobile ? 50 : 56;

  const fetchDetail = async () => {
    setState("loading");
    try {
      const res = (await getEnrollmentItems(c.enrollmentId)) as unknown[];
      const parsed: ItemRow[] = Array.isArray(res)
        ? res.filter(isObject).map((x) => ({
            id: toNum(x["id"]),
            jenis: toStr(x["jenis"], "ITEM"),
            status: toStr(x["status"], "BELUM"),
            nilai:
              typeof x["nilai"] === "number" && Number.isFinite(x["nilai"])
                ? (x["nilai"] as number)
                : null,
            sesi:
              typeof x["sesi"] === "number" && Number.isFinite(x["sesi"])
                ? (x["sesi"] as number)
                : null,
            deadlineAt: toStr(x["deadlineAt"], ""),
          }))
        : [];
      setRows(parsed);
      setState("ready");
    } catch {
      setState("error");
    }
  };

  const toggle = async () => {
    const next = !open;
    setOpen(next);
    if (next && state === "idle") {
      await fetchDetail();
    }
  };

  const onCardKey = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      void toggle();
    }
  };

  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={toggle}
      onKeyDown={onCardKey}
      className="group border-white/10 bg-white/[0.05] hover:bg-white/[0.08] hover:border-white/20 transition focus:outline-none focus:ring-2 focus:ring-white/20"
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="shrink-0">
            <ProgressCircle value={pct} size={circleSize} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <Link
                  href={`/enrollments/${c.enrollmentId}`}
                  onClick={(e) => e.stopPropagation()}
                  className="font-semibold leading-tight hover:underline block truncate"
                >
                  {c.courseName}
                </Link>
                <div className="mt-1 text-sm text-white/70">
                  {pct}% selesai • {c.overdue} overdue
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/enrollments/${c.enrollmentId}`}
                  onClick={(e) => e.stopPropagation()}
                  className="rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-sm hover:bg-white/[0.14]"
                >
                  Kelola
                </Link>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    void toggle();
                  }}
                  className={[
                    "rounded-lg border border-white/15 bg-white/10 p-2 hover:bg-white/[0.14] transition",
                    open ? "rotate-180" : "",
                  ].join(" ")}
                  aria-label={open ? "Tutup detail" : "Buka detail"}
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {open && (
          <>
            {state === "loading" && <TableSkeleton />}
            {state === "error" && (
              <div className="mt-3 rounded-xl border border-rose-400/20 bg-rose-400/10 p-3 text-sm">
                Gagal memuat detail. Coba buka lagi.
              </div>
            )}
            {state === "ready" && <DetailTable rows={rows} />}
          </>
        )}
      </CardContent>
    </Card>
  );
}

/* Grid utama — 1 kolom di semua layar */
export default function CoursesGrid() {
  const [courses, setCourses] = useState<CourseCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { courses } = await getDashboardProgress(3);
        setCourses(courses);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4 h-28 animate-pulse bg-white/5 rounded-xl" />
          </Card>
        ))}
      </div>
    );
  }

  if (!courses.length) {
    return (
      <Card>
        <CardContent className="p-4 text-sm text-white/70">
          Belum ada progress mata kuliah.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {courses.map((c) => (
        <CourseCardAccordion key={c.enrollmentId} c={c} />
      ))}
    </div>
  );
}

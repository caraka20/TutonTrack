"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getMeDueSoon, type DueSoonRow } from "@/services/progress.service";
import { showError } from "@/utils/alert";

type ViewState = "loading" | "ready" | "idle";

export default function ItemsPage() {
  const [state, setState] = useState<ViewState>("loading");
  const [rows, setRows] = useState<DueSoonRow[]>([]);

  useEffect(() => {
    (async () => {
      setState("loading");
      try {
        // ambil due soon 7 hari ke depan (bisa kamu ubah)
        const data = await getMeDueSoon(7);
        setRows(data);
        setState("ready");
      } catch (e) {
        setState("idle");
        await showError(e, "Gagal memuat daftar due soon.");
      }
    })();
  }, []);

  const grouped = useMemo(() => {
    const g: Record<string, DueSoonRow[]> = {};
    for (const r of rows) {
      const key = r.courseName || "Mata kuliah";
      if (!g[key]) g[key] = [];
      g[key].push(r);
    }
    for (const k of Object.keys(g)) {
      g[k].sort((a, b) => (a.daysLeft ?? 9999) - (b.daysLeft ?? 9999));
    }
    return g;
  }, [rows]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Due soon</h1>
        <div className="text-sm text-white/70">
          {rows.length} item akan jatuh tempo
        </div>
      </div>

      {state === "loading" && (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-12 rounded-lg border border-white/10 bg-white/5 animate-pulse"
            />
          ))}
        </div>
      )}

      {state === "idle" && (
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white/80">
          Tidak dapat memuat data.
        </div>
      )}

      {state === "ready" && rows.length === 0 && (
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white/80">
          Tidak ada item yang mendekati deadline.
        </div>
      )}

      {state === "ready" && rows.length > 0 && (
        <div className="space-y-6">
          {Object.entries(grouped).map(([course, list]) => (
            <section
              key={course}
              className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 sm:p-6"
            >
              <div className="mb-3 flex items-baseline justify-between">
                <h2 className="font-semibold">{course}</h2>
                <Link
                  href={`/enrollments/${list[0]?.enrollmentId ?? ""}`}
                  className="text-sm text-white/80 underline-offset-4 hover:underline"
                >
                  Kelola →
                </Link>
              </div>

              <div className="space-y-2">
                {list.map((r, i) => (
                  <div
                    key={`${r.enrollmentId}-${r.jenis}-${r.sesi}-${i}`}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2"
                  >
                    <div className="min-w-0">
                      <div className="font-medium">
                        {r.jenis} {r.sesi ? `Sesi ${r.sesi}` : ""}
                      </div>
                      <div className="text-xs text-white/70">
                        Deadline: {r.deadlineAt ? new Date(r.deadlineAt).toLocaleString() : "—"}
                      </div>
                    </div>
                    <div className="text-sm rounded-md border border-white/15 bg-white/10 px-2 py-0.5">
                      {r.daysLeft != null ? `${r.daysLeft} hari lagi` : "jadwal belum ada"}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

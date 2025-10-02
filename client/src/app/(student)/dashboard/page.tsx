"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getMe } from "@/services/student.service";
import type { Student } from "@/services/student.service";
import { Card, CardContent } from "@/components/ui/card";

const CoursesGrid = dynamic(() => import("@/components/dashboard/course-grid"), { ssr: false });
const DueSoonList = dynamic(() => import("@/components/dashboard/due-soon-list"), { ssr: false });

function initials(name?: string, fallback = "ST"): string {
  if (!name) return fallback;
  const parts = name.trim().split(/\s+/).slice(0, 2);
  const s = parts.map((p) => p[0]?.toUpperCase() ?? "").join("");
  return s || fallback;
}

export default function StudentDashboardPage() {
  const [me, setMe] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const profile = await getMe();
        setMe(profile);
      } catch (e) {
        setErr(e instanceof Error ? e.message : "Failed");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading)
    return (
      <div className="p-4 space-y-4">
        <Card>
          <CardContent className="p-4">
            <div className="h-24 rounded-xl bg-white/10 animate-pulse" />
          </CardContent>
        </Card>
      </div>
    );

  if (err) return <div className="p-4 text-red-500">Error: {err}</div>;
  if (!me) return <div className="p-4">No data</div>;

  return (
    <div className="p-4 space-y-4">
      {/* ===== Profil Student (gantikan summary progress) ===== */}
      <Card>
        <CardContent className="flex items-center gap-4 p-4">
          {/* avatar inisial */}
          <div
            className="flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-semibold text-white
                       bg-gradient-to-br from-indigo-500/80 to-fuchsia-500/80 border border-white/15 shadow"
            aria-hidden
          >
            {initials(me.nama ?? me.nim)}
          </div>

          <div className="min-w-0">
            <div className="text-sm text-white/70">Profil Mahasiswa</div>
            <div className="text-xl font-semibold truncate">{me.nama || "Student"}</div>
            <div className="mt-1 flex flex-wrap gap-2 text-sm">
              <span className="rounded-md border border-white/15 bg-white/10 px-2 py-0.5">
                NIM: <span className="font-medium">{me.nim}</span>
              </span>
              <span className="rounded-md border border-white/15 bg-white/10 px-2 py-0.5">
                No. HP: <span className="font-medium">{me.noHp}</span>
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grid kursus dengan dropdown detail per sesi */}
      <CoursesGrid />

      {/* Due soon list */}
      <DueSoonList />
    </div>
  );
}

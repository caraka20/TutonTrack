// src/app/(student)/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getMeProgress, type MeProgress } from "@/services/student";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProgressCircle from "@/components/dashboard/progress-circle";

const CoursesGrid = dynamic(() => import("@/components/dashboard/course-grid"), { ssr: false });
const DueSoonList = dynamic(() => import("@/components/dashboard/due-soon-list"), { ssr: false });

export default function StudentDashboardPage() {
  const [summary, setSummary] = useState<MeProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await getMeProgress();
        setSummary(res);
      } catch (e) {
        setErr(e instanceof Error ? e.message : "Failed");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="p-4">Loading…</div>;
  if (err) return <div className="p-4 text-red-600">Error: {err}</div>;
  if (!summary) return <div className="p-4">No data</div>;

  const pct = Math.round(summary.progress * 100);

  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardContent className="flex items-center gap-4 p-4">
          <ProgressCircle value={pct} size={72} />
          <div>
            <div className="text-sm text-muted-foreground">Halo,</div>
            <div className="text-xl font-semibold">{summary.name ?? "Student"}</div>
            <div className="text-sm text-muted-foreground">
              {summary.completedItems}/{summary.totalItems} selesai
            </div>
          </div>
        </CardContent>
      </Card>

      <CoursesGrid />
      <DueSoonList />
    </div>
  );
}

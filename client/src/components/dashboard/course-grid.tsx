// src/components/dashboard/course-grid.tsx
"use client";

import { useEffect, useState } from "react";
import { getCoursesProgress, type CourseProgress } from "@/services/student";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function CoursesGrid() {
  const [data, setData] = useState<CourseProgress[] | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const rows = await getCoursesProgress();
        setData(rows);
      } catch {
        setData([]);
      }
    })();
  }, []);

  if (data === null) {
    return (
      <div className="grid grid-cols-1 gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}><CardContent className="p-4">Loading…</CardContent></Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3">
      {data.map((c) => (
        <Card key={c.courseId}>
          <CardHeader className="pb-2"><CardTitle className="text-base">{c.courseName}</CardTitle></CardHeader>
          <CardContent className="pt-0 text-sm text-muted-foreground">
            {c.completedItems}/{c.totalItems} selesai &middot; {(c.progress * 100).toFixed(0)}%
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

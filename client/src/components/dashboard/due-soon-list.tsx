// src/components/dashboard/due-soon-list.tsx
"use client";

import { useEffect, useState } from "react";
import { getDueSoon, type DueItem } from "@/services/student";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function DueSoonList() {
  const [items, setItems] = useState<DueItem[] | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const rows = await getDueSoon();
        setItems(rows.slice(0, 6));
      } catch {
        setItems([]);
      }
    })();
  }, []);

  return (
    <Card className="border-none shadow-none bg-transparent p-0">
      <CardHeader className="px-0 pt-0 pb-2"><CardTitle>Due soon</CardTitle></CardHeader>
      <CardContent className="px-0 pt-0">
        <ul className="space-y-2">
          {(items ?? []).map((it) => (
            <li key={it.id} className="text-sm">
              <span className="font-medium">{it.courseName}</span> • {it.jenis} Sesi {it.sesi} —{" "}
              {it.deadlineAt ? new Date(it.deadlineAt).toLocaleString() : "—"}
            </li>
          ))}
          {items && items.length === 0 && <li className="text-sm text-muted-foreground">Tidak ada yang dekat jatuh tempo.</li>}
        </ul>
      </CardContent>
    </Card>
  );
}

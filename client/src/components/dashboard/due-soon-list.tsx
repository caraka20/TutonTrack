"use client";

import { useEffect, useState } from "react";
import { getDashboardProgress, type DueSoonItem } from "@/services/progress-dashboard.service";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

/** Daftar item yang segera due lintas matkul */
export default function DueSoonList() {
  const [items, setItems] = useState<DueSoonItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { dueSoonFlat } = await getDashboardProgress(3);
        setItems(dueSoonFlat);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Card>
      <CardContent className="p-4">
        <div className="font-semibold mb-3">Segera jatuh tempo</div>

        {loading && (
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-10 rounded-lg bg-white/10 animate-pulse" />
            ))}
          </div>
        )}

        {!loading && items.length === 0 && (
          <div className="text-sm text-white/70">Tidak ada yang mendesak ✨</div>
        )}

        {!loading && items.length > 0 && (
          <ul className="space-y-2">
            {items.map((it) => (
              <li
                key={`${it.enrollmentId}-${it.itemId}`}
                className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2"
              >
                <div className="text-sm">
                  <span className="font-medium">{it.courseName}</span>{" "}
                  · <span className="uppercase">{it.jenis}</span> S{it.sesi}
                </div>
                <div className="text-xs text-white/70">
                  {it.daysLeft === 0
                    ? "Jatuh tempo hari ini"
                    : it.daysLeft === 1
                    ? "Jatuh tempo besok"
                    : `Dalam ${it.daysLeft} hari`}
                  {it.deadlineAt ? ` • ${new Date(it.deadlineAt).toLocaleString()}` : ""}
                </div>
                <Link
                  href={`/enrollments/${it.enrollmentId}`}
                  className="text-xs underline mt-1 inline-block opacity-90 hover:opacity-100"
                >
                  Buka detail →
                </Link>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

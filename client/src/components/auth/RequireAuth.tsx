// client/src/components/auth/RequireAuth.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { hasToken } from "@/lib/auth";
import { getMe } from "@/services/student.service";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const r = useRouter();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!hasToken()) {
        r.replace("/login");
        return;
      }
      try {
        await getMe(); // sanity check token valid
        if (mounted) setOk(true);
      } catch {
        r.replace("/login");
      }
    })();
    return () => { mounted = false; };
  }, [r]);

  if (!ok) return <div className="p-6 text-sm text-muted-foreground">Memeriksa sesi…</div>;
  return <>{children}</>;
}

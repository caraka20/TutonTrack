// client/src/app/(auth)/layout.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { hasToken } from "@/lib/auth";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const r = useRouter();

  useEffect(() => {
    if (hasToken()) r.replace("/dashboard");
  }, [r]);

  // Center presisi di semua viewport
  return (
    <div className="min-h-dvh grid place-items-center">
      {children}
    </div>
  );
}

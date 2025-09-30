"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getToken } from "@/lib/auth";
import { StudentShell } from "@/components/layout/student-shell";

// ...komponen sidebar kamu

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const r = useRouter();
  const path = usePathname();

  useEffect(() => {
    if (!getToken()) r.replace(`/login?next=${encodeURIComponent(path)}`);
  }, [r, path]);

  return (
    <StudentShell> {children} </StudentShell>
  );
}

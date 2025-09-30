"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const r = useRouter();
  useEffect(() => {
    const t = localStorage.getItem("tt:student_token");
    r.replace(t ? "/dashboard" : "/register");
  }, [r]);
  return null;
}

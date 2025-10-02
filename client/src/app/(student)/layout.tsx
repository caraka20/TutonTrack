import type { Metadata } from "next";
import StudentShell from "@/components/layout/student-shell";

export const metadata: Metadata = {
  title: "TutonTrack • Student",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <StudentShell>{children}</StudentShell>;
}

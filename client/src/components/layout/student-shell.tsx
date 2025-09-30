"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useMemo } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  BookOpenCheck,
  AlarmClock,
  LibraryBig,
  UserRound,
  Menu,
} from "lucide-react";

type NavItem = { label: string; href: string; icon: React.ElementType };

const NAV: NavItem[] = [
  { label: "Dashboard",   href: "/dashboard",   icon: LayoutDashboard },
  { label: "Enrollments", href: "/enrollments", icon: BookOpenCheck },
  { label: "Due Soon",    href: "/items/due",   icon: AlarmClock },
  { label: "Courses",     href: "/courses",     icon: LibraryBig },
  { label: "Profile",     href: "/profile",     icon: UserRound },
];

export function StudentShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const active = useMemo(() => (href: string) => pathname?.startsWith(href), [pathname]);

  const NavLinks = ({ onClick }: { onClick?: () => void }) => (
    <nav className="space-y-1">
      {NAV.map(({ href, label, icon: Icon }) => {
        const isActive = active(href);
        return (
          <Link
            key={href}
            href={href}
            onClick={onClick}
            className={[
              "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition",
              isActive
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            ].join(" ")}
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-dvh bg-background">
      {/* Topbar (mobile) */}
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:hidden">
        <div className="mx-auto flex h-14 max-w-screen-md items-center justify-between px-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <div className="flex h-full flex-col">
                <div className="border-b p-4 text-lg font-semibold">TutonTrack</div>
                <div className="flex-1 overflow-y-auto p-3">
                  <NavLinks />
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <div className="text-sm font-semibold">TutonTrack</div>
          <div className="w-9" /> {/* spacer */}
        </div>
      </header>

      {/* Desktop layout */}
      <div className="mx-auto grid max-w-screen-xl gap-0 lg:grid-cols-[260px_1fr]">
        <aside className="hidden min-h-dvh border-r lg:block">
          <div className="sticky top-0 flex h-dvh flex-col">
            <div className="border-b p-4 text-lg font-semibold">TutonTrack</div>
            <div className="flex-1 overflow-y-auto p-4">
              <NavLinks />
            </div>
            <div className="border-t p-4 text-xs text-muted-foreground">
              © {new Date().getFullYear()} TutonTrack
            </div>
          </div>
        </aside>

        <main className="min-h-dvh p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

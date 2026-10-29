"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MobileBottomBar } from "./MobileBottomBar";
import type { ReactNode } from "react";

/**
 * Wraps the public website chrome (header, footer, mobile bar).
 * Renders nothing when the current route starts with /admin,
 * so the admin dashboard gets a clean, isolated viewport.
 */
export function PublicShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <main
        id="main-content"
        className="flex-1 overflow-x-clip pb-[calc(68px+env(safe-area-inset-bottom))] md:pb-0"
      >
        {children}
      </main>
      <Footer />
      <MobileBottomBar />
    </>
  );
}

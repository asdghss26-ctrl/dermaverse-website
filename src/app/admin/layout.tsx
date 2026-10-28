import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Admin Dashboard | Dermverse",
  description: "Dermverse doctor administration dashboard",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

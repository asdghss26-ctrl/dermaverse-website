import type { Metadata } from "next";
import { Bodoni_Moda, Jost } from "next/font/google";
import { PublicShell } from "@/components/layout/PublicShell";
import { clinic, SITE_URL } from "@/data/clinic";
import "./globals.css";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-bodoni",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${clinic.fullName} | Adyar, Chennai`,
    template: `%s | ${clinic.fullName}`,
  },
  description: clinic.doctor.approach,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: clinic.fullName,
    description: clinic.doctor.approach,
    siteName: clinic.fullName,
    locale: "en_IN",
    type: "website",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: clinic.fullName }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${bodoni.variable} ${jost.variable}`}>
      <body suppressHydrationWarning className="min-h-screen flex flex-col antialiased">
        <PublicShell>{children}</PublicShell>
      </body>
    </html>
  );
}

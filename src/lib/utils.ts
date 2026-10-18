/** utils.ts — Shared helpers */

/** Merge class names, filtering out falsy values */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

/** Check if we're in development mode */
export function isDev(): boolean {
  return process.env.NODE_ENV === "development";
}

/** Format phone number for WhatsApp pre-filled message */
export function buildWhatsAppUrl(
  phone: string,
  message: string
): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone.replace(/\D/g, "")}?text=${encoded}`;
}

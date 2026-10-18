/** navigation.ts — All navigation links in one place. */

export interface NavLink {
  label: string;
  href: string;
}

export const mainNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const ctaNav: NavLink[] = [
  { label: "Book Consultation", href: "/book" },
];

import Link from "next/link";
import { mainNav } from "@/data/navigation";
import { clinic } from "@/data/clinic";
import { Phone, MessageCircle, MapPin } from "lucide-react";

// Kept static so the footer can be prerendered; update annually.
const COPYRIGHT_YEAR = "2026";

export function Footer() {
  const year = COPYRIGHT_YEAR;

  return (
    <footer role="contentinfo">
      {/* Mobile footer */}
      <div className="md:hidden">
        <div className="bg-taupe-soft text-brown">
          <div className="site-container py-12">
            <h2 className="display-md max-w-xs text-brown">
              Begin your
              <br />
              <em className="font-normal italic">skin journey.</em>
            </h2>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-brown/80">
              A consultation with {clinic.doctor.shortName} is the first step
              towards healthy, natural-looking skin.
            </p>
            <Link
              href="/appointment"
              className="mt-6 flex min-h-12 w-full items-center justify-center rounded-full bg-forest px-6 text-[11px] font-medium uppercase tracking-[0.14em] text-cream transition-colors hover:bg-deep-green"
            >
              Book Consultation
            </Link>
          </div>
        </div>

        <div className="bg-olive text-taupe">
          <div className="site-container py-12">
            <p className="eyebrow text-taupe/80">Dr. Jansi’s</p>
            <p className="mt-1 font-heading text-3xl uppercase leading-none tracking-[0.12em] text-taupe">
              DERMVERSE
            </p>
            <p className="mt-3 text-sm leading-relaxed text-taupe/80">
              {clinic.tagline}.
            </p>

            <nav className="mt-7" aria-label="Footer navigation">
              <ul className="grid grid-cols-2 gap-x-6">
                {mainNav.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex min-h-11 items-center text-sm text-taupe/85"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-6 space-y-1 border-t border-taupe/20 pt-4 text-sm text-taupe/85">
              <div className="flex min-h-11 items-start gap-3 py-1">
                <MapPin
                  className="mt-1 h-4 w-4 shrink-0 text-sand"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <p className="leading-relaxed">{clinic.address.full}</p>
              </div>
              <a
                href={clinic.phone.href}
                className="flex min-h-11 items-center gap-3"
              >
                <Phone
                  className="h-4 w-4 shrink-0 text-sand"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                {clinic.phone.display}
              </a>
              <a
                href={clinic.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center gap-3"
              >
                <MessageCircle
                  className="h-4 w-4 shrink-0 text-sand"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                WhatsApp us
              </a>
              {(clinic as any).email && (
                <a
                  href={`mailto:${(clinic as any).email}`}
                  className="flex min-h-11 items-center gap-3"
                >
                  <span className="h-4 w-4 shrink-0 text-sand" aria-hidden="true">@</span>
                  {(clinic as any).email}
                </a>
              )}
            </div>

            <div className="mt-6 border-t border-taupe/20 pt-4 text-[12px] uppercase leading-relaxed tracking-[0.08em] text-taupe">
              <p>
                © {year} {clinic.fullName}. All rights reserved.
              </p>
              <p className="mt-1">Adyar · Chennai</p>
            </div>
          </div>

          <div
            className="md:hidden"
            style={{ height: "calc(48px + env(safe-area-inset-bottom))" }}
          />
        </div>
      </div>

      {/* Desktop footer */}
      <div className="hidden md:block">
        <div className="border-b border-sand/60 bg-taupe-soft text-brown">
          <div className="site-container grid items-end gap-8 py-12 md:py-[clamp(56px,8vh,96px)] md:grid-cols-2">
            <h2 className="display-lg max-w-lg text-brown max-w-[18ch]">
              Begin your
              <br />
              <em className="font-normal italic">skin journey.</em>
            </h2>

            <div className="md:justify-self-end md:text-right">
              <p className="mb-6 max-w-sm text-sm leading-relaxed text-brown/80 md:ml-auto">
                A consultation with {clinic.doctor.shortName} is the first step
                towards healthy, natural-looking skin.
              </p>
<Link
                href="/appointment"
                className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-forest px-8 text-[11px] font-medium uppercase tracking-[0.14em] text-cream transition-colors duration-300 hover:bg-deep-green md:w-auto"
              >
                Book Consultation
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-olive text-taupe">
          <div className="site-container py-12 md:py-12">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-5">
                <p className="eyebrow text-taupe/70">Dr. Jansi’s</p>
                <h2 className="mt-2 font-heading text-4xl uppercase leading-none tracking-[0.12em] text-taupe md:text-5xl">
                  DERMVERSE
                </h2>
                <p className="mt-5 max-w-sm text-sm leading-relaxed text-taupe/80">
                  {clinic.tagline}
                </p>
              </div>

              <div className="md:col-span-2">
                <h3 className="eyebrow mb-5 text-taupe">Explore</h3>
                <nav aria-label="Footer navigation">
                  <ul>
                    {mainNav.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="flex min-h-[44px] items-center text-sm text-taupe/80 transition-colors duration-200 hover:text-cream"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              <div className="md:col-span-5">
                <h3 className="eyebrow mb-5 text-taupe">Visit</h3>
                <div className="space-y-4 text-sm text-taupe/80">
                  <div className="flex items-start gap-3">
                    <MapPin
                      className="mt-0.5 h-4 w-4 shrink-0 text-sand"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <div>
                      <p>{clinic.address.full}</p>
                      <p className="mt-1 text-taupe/70">{clinic.address.parking}</p>
                    </div>
                  </div>
                  <a
                    href={clinic.phone.href}
                    className="flex min-h-[44px] items-center gap-3 transition-colors duration-200 hover:text-cream"
                  >
                    <Phone
                      className="h-4 w-4 text-sand"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    {clinic.phone.display}
                  </a>
                  <a
                    href={clinic.whatsapp.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[44px] items-center gap-3 transition-colors duration-200 hover:text-cream"
                  >
                    <MessageCircle
                      className="h-4 w-4 text-sand"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    WhatsApp us
                  </a>
                  {(clinic as any).email && (
                    <a
                      href={`mailto:${(clinic as any).email}`}
                      className="flex min-h-[44px] items-center gap-3 transition-colors duration-200 hover:text-cream"
                    >
                      <span className="h-4 w-4 text-sand" aria-hidden="true">@</span>
                      {(clinic as any).email}
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-taupe/20 pt-6 text-xs text-taupe/80 md:flex-row md:items-center">
              <p>
                © {year} {clinic.fullName}. All rights reserved.
              </p>
              <p>Adyar · Chennai</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

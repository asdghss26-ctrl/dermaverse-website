import Link from "next/link";
import { Clock, Leaf, ScanFace, Sun } from "lucide-react";

// TODO: confirm all treatment copy with the doctor.
const treatments = [
  {
    title: "Acne",
    description: "Clearer, calmer skin with personalised care.",
    icon: ScanFace,
    mobileHref: "/services/acne-treatment",
  },
  {
    title: "Pigmentation",
    description: "Targeted treatment for uneven tone and dark spots.",
    icon: Sun,
    mobileHref: "/services/pigmentation-chemical-peels",
  },
  {
    title: "Hair Loss",
    description: "Assessment and personalised care for thinning hair.",
    icon: Leaf,
    mobileHref: "/services/hair-fall-scalp-care",
  },
  {
    title: "Anti-ageing",
    description: "Natural-looking rejuvenation, tailored to you.",
    icon: Clock,
    mobileHref: "/services/anti-aging",
  },
] as const;

export function TreatmentsStrip() {
  return (
    <nav
      aria-label="Popular treatments"
      className="border-b border-sand bg-olive md:border-y md:border-taupe/20"
    >
      <div className="md:hidden">
        <ul
          role="list"
          aria-label="Popular treatments"
          tabIndex={0}
          className="treatment-scroller hide-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain scroll-px-4 px-4 py-3.5"
        >
          {treatments.map((treatment) => {
            const Icon = treatment.icon;

            return (
              <li
                key={treatment.title}
                role="listitem"
                className="shrink-0 snap-start"
              >
                <Link
                  href={treatment.mobileHref}
                  className="treatment-chip inline-flex h-11 items-center gap-2 rounded-full border border-sand bg-olive px-4 font-sans text-[15px] font-medium text-cream transition-colors duration-150 hover:border-cream hover:bg-cream/10 hover:text-cream active:bg-[#2b250f] active:text-cream motion-reduce:transition-none [-webkit-tap-highlight-color:transparent] touch-manipulation"
                >
                  <Icon
                    className="h-5 w-5 shrink-0"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <span className="whitespace-nowrap">{treatment.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="site-container hidden md:block">
        <div className="grid grid-cols-2 gap-px bg-taupe/30 lg:grid-cols-4">
          {treatments.map((treatment) => {
            const Icon = treatment.icon;

            return (
              <Link
                key={treatment.title}
                href="#services"
                className="group flex flex-col gap-3 bg-olive p-4 text-taupe transition-colors duration-300 hover:bg-taupe hover:text-brown md:gap-4 md:p-7"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-taupe/40 text-sand transition-colors duration-300 group-hover:border-brown group-hover:bg-brown group-hover:text-cream md:h-11 md:w-11">
                    <Icon className="h-4 w-4 md:h-5 md:w-5" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                </div>
                <div>
                  <h2 className="font-heading text-lg uppercase text-taupe group-hover:text-brown">
                    {treatment.title}
                  </h2>
                  <p className="mt-1.5 hidden text-sm leading-snug text-taupe/80 group-hover:text-brown/80 md:block">
                    {treatment.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

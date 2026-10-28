import { cn } from "@/lib/utils";
import { Car, Clock, MapPin, Phone } from "lucide-react";

export interface TrustItem {
  icon: "pin" | "clock" | "car" | "phone";
  label: string;
  value: string;
  mobileValue?: string;
  href?: string;
  external?: boolean;
}

interface TrustStripProps {
  items: TrustItem[];
  className?: string;
}

const iconMap = {
  pin: MapPin,
  clock: Clock,
  car: Car,
  phone: Phone,
};

export function TrustStrip({ items, className }: TrustStripProps) {
  if (items.length === 0) return null;

  const filteredItems = items.filter((item) => item.icon !== "phone");
  const mobileItems = items.filter((item) => item.icon !== "phone");

  return (
    <>
      <ul className="divide-y divide-sand md:hidden" aria-label="Clinic information">
        {mobileItems.map((item) => {
          const Icon = iconMap[item.icon];
          const mobileValue = item.mobileValue ?? item.value;
          const value =
            item.icon === "clock"
              ? mobileValue.replace(/(\d)\s(AM|PM)\b/g, "$1\u00a0$2")
              : mobileValue;

          return (
            <li
              key={item.label}
              className="flex min-h-12 items-center gap-3"
            >
              <Icon
                className="h-5 w-5 shrink-0 text-sand-strong"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <span
                className={cn(
                  "font-sans text-base leading-snug tracking-[-0.01em] text-brown",
                  item.icon === "clock"
                    ? "whitespace-nowrap max-[339px]:whitespace-normal"
                    : "whitespace-nowrap"
                )}
              >
                {value}
              </span>
            </li>
          );
        })}
      </ul>

      <div
        className={cn(
          "mx-auto hidden w-full items-center md:flex md:h-[100px]",
          className
        )}
      >
        {filteredItems.map((item, i) => {
          const Icon = iconMap[item.icon];
          const content = (
            <div className="flex items-center gap-3">
              <Icon
                className="h-4 w-4 text-sand shrink-0"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <div className="flex flex-col">
                <span className="font-heading text-[clamp(18px,1.5vw,22px)] leading-tight text-brown whitespace-nowrap">
                  {item.value}
                </span>
                <span className="eyebrow mt-1 text-sand-strong">{item.label}</span>
              </div>
            </div>
          );

          return (
            <div
              key={item.label}
              className={cn(
                "flex flex-1 items-center justify-center px-6 h-full",
                i > 0 && "border-l border-sand"
              )}
            >
              {item.href ? (
                <a
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="flex min-h-11 items-center justify-center"
                >
                  {content}
                </a>
              ) : (
                <div className="flex min-h-11 items-center justify-center">
                  {content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

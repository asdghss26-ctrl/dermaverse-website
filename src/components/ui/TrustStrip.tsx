import { cn } from "@/lib/utils";
import { Star, Clock, Car, MessageCircle } from "lucide-react";

export interface TrustItem {
  icon: "star" | "clock" | "car" | "reviews";
  label: string;
  value: string;
}

interface TrustStripProps {
  items: TrustItem[];
  className?: string;
}

const iconMap = {
  star: Star,
  clock: Clock,
  car: Car,
  reviews: MessageCircle,
};

export function TrustStrip({ items, className }: TrustStripProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap justify-center gap-4 md:gap-8 py-6 px-4",
        className
      )}
    >
      {items.map((item) => {
        const Icon = iconMap[item.icon];
        return (
          <div
            key={item.label}
            className="flex items-center gap-2 text-sm"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/15">
              <Icon className="h-4 w-4 text-gold" strokeWidth={2} />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-charcoal text-sm leading-tight">
                {item.value}
              </span>
              <span className="text-xs text-charcoal/60 leading-tight">
                {item.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

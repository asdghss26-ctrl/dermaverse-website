import { cn } from "@/lib/utils";
import { Badge } from "./Badge";
import { ImagePlaceholder } from "./ImagePlaceholder";

interface DoctorCardProps {
  name: string;
  title: string;
  qualifications: readonly string[];
  memberships: readonly string[];
  experience: string;
  portraitUrl: string | null;
  className?: string;
}

export function DoctorCard({
  name,
  title,
  qualifications,
  memberships,
  experience,
  portraitUrl,
  className,
}: DoctorCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center text-center md:flex-row md:text-left md:items-start gap-6 md:gap-8",
        className
      )}
    >
      {/* Portrait */}
      <div className="w-48 h-48 md:w-56 md:h-56 shrink-0 rounded-2xl overflow-hidden">
        {portraitUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={portraitUrl}
            alt={`Portrait of ${name}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <ImagePlaceholder
            caption="Doctor portrait"
            aspectRatio="square"
            className="w-full h-full"
          />
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-3">
        <h3 className="font-heading text-2xl md:text-3xl font-semibold text-charcoal">
          {name}
        </h3>
        <p className="text-emerald-brand font-medium">{title}</p>

        {/* Credential chips */}
        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
          {qualifications.map((q) => (
            <Badge key={q} variant="sage">
              {q}
            </Badge>
          ))}
          {memberships.map((m) => (
            <Badge key={m} variant="outline">
              {m}
            </Badge>
          ))}
          <Badge variant="gold">{experience}</Badge>
        </div>
      </div>
    </div>
  );
}

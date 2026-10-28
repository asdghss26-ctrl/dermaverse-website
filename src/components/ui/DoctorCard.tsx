import Image from "next/image";
import { cn } from "@/lib/utils";
import { ImagePlaceholder } from "./ImagePlaceholder";

interface DoctorCardProps {
  name: string;
  title: string;
  qualifications: readonly string[];
  fellowship?: string | null;
  memberships: readonly string[] | null;
  experience: string | null;
  portraitUrl: string | null;
  className?: string;
}

export function DoctorCard({
  name,
  title,
  qualifications,
  fellowship,
  memberships,
  experience,
  portraitUrl,
  className,
}: DoctorCardProps) {
  const credentialLine = fellowship
    ? `${qualifications.join(" · ")} · ${fellowship}`
    : qualifications.join(" · ");

  return (
    <>
      <div className="md:hidden">
        {portraitUrl && !name.includes("placeholder") && (
          <div className="arch relative mx-auto w-full max-w-[240px] max-h-[240px] aspect-[4/5] overflow-hidden border border-sand/60 shadow-sm">
            <Image
              src={portraitUrl}
              alt={`Portrait of ${name}`}
              fill
              sizes="240px"
              className="object-cover object-top"
            />
          </div>
        )}

        <div className={cn(portraitUrl && !name.includes("placeholder") ? "mt-6" : "")}>
          <p className="eyebrow mb-3 text-sand-strong">{title}</p>
          <h3 className="display-md uppercase text-brown text-[clamp(26px,8vw,30px)] leading-tight text-wrap-balance" style={{ textWrap: 'balance', whiteSpace: 'normal' }}>
            {name.replace("PRIYADHARSHINI A", "PRIYADHARSHINI\u00A0A")}
          </h3>
          <div className="mt-4 space-y-1 text-sm text-brown">
            <p>{credentialLine}</p>
            {memberships && memberships.length > 0 && (
              <p className="text-sand-strong">{memberships.join(" · ")}</p>
            )}
          </div>
          {experience && (
            <div className="mt-5 flex items-center gap-3 border-t border-sand/70 pt-5">
              <span className="font-heading text-3xl leading-none text-sand-strong">
                {experience.replace(/[^0-9+]/g, "")}
              </span>
              <span className="eyebrow max-w-[7rem] text-sand-strong">
                Years of clinical experience
              </span>
            </div>
          )}
        </div>
      </div>

      <div
        className={cn(
          "hidden items-center gap-10 md:grid md:grid-cols-12 md:gap-14",
          className
        )}
      >
        {/* Portrait */}
        <div className="md:col-span-5">
        <div className="arch relative aspect-[4/5] w-full overflow-hidden border border-sand/60 shadow-sm">
          {portraitUrl ? (
            <Image
              src={portraitUrl}
              alt={`Portrait of ${name}`}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover object-top"
            />
          ) : (
            <ImagePlaceholder
              caption="Doctor portrait"
              aspectRatio="portrait"
              className="h-full w-full rounded-none"
            />
          )}
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col md:col-span-7">
        <p className="eyebrow mb-4 text-sand-strong">{title}</p>

        <h3 className="display-md uppercase text-brown">{name}</h3>

        <div className="mt-5 space-y-1 text-sm text-brown">
          <p>{credentialLine}</p>
          {memberships && memberships.length > 0 && (
            <p className="text-sand-strong">{memberships.join(" · ")}</p>
          )}
        </div>

        {experience && (
          <div className="mt-8 flex items-center gap-3 border-t border-sand/70 pt-6">
            <span className="font-heading text-4xl leading-none text-sand-strong">
              {experience.replace(/[^0-9+]/g, "")}
            </span>
            <span className="eyebrow max-w-[7rem] text-sand-strong">
              Years of clinical experience
            </span>
          </div>
        )}
        </div>
      </div>
    </>
  );
}

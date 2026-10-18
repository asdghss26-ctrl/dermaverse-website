import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Home, CalendarCheck } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <Section background="ivory" className="pt-16 pb-16 md:pt-24 md:pb-24">
        <div className="text-center max-w-md mx-auto">
          {/* Decorative 404 */}
          <p className="font-heading text-8xl md:text-9xl font-bold text-emerald-brand/10 leading-none mb-4 select-none">
            404
          </p>

          <h1 className="font-heading text-2xl md:text-3xl font-bold text-charcoal mb-3">
            Page Not Found
          </h1>
          <p className="text-charcoal/60 mb-8 leading-relaxed">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It may
            have been moved or no longer exists.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button href="/" variant="primary" size="md">
              <Home className="h-5 w-5" />
              Back to Home
            </Button>
            <Button href="/book" variant="secondary" size="md">
              <CalendarCheck className="h-5 w-5" />
              Book Consultation
            </Button>
          </div>
        </div>
      </Section>

    </>
  );
}

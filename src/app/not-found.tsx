import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Home, CalendarCheck } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <Section background="cream" className="pt-16 pb-16 md:pt-24 md:pb-24">
        <div className="text-center max-w-md mx-auto">
          {/* Decorative 404 */}
          <p
            className="select-none font-heading text-8xl leading-none text-brown/10 md:text-9xl"
            aria-hidden="true"
          >
            404
          </p>

          <p className="eyebrow mb-4 text-sand-strong">404</p>
          <h1 className="display-md text-brown mb-3">Page not found</h1>
          <p className="text-brown mb-8 leading-relaxed">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It may
            have been moved or no longer exists.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button href="/" variant="primary" size="md">
              <Home className="h-5 w-5" />
              Back to Home
            </Button>
            <Button href="/appointment" variant="secondary" size="md">
              <CalendarCheck className="h-5 w-5" />
              Book Consultation
            </Button>
          </div>
        </div>
      </Section>

    </>
  );
}

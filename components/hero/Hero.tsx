import { ProductStage } from "@/components/hero/ProductStage";
import { FadeRise } from "@/components/motion/FadeRise";
import { homeCopy } from "@/lib/i18n/home";
import type { Locale } from "@/lib/i18n/locales";
import { getPublishedProjects } from "@/lib/projects/repository";

const focusRing =
  "rounded-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan";

interface HeroProps {
  locale: Locale;
}

export function Hero({ locale }: HeroProps) {
  const copy = homeCopy[locale];
  const projects = getPublishedProjects(locale);

  return (
    <FadeRise className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 overflow-x-clip px-5 pt-10 pb-8 sm:px-8 sm:pt-14 sm:pb-12 xl:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] xl:items-stretch xl:gap-8 xl:pt-16 xl:pb-12">
      <div className="min-w-0 xl:pt-1">
        <p className="font-mono text-xs tracking-[0.22em] text-muted uppercase">
          {copy.eyebrow}
        </p>
        <h1 className="mt-3 text-[1.875rem] leading-[1.08] font-semibold tracking-tight text-balance text-foreground sm:mt-4 sm:text-[2.2rem]">
          <span className="block">{copy.line1}</span>
          <span className="mt-1 block sm:mt-2">{copy.line2}</span>
        </h1>
        <span aria-hidden className="mt-4 block h-0.5 w-14 bg-cyan sm:mt-5" />
        <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
          {copy.support}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href="#featured-projects"
            className={`${focusRing} inline-flex min-h-11 items-center bg-cyan px-4 text-sm font-medium text-background`}
          >
            {copy.primaryCta}
          </a>
          <a
            href="#capabilities"
            className={`${focusRing} inline-flex min-h-11 items-center border border-foreground/15 px-4 text-sm text-foreground`}
          >
            {copy.secondaryCta}
          </a>
        </div>
      </div>
      <ProductStage locale={locale} projects={projects} />
    </FadeRise>
  );
}

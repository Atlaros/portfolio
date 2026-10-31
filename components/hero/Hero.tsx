import { HeroFlow } from "@/components/hero/HeroFlow";
import { FadeRise } from "@/components/motion/FadeRise";
import { homeCopy } from "@/lib/i18n/home";
import type { Locale } from "@/lib/i18n/locales";

interface HeroProps {
  locale: Locale;
}

export function Hero({ locale }: HeroProps) {
  const copy = homeCopy[locale];

  return (
    <FadeRise className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 pt-16 pb-24 sm:px-8 sm:pt-24 sm:pb-32 lg:flex-row lg:items-end lg:gap-16">
      <div className="min-w-0 lg:flex-1">
        <p className="font-mono text-xs tracking-[0.22em] text-muted uppercase">
          {copy.eyebrow}
        </p>
        <h1 className="mt-6 max-w-4xl text-4xl leading-[1.08] font-medium tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          <span className="block">{copy.line1}</span>
          <span className="hero-highlight mt-1 block">{copy.line2}</span>
        </h1>
        <p className="mt-8 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          {copy.support}
        </p>
      </div>
      <HeroFlow locale={locale} />
    </FadeRise>
  );
}

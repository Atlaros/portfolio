import Link from "next/link";
import { capabilitiesCopy } from "@/lib/i18n/capabilities";
import { projectCopy } from "@/lib/i18n/projects";
import type { Locale } from "@/lib/i18n/locales";
import { LocaleSwitcher } from "./LocaleSwitcher";

const focusRing =
  "rounded-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan";

const HEADER_CURRENT = {
  home: "home",
  catalog: "catalog",
} as const;

type HeaderCurrent = (typeof HEADER_CURRENT)[keyof typeof HEADER_CURRENT];

interface SiteHeaderProps {
  locale: Locale;
  current?: HeaderCurrent;
}

export function SiteHeader({ locale, current }: SiteHeaderProps) {
  const catalogCurrent = current === HEADER_CURRENT.catalog;

  return (
    <header className="sticky top-0 z-10 border-b border-foreground/10 bg-surface">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 py-4 sm:px-8">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link
            href={`/${locale}`}
            className={`text-base font-medium tracking-tight text-foreground ${focusRing}`}
          >
            Diego Borges
          </Link>
          <Link
            href={`/${locale}/projects`}
            aria-current={catalogCurrent ? "page" : undefined}
            className={
              catalogCurrent
                ? `${focusRing} text-base text-foreground underline underline-offset-4`
                : `${focusRing} text-base text-foreground`
            }
          >
            {projectCopy[locale].sectionTitle}
          </Link>
          <Link
            href={`/${locale}#approach`}
            className={`${focusRing} text-base text-foreground`}
          >
            {capabilitiesCopy[locale].navLabel}
          </Link>
        </div>
        <LocaleSwitcher locale={locale} />
      </div>
    </header>
  );
}

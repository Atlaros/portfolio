import Link from "next/link";
import { locales, type Locale } from "@/lib/i18n/locales";

const focusRing =
  "rounded-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan";

const labels: Record<Locale, string> = {
  es: "Español",
  en: "English",
  pt: "Português",
};

const navLabels: Record<Locale, string> = {
  es: "Idioma",
  en: "Language",
  pt: "Idioma",
};

type LocaleSwitcherProps = {
  locale: Locale;
};

export function LocaleSwitcher({ locale }: LocaleSwitcherProps) {
  return (
    <nav aria-label={navLabels[locale]}>
      <ul className="flex list-none flex-wrap gap-x-4 gap-y-2 p-0">
        {Object.values(locales).map((code) => {
          const active = code === locale;

          return (
            <li key={code}>
              <Link
                href={`/${code}`}
                hrefLang={code}
                lang={code}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? `${focusRing} underline underline-offset-4`
                    : focusRing
                }
              >
                {labels[code]}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

const locales = {
  es: "es",
  en: "en",
  pt: "pt",
} as const;

export type Locale = (typeof locales)[keyof typeof locales];

export { locales };

export const defaultLocale: Locale = locales.es;

const localeValues: ReadonlySet<string> = new Set(Object.values(locales));

export function isLocale(value: string): value is Locale {
  return localeValues.has(value);
}

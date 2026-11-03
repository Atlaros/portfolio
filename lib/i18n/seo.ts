import { defaultLocale, locales, type Locale } from "./locales";
import { getSiteUrl } from "@/lib/seo/site";

const SITE_NAME = "Diego Borges" as const;

const TITLE_TEMPLATE = `%s · ${SITE_NAME}` as const;

interface SiteSeoCopy {
  description: string;
}

interface ProjectsListSeoCopy {
  title: string;
  description: string;
}

const siteSeoCopy = {
  es: {
    description:
      "Portafolio de Diego Borges, AI & Agentic Systems Engineer. Diseño y desarrollo sistemas de software, datos e IA para resolver problemas concretos.",
  },
  en: {
    description:
      "Diego Borges portfolio — AI & Agentic Systems Engineer. I design and build software, data, and AI systems that solve concrete problems.",
  },
  pt: {
    description:
      "Portfólio de Diego Borges, AI & Agentic Systems Engineer. Desenho e desenvolvo sistemas de software, dados e IA para resolver problemas concretos.",
  },
} as const satisfies Record<Locale, SiteSeoCopy>;

const projectsListSeoCopy = {
  es: {
    title: "Proyectos",
    description:
      "Catálogo de casos de software, datos e inteligencia artificial publicados por Diego Borges.",
  },
  en: {
    title: "Projects",
    description:
      "Catalog of software, data, and artificial intelligence case studies published by Diego Borges.",
  },
  pt: {
    title: "Projetos",
    description:
      "Catálogo de casos de software, dados e inteligência artificial publicados por Diego Borges.",
  },
} as const satisfies Record<Locale, ProjectsListSeoCopy>;

const openGraphLocale: Record<Locale, string> = {
  es: "es_ES",
  en: "en_US",
  pt: "pt_BR",
};

function getSiteSeoCopy(locale: Locale): SiteSeoCopy {
  return siteSeoCopy[locale];
}

function getProjectsListSeoCopy(locale: Locale): ProjectsListSeoCopy {
  return projectsListSeoCopy[locale];
}

function localePath(locale: Locale, pathSuffix: string): string {
  const suffix = pathSuffix.startsWith("/") ? pathSuffix : `/${pathSuffix}`;
  return suffix === "/" ? `/${locale}` : `/${locale}${suffix}`;
}

function buildLanguageAlternates(pathSuffix: string): Record<string, string> {
  const site = getSiteUrl();
  const languages: Record<string, string> = {};

  for (const locale of Object.values(locales)) {
    languages[locale] = `${site}${localePath(locale, pathSuffix)}`;
  }

  languages["x-default"] = `${site}${localePath(defaultLocale, pathSuffix)}`;

  return languages;
}

function truncateMetaDescription(text: string, maxLength = 160): string {
  const normalized = text.trim().replace(/\s+/g, " ");

  if (normalized.length <= maxLength) {
    return normalized;
  }

  const slice = normalized.slice(0, maxLength - 1);
  const lastSpace = slice.lastIndexOf(" ");

  if (lastSpace > maxLength * 0.6) {
    return `${slice.slice(0, lastSpace)}…`;
  }

  return `${slice}…`;
}

export {
  SITE_NAME,
  TITLE_TEMPLATE,
  buildLanguageAlternates,
  getProjectsListSeoCopy,
  getSiteSeoCopy,
  openGraphLocale,
  truncateMetaDescription,
};

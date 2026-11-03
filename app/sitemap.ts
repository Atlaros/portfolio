import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/locales";
import { publishedProjectParams } from "@/lib/projects/repository";
import { getSiteUrl } from "@/lib/seo/site";

function localeEntries(
  site: string,
  pathSuffix: string,
): MetadataRoute.Sitemap {
  return Object.values(locales).map((locale) => ({
    url: `${site}/${locale}${pathSuffix}`,
    lastModified: new Date(),
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSiteUrl();
  const entries: MetadataRoute.Sitemap = [
    {
      url: `${site}/`,
      lastModified: new Date(),
    },
    ...localeEntries(site, ""),
    ...localeEntries(site, "/projects"),
  ];

  for (const { locale, slug } of publishedProjectParams()) {
    entries.push({
      url: `${site}/${locale}/projects/${slug}`,
      lastModified: new Date(),
    });
  }

  return entries;
}

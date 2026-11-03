import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CaseStudy } from "@/components/projects/CaseStudy";
import {
  SITE_NAME,
  buildLanguageAlternates,
  openGraphLocale,
  truncateMetaDescription,
} from "@/lib/i18n/seo";
import { isLocale } from "@/lib/i18n/locales";
import { getProject, publishedProjectParams } from "@/lib/projects/repository";
import { getSiteUrl } from "@/lib/seo/site";

interface ProjectPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return publishedProjectParams();
}

export async function generateMetadata({
  params,
}: Pick<ProjectPageProps, "params">): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    return { title: SITE_NAME };
  }

  const project = getProject(locale, slug);

  if (project === null) {
    return { title: SITE_NAME };
  }

  const site = getSiteUrl();
  const title = project.title;
  const description = truncateMetaDescription(project.summary);
  const canonical = `${site}/${locale}/projects/${slug}`;
  const pathSuffix = `/projects/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: buildLanguageAlternates(pathSuffix),
    },
    openGraph: {
      type: "website",
      locale: openGraphLocale[locale],
      url: canonical,
      title,
      description,
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const project = getProject(locale, slug);

  if (project === null) {
    notFound();
  }

  return (
    <>
      <SiteHeader locale={locale} />
      <main>
        <CaseStudy locale={locale} project={project} />
      </main>
    </>
  );
}

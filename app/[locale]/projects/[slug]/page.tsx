import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CaseStudy } from "@/components/projects/CaseStudy";
import { isLocale } from "@/lib/i18n/locales";
import { getProject, publishedProjectParams } from "@/lib/projects/repository";

interface ProjectPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return publishedProjectParams();
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

import { notFound } from "next/navigation";
import { Capabilities } from "@/components/capabilities/Capabilities";
import { Hero } from "@/components/hero/Hero";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CopilotPanel } from "@/components/copilot/CopilotPanel";
import { FeaturedProjects } from "@/components/projects/FeaturedProjects";
import { CatalogHomeLink } from "@/components/projects/ProjectCatalog";
import { isLocale } from "@/lib/i18n/locales";
import { getPublishedProjects } from "@/lib/projects/repository";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const projects = getPublishedProjects(locale);
  const featured = projects.filter((project) => project.featured);

  return (
    <>
      <SiteHeader locale={locale} current="home" />
      <main>
        <Hero locale={locale} />
        {featured.length > 0 ? (
          <div className="relative">
            <FeaturedProjects locale={locale} projects={featured} />
            <div className="pointer-events-none absolute inset-x-0 top-0">
              <div className="mx-auto flex w-full max-w-6xl justify-end px-5 pt-1.5 sm:px-8 sm:pt-2">
                <p className="pointer-events-auto">
                  <CatalogHomeLink locale={locale} />
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="mx-auto w-full max-w-6xl px-5 pb-24 sm:px-8">
            <CatalogHomeLink locale={locale} />
          </p>
        )}
        <Capabilities locale={locale} projects={projects} />
        <CopilotPanel locale={locale} projects={projects} />
      </main>
    </>
  );
}

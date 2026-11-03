import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { getSiteUrl } from "../lib/seo/site";

describe("SEO metadata", () => {
  it("exposes getSiteUrl with sane defaults", () => {
    const url = getSiteUrl();
    expect(url).not.toMatch(/\/$/);
    expect(["http://localhost:3000", process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, ""), process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined].filter(Boolean)).toContain(url);
  });

  it("ships sitemap and robots routes", () => {
    const sitemap = readFileSync("app/sitemap.ts", "utf8");
    const robots = readFileSync("app/robots.ts", "utf8");

    expect(sitemap).toContain("MetadataRoute.Sitemap");
    expect(sitemap).toContain("publishedProjectParams");
    expect(sitemap).toContain("getSiteUrl");
    expect(robots).toContain("MetadataRoute.Robots");
    expect(robots).toContain("sitemap.xml");
  });

  it("uses generateMetadata on locale layout and key pages", () => {
    const layout = readFileSync("app/[locale]/layout.tsx", "utf8");
    const projects = readFileSync("app/[locale]/projects/page.tsx", "utf8");
    const projectSlug = readFileSync(
      "app/[locale]/projects/[slug]/page.tsx",
      "utf8",
    );

    expect(layout).toContain("generateMetadata");
    expect(layout).toContain("description");
    expect(layout).not.toMatch(/export const metadata:\s*Metadata\s*=\s*\{\s*title:/);

    expect(projects).toContain("generateMetadata");
    expect(projectSlug).toContain("generateMetadata");
    expect(projectSlug).toContain("truncateMetaDescription");
  });

  it("documents public site URL in env example", () => {
    const envExample = readFileSync(".env.example", "utf8");
    expect(envExample).toContain("NEXT_PUBLIC_SITE_URL=");
  });
});

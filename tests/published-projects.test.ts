import { describe, expect, it } from "vitest";
import { locales, type Locale } from "@/lib/i18n/locales";
import { getPublishedProjects } from "@/lib/projects/repository";

const publishedSlugs = [
  "tramit-ia",
  "academ-ia",
  "partner-intelligence",
  "inventoryiq",
  "trustscore",
  "autostory-builder",
] as const;

const tramitLiveUrl = "https://tramitia-bolivia.mywire.org";
const partnerLiveUrl = "https://partner-intelligence.onrender.com";

describe("getPublishedProjects", () => {
  it.each(Object.values(locales))(
    "returns featured then level-two published projects in order for %s",
    (locale: Locale) => {
      const projects = getPublishedProjects(locale);

      expect(projects.map((project) => project.slug)).toEqual([
        ...publishedSlugs,
      ]);

      const tramit = projects.find((project) => project.slug === "tramit-ia");
      const academ = projects.find((project) => project.slug === "academ-ia");
      const partner = projects.find(
        (project) => project.slug === "partner-intelligence",
      );
      const inventory = projects.find((project) => project.slug === "inventoryiq");
      const trust = projects.find((project) => project.slug === "trustscore");
      const autostory = projects.find(
        (project) => project.slug === "autostory-builder",
      );

      expect(inventory?.featured).toBe(false);
      expect(trust?.featured).toBe(false);
      expect(autostory?.featured).toBe(false);
      expect(autostory?.repositoryUrl).toBe("https://github.com/Atlaros/AutoStory");

      expect(tramit?.liveUrl).toBe(tramitLiveUrl);
      expect(tramit?.screenshots?.map((shot) => shot.src)).toEqual([
        "/projects/tramitia/welcome.webp",
        "/projects/tramitia/queries.webp",
        "/projects/tramitia/recovered-card.webp",
      ]);
      expect(academ?.liveUrl).toBeUndefined();
      expect(academ?.screenshots?.map((shot) => shot.src)).toEqual([
        "/projects/academia/search.webp",
        "/projects/academia/universities.webp",
        "/projects/academia/compare.webp",
      ]);
      expect(partner?.liveUrl).toBe(partnerLiveUrl);
      expect(partner?.screenshots?.map((shot) => shot.src)).toEqual([
        "/projects/partner-intelligence/programs.webp",
        "/projects/partner-intelligence/organizations.webp",
      ]);
      expect(partner?.repositoryUrl).toBeUndefined();
      expect(JSON.stringify(partner)).not.toContain("1050");
      expect(JSON.stringify(partner)).not.toContain("1,050");
    },
  );
});

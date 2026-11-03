import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { PROJECT_PARTICIPATION } from "@/domain/project";
import { locales, type Locale } from "@/lib/i18n/locales";
import { getPublishedProjects } from "@/lib/projects/repository";

const featuredSlugs = [
  "tramit-ia",
  "academ-ia",
  "partner-intelligence",
] as const;

const fellowshipContributionPattern =
  /No Country|fellowship|internship|pasantía|estágio|contribuci[oó]n|contribuição/i;

describe("featured case study content", () => {
  it.each(Object.values(locales))(
    "keeps validation, limitations, and participation honest for %s",
    (locale: Locale) => {
      const projects = getPublishedProjects(locale);

      for (const slug of featuredSlugs) {
        const project = projects.find((item) => item.slug === slug);
        expect(project).toBeDefined();
        expect(project?.validation?.trim().length).toBeGreaterThan(0);
        expect(project?.limitations?.trim().length).toBeGreaterThan(0);
      }

      const tramit = projects.find((project) => project.slug === "tramit-ia");
      const academ = projects.find((project) => project.slug === "academ-ia");
      const partner = projects.find(
        (project) => project.slug === "partner-intelligence",
      );

      expect(tramit?.participation).toBe(PROJECT_PARTICIPATION.personal);
      expect(academ?.participation).toBe(PROJECT_PARTICIPATION.personal);
      expect(partner?.participation).toBe(PROJECT_PARTICIPATION.internship);

      expect(JSON.stringify(academ)).not.toMatch(/\b1050\b/);
      expect(academ?.liveUrl).toBeUndefined();
      expect(academ?.technologies).toContain("AWS");
      expect(academ?.approach).toMatch(/EC2|Postgres|Supabase/i);
      expect(academ?.limitations).toMatch(/demo|URL|disponib|availab/i);

      const partnerText = [
        partner?.whyItMatters,
        partner?.summary,
        partner?.solution,
        partner?.approach,
        ...(partner?.benefits ?? []),
        partner?.validation,
        partner?.limitations,
      ]
        .filter(Boolean)
        .join(" ");

      expect(partnerText).toMatch(fellowshipContributionPattern);
    },
  );

  it("renders validation and limitations copy keys in CaseStudy", () => {
    const source = readFileSync("components/projects/CaseStudy.tsx", "utf8");
    expect(source).toContain("copy.validation");
    expect(source).toContain("copy.limitations");
  });
});

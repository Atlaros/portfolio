import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { PROJECT_PARTICIPATION } from "@/domain/project";
import { locales, type Locale } from "@/lib/i18n/locales";
import { projectCopy } from "@/lib/i18n/projects";
import { trajectoryCopy } from "@/lib/i18n/trajectory";
import { getPublishedProjects } from "@/lib/projects/repository";
import {
  trajectoryEntries,
  trajectoryEntriesSchema,
} from "@/lib/trajectory/entries";

const levelTwoSlugs = ["inventoryiq", "trustscore", "autostory-builder"] as const;

const publicRepos = [
  "https://github.com/Atlaros/InventoryIQ",
  "https://github.com/Atlaros/trust_score",
  "https://github.com/Atlaros/AutoStory",
  "https://github.com/Atlaros/AuditorIA",
  "https://github.com/Atlaros/Talentify",
  "https://github.com/Atlaros/Quipu-AI",
  "https://github.com/No-Country-simulation/S06-26-NC-Equipo-89",
] as const;

describe("phase D project tiers", () => {
  it.each(Object.values(locales))(
    "publishes level-two cases as non-featured with verified repos for %s",
    (locale: Locale) => {
      const projects = getPublishedProjects(locale);
      const relevant = projects.filter((project) => project.featured === false);

      expect(relevant.map((project) => project.slug)).toEqual([...levelTwoSlugs]);

      for (const slug of levelTwoSlugs) {
        const project = projects.find((item) => item.slug === slug);
        expect(project).toBeDefined();
        expect(project?.featured).toBe(false);
        expect(project?.status).toBe("published");
        expect(project?.maturity).toBe("prototype");
        expect(project?.liveUrl).toBeUndefined();
        expect(project?.participation).toBeDefined();
        expect(project?.repositoryUrl).toMatch(/^https:\/\/github\.com\//);
        expect(JSON.stringify(project)).not.toMatch(/\bRMSE\b|\bMAPE\b/i);
      }

      const inventory = projects.find((project) => project.slug === "inventoryiq");
      expect(inventory?.participation).toBe(PROJECT_PARTICIPATION.personal);
      expect(inventory?.repositoryUrl).toBe(
        "https://github.com/Atlaros/InventoryIQ",
      );
      expect(inventory?.screenshots).toBeUndefined();

      const trust = projects.find((project) => project.slug === "trustscore");
      expect(trust?.participation).toBe(PROJECT_PARTICIPATION.personal);
      expect(trust?.repositoryUrl).toBe("https://github.com/Atlaros/trust_score");
      expect(JSON.stringify(trust).toLowerCase()).toMatch(/synthetic|sintétic/);

      const autostory = projects.find(
        (project) => project.slug === "autostory-builder",
      );
      expect(autostory?.participation).toBe(PROJECT_PARTICIPATION.collaborative);
      expect(autostory?.repositoryUrl).toBe("https://github.com/Atlaros/AutoStory");
      expect(autostory?.repositoryUrl).not.toMatch(/Autostory_builder/i);
      expect(autostory?.screenshots?.[0]?.src).toBe(
        "/projects/autostory-builder/interface.webp",
      );
      expect(JSON.stringify(autostory)).toMatch(/No Country/);
    },
  );

  it("keeps trajectory entries Zod-validated with only public repos", () => {
    const parsed = trajectoryEntriesSchema.safeParse(trajectoryEntries);
    expect(parsed.success).toBe(true);
    expect(trajectoryEntries.map((entry) => entry.id)).toEqual([
      "auditoria",
      "talentify",
      "quipu-ai",
      "feedback-classifier",
    ]);

    for (const entry of trajectoryEntries) {
      expect(publicRepos).toContain(entry.repositoryUrl);
      expect(entry.repositoryUrl).not.toMatch(/Autostory_builder/i);
    }

    const quipu = trajectoryEntries.find((entry) => entry.id === "quipu-ai");
    const feedback = trajectoryEntries.find(
      (entry) => entry.id === "feedback-classifier",
    );
    expect(quipu?.context.es).toMatch(/Contribución en equipo/i);
    expect(quipu?.context.en).toMatch(/Team contribution/i);
    expect(feedback?.context.es).toMatch(/Contribución en el repo de equipo/i);
    expect(feedback?.context.en).toMatch(/Contribution on the No Country team/i);
  });


  it("names relevant and trajectory sections in es, en, and pt", () => {
    expect(projectCopy.es.relevantTitle).toBe("Otros proyectos relevantes");
    expect(projectCopy.en.relevantTitle).toBe("Other relevant projects");
    expect(projectCopy.pt.relevantTitle).toBe("Outros projetos relevantes");
    expect(projectCopy.es.sourceCode).toBe("Código");
    expect(projectCopy.en.sourceCode).toBe("Source");
    expect(projectCopy.pt.sourceCode).toBe("Código");

    expect(trajectoryCopy.es.title).toBe("Trayectoria técnica");
    expect(trajectoryCopy.en.title).toBe("Technical trajectory");
    expect(trajectoryCopy.pt.title).toBe("Trajetória técnica");
    expect(trajectoryCopy.en.githubProfileUrl).toBe("https://github.com/Atlaros");
  });

  it("wires home order Featured → Relevant → Trajectory → Capabilities → Copilot", () => {
    const page = readFileSync("app/[locale]/page.tsx", "utf8");
    const featuredAt = page.indexOf("<FeaturedProjects");
    const relevantAt = page.indexOf("<RelevantProjects");
    const trajectoryAt = page.indexOf("<TechnicalTrajectory");
    const capabilitiesAt = page.indexOf("<Capabilities");
    const copilotAt = page.indexOf("<CopilotPanel");

    expect(featuredAt).toBeGreaterThan(-1);
    expect(relevantAt).toBeGreaterThan(featuredAt);
    expect(trajectoryAt).toBeGreaterThan(relevantAt);
    expect(capabilitiesAt).toBeGreaterThan(trajectoryAt);
    expect(copilotAt).toBeGreaterThan(capabilitiesAt);
    expect(page).not.toContain("FeaturedProjects.tsx");
  });
});

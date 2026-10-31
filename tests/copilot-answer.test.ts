import { describe, expect, it } from "vitest";
import {
  PROJECT_CATEGORY,
  PROJECT_MATURITY,
  PROJECT_STATUS,
  type Project,
  type ProjectCategory,
  type ProjectMaturity,
} from "@/domain/project";
import { answerQuestion, type AnswerResult } from "@/lib/copilot/answer";
import type { Locale } from "@/lib/i18n/locales";
import { getPublishedProjects } from "@/lib/projects/repository";

const locale: Locale = "es";

interface FixtureInput {
  id: string;
  slug: string;
  title: string;
  summary: string;
  maturity: ProjectMaturity;
  categories: ProjectCategory[];
  order: number;
  approach?: string;
  tagline?: string;
}

function fixture(input: FixtureInput): Project {
  return {
    id: input.id,
    slug: input.slug,
    title: input.title,
    tagline: input.tagline ?? "Tagline",
    summary: input.summary,
    problem: "Problem",
    solution: "Solution",
    approach: input.approach ?? "Approach",
    benefits: ["Benefit"],
    categories: input.categories,
    featured: true,
    order: input.order,
    status: PROJECT_STATUS.published,
    maturity: input.maturity,
  };
}

function projectItems(result: AnswerResult): Extract<AnswerResult, { kind: "projects" }>["items"] {
  expect(result).toMatchObject({ ok: true, kind: "projects" });

  if (!result.ok || result.kind !== "projects") {
    throw new Error("Expected published project items.");
  }

  return result.items;
}

describe("answerQuestion", () => {
  it("rejects a blank question", () => {
    expect(answerQuestion("   ", [], locale)).toEqual({
      ok: false,
      reason: "empty",
    });
  });

  it("rejects a question longer than 280 characters", () => {
    expect(answerQuestion("a".repeat(281), [], locale)).toEqual({
      ok: false,
      reason: "too-long",
    });
  });

  it("returns TramitIA with its summary for a title question", () => {
    const tramit = fixture({
      id: "tramit-ia",
      slug: "tramit-ia",
      title: "TramitIA",
      summary: "Piloto público con fichas publicadas.",
      maturity: PROJECT_MATURITY.demo,
      categories: [PROJECT_CATEGORY.ai],
      order: 1,
    });
    const academ = fixture({
      id: "academ-ia",
      slug: "academ-ia",
      title: "AcademIA",
      summary: "Corre en la máquina local.",
      maturity: PROJECT_MATURITY.prototype,
      categories: [PROJECT_CATEGORY["data-engineering"]],
      order: 2,
    });
    const result = answerQuestion("Contame sobre TramitIA", [tramit, academ], locale);
    const items = projectItems(result);

    expect(items).toEqual([
      {
        id: "tramit-ia",
        title: "TramitIA",
        maturity: PROJECT_MATURITY.demo,
        excerpt: tramit.summary,
      },
    ]);
  });

  it("uses the approach when that field carries the match", () => {
    const approach = "El modelo arma el ranking con los criterios publicados.";
    const partner = fixture({
      id: "partner-intelligence",
      slug: "partner-intelligence",
      title: "Partner Intelligence",
      summary: "Plataforma de alianzas.",
      approach,
      maturity: PROJECT_MATURITY.demo,
      categories: [PROJECT_CATEGORY.analytics],
      order: 3,
    });
    const distractor = fixture({
      id: "other",
      slug: "other",
      title: "Other",
      summary: "Un modelo distinto.",
      maturity: PROJECT_MATURITY.demo,
      categories: [PROJECT_CATEGORY.analytics],
      order: 4,
    });
    const items = projectItems(
      answerQuestion("el modelo arma el ranking", [partner, distractor], locale),
    );

    expect(items).toEqual([
      {
        id: "partner-intelligence",
        title: "Partner Intelligence",
        maturity: PROJECT_MATURITY.demo,
        excerpt: approach,
      },
    ]);
  });

  it("returns only projects in the ai category", () => {
    const tramit = fixture({
      id: "tramit-ia",
      slug: "tramit-ia",
      title: "TramitIA",
      summary: "Resumen de TramitIA.",
      maturity: PROJECT_MATURITY.demo,
      categories: [PROJECT_CATEGORY.ai],
      order: 1,
    });
    const academ = fixture({
      id: "academ-ia",
      slug: "academ-ia",
      title: "AcademIA",
      summary: "Resumen local.",
      maturity: PROJECT_MATURITY.prototype,
      categories: [PROJECT_CATEGORY["data-engineering"]],
      order: 2,
    });
    const items = projectItems(
      answerQuestion("¿Qué proyectos usan IA?", [tramit, academ], locale),
    );

    expect(items.map((item) => item.id)).toEqual(["tramit-ia"]);
    expect(items[0]?.excerpt).toBe(tramit.summary);
  });

  it("returns demo and production projects for a try question", () => {
    const production = fixture({
      id: "prod-one",
      slug: "prod-one",
      title: "Production",
      summary: "Resumen de producción.",
      maturity: PROJECT_MATURITY.production,
      categories: [PROJECT_CATEGORY.analytics],
      order: 1,
    });
    const demo = fixture({
      id: "demo-one",
      slug: "demo-one",
      title: "Demo",
      summary: "Resumen de demo.",
      maturity: PROJECT_MATURITY.demo,
      categories: [PROJECT_CATEGORY.ai],
      order: 2,
    });
    const prototype = fixture({
      id: "proto-one",
      slug: "proto-one",
      title: "Prototype",
      summary: "Resumen de prototipo.",
      maturity: PROJECT_MATURITY.prototype,
      categories: [PROJECT_CATEGORY["data-engineering"]],
      order: 3,
    });
    const items = projectItems(
      answerQuestion("¿Qué proyectos puedo probar?", [production, demo, prototype], locale),
    );

    expect(items.map((item) => item.id)).toEqual(["prod-one", "demo-one"]);
    expect(items.map((item) => item.excerpt)).toEqual([
      production.summary,
      demo.summary,
    ]);
    expect(items.map((item) => item.maturity)).not.toContain(PROJECT_MATURITY.prototype);
  });

  it("refuses a question absent from the projects", () => {
    const tramit = fixture({
      id: "tramit-ia",
      slug: "tramit-ia",
      title: "TramitIA",
      summary: "Piloto público.",
      maturity: PROJECT_MATURITY.demo,
      categories: [PROJECT_CATEGORY.ai],
      order: 1,
    });

    expect(answerQuestion("¿Cuál es el clima en Tokio?", [tramit], locale)).toEqual({
      ok: true,
      kind: "refusal",
    });
  });

  it("answers from the published Spanish catalog", () => {
    const projects = getPublishedProjects(locale);
    const tramit = projects.find((project) => project.id === "tramit-ia");

    expect(tramit).toBeDefined();

    const about = projectItems(answerQuestion("Contame sobre TramitIA", projects, locale));

    expect(about).toEqual([
      {
        id: "tramit-ia",
        title: tramit?.title,
        maturity: PROJECT_MATURITY.demo,
        excerpt: tramit?.summary,
      },
    ]);

    const ai = projectItems(answerQuestion("¿Qué proyectos usan IA?", projects, locale));
    const ids = ai.map((item) => item.id);

    expect(ids).toContain("tramit-ia");
    expect(ids).not.toContain("academ-ia");
    expect(ids).not.toContain("partner-intelligence");
  });
});

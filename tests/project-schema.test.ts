import { describe, expect, it } from "vitest";
import { isPublished, projectSchema } from "@/domain/project";

const publishedProject = {
  id: "tramit-ia",
  slug: "tramit-ia",
  title: "TramitIA",
  tagline: "Guidance for procedures",
  summary: "A public pilot that answers from published fact sheets.",
  problem: "Procedure information is not gathered into guidance a person can consult.",
  solution: "A website that answers with the published fact sheets.",
  approach: "If the procedure is not in the catalog, the system says so.",
  benefits: ["Guides people through municipal procedures."],
  categories: ["ai"],
  featured: true,
  order: 1,
  status: "published",
  maturity: "demo",
};

describe("project schema", () => {
  it("rejects a quantitative metric when source is missing", () => {
    const percentage = projectSchema.safeParse({
      ...publishedProject,
      metrics: [{ label: "Wait time", value: "40%" }],
    });
    const duration = projectSchema.safeParse({
      ...publishedProject,
      metrics: [{ label: "Turnaround", value: "2 days" }],
    });

    expect(percentage.success).toBe(false);
    expect(duration.success).toBe(false);
  });

  it("accepts a quantitative metric when source is present", () => {
    const percentage = projectSchema.safeParse({
      ...publishedProject,
      metrics: [{ label: "Wait time", value: "40%", source: "Municipal report" }],
    });
    const duration = projectSchema.safeParse({
      ...publishedProject,
      metrics: [{ label: "Turnaround", value: "2 days", source: "Editorial log" }],
    });

    expect(percentage.success).toBe(true);
    expect(duration.success).toBe(true);
  });

  it("accepts a non-numeric benefit-style metric without source", () => {
    const result = projectSchema.safeParse({
      ...publishedProject,
      metrics: [{ label: "Outcome", value: "Clearer public guidance" }],
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.metrics?.[0]?.source).toBeUndefined();
    }
  });

  it("accepts draft status and reports it as unpublished", () => {
    const result = projectSchema.safeParse({
      ...publishedProject,
      status: "draft",
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(isPublished(result.data)).toBe(false);
    }
  });

  it("treats an empty liveUrl as absent", () => {
    const result = projectSchema.safeParse({
      ...publishedProject,
      liveUrl: "",
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.liveUrl).toBeUndefined();
    }
  });

  it("accepts optional participation when present", () => {
    const without = projectSchema.safeParse(publishedProject);
    const withParticipation = projectSchema.safeParse({
      ...publishedProject,
      participation: "personal",
    });

    expect(without.success).toBe(true);
    if (without.success) {
      expect(without.data.participation).toBeUndefined();
    }

    expect(withParticipation.success).toBe(true);
    if (withParticipation.success) {
      expect(withParticipation.data.participation).toBe("personal");
    }
  });
});

import { describe, expect, it } from "vitest";
import { heroFlowCopy } from "../lib/i18n/hero-flow";
import { locales, type Locale } from "../lib/i18n/locales";

const PILOT_HREF = "https://tramitia-bolivia.mywire.org";

describe("heroFlowCopy", () => {
  it("gives es, en, and pt four steps", () => {
    for (const locale of Object.values(locales) as Locale[]) {
      expect(heroFlowCopy[locale].steps).toHaveLength(4);
    }
  });

  it("points the product step at the TramitIA pilot", () => {
    for (const locale of Object.values(locales) as Locale[]) {
      expect(heroFlowCopy[locale].steps[3].linkHref).toBe(PILOT_HREF);
    }
  });

  it("labels the Spanish widget as illustrative architecture", () => {
    expect(heroFlowCopy.es.label).toBe("Arquitectura ilustrativa");
  });

  it("states in Spanish evidence that AcademIA is not an agent", () => {
    const evidence = heroFlowCopy.es.steps.map((step) => step.evidence).join(" ");
    expect(evidence).toContain("no es un agente");
  });

  it("does not invent metrics or Partner Intelligence", () => {
    const joined = Object.values(heroFlowCopy)
      .map((copy) => JSON.stringify(copy))
      .join("\n");

    expect(joined).not.toContain("1050");
    expect(joined).not.toContain("1,050");
    expect(joined).not.toContain("Partner Intelligence");
  });
});

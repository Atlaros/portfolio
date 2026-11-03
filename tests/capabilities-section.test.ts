import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  CAPABILITY_EVIDENCE_SLUGS,
  CAPABILITY_ID,
  CAPABILITY_ORDER,
} from "../lib/capabilities/config";
import { capabilitiesCopy } from "../lib/i18n/capabilities";
import { homeCopy } from "../lib/i18n/home";

describe("engineering capabilities copy", () => {
  it("names the section in es, en, and pt", () => {
    expect(capabilitiesCopy.es.title).toBe("Capacidades de ingeniería");
    expect(capabilitiesCopy.en.title).toBe("Engineering capabilities");
    expect(capabilitiesCopy.pt.title).toBe("Capacidades de engenharia");
    expect(homeCopy.es.secondaryCta).toBe("Ver capacidades");
    expect(homeCopy.en.secondaryCta).toBe("See capabilities");
    expect(homeCopy.pt.secondaryCta).toBe("Ver capacidades");
  });

  it("keeps the four capability ids and published evidence slugs only", () => {
    expect(CAPABILITY_ORDER).toEqual([
      CAPABILITY_ID.aiAgentic,
      CAPABILITY_ID.data,
      CAPABILITY_ID.fullstack,
      CAPABILITY_ID.ml,
    ]);
    expect(CAPABILITY_EVIDENCE_SLUGS[CAPABILITY_ID.aiAgentic]).toEqual(["tramit-ia"]);
    expect(CAPABILITY_EVIDENCE_SLUGS[CAPABILITY_ID.data]).toEqual([
      "academ-ia",
      "partner-intelligence",
    ]);
    expect(CAPABILITY_EVIDENCE_SLUGS[CAPABILITY_ID.fullstack]).toEqual([
      "tramit-ia",
      "academ-ia",
    ]);
    expect(CAPABILITY_EVIDENCE_SLUGS[CAPABILITY_ID.ml]).toEqual([
      "inventoryiq",
      "trustscore",
    ]);
  });

  it("uses truthful lead copy and English display names without Phase D wording", () => {
    for (const locale of ["es", "en", "pt"] as const) {
      const names = capabilitiesCopy[locale].capabilities.map((item) => item.name);
      expect(names).toEqual([
        "AI & Agentic Engineering",
        "Data Engineering & Analytics",
        "Full-Stack Engineering",
        "Machine Learning",
      ]);
    }

    expect(capabilitiesCopy.es.lead).toContain("Cuando hay un caso publicado");
    expect(capabilitiesCopy.es.lead).not.toMatch(/cuatro|evidencia publicada.*todas/i);
    expect(capabilitiesCopy.en.lead).toContain("When a published case exists");
    expect(capabilitiesCopy.pt.lead).toContain("Quando há um caso publicado");

    const joined = JSON.stringify(capabilitiesCopy);
    expect(joined).not.toContain("InventoryIQ");
    expect(joined).not.toContain("TrustScore");
    expect(joined).not.toContain("Quipu");
    expect(joined).not.toContain("Fase D");
    expect(joined).not.toContain("Phase D");
    expect(joined).not.toContain("Preparación");
    expect(joined).not.toContain("Próximamente");
    expect(joined).not.toContain("Coming soon");
    expect(joined).not.toContain("negativa clara");
    expect(joined).not.toContain("cuando el problema lo exige");
  });
});

describe("engineering capabilities section", () => {
  it("keeps id=capabilities, legacy #approach compat, and a compact editorial list", () => {
    const section = readFileSync("components/capabilities/Capabilities.tsx", "utf8");
    const page = readFileSync("app/[locale]/page.tsx", "utf8");
    const hero = readFileSync("components/hero/Hero.tsx", "utf8");
    const header = readFileSync("components/layout/SiteHeader.tsx", "utf8");
    const evidence = readFileSync("lib/capabilities/resolve-evidence.ts", "utf8");

    expect(section).toContain('id="capabilities"');
    expect(section).toContain('id="capabilities-title"');
    expect(section).toContain('id="approach"');
    expect(section).toContain("Phase G compat");
    expect(section).toContain("ADR-015");
    expect(section).toContain("resolveCapabilityEvidence");
    expect(section).toContain('href={`/${locale}/projects/${project.slug}`}');
    expect(section).not.toContain("collectProjectTechnologies");
    expect(section).not.toContain("project.tagline");
    expect(section).not.toContain("tablist");
    expect(section).not.toContain("tabpanel");
    expect(section).not.toContain("useState");
    expect(section).not.toContain('"use client"');
    expect(section).not.toContain("pendingEvidenceFor");
    expect(section).not.toContain("padStart");
    expect(hero).toContain('href="#capabilities"');
    expect(hero).not.toContain('href="#approach"');
    expect(header).toContain("#capabilities");
    expect(header).not.toContain("#approach");
    expect(evidence).toContain("must NOT be inferred by aggregating");
    expect(evidence).not.toContain("function collectProjectTechnologies");
    expect(page).toContain("<Capabilities");
    expect(page).not.toContain("<Approach");
  });

  it("lists ML evidence slugs in config only, not pending-evidence", () => {
    expect(CAPABILITY_EVIDENCE_SLUGS[CAPABILITY_ID.ml]).toEqual([
      "inventoryiq",
      "trustscore",
    ]);
    const section = readFileSync("components/capabilities/Capabilities.tsx", "utf8");
    expect(section).not.toContain("pendingEvidenceFor");
    expect(section).not.toContain("pending-evidence");
  });
});


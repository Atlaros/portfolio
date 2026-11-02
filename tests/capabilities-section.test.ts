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
    expect(CAPABILITY_EVIDENCE_SLUGS[CAPABILITY_ID.ml]).toEqual([]);
  });

  it("uses English display names for every capability", () => {
    for (const locale of ["es", "en", "pt"] as const) {
      const names = capabilitiesCopy[locale].capabilities.map((item) => item.name);
      expect(names).toEqual([
        "AI & Agentic Engineering",
        "Data Engineering & Analytics",
        "Full-Stack Engineering",
        "Machine Learning",
      ]);
    }
  });
});

describe("engineering capabilities section", () => {
  it("keeps id=approach for the Hero hash and ships an accessible tablist", () => {
    const section = readFileSync("components/capabilities/Capabilities.tsx", "utf8");
    const explorer = readFileSync("components/capabilities/CapabilitiesExplorer.tsx", "utf8");
    const page = readFileSync("app/[locale]/page.tsx", "utf8");

    expect(section).toContain('id="approach"');
    expect(section).toContain("ADR-015");
    expect(page).toContain("<Capabilities");
    expect(page).not.toContain("<Approach");
    expect(explorer).toContain('role="tablist"');
    expect(explorer).toContain("indexFromKey");
    expect(explorer).toContain('"Home"');
    expect(explorer).toContain('"End"');
    expect(explorer).toContain("useEntranceEnabled");
  });

  it("avoids the old step list and keeps ML candidates off catalog links", () => {
    const joined = JSON.stringify(capabilitiesCopy);
    expect(joined).not.toContain("InventoryIQ");
    expect(joined).not.toContain("TrustScore");
    expect(joined).not.toContain("Quipu");
    expect(readFileSync("components/capabilities/Capabilities.tsx", "utf8")).not.toContain(
      "<ol",
    );

    const pending = readFileSync("lib/capabilities/pending-evidence.ts", "utf8");
    const explorer = readFileSync("components/capabilities/CapabilitiesExplorer.tsx", "utf8");
    expect(pending).toContain("InventoryIQ");
    expect(pending).toContain("TrustScore");
    expect(pending).not.toContain("http");
    expect(explorer).toContain("pendingEvidenceFor");
    expect(explorer).toContain("border-dashed");
  });
});

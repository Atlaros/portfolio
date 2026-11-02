import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("legacy approach module (Phase G cleanup)", () => {
  it("keeps Approach.tsx and approach i18n until archival", () => {
    expect(readFileSync("components/approach/Approach.tsx", "utf8")).toContain('id="approach"');
    expect(readFileSync("lib/i18n/approach.ts", "utf8")).toContain("Ingeniería en acción");
  });

  it("does not mount Approach on the home page", () => {
    const page = readFileSync("app/[locale]/page.tsx", "utf8");
    expect(page).not.toContain("<Approach");
  });
});

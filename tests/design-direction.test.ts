import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("dark engineering premium direction", () => {
  it("keeps a solid headline and the accepted palette", () => {
    const css = readFileSync("app/globals.css", "utf8");
    const hero = readFileSync("components/hero/Hero.tsx", "utf8");
    const agents = readFileSync("AGENTS.md", "utf8");

    expect(css).toContain("--color-background: #0B101B");
    expect(css).toContain("--color-surface: #121A28");
    expect(css).toContain("--color-foreground: #F5F7FA");
    expect(css).toContain("--color-muted: #A7B3C7");
    expect(css).toContain("--color-cyan: #18D4D8");
    expect(css).toContain("--color-blue: #4D7CFF");
    expect(css).not.toContain("#985CFF");
    expect(css).not.toContain("hero-highlight");
    expect(hero).not.toContain("hero-highlight");
    expect(agents).not.toContain("Gradiente violeta");
  });
});

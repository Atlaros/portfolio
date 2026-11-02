import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { homeCopy } from "../lib/i18n/home";
import { productStageCopy } from "../lib/i18n/product-stage";
import { locales, type Locale } from "../lib/i18n/locales";

describe("home headline", () => {
  it("uses the approved solid headline in es, en, and pt", () => {
    expect(homeCopy.es.line1).toBe("Software, datos e inteligencia artificial");
    expect(homeCopy.es.line2).toBe("convertidos en soluciones reales.");
    expect(homeCopy.en.line1).toBe("Software, data, and artificial intelligence");
    expect(homeCopy.en.line2).toBe("turned into working solutions.");
    expect(homeCopy.pt.line1).toBe("Software, dados e inteligência artificial");
    expect(homeCopy.pt.line2).toBe("convertidos em soluções reais.");
  });
});

describe("productStageCopy", () => {
  it("gives each locale three different scenes", () => {
    for (const locale of Object.values(locales) as Locale[]) {
      const frames = productStageCopy[locale].scenes.map((scene) => scene.frame);
      expect(frames).toEqual(["pipeline", "catalog", "criteria"]);
    }
  });

  it("keeps published facts and drops the mockup's invented figures", () => {
    const joined = Object.values(productStageCopy)
      .map((copy) => JSON.stringify(copy))
      .join("\n");

    expect(productStageCopy.es.scenes[0].caption).toContain("Alcaldía");
    expect(productStageCopy.es.scenes[1].caption.toLowerCase()).toContain("no es un agente");
    expect(productStageCopy.es.scenes[1].caption.toLowerCase()).toContain("local");
    expect(productStageCopy.es.scenes[2].lines.join(" ")).toContain("AHP/TOPSIS");
    expect(joined).not.toContain("1050");
    expect(joined).not.toContain("10-15");
    expect(joined).not.toContain("Requisitos");
    expect(joined).not.toContain("Piloto activo");
  });

  it("connects the published steps and leaves the language model outside the rank", () => {
    const partner = productStageCopy.es.scenes[2];
    expect(productStageCopy.es.scenes[0].links.length).toBeGreaterThan(0);
    expect(productStageCopy.es.scenes[1].links.length).toBeGreaterThanOrEqual(3);
    expect(partner.nodes.some((node) => node.id === "modelo")).toBe(true);
    expect(JSON.stringify(partner.links)).not.toContain("modelo");
  });

  it("gives every node a function and an engineering decision from published facts", () => {
    for (const locale of Object.values(locales) as Locale[]) {
      for (const scene of productStageCopy[locale].scenes) {
        for (const node of scene.nodes) {
          expect(node.detail.length).toBeGreaterThan(20);
          expect(node.decision.length).toBeGreaterThan(20);
        }
      }
    }

    const academ = JSON.stringify(productStageCopy.es.scenes[1]).toLowerCase();
    expect(academ).not.toContain("rag");
    expect(academ).toContain("no es un agente");
  });
});

describe("home composition", () => {
  it("puts the product stage in the hero and the projects before capabilities", () => {
    const hero = readFileSync("components/hero/Hero.tsx", "utf8");
    const page = readFileSync("app/[locale]/page.tsx", "utf8");
    const heroAt = page.indexOf("<Hero");
    const projectsAt = page.indexOf("<FeaturedProjects");
    const capabilitiesAt = page.indexOf("<Capabilities");

    const stage = readFileSync("components/hero/ProductStage.tsx", "utf8");

    expect(hero).toContain("ProductStage");
    expect(hero).toContain("xl:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]");
    expect(hero).not.toContain("xl:mt-auto");
    expect(hero).not.toContain("min-[1280px]:items-center");
    expect(hero).not.toContain("sm:text-5xl");
    expect(hero).not.toContain("lg:flex-row");
    expect(hero).not.toContain("min-[1180px]:flex-row");
    expect(hero).not.toContain("lg:text-6xl");
    expect(stage).toContain("<line");
    expect(stage).toContain("aria-pressed");
    expect(stage).toContain("useEntranceEnabled");
    expect(stage).not.toContain("max-w-[34rem]");
    expect(stage).not.toContain("h-80");
    expect(hero).not.toContain("HeroFlow");
    expect(heroAt).toBeGreaterThan(-1);
    expect(projectsAt).toBeGreaterThan(heroAt);
    expect(capabilitiesAt).toBeGreaterThan(projectsAt);
  });
});
